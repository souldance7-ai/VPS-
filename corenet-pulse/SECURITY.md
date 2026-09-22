# Security

## Public surface

The public state endpoint is built from an explicit allow-list. It never serializes:

- agent tokens;
- source or destination IP addresses;
- hostnames;
- HTTP peer addresses;
- private remarks or management metadata.

The hub does not persist or log an agent's remote address. Unknown JSON fields are rejected so an updated agent cannot accidentally upload an `ip` field.

## Origin protection

Application-level redaction cannot hide an origin address published directly in DNS. Bind the hub to `127.0.0.1` and expose it through Cloudflare Tunnel or another outbound-only tunnel. If a conventional reverse proxy is used, proxy the DNS record and firewall the origin so only the proxy network can reach it.

Keep `/etc/corenet-pulse/hub.json`, `hub.env`, and `agent.env` mode `0600`. Never commit live tokens.

