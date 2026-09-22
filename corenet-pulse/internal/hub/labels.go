package hub

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"
	"time"
	"unicode"
	"unicode/utf8"
)

var (
	errUnknownNode  = errors.New("找不到這個節點")
	errNameConflict = errors.New("名稱已在其他視窗修改，請確認目前名稱後再儲存")
)

type labelFile struct {
	Version int               `json:"version"`
	Names   map[string]string `json:"names"`
}

func validDisplayName(name string) error {
	if utf8.RuneCountInString(name) > 80 || !utf8.ValidString(name) {
		return errors.New("節點名稱最多 80 個字")
	}
	for _, r := range name {
		if unicode.IsControl(r) {
			return errors.New("節點名稱不可包含控制字元")
		}
	}
	if redactNetworkIdentifiers(name) != name {
		return errors.New("公開節點名稱不可包含 IP 位址")
	}
	return nil
}

func readLabels(path string) (map[string]string, error) {
	f, err := os.Open(path)
	if errors.Is(err, os.ErrNotExist) {
		return make(map[string]string), nil
	}
	if err != nil {
		return nil, err
	}
	defer f.Close()
	var data labelFile
	dec := json.NewDecoder(io.LimitReader(f, 1<<20))
	dec.DisallowUnknownFields()
	if err := dec.Decode(&data); err != nil {
		return nil, err
	}
	if err := dec.Decode(&struct{}{}); !errors.Is(err, io.EOF) {
		return nil, errors.New("invalid trailing label data")
	}
	if data.Version != 1 {
		return nil, errors.New("unsupported node label version")
	}
	if data.Names == nil {
		data.Names = make(map[string]string)
	}
	for id, name := range data.Names {
		if id == "" || name == "" || strings.TrimSpace(name) != name {
			return nil, errors.New("invalid saved node name")
		}
		if err := validDisplayName(name); err != nil {
			return nil, err
		}
	}
	return data.Names, nil
}

func writeLabels(path string, names map[string]string) error {
	if path == "" {
		return errors.New("node label storage is not configured")
	}
	raw, err := json.MarshalIndent(labelFile{Version: 1, Names: names}, "", "  ")
	if err != nil {
		return err
	}
	f, err := os.CreateTemp(filepath.Dir(path), ".node-labels-*")
	if err != nil {
		return err
	}
	temp := f.Name()
	defer os.Remove(temp)
	if _, err = f.Write(append(raw, '\n')); err == nil {
		err = f.Sync()
	}
	closeErr := f.Close()
	if err != nil {
		return err
	}
	if closeErr != nil {
		return closeErr
	}
	return os.Rename(temp, path)
}

// displayName is called while the Store lock is held. Overrides never change
// the identity or credentials used by an Agent.
func (s *Store) displayName(node NodeConfig) string {
	if name, ok := s.labels[node.ID]; ok {
		return name
	}
	return redactNetworkIdentifiers(node.Name)
}

type managedNode struct {
	ID           string `json:"id"`
	Name         string `json:"name"`
	OriginalName string `json:"original_name"`
	Region       string `json:"region"`
	Provider     string `json:"provider"`
	Overridden   bool   `json:"overridden"`
	Online       bool   `json:"online"`
	LastSeen     int64  `json:"last_seen"`
}

func (s *Store) managedNodeLocked(n NodeConfig, now time.Time) managedNode {
	_, overridden := s.labels[n.ID]
	result := managedNode{ID: n.ID, Name: s.displayName(n), OriginalName: redactNetworkIdentifiers(n.Name), Region: redactNetworkIdentifiers(n.Region), Provider: redactNetworkIdentifiers(n.Provider), Overridden: overridden}
	if rt := s.runtime[n.ID]; rt != nil {
		result.LastSeen = rt.LastSeen
		result.Online = now.Unix()-rt.LastSeen <= int64(s.cfg.StaleAfterSeconds)
	}
	return result
}

func (s *Store) ManagedNodes() []managedNode {
	s.mu.RLock()
	defer s.mu.RUnlock()
	nodes := make([]managedNode, 0, len(s.cfg.Nodes))
	for _, n := range s.cfg.Nodes {
		nodes = append(nodes, s.managedNodeLocked(n, time.Now()))
	}
	return nodes
}

func (s *Store) RenameNode(id, name, expected string) (managedNode, error) {
	name = strings.TrimSpace(name)
	if err := validDisplayName(name); err != nil {
		return managedNode{}, err
	}
	s.mu.Lock()
	defer s.mu.Unlock()
	var node *NodeConfig
	for i := range s.cfg.Nodes {
		if s.cfg.Nodes[i].ID == id {
			node = &s.cfg.Nodes[i]
			break
		}
	}
	if node == nil {
		return managedNode{}, errUnknownNode
	}
	if s.displayName(*node) != expected {
		return s.managedNodeLocked(*node, time.Now()), errNameConflict
	}
	labels := make(map[string]string, len(s.labels)+1)
	for key, value := range s.labels {
		labels[key] = value
	}
	if name == "" || name == redactNetworkIdentifiers(node.Name) {
		delete(labels, id)
	} else {
		labels[id] = name
	}
	if err := writeLabels(s.cfg.LabelsPath, labels); err != nil {
		return managedNode{}, fmt.Errorf("save node labels: %w", err)
	}
	s.labels = labels
	for ch := range s.subscribers {
		select {
		case ch <- struct{}{}:
		default:
		}
	}
	return s.managedNodeLocked(*node, time.Now()), nil
}
