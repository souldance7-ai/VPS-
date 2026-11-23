'use strict';

(() => {
const $ = id => document.getElementById(id);
const t = (key, args) => window.SpeedLocale?.t(key,args) || key;
const translatedUi = new Map();
function paintText(id, key, args) {
  const draw = () => { $(id).textContent = typeof key === 'function' ? key() : t(key,args); };
  translatedUi.set(id,draw);
  draw();
}
function paintRaw(id, value) {
  translatedUi.delete(id);
  $(id).textContent = value;
}
const EDGE_BASE = 'https://speed.cloudflare.com';
const ENDPOINTS = {
  download: `${EDGE_BASE}/__down`,
  upload: `${EDGE_BASE}/__up`,
  localDownload: 'backend/garbage.php',
  localUpload: 'backend/empty.php',
  ping: `${EDGE_BASE}/__down?bytes=0`,
  ip: 'backend/getIP.php',
  counter: 'counter.php',
  share: 'share-result.php'
};
const ATLAS_PROBE = '/speed/probe.txt';
const PROBE_MARKER = 'PITOPONE-SPEED-PROBE';
const MIN_LOADED_SAMPLES = 5;
const LOADED_WARMUP_MS = 500;
const PHASES = [
  {key:'latency', seconds:10, start:0, end:10},
  {key:'singleDl', direction:'download', threads:1, seconds:20, cap:3*1024**3, start:10, end:32},
  {key:'singleUl', direction:'upload', threads:1, seconds:20, cap:1024**3, start:32, end:54},
  {key:'multiDl', direction:'download', threads:16, seconds:20, cap:8*1024**3, start:54, end:76},
  {key:'multiUl', direction:'upload', threads:16, seconds:20, cap:4*1024**3, start:76, end:98}
];
const QUICK_PHASE = {...PHASES[0], seconds:5, end:100};
const FAMILY_HOSTS = {auto:'speed.pitopone.com', ipv4:'speed4.pitopone.com', ipv6:'speed6.pitopone.com'};
const onAtlas = /^\/speed(?:\/|$)/.test(location.pathname);
const latencyScope = onAtlas ? 'probeAtlas' : 'probeCloudflare';
const currentFamily = Object.keys(FAMILY_HOSTS).find(key => FAMILY_HOSTS[key] === location.hostname) || 'auto';
const progressbar = $('progress').parentElement;
const familyButtons = [...$('protocolSelector').querySelectorAll('[data-family]')];
const results = {};
const chartSeries = {dl:[],ul:[],lat:[]};
const liveXhrs = new Set();
const liveControllers = new Set();
const gaugeDisplay = {download:0,upload:0};
const gaugeTarget = {download:0,upload:0};
let running=false, stopped=false, runId=0, startedAt=0, reportBlob=null, reportUrl='';
let connectionAddress = '';
let lastCompletedMode = '';
let currentMode = 'full';
let shareController = null;
let localReportPromise = null;
let activeBoardPhase = '';
let resultSnapshot = null;
function updateResult(mode) {
  resultSnapshot = mode ? {mode,timestamp:new Date().toISOString(),phases:structuredClone(results)} : null;
  document.dispatchEvent(new CustomEvent('speed:result',{detail:structuredClone(resultSnapshot)}));
}
window.SpeedStation = {result:() => structuredClone(resultSnapshot)};

const ASN_DIRECTORY={
  AS3258:{zh:'xTom 日本株式会社',en:'xTom Japan Corporation'}
};

const sleep = ms => new Promise(resolve=>setTimeout(resolve,ms));
const nowSec = () => Math.max(0,(performance.now()-startedAt)/1000);
const mean = values => values.length ? values.reduce((a,b)=>a+b,0)/values.length : 0;
const percentile = (values,p=.9) => {const a=values.filter(Number.isFinite).sort((x,y)=>x-y);return a.length?a[Math.min(a.length-1,Math.max(0,Math.ceil(a.length*p)-1))]:0};
const jitter = values => values.length>1?mean(values.slice(1).map((v,i)=>Math.abs(v-values[i]))):null;
const fmt = value => Number.isFinite(value)?value.toFixed(2):'—';
const nonce = () => Date.now().toString(36)+Math.random().toString(36).slice(2);
const warmedSamples = values => values.slice(Math.min(2,Math.max(0,values.length-1)));

function renderBoard(active=''){
  activeBoardPhase = active;
  const columns=['phase','average','peak','P90','loaded','jitter','probe'].map(name => t(name));
  let html=columns.map(x=>`<div class="v19-cell v19-head">${x}</div>`).join('');
  for (const fullPhase of PHASES) {
    const phase = currentMode === 'quick' && fullPhase.key === 'latency' ? QUICK_PHASE : fullPhase;
    const r = results[phase.key], style = phase.key === active ? 'v19-active' : r ? 'v19-done' : '';
    const latency = phase.key === 'latency';
    const context = [`${phase.seconds} s`];
    if (phase.threads) context.push(t('httpRequests',{n:phase.threads}));
    else context.push(t(latencyScope));
    if (r && phase.threads > 1) context.push(t('effective',{count:`${r.effectiveWorkers}/${phase.threads}`}),t('inFlight',{count:r.peakActiveRequests}));
    html += `<div class="v19-cell v19-phase ${style}">${t(phase.key)}<small>${context.join(' · ')}</small></div>`;
    for (const key of ['avg','peak','p90','loaded','jitter','probe']) {
      let value = '—', unit = latency || ['loaded','jitter'].includes(key) ? 'ms' : 'Mbps', cell = '';
      if (r && key === 'probe') {
        value = latency ? `${fmt(r.loss)} %` : t('probeSamples',{ok:r.probeSuccess,total:r.probeTotal});
        const failures = t('probeFailures',{timeouts:r.probeTimeouts,errors:r.probeErrors});
        unit = latency ? t('failedCount',r) : failures + (r.probeValid ? '' : ' · ' + t('insufficient'));
        cell = latency || (r.probeValid && !r.probeTimeouts && !r.probeErrors) ? 'v19-loss' : 'v19-warn';
      } else if (r) {
        value = Number.isFinite(r[key]) ? fmt(r[key]) : latency && key === 'loaded' ? t('na') : t('insufficient');
        if (!Number.isFinite(r[key])) { unit = ''; cell = 'v19-na'; }
        else if (!latency && ['loaded','jitter'].includes(key) && !r.probeValid) {
          unit += ' · ' + t('sampleCount',{n:r.probeSuccess});cell = 'v19-warn';
        }
      } else if (key === 'probe') unit = '';
      html += `<div class="v19-cell v19-value ${cell} ${style}"><b>${value}</b><small>${unit}</small></div>`;
    }
  }
  $('v19Grid').innerHTML=html;
}

function setProgress(value) {
  const percent = Math.round(Math.max(0,Math.min(100,value)));
  $('progress').style.width = percent + '%';
  progressbar.setAttribute('aria-valuenow', String(percent));
}
function setMetric(id,value,unit='ms'){$(id).innerHTML=fmt(value)+'<small>'+unit+'</small>'}
function paintGauge(direction,shown){const isDl=direction==='download',id=isDl?'dlValue':'ulValue',needleId=isDl?'dlNeedle':'ulNeedle',arcId=isDl?'dlArcPath':'ulArcPath',max=isDl?1000:500;gaugeDisplay[direction]=shown;$(id).textContent=fmt(shown);const ratio=Math.log10(1+9*Math.max(0,Math.min(1,shown/max)));$(needleId).setAttribute('transform',`rotate(${-90+180*ratio} 120 148)`);$(arcId).style.strokeDashoffset=String(301.59*(1-ratio))}
function setGauge(direction,value,immediate=false){gaugeTarget[direction]=Math.max(0,value||0);if(immediate)paintGauge(direction,gaugeTarget[direction])}
let lastGaugeFrame=performance.now();
function animateGauges(now){const dt=Math.min(80,Math.max(0,now-lastGaugeFrame));lastGaugeFrame=now;const alpha=1-Math.exp(-dt/850);for(const direction of ['download','upload']){const current=gaugeDisplay[direction]||0,target=gaugeTarget[direction]||0;if(Math.abs(target-current)>.01)paintGauge(direction,current+(target-current)*alpha)}requestAnimationFrame(animateGauges)}
requestAnimationFrame(animateGauges);
function abortEverything(){stopped=true;for(const xhr of liveXhrs)try{xhr.abort()}catch{};liveXhrs.clear();for(const c of liveControllers)try{c.abort()}catch{};liveControllers.clear()}
function showError(key='',args){paintText('errorBox',key,args);$('errorBox').classList.toggle('show',!!key)}
class MeasurementError extends Error {
  constructor(key,args){super(key);this.args = args;}
}

function normalizeAsn(value){const match=String(value||'').toUpperCase().match(/(?:AS)?\s*(\d+)/);return match?'AS'+match[1]:String(value||'').trim()}
function formatNetwork(data) {
  const embeddedAsn = String(data?.processed || '').match(/\bAS\d+\b/i)?.[0];
  const asn = normalizeAsn(data?.asn || embeddedAsn);
  const known = ASN_DIRECTORY[asn];
  const supplied = String(data?.org || '').replace(/^AS\d+\s*[·\-:]?\s*/i,'').trim();
  const primary = known?.en || supplied;
  return [asn, primary].filter(Boolean).join(' · ') + (known?.zh && known.zh !== primary ? '\n' + known.zh : '') || t('asnUnavailable');
}

async function probeOnce(timeout=1800,phaseSignal){
  const controller = new AbortController();
  const signal = phaseSignal ? AbortSignal.any([phaseSignal,controller.signal]) : controller.signal;
  liveControllers.add(controller);
  const timer = setTimeout(() => controller.abort(),timeout);
  const url = onAtlas ? `${ATLAS_PROBE}?r=${nonce()}` : `${ENDPOINTS.ping}&r=${nonce()}`;
  const start = performance.now();
  try {
    const response = await fetch(url,{cache:'no-store',credentials:'omit',redirect:'error',priority:'high',signal});
    if (!response.ok) throw Error(`HTTP ${response.status}`);
    const body = await response.text();
    if (onAtlas && body.trim() !== PROBE_MARKER) throw Error('Wrong HTTP probe body');
    return {ok:true,ms:performance.now()-start};
  } catch {
    return {ok:false,canceled:phaseSignal?.aborted === true,timeout:controller.signal.aborted};
  } finally {
    clearTimeout(timer);
    liveControllers.delete(controller);
  }
}

async function runLatencyPhase(phase,token){
  const samples=[];let failed=0,total=0;const start=performance.now(),deadline=start+phase.seconds*1000;
  paintText('testStatus',() => currentMode === 'quick' ? t('quickBtn') : t('stageActive',{n:1,phase:t('latency')}));
  paintText('serviceText',() => t('testingHttp',{target:t(latencyScope)}));
  paintRaw('v19Clock',phase.seconds.toFixed(1) + ' s');
  renderBoard(phase.key);
  while(!stopped&&token===runId&&performance.now()<deadline){const tick=performance.now(),p=await probeOnce(1800);total++;if(p.ok){samples.push(p.ms);chartSeries.lat.push({t:nowSec(),v:p.ms});const warmed=warmedSamples(samples);setMetric('pingValue',mean(warmed));setMetric('jitterValue',jitter(warmed));drawChart()}else failed++;const elapsed=performance.now()-start;setProgress(phase.start+(elapsed/(phase.seconds*1000))*(phase.end-phase.start));$('v19Clock').textContent=Math.max(0,(deadline-performance.now())/1000).toFixed(1)+'s';await sleep(Math.max(0,250-(performance.now()-tick)))}
  if(stopped||token!==runId)throw Error('STOPPED');if(samples.length<3)throw new MeasurementError('httpFailed',{ok:samples.length,total});
  const warmed=warmedSamples(samples),httpAvg=mean(warmed);results[phase.key]={avg:httpAvg,peak:Math.max(...warmed),p90:percentile(warmed,.9),loaded:null,httpAvg,jitter:jitter(warmed),loss:total?failed/total*100:0,failed,total,referenceTarget:onAtlas?'Atlas edge HTTP probe':'Cloudflare speed endpoint',warmupDiscarded:samples.length-warmed.length};setMetric('pingValue',httpAvg);setMetric('jitterValue',results[phase.key].jitter);setMetric('lossValue',results[phase.key].loss,'%');paintText('lossCount','failedCount',{failed,total});paintText('serviceText','httpMeasured');renderBoard();return results[phase.key];
}

function markRequestStart(meter,workerId){meter.activeRequests++;meter.peakActiveRequests=Math.max(meter.peakActiveRequests,meter.activeRequests);meter.startedWorkers.add(workerId)}
function markRequestEnd(meter){meter.activeRequests=Math.max(0,meter.activeRequests-1)}

function recordTransferSuccess(meter,requestMb,generation){
  if(generation!==meter.endpointGeneration||requestMb!==meter.blockMb)return;
  meter.consecutiveErrors=0;
  if(meter.warningVisible){showError('');meter.warningVisible=false;paintText('serviceText',meter.endpoint==='same-origin'?'localActive':'recovered',{size:meter.blockMb});}
}
function recordTransferFailure(meter,message,requestMb,generation){
  if(generation!==meter.endpointGeneration)return;
  meter.transferErrors++;if(!meter.firstError)meter.firstError=`${message} @ ${requestMb} MiB`;
  if(requestMb!==meter.blockMb||meter.fatal)return;
  meter.consecutiveErrors++;
  if(meter.consecutiveErrors<3)return;
  const source=meter.endpoint==='cloudflare'?'Cloudflare':'LibreSpeed';
  if(meter.blockMb>16){meter.blockMb=Math.max(16,Math.floor(meter.blockMb/2));meter.endpointGeneration++;meter.consecutiveErrors=0;meter.downgradeCount++;meter.warningVisible=true;showError('retrySize',{source,error:message,size:meter.blockMb});}
  else if(meter.endpoint==='cloudflare'&&!onAtlas){meter.endpoint='same-origin';meter.blockMb=meter.direction==='download'?64:(meter.threads===1?8:4);meter.endpointGeneration++;meter.consecutiveErrors=0;meter.endpointSwitches++;meter.warningVisible=true;showError('localActive');paintText('serviceText','localActive');}
  else {meter.fatal=`${message} @ ${requestMb} MiB`;showError(onAtlas ? 'edgeFailed' : 'allFailed');}
}

async function streamDownload(blockMb,meter,workerId,deadline,token){
  while(!stopped&&!meter.fatal&&!meter.controller.signal.aborted&&token===runId&&performance.now()<deadline&&meter.bytes<meter.cap){
    const controller=new AbortController();liveControllers.add(controller);
    const signal=AbortSignal.any([meter.controller.signal,controller.signal]);
    const timeout = setTimeout(() => controller.abort(), Math.max(1,deadline-performance.now()));
    const requestMb=meter.blockMb,generation=meter.endpointGeneration,endpoint=meter.endpoint;
    markRequestStart(meter,workerId);
    try{
      const url=endpoint==='cloudflare'?`${ENDPOINTS.download}?bytes=${requestMb*1024*1024}&r=${nonce()}`:`${ENDPOINTS.localDownload}?ckSize=${requestMb}&r=${nonce()}`,response=await fetch(url,{cache:'no-store',signal});
      if(!response.ok)throw Error(`HTTP ${response.status}`);if(!response.body)throw Error('HTTP 200 EMPTY BODY');
      const reader=response.body.getReader();let received=false;
      while(!stopped&&generation===meter.endpointGeneration&&token===runId&&performance.now()<deadline&&meter.bytes<meter.cap){
        const {done,value}=await reader.read();if(done)break;
        if(signal.aborted||token!==runId||performance.now()>=deadline||meter.bytes>=meter.cap)break;
        if(value?.byteLength){if(!received){received=true;recordTransferSuccess(meter,requestMb,generation)}meter.bytes+=value.byteLength;meter.workerTotalBytes.set(workerId,(meter.workerTotalBytes.get(workerId)||0)+value.byteLength)}
      }
      if(generation!==meter.endpointGeneration||performance.now()>=deadline||meter.bytes>=meter.cap)controller.abort();else if(received){meter.completed++;const entry=performance.getEntriesByName(url).slice(-1)[0];if(entry?.nextHopProtocol)meter.protocols.add(entry.nextHopProtocol)}
    }catch(error){if(!signal.aborted&&performance.now()<deadline){recordTransferFailure(meter,error?.message||'FETCH ERROR',requestMb,generation);if(!meter.fatal)await sleep(250);}}
    finally{clearTimeout(timeout);markRequestEnd(meter);liveControllers.delete(controller)}
  }
}

function xhrUpload(blockMb,meter,workerId,deadline,token){
  return new Promise(resolve=>{
    if(stopped||meter.fatal||token!==runId||performance.now()>=deadline||meter.bytes>=meter.cap)return resolve();
    const requestMb=meter.blockMb,generation=meter.endpointGeneration,endpoint=meter.endpoint,xhr=new XMLHttpRequest(),url=endpoint==='cloudflare'?`${ENDPOINTS.upload}?r=${nonce()}`:`${ENDPOINTS.localUpload}?r=${nonce()}`;
    liveXhrs.add(xhr);markRequestStart(meter,workerId);let last=0,requestStart=performance.now(),finished=false;
    const progress=event=>{if(generation!==meter.endpointGeneration){try{xhr.abort()}catch{}return}const delta=Math.max(0,event.loaded-last);last=event.loaded;meter.bytes+=delta;meter.workerBytes.set(workerId,(meter.workerBytes.get(workerId)||0)+delta);meter.workerTotalBytes.set(workerId,(meter.workerTotalBytes.get(workerId)||0)+delta)};
    xhr.upload.onprogress=progress;
    xhr.onload=()=>{if(xhr.status<200||xhr.status>=400)recordTransferFailure(meter,`HTTP ${xhr.status}`,requestMb,generation);else{recordTransferSuccess(meter,requestMb,generation);meter.completed++;const entry=performance.getEntriesByName(url).slice(-1)[0];if(entry?.nextHopProtocol)meter.protocols.add(entry.nextHopProtocol)}finish(true)};xhr.onerror=()=>{recordTransferFailure(meter,'NETWORK ERROR',requestMb,generation);finish(true)};xhr.ontimeout=()=>{recordTransferFailure(meter,'REQUEST TIMEOUT',requestMb,generation);finish(true)};xhr.onabort=()=>finish(generation!==meter.endpointGeneration);
    const finish=repeat=>{if(finished)return;finished=true;markRequestEnd(meter);liveXhrs.delete(xhr);const elapsed=Math.max(.001,(performance.now()-requestStart)/1000),bytes=meter.workerBytes.get(workerId)||0;if(bytes>0)meter.workerRates.set(workerId,bytes*8/1e6/elapsed);meter.workerBytes.set(workerId,0);if(repeat&&!stopped&&!meter.fatal&&token===runId&&performance.now()<deadline&&meter.bytes<meter.cap)setTimeout(()=>xhrUpload(meter.blockMb,meter,workerId,deadline,token).then(resolve),250);else resolve()};
    xhr.open('POST',url,true);xhr.timeout=Math.max(2500,deadline-performance.now()+1500);
    try{xhr.send(new Blob([new Uint8Array(requestMb*1024*1024)]))}catch(error){recordTransferFailure(meter,error?.message||'SEND ERROR',requestMb,generation);finish(false)}
  })
}

function startLoadedProbes(meter,deadline,token) {
  const phaseSignal = meter.controller.signal;
  const timeout = Math.max(2500,Math.min(8000,(results.latency?.p90 || 100)*20));
  const open = () => !phaseSignal.aborted && !stopped && !meter.fatal && token===runId &&
    meter.bytes<meter.cap && performance.now()<deadline;
  async function lane(delay) {
    await sleep(LOADED_WARMUP_MS + delay);
    while (open()) {
      const remaining = deadline-performance.now();
      if (remaining < 800) return;
      if (!meter.bytes || !meter.activeRequests) {
        await sleep(100);
        continue;
      }
      const sent = performance.now();
      const probe = await probeOnce(Math.min(timeout,remaining),phaseSignal);
      // Reject late responses after the throughput window has closed. They are
      // explicitly canceled and are not counted as network failures/timeouts.
      if (!open() || probe.canceled) return;
      meter.probeTotal++;
      if (probe.ok) {
        meter.latencies.push({sent,ms:probe.ms});
        chartSeries.lat.push({t:nowSec(),v:probe.ms});
        drawChart();
      } else if (probe.timeout) meter.probeTimeouts++;
      else meter.probeErrors++;
      await sleep(Math.min(350,Math.max(0,deadline-performance.now())));
    }
  }
  return Promise.all([lane(0),lane(325)]);
}

async function runTransferPhase(phase,token){
  performance.clearResourceTimings();const start=performance.now(),deadline=start+phase.seconds*1000,blockMb=phase.direction==='download'?64:(phase.threads===1?8:4),meter={bytes:0,cap:phase.cap,blockMb,direction:phase.direction,threads:phase.threads,controller:new AbortController(),endpoint:'cloudflare',endpointGeneration:0,endpointSwitches:0,consecutiveErrors:0,downgradeCount:0,warningVisible:false,firstError:'',fatal:'',workerBytes:new Map(),workerRates:new Map(),workerTotalBytes:new Map(),startedWorkers:new Set(),activeRequests:0,peakActiveRequests:0,transferErrors:0,completed:0,protocols:new Set(),probeTimeouts:0,probeErrors:0,probeTotal:0,latencies:[]},samples=[];
  const direction=phase.direction,isDl=direction==='download',stateId=isDl?'dlState':'ulState';
  paintText('testStatus',() => t('stageActive',{n:PHASES.indexOf(phase)+1,phase:t(phase.key)}));
  paintText('serviceText',() => t('testing',{phase:t(phase.key)}));
  paintText(stateId,'httpRequests',{n:phase.threads});
  paintRaw('v19Clock',phase.seconds.toFixed(1) + ' s');
  renderBoard(phase.key);
  let lastMeterAt=start,lastMeterBytes=0,lastStatsAt=start,lastStatsBytes=0,lastChartAt=start;
  const meterTimer=setInterval(()=>{const now=performance.now(),deltaBytes=Math.max(0,meter.bytes-lastMeterBytes),deltaSeconds=Math.max(.001,(now-lastMeterAt)/1000),current=deltaBytes*8/1e6/deltaSeconds;lastMeterAt=now;lastMeterBytes=meter.bytes;if(current>0){setGauge(direction,current);if(now-lastChartAt>=500){(isDl?chartSeries.dl:chartSeries.ul).push({t:nowSec(),v:gaugeDisplay[direction]});lastChartAt=now;drawChart()}}if(now-lastStatsAt>=1000){const statsRate=Math.max(0,meter.bytes-lastStatsBytes)*8/1e6/Math.max(.001,(now-lastStatsAt)/1000);if(statsRate>0&&now-start>=2000)samples.push(statsRate);lastStatsAt=now;lastStatsBytes=meter.bytes}const elapsed=now-start;setProgress(phase.start+Math.min(1,elapsed/(phase.seconds*1000))*(phase.end-phase.start));$('v19Clock').textContent=Math.max(0,(deadline-now)/1000).toFixed(1)+'s'},250);
  const workers=Array.from({length:phase.threads},(_,i)=>direction==='download'?streamDownload(blockMb,meter,i,deadline,token):xhrUpload(blockMb,meter,i,deadline,token));
  const probes=startLoadedProbes(meter,deadline,token);
  while(!stopped&&!meter.fatal&&token===runId&&performance.now()<deadline&&meter.bytes<meter.cap)await sleep(100);
  const transferEnd=performance.now();
  meter.controller.abort();
  clearInterval(meterTimer);
  for(const xhr of [...liveXhrs])try{xhr.abort()}catch{};await Promise.allSettled(workers);await probes;
  if(stopped||token!==runId)throw Error('STOPPED');const elapsed=Math.max(.001,(Math.min(transferEnd,deadline)-start)/1000),tailSeconds=Math.max(0,(Math.min(transferEnd,deadline)-lastStatsAt)/1000);if(tailSeconds>=.5){const tailRate=Math.max(0,meter.bytes-lastStatsBytes)*8/1e6/tailSeconds;if(tailRate>0)samples.push(tailRate)}if(meter.fatal)throw new MeasurementError(onAtlas?'edgeFailed':'allFailed');if(meter.bytes<1024*1024||!samples.length)throw new MeasurementError('invalidTransfer',{phase:phase.key,size:(meter.bytes/1024/1024).toFixed(1)});
  const latencySamples=meter.latencies.sort((a,b)=>a.sent-b.sent).map(sample=>sample.ms);
  const probeSuccess=latencySamples.length,probeValid=probeSuccess>=MIN_LOADED_SAMPLES;
  const loaded=probeSuccess?mean(latencySamples):null,loadedJitter=jitter(latencySamples);
  const avg=meter.bytes*8/1e6/elapsed,peak=Math.max(...samples),protocol=[...meter.protocols].join('+')||'browser pool',endpoint=meter.endpoint==='cloudflare'?'Cloudflare Edge':'Pitopone LibreSpeed',effectiveWorkers=[...meter.workerTotalBytes.values()].filter(bytes=>bytes>=1024*1024).length,requiredWorkers=phase.threads,parallelVerified=meter.startedWorkers.size>=requiredWorkers&&meter.peakActiveRequests>=requiredWorkers&&effectiveWorkers>=requiredWorkers;
  results[phase.key]={avg,peak,p90:percentile(samples,.9),loaded,jitter:loadedJitter,probeTimeouts:meter.probeTimeouts,probeErrors:meter.probeErrors,probeTotal:meter.probeTotal,probeSuccess,probeValid,referenceTarget:results.latency.referenceTarget,bytes:meter.bytes,completed:meter.completed,protocol,endpoint,threads:phase.threads,startedWorkers:meter.startedWorkers.size,effectiveWorkers,peakActiveRequests:meter.peakActiveRequests,parallelVerified,transferErrors:meter.transferErrors,downgradeCount:meter.downgradeCount,endpointSwitches:meter.endpointSwitches,blockMb:meter.blockMb};
  setMetric(isDl?'downLoadedValue':'upLoadedValue',loaded);
  const row = results[phase.key];
  setGauge(direction,row.p90);
  const effective = {count:`${effectiveWorkers}/${phase.threads}`};
  const peakRequests = {count:`${meter.peakActiveRequests}/${phase.threads}`};
  paintText(stateId,() => [t('average') + ' ' + fmt(avg),'P90 ' + fmt(row.p90),
    ...(phase.threads>1?[t('effective',effective),t('inFlight',peakRequests),t(parallelVerified?'parallelYes':'parallelNo')]:[t('singleYes')]),
    endpoint,protocol === 'browser pool' ? t('browserPool') : protocol].join(' · '));
  if(phase.threads>1&&!parallelVerified)paintText('serviceText',() => [t(phase.key),t('parallelNo'),t('effective',effective),t('inFlight',peakRequests)].join(' · '));
  renderBoard();return row;
}

function setControlsBusy(busy) {
  $('quickBtn').disabled = busy;
  for (const button of familyButtons) button.disabled = busy || (onAtlas && button.dataset.family !== 'auto');
}

function resetRun(mode) {
  abortEverything();
  shareController?.abort();
  shareController = null;
  stopped = false;
  currentMode = mode;
  lastCompletedMode = '';
  updateResult();
  for (const key of Object.keys(results)) delete results[key];
  for (const values of Object.values(chartSeries)) values.length = 0;
  localReportPromise = null;
  reportBlob = null;
  reportUrl = '';
  $('shareUrl').value = '';
  $('shareLinkField').hidden = true;
  $('openShareBtn').removeAttribute('href');
  $('openShareBtn').setAttribute('aria-disabled','true');
  $('copyShareBtn').disabled = true;
  paintText('copyShareBtn','copyLink');
  $('exportBtn').disabled = true;
  $('downloadShareBtn').disabled = true;
  $('copySummaryBtn').disabled = true;
  paintText('copySummaryBtn','copySummary');
  $('shareCard').classList.remove('ready');
  paintText('shareStatus','shareIntro');
  paintText('dlState','waitingFull');
  paintText('ulState','waitingFull');
  showError();
  setGauge('download',0,true);
  setGauge('upload',0,true);
  for (const id of ['pingValue','jitterValue','downLoadedValue','upLoadedValue']) setMetric(id,null);
  setMetric('lossValue',null,'%');
  paintText('lossCount','waitingSamples');
  setProgress(0);
  renderBoard();
  drawChart();
}

async function startTest(mode = 'full') {
  if (running) return;
  resetRun(mode);
  running = true;
  const token = ++runId;
  startedAt = performance.now();
  paintText('startBtn','stopBtn');
  $('startBtn').classList.add('running');
  setControlsBusy(true);
  try {
    for (const phase of mode === 'quick' ? [QUICK_PHASE] : PHASES) {
      if (phase.key === 'latency') await runLatencyPhase(phase,token);
      else await runTransferPhase(phase,token);
    }
    const latency = results.latency;
    const complete = mode === 'full';
    const verified = results.multiDl?.parallelVerified && results.multiUl?.parallelVerified;
    setMetric('lossValue',latency.loss,'%');
    paintText('lossCount','failedCount',latency);
    paintText('testStatus',complete ? 'fullDone' : 'quickDone');
    paintText('serviceText',complete ? (verified ? 'fullVerified' : 'fullUnverified') : 'quickHelp');
    paintText('v19Clock','done');
    setProgress(100);
    lastCompletedMode = mode;
    updateResult(mode);
    $('copySummaryBtn').disabled = false;
    if (onAtlas) {
      $('shareCard').classList.add('ready');
      paintText('shareStatus',complete ? 'shareFull' : 'shareQuick');
      $('exportBtn').disabled = false;
    }
    if (complete) {
      $('shareCard').classList.add('ready');
      if (!onAtlas) paintText('shareStatus','shareFull');
      $('exportBtn').disabled = false;
      $('downloadShareBtn').disabled = false;
      if (!onAtlas) void registerCounter();
    }
  } catch (error) {
    const canceled = error.message === 'STOPPED';
    if (!canceled) {
      if (error.message === 'invalidTransfer') {
        paintText('errorBox',() => t('invalidTransfer',{...error.args,phase:t(error.args.phase)}));
        $('errorBox').classList.add('show');
      } else showError(error instanceof MeasurementError ? error.message : 'incomplete',error.args);
    }
    paintText('testStatus',canceled ? 'stopped' : 'incomplete');
    paintText('serviceText',canceled ? 'stopped' : 'incomplete');
    paintText('v19Clock',canceled ? 'stopped' : 'incomplete');
    renderBoard();
  } finally {
    running = false;
    abortEverything();
    paintText('startBtn','startBtn');
    $('startBtn').classList.remove('running');
    setControlsBusy(false);
  }
}

async function registerCounter(){try{const response=await fetch(ENDPOINTS.counter,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({event_id:crypto.randomUUID?.()||nonce()})});const data=await response.json();if(data.ok){$('totalTests').textContent=data.total;$('todayTests').textContent=data.today;paintText('rankMessage','counterRank',{n:data.rank});}}catch{}}
async function loadCounter(){try{const r=await fetch(`${ENDPOINTS.counter}?r=${nonce()}`,{cache:'no-store'}),d=await r.json();if(d.ok){$('totalTests').textContent=d.total;$('todayTests').textContent=d.today;paintText('rankMessage','counterNote');}}catch{}}

function drawChart(){const c=$('chart'),dpr=devicePixelRatio||1,w=c.clientWidth||800,h=c.clientHeight||180;if(c.width!==Math.round(w*dpr)||c.height!==Math.round(h*dpr)){c.width=Math.round(w*dpr);c.height=Math.round(h*dpr)}const x=c.getContext('2d');x.setTransform(dpr,0,0,dpr,0,0);x.clearRect(0,0,w,h);const pad={l:48,r:45,t:12,b:24},pw=w-pad.l-pad.r,ph=h-pad.t-pad.b,maxT=currentMode==='quick'?5:90,speedMax=Math.max(100,percentile([...chartSeries.dl,...chartSeries.ul].map(p=>p.v),.98)*1.15),latMax=Math.max(100,percentile(chartSeries.lat.map(p=>p.v),.98)*1.2);x.strokeStyle='rgba(176,180,228,.16)';x.fillStyle='#a3aecb';x.font='9px sans-serif';for(let i=0;i<=4;i++){const y=pad.t+ph*i/4;x.beginPath();x.moveTo(pad.l,y);x.lineTo(w-pad.r,y);x.stroke();x.textAlign='right';x.fillText(Math.round(speedMax*(1-i/4)),pad.l-6,y+3);x.textAlign='left';x.fillText(Math.round(latMax*(1-i/4)),w-pad.r+6,y+3)}for(let i=0;i<=5;i++){const px=pad.l+pw*i/5;x.beginPath();x.moveTo(px,pad.t);x.lineTo(px,pad.t+ph);x.stroke();x.textAlign='center';x.fillText(Math.round(maxT*i/5)+'s',px,h-7)}const plot=(data,color,max)=>{if(!data.length)return;x.beginPath();data.forEach((p,i)=>{const px=pad.l+Math.min(1,p.t/maxT)*pw,py=pad.t+ph-Math.min(1,p.v/max)*ph;i?x.lineTo(px,py):x.moveTo(px,py)});x.strokeStyle=color;x.lineWidth=2.4;x.lineJoin='round';x.stroke()};plot(chartSeries.dl,'#baa7ff',speedMax);plot(chartSeries.ul,'#69e1db',speedMax);plot(chartSeries.lat,'#f4bb79',latMax)}

function normalizeIp(value) {
  const host = typeof value === 'string' ? value.trim() : '';
  if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)) {
    const octets = host.split('.').map(Number);
    return octets.every(part => part <= 255) ? octets.join('.') : '';
  }
  if (!host.includes(':') || !/^[0-9a-f:.]+$/i.test(host)) return '';
  try { return new URL('http://[' + host + ']').hostname.slice(1,-1); }
  catch { return ''; }
}

function parseConnection(text) {
  let data;
  try { data = JSON.parse(text); }
  catch { return {ip:normalizeIp(text)}; }
  if (typeof data === 'string') return {ip:normalizeIp(data)};
  if (!data || typeof data !== 'object') return {ip:''};
  const raw = data.rawIspInfo || data.raw || {};
  const clean = value => typeof value === 'string' ? value.trim().slice(0,160) : '';
  const processed = clean(data.processedString || data.processed);
  return {
    ip: [raw.ip, data.ip, ...processed.split(/\s+/).slice(0,3)].map(normalizeIp).find(Boolean) || '',
    country: clean(raw.country_code || raw.country || data.country),
    city: clean(raw.city || data.city),
    org: clean(raw.org || raw.asn?.name || raw.as_name || data.org || data.isp),
    asn: raw.asn?.asn || raw.asn || data.asn,
    processed
  };
}

async function detectAtlasConnection() {
  try {
    const trace = await readText('/cdn-cgi/trace',4500);
    const match = key => new RegExp('^' + key + '=([^\\r\\n]+)$','m').exec(trace)?.[1] || '';
    connectionAddress = normalizeIp(match('ip'));
    const country = /^[A-Z]{2}$/.test(match('loc')) ? match('loc') : '';
    const edge = /^[A-Z0-9]{3,5}$/.test(match('colo')) ? match('colo') : '';
    paintRaw('currentIp',connectionAddress || '—');
    if (connectionAddress) paintRaw('currentProtocol',connectionAddress.includes(':') ? 'IPv6' : 'IPv4');
    else paintText('currentProtocol','auto');
    paintRaw('countryChip',country || '—');
    paintRaw('location',country || '—');
    paintRaw('topColo',edge || '—');
    if (edge) paintRaw('serverInfo','Cloudflare ' + edge);
    else paintText('serverInfo','edgeAuto');
    $('autoChip').classList.toggle('ok', Boolean(connectionAddress));
    document.dispatchEvent(new CustomEvent('speed:connection',{detail:{ip:connectionAddress,country,pop:edge}}));
  } catch {
    for (const id of ['currentIp','location','topColo']) paintText(id,'unavailable');
    paintText('currentProtocol','auto');
    document.dispatchEvent(new CustomEvent('speed:connection',{detail:{ip:'',country:'',pop:''}}));
  }
  paintText('autoChip','autoEntry');
}

async function readText(url,timeout) {
  const response = await fetch(url,{cache:'no-store',signal:AbortSignal.timeout(timeout)});
  if (!response.ok) throw Error('HTTP ' + response.status);
  return response.text();
}

async function detectIdentity() {
  try {
    const text = await readText(ENDPOINTS.ip + '?isp=true&cors=true&r=' + nonce(),4500);
    const data = parseConnection(text);
    connectionAddress = data.ip;
    paintRaw('currentIp',data.ip || '—');
    paintRaw('location',[data.city,data.country].filter(Boolean).join(', ') || '—');
    paintText('network',() => formatNetwork(data));
    if (data.country) {
      paintRaw('countryChip',data.country);
      $('countryChip').classList.add('ok');
    }
  } catch {
    for (const id of ['currentIp','location','network','countryChip']) paintText(id,'unavailable');
  }
  const family = connectionAddress ? (connectionAddress.includes(':') ? 'IPv6' : 'IPv4') : '';
  const entrance = {auto:'autoEntry',ipv4:'fixed4',ipv6:'fixed6'}[currentFamily];
  if (family) paintRaw('currentProtocol',family);
  else paintText('currentProtocol',entrance);
  paintText('autoChip',entrance);
  $('autoChip').classList.toggle('ok', Boolean(connectionAddress));
}

async function detectEdge() {
  try {
    const trace = await readText(EDGE_BASE + '/cdn-cgi/trace?r=' + nonce(),4500);
    const edge = /^colo=([A-Z0-9]{3,5})$/m.exec(trace)?.[1];
    if (!edge) throw Error('No edge code');
    paintRaw('topColo',edge);
    paintRaw('serverInfo','Cloudflare ' + edge);
  } catch {
    paintText('topColo','unavailable');
    paintText('serverInfo','edgeAuto');
  }
}

async function detectFamily(family) {
  const card = $(family + 'Card');
  const info = family + 'Info';
  card.classList.remove('ok','bad');
  try {
    const text = await readText('https://' + FAMILY_HOSTS[family] + '/' + ENDPOINTS.ip + '?cors=true&r=' + nonce(),3500);
    const ip = parseConnection(text).ip;
    if (!ip || ip.includes(':') !== (family === 'ipv6')) throw Error('Unexpected address');
    card.classList.add('ok');
    paintRaw(info,ip);
  } catch {
    card.classList.add('bad');
    paintText(info,'unreachable');
  }
}

function maskPublicIp(value) {
  const ip = normalizeIp(value);
  if (!ip) return '—';
  if (ip.includes('.')) return ip.split('.').slice(0,2).join('.') + '.*.*';
  const [head,tail] = ip.split('::');
  const leading = head ? head.split(':') : [];
  const trailing = tail ? tail.split(':') : [];
  const groups = ip.includes('::') ? [...leading,...Array(8-leading.length-trailing.length).fill('0'),...trailing] : leading;
  return groups.slice(0,3).join(':') + '::/48';
}

function createReport(resultImageUrl=''){
  return new Promise(resolve=>{
    const c=document.createElement('canvas');c.width=2400;c.height=1260;const x=c.getContext('2d');x.scale(2,2);
    const panel=(px,py,pw,ph,fill='#081a2a',stroke='rgba(96,177,224,.25)')=>{x.fillStyle=fill;x.fillRect(px,py,pw,ph);x.strokeStyle=stroke;x.lineWidth=1;x.strokeRect(px+.5,py+.5,pw-1,ph-1)};
    const fit=(text,maxWidth,startSize=13,weight=700)=>{let size=startSize;do{x.font=`${weight} ${size}px "Microsoft YaHei UI",sans-serif`;if(x.measureText(text).width<=maxWidth)return size;size--}while(size>8);return size};
    const ellipsis=(text,maxWidth)=>{const raw=String(text||'');if(x.measureText(raw).width<=maxWidth)return raw;let lo=0,hi=raw.length;while(lo<hi){const mid=Math.ceil((lo+hi)/2);if(x.measureText(raw.slice(0,mid)+'…').width<=maxWidth)lo=mid;else hi=mid-1}return raw.slice(0,lo)+'…'};
    const bg=x.createLinearGradient(0,0,1200,630);bg.addColorStop(0,'#080a15');bg.addColorStop(.5,'#17142c');bg.addColorStop(1,'#122631');x.fillStyle=bg;x.fillRect(0,0,1200,630);
    const glow=x.createRadialGradient(995,78,0,995,78,330);glow.addColorStop(0,'rgba(255,143,55,.32)');glow.addColorStop(.46,'rgba(29,169,240,.12)');glow.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=glow;x.fillRect(600,0,600,330);
    x.strokeStyle='rgba(83,163,213,.11)';for(let i=0;i<1200;i+=32){x.beginPath();x.moveTo(i,0);x.lineTo(i,630);x.stroke()}for(let i=0;i<630;i+=32){x.beginPath();x.moveTo(0,i);x.lineTo(1200,i);x.stroke()}
    x.fillStyle='#baa7ff';x.fillRect(0,0,600,6);x.fillStyle='#69e1db';x.fillRect(600,0,600,6);
    const title = t('reportTitle');
    x.fillStyle='#f4faff';fit(title,850,29,900);x.fillText(title,38,49);
    x.fillStyle='#61d7ff';x.font='800 10px sans-serif';x.fillText('PITOPONE / NETWORK QUALITY',40,69);
    x.fillStyle='#8faabd';x.font='700 10px sans-serif';x.fillText(t('reportSubtitle'),40,84);
    x.textAlign='right';x.fillStyle='#e2edf4';x.font='700 13px sans-serif';
    const tested = resultSnapshot ? new Date(resultSnapshot.timestamp) : new Date();
    x.fillText(tested.toLocaleString(window.SpeedLocale?.localeTag,{hour12:false}),1160,47);
    x.fillStyle='#6f8da2';x.font='700 10px sans-serif';x.fillText(location.host + (onAtlas ? '/speed/' : '/'),1160,67);x.textAlign='left';
    const badges = [[latencyScope,'#403369'],[onAtlas?'reportEndpoint':'reportDual','#365263'],['reportParallel','#26494b']];
    badges.forEach(([key,color],i)=>{const px=40+i*373;panel(px,97,366,35,color,'rgba(255,255,255,.13)');x.fillStyle='#eef8fe';x.font='800 11px sans-serif';x.fillText(t(key),px+14,119);});
    const cols=[40,292,436,580,724,868,1012],widths=[252,144,144,144,144,144,148];
    ['phase','average','peak','P90','loaded','jitter','probe'].forEach((key,i)=>{panel(cols[i],140,widths[i]-5,30,'#0f2a3d');x.fillStyle='#8eacbf';x.font='800 9px sans-serif';x.fillText(t(key),cols[i]+10,159);});
    PHASES.forEach((phase,row)=>{
      const r=results[phase.key], y=174+row*58, latency=phase.key==='latency';
      panel(40,y,1120,53,row%2?'rgba(6,22,36,.94)':'rgba(9,29,46,.94)');
      x.fillStyle='#f0f7fb';x.font='800 13px sans-serif';x.fillText(ellipsis(t(phase.key),224),51,y+21);
      x.fillStyle='#8aa1b4';x.font='700 8px sans-serif';
      const context = [`${phase.seconds} s`];
      if (r?.endpoint) context.push(r.endpoint);
      if (r && !latency) context.push(t('effective',{count:`${r.effectiveWorkers}/${r.threads}`}),t('inFlight',{count:r.peakActiveRequests}));
      x.fillText(ellipsis(context.join(' · '),224),51,y+39);
      ['avg','peak','p90','loaded','jitter'].forEach((key,i)=>{
        const value = r?.[key], shown = Number.isFinite(value) ? fmt(value) : latency && key==='loaded' ? t('na') : '—';
        x.fillStyle='#eef7fc';x.font='800 18px sans-serif';x.fillText(shown,cols[i+1]+10,y+24);
        if (!Number.isFinite(value)) return;
        x.fillStyle='#8aa1b4';x.font='700 8px sans-serif';
        const loadCell=['loaded','jitter'].includes(key);
        const unit=latency||loadCell?'ms':'Mbps';
        x.fillText(!latency&&loadCell&&!r.probeValid?unit+' · '+t('sampleCount',{n:r.probeSuccess}):unit,cols[i+1]+10,y+41);
      });
      x.fillStyle=latency||r?.probeValid?'#69e1db':'#ffca55';x.font='800 18px sans-serif';
      x.fillText(latency?`${fmt(r?.loss)} %`:`${r?.probeSuccess ?? '—'}/${r?.probeTotal ?? '—'}`,cols[6]+10,y+24);
      x.fillStyle='#8aa1b4';x.font='700 8px sans-serif';
      x.fillText(ellipsis(latency?t('failedCount',r):t('probeFailures',{timeouts:r?.probeTimeouts ?? '—',errors:r?.probeErrors ?? '—'}),124),cols[6]+10,y+41);
    });
    panel(40,472,1120,121,'rgba(7,25,40,.96)','rgba(75,190,242,.35)');
    x.fillStyle='#69e1db';x.font='900 10px sans-serif';x.fillText(t('connectionReport'),53,491);
    const field=(key,value,px,py,max)=>{x.fillStyle='#8aa1b4';x.font='800 8px sans-serif';x.fillText(t(key),px,py);x.fillStyle='#edf7fc';fit(value,max,13,800);x.fillText(ellipsis(value,max),px,py+18);};
    const textContent = id => $(id).textContent || '—';
    field('publicIp',maskPublicIp(connectionAddress),53,510,280);field('protocol',textContent('currentProtocol'),350,510,300);
    field('location',textContent('location'),665,510,205);field('edge',textContent('serverInfo'),885,510,260);
    const [network,...rest] = textContent('network').split('\n');
    field('network',network,53,553,1080);
    if (rest.length) {x.fillStyle='#8eb2c7';fit(rest[0],1080,11,700);x.fillText(ellipsis(rest[0],1080),53,585);}
    const reference = resultImageUrl ? t('reportImage') + ' · ' + resultImageUrl : t('reportLocal');
    x.fillStyle='#69e1db';fit(reference,790,9,800);x.fillText(reference,40,606);
    x.fillStyle='#8aa1b4';x.font='700 7.5px sans-serif';x.fillText(t('reportFooter'),40,619);
    x.textAlign='right';x.fillStyle='#69e1db';x.font='800 9px sans-serif';x.fillText('2400 × 1260 · ' + t('masked'),1160,619);x.textAlign='left';c.toBlob(resolve,'image/png');
  })
}
const encodeReportMeta=value=>{const bytes=new TextEncoder().encode(String(value||'—'));let binary='';for(const byte of bytes)binary+=String.fromCharCode(byte);return btoa(binary)};
const createShareId=()=>{const date=new Date(),ymd=[date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join(''),bytes=crypto.getRandomValues(new Uint8Array(7)),hex=[...bytes].map(value=>value.toString(16).padStart(2,'0')).join('');return`sp-${ymd}-${hex}`};
async function publishReport() {
  if (onAtlas) { showAtlasShare(); return; }
  if (lastCompletedMode !== 'full' || shareController) return;
  const token = runId;
  const controller = new AbortController();
  shareController = controller;
  $('exportBtn').disabled = true;
  paintText('shareStatus','publishBusy');
  try {
    const resultId = createShareId();
    const plannedUrl = new URL('/result/' + resultId + '.png',location.origin).href;
    const blob = await createReport(plannedUrl);
    if (!blob) throw Error('PNG unavailable');
    if (token !== runId) return;
    const headers = {
      'Content-Type':'image/png', 'X-Result-Version':'21.3.1', 'X-Result-Id':resultId,
      'X-Result-IP':encodeReportMeta(maskPublicIp(connectionAddress)),
      'X-Result-Protocol':encodeReportMeta($('currentProtocol').textContent),
      'X-Result-Location':encodeReportMeta($('location').textContent),
      'X-Result-ASN':encodeReportMeta($('network').textContent)
    };
    const response = await fetch(ENDPOINTS.share,{method:'POST',headers,body:blob,signal:AbortSignal.any([controller.signal,AbortSignal.timeout(12000)])});
    const data = await response.json();
    if (!response.ok || !data.ok || typeof data.url !== 'string') throw Error('Upload failed');
    if (token !== runId) return;
    const image = new URL(data.url,location.origin);
    const page = new URL(data.page_url || data.url,location.origin);
    const allowed = url => (url.origin === location.origin ||
      (url.protocol === 'https:' && !url.port && Object.values(FAMILY_HOSTS).includes(url.hostname))) && !url.username && !url.password;
    if (!allowed(image) || !allowed(page)) throw Error('Unexpected result URL');
    reportUrl = image.href;
    $('shareUrl').value = reportUrl;
    $('shareLinkField').hidden = false;
    $('openShareBtn').href = page.href;
    $('openShareBtn').removeAttribute('aria-disabled');
    $('copyShareBtn').disabled = false;
    paintText('shareStatus','publishDone');
  } catch {
    if (token === runId) paintText('shareStatus','publishFailed');
  } finally {
    if (shareController === controller) shareController = null;
    if (token === runId) $('exportBtn').disabled = false;
  }
}

async function downloadReport() {
  if (lastCompletedMode !== 'full') return;
  const token = runId;
  const button = $('downloadShareBtn');
  button.disabled = true;
  try {
    localReportPromise ||= createReport();
    const blob = await localReportPromise;
    if (token !== runId) return;
    if (!blob) throw Error('PNG unavailable');
    reportBlob = blob;
    const href = URL.createObjectURL(reportBlob);
    const anchor = document.createElement('a');
    anchor.href = href;
    anchor.download = 'Pitopone_Network_' + new Date().toISOString().slice(0,10) + '.png';
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(href),60000);
  } catch {
    if (token === runId) {
      localReportPromise = null;
      paintText('shareStatus','pngFailed');
    }
  } finally {
    if (token === runId) button.disabled = false;
  }
}

function buildSummary(includeIp = true) {
  const latency = results.latency;
  if (!latency || !lastCompletedMode) return '';
  const lines = [
    'PITOPONE ' + t('title') + ' · ' + t(lastCompletedMode === 'full' ? 'fullSummary' : 'quickSummary'),
    latencySummary(latency.avg,latency.jitter,latency.failed,latency.total,latencyScope)
  ];
  if (lastCompletedMode === 'full') {
    lines.push(...transferSummary(results.singleDl.avg,results.singleUl.avg,results.multiDl.avg,results.multiUl.avg,
      results.multiDl.loaded,results.multiUl.loaded,results.multiDl.effectiveWorkers,results.multiUl.effectiveWorkers));
  }
  if (includeIp) lines.push(t('publicIp') + ' ' + maskPublicIp(connectionAddress) + ' · ' + $('currentProtocol').textContent);
  return lines.join('\n');
}

function latencySummary(latency,jitterMs,failed,total,target) {
  return `${t(target)} ${fmt(latency)} ms · ${t('jitter')} ${fmt(jitterMs)} ms · ${t('failedCount',{failed,total})}`;
}
function transferSummary(singleDl,singleUl,multiDl,multiUl,loadedDl,loadedUl,workersDl,workersUl) {
  return [
    `${t('singleDu')} ${fmt(singleDl)} / ${fmt(singleUl)} Mbps`,
    `${t('parallelDu')} ${fmt(multiDl)} / ${fmt(multiUl)} Mbps`,
    `${t('loadedDu')} ${fmt(loadedDl)} / ${fmt(loadedUl)} ms`,
    `${t('effectiveDu')} ${workersDl}/16 · ${workersUl}/16`
  ];
}

// The fragment stores a compact numerical snapshot. Visitors may change fragments,
// so validate ranges and construct display text independently of fragment content.
const shareMetrics = ['avg','jitter','failed','total'];
const transferKeys = ['singleDl','singleUl','multiDl','multiUl'];
const transferMetrics = ['avg','loaded','effectiveWorkers'];
const compactNumber = value => Number.isFinite(value) ? Math.round(value*100)/100 : null;

function atlasShareSnapshot() {
  const data = [2, lastCompletedMode === 'full' ? 1 : 0, ...shareMetrics.map(key => compactNumber(results.latency[key]))];
  if (data[1]) for (const direction of transferKeys) data.push(...transferMetrics.map(key => compactNumber(results[direction][key])));
  return data;
}

function readAtlasShare() {
  const match = /^#result=([0-9.,\[\]nuld]{12,240})$/.exec(location.hash);
  if (!match) return '';
  let data;
  try { data = JSON.parse(match[1]); } catch { return ''; }
  if (!Array.isArray(data)) return '';
  const [version,full,latency,jitterMs,failed,total] = data;
  const number = (value,max) => Number.isFinite(value) && value >= 0 && value <= max;
  const nullable = (value,max) => value === null || number(value,max);
  if (![1,2].includes(version) || ![0,1].includes(full) || data.length !== (full ? 18 : 6) ||
    !number(latency,120000) || !nullable(jitterMs,120000) || !Number.isInteger(failed) ||
    !Number.isInteger(total) || total < 1 || total > 500 || failed < 0 || failed > total) return '';
  const target = version === 2 ? 'probeAtlas' : 'probeCloudflare';
  const lines = [t(full ? 'sharedFull' : 'sharedQuick'),latencySummary(latency,jitterMs,failed,total,target)];
  if (full) {
    for (let offset = 6; offset < data.length; offset += 3) {
      if (!number(data[offset],10000000) || !nullable(data[offset+1],120000) ||
        !Number.isInteger(data[offset+2]) || !number(data[offset+2],offset>=12?16:1)) return '';
    }
    lines.push(...transferSummary(data[6],data[9],data[12],data[15],data[13],data[16],data[14],data[17]));
  }
  return lines.join('\n');
}

function renderAtlasShare() {
  const text = readAtlasShare();
  $('sharedSummary').textContent = text;
  $('sharedReport').hidden = !text;
}

function showAtlasShare() {
  if (!lastCompletedMode || !results.latency) return;
  const url = new URL('/speed/',location.origin);
  if (window.SpeedLocale?.locale) url.searchParams.set('lang',window.SpeedLocale.locale);
  url.hash = 'result=' + JSON.stringify(atlasShareSnapshot());
  reportUrl = url.href;
  $('shareUrl').value = reportUrl;
  $('shareLinkField').hidden = false;
  $('openShareBtn').href = reportUrl;
  $('openShareBtn').removeAttribute('aria-disabled');
  $('copyShareBtn').disabled = false;
  paintText('shareStatus','linkReady');
}

async function copyText(button,text,labelKey) {
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    paintText(button.id,'copied');
    const copyState = translatedUi.get(button.id);
    setTimeout(() => { if (translatedUi.get(button.id) === copyState) paintText(button.id,labelKey); },2200);
  } catch {
    if (button === $('copyShareBtn')) $('shareUrl').select();
    showError('clipboardError');
  }
}

function selectFamily(family) {
  const host = FAMILY_HOSTS[family];
  if (onAtlas || running || !host || host === location.hostname) return;
  const target = new URL(location.href);
  target.hostname = host;
  location.assign(target);
}

for (const button of familyButtons) {
  const selected = button.dataset.family === currentFamily;
  button.classList.toggle('active',selected);
  button.setAttribute('aria-pressed',String(selected));
  button.addEventListener('click',() => selectFamily(button.dataset.family));
}
$('protocolSelector').classList.remove('checking');
$('startBtn').addEventListener('click',() => { if (running) abortEverything(); else void startTest(); });
$('quickBtn').addEventListener('click',() => startTest('quick'));
$('exportBtn').addEventListener('click',publishReport);
$('downloadShareBtn').addEventListener('click',downloadReport);
$('copySummaryBtn').addEventListener('click',() => copyText($('copySummaryBtn'),buildSummary(),'copySummary'));
$('copyShareBtn').addEventListener('click',() => copyText($('copyShareBtn'),reportUrl,'copyLink'));
$('openShareBtn').addEventListener('click',event => { if (!reportUrl) event.preventDefault(); });
addEventListener('resize',drawChart);
for (const [id,key] of Object.entries({startBtn:'startBtn',testStatus:'ready',serviceText:'edgeNet',
  dlState:'waitingFull',ulState:'waitingFull',v19Clock:'waitingTest',topColo:'detecting',autoChip:'detecting',
  ipv4Info:'detecting',ipv6Info:'detecting',shareStatus:'shareIntro',copySummaryBtn:'copySummary',copyShareBtn:'copyLink',copySharedSummaryBtn:'copySummary'})) {
  if ($(id)) paintText(id,key);
}
document.addEventListener('speed:locale',() => {
  for (const draw of translatedUi.values()) draw();
  renderBoard(activeBoardPhase);
  drawChart();
  if (onAtlas) {
    for (const button of familyButtons) if (button.dataset.family !== 'auto') button.title = t('legacyFamilyTip');
    renderAtlasShare();
  }
  localReportPromise = null;
});
document.addEventListener('speed:network',() => { localReportPromise = null; });
setProgress(0);
renderBoard();
drawChart();
if (onAtlas) {
  $('counterCard').hidden = true;
  for (const button of familyButtons) {
    if (button.dataset.family === 'auto') continue;
    button.title = t('legacyFamilyTip');
  }
  setControlsBusy(false);
  renderAtlasShare();
  addEventListener('hashchange',renderAtlasShare);
  $('copySharedSummaryBtn')?.addEventListener('click',() => copyText($('copySharedSummaryBtn'),$('sharedSummary').textContent,'copySummary'));
  detectAtlasConnection();
} else {
  loadCounter();
  detectIdentity();
  detectEdge();
}
detectFamily('ipv4');
detectFamily('ipv6');

})();
