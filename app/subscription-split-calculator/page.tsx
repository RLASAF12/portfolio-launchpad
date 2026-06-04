'use client';
import { useState, useEffect, useMemo } from 'react';
import SubpageNav from '../components/SubpageNav';

const MODELS: Record<string, { label: string; inputPer1M: number; outputPer1M: number }> = {
  'haiku': { label: 'Claude 3.5 Haiku', inputPer1M: 0.80, outputPer1M: 4.00 },
  'sonnet': { label: 'Claude Sonnet 4', inputPer1M: 3.00, outputPer1M: 15.00 },
  'opus': { label: 'Claude Opus 4', inputPer1M: 15.00, outputPer1M: 75.00 },
};

const PLANS: Record<string, { label: string; price: number | null }> = {
  'pro': { label: 'Pro — $20/mo', price: 20 },
  'team': { label: 'Team — $25/seat/mo', price: 25 },
  'enterprise': { label: 'Enterprise', price: null },
};

function useCountdown(target: Date) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds, isPast: diff <= 0 };
}

export default function SubscriptionSplitCalculatorPage() {
  const countdown = useCountdown(new Date('2026-06-15T00:00:00Z'));
  const [sessionsPerDay, setSessionsPerDay] = useState(5);
  const [avgSessionMin, setAvgSessionMin] = useState(30);
  const [apiCallsPerDay, setApiCallsPerDay] = useState(200);
  const [avgInputTokens, setAvgInputTokens] = useState(1500);
  const [avgOutputTokens, setAvgOutputTokens] = useState(500);
  const [model, setModel] = useState('sonnet');
  const [plan, setPlan] = useState('pro');
  const [checks, setChecks] = useState([false, false, false, false, false]);

  const results = useMemo(() => {
    const avgTokensPerSession = 4000;
    const monthlyInteractiveTokens = sessionsPerDay * avgSessionMin * (avgTokensPerSession / 30) * 30;
    const monthlyApiInputTokens = apiCallsPerDay * avgInputTokens * 30;
    const monthlyApiOutputTokens = apiCallsPerDay * avgOutputTokens * 30;
    const totalApiTokens = monthlyApiInputTokens + monthlyApiOutputTokens;
    const totalTokens = monthlyInteractiveTokens + totalApiTokens;
    const interactivePct = totalTokens > 0 ? Math.round((monthlyInteractiveTokens / totalTokens) * 100) : 50;
    const apiPct = 100 - interactivePct;
    const m = MODELS[model];
    const monthlyApiCost = (monthlyApiInputTokens / 1_000_000) * m.inputPer1M + (monthlyApiOutputTokens / 1_000_000) * m.outputPer1M;
    return { monthlyInteractiveTokens, monthlyApiInputTokens, monthlyApiOutputTokens, totalApiTokens, interactivePct, apiPct, monthlyApiCost };
  }, [sessionsPerDay, avgSessionMin, apiCallsPerDay, avgInputTokens, avgOutputTokens, model]);

  const toggleCheck = (i: number) => { setChecks(prev => { const n = [...prev]; n[i] = !n[i]; return n; }); };

  const fmt = (n: number) => {
    if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + 'B';
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
    if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
    return n.toString();
  };

  const checklist = [
    'Review current API usage in Anthropic dashboard',
    'Export usage data for the last 3 months',
    'Decide primary pool allocation (interactive vs programmatic)',
    'Set up billing alerts for each credit pool',
    'Communicate changes to your team',
  ];

  return (
    <>
      <SubpageNav title="Subscription Split Calculator" />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .ssc-wrap { max-width: 880px; margin: 0 auto; padding: 32px 20px 80px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .ssc-hero { text-align: center; margin-bottom: 40px; }
        .ssc-hero h1 { font-size: 28px; font-weight: 700; color: #fff; margin-bottom: 8px; }
        .ssc-hero p { color: #888; font-size: 14px; line-height: 1.5; max-width: 540px; margin: 0 auto; }
        .ssc-countdown { display: flex; justify-content: center; gap: 16px; margin: 24px 0; }
        .ssc-cd-unit { text-align: center; }
        .ssc-cd-num { font-size: 36px; font-weight: 700; color: #00ff88; font-variant-numeric: tabular-nums; }
        .ssc-cd-num.urgent { color: #ff4444; }
        .ssc-cd-label { font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 2px; }
        .ssc-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-top: 12px; }
        .ssc-badge.red { background: rgba(255,68,68,0.15); color: #ff4444; border: 1px solid rgba(255,68,68,0.3); }
        .ssc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 28px; }
        @media (max-width: 640px) { .ssc-grid { grid-template-columns: 1fr; } }
        .ssc-card { background: #111; border: 1px solid #222; border-radius: 12px; padding: 24px; }
        .ssc-card h3 { font-size: 14px; color: #00ff88; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 16px; }
        .ssc-field { margin-bottom: 14px; }
        .ssc-field label { display: block; font-size: 13px; color: #999; margin-bottom: 6px; }
        .ssc-field input, .ssc-field select { width: 100%; background: #0a0a0a; border: 1px solid #333; border-radius: 8px; padding: 10px 12px; color: #fff; font-size: 14px; outline: none; }
        .ssc-field input:focus, .ssc-field select:focus { border-color: #00ff88; }
        .ssc-field select { cursor: pointer; }
        .ssc-results { background: #111; border: 1px solid #222; border-radius: 12px; padding: 28px; margin-bottom: 28px; }
        .ssc-results h3 { font-size: 14px; color: #00ff88; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 20px; }
        .ssc-split-bar { height: 32px; border-radius: 8px; overflow: hidden; display: flex; margin-bottom: 20px; }
        .ssc-split-int { background: #00ff88; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #0a0a0a; transition: width 0.3s; min-width: 30px; }
        .ssc-split-api { background: #1a6b8a; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #fff; transition: width 0.3s; min-width: 30px; }
        .ssc-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 640px) { .ssc-metrics { grid-template-columns: 1fr; } }
        .ssc-metric { background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 8px; padding: 14px; }
        .ssc-metric-label { font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 0.06em; }
        .ssc-metric-value { font-size: 22px; font-weight: 700; color: #fff; margin-top: 4px; }
        .ssc-metric-value.accent { color: #00ff88; }
        .ssc-metric-sub { font-size: 11px; color: #555; margin-top: 2px; }
        .ssc-checklist { background: #111; border: 1px solid #222; border-radius: 12px; padding: 24px; }
        .ssc-checklist h3 { font-size: 14px; color: #00ff88; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 16px; }
        .ssc-check-item { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-bottom: 1px solid #1a1a1a; cursor: pointer; user-select: none; }
        .ssc-check-item:last-child { border-bottom: none; }
        .ssc-check-box { width: 20px; height: 20px; border-radius: 4px; border: 2px solid #333; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.15s; }
        .ssc-check-box.done { background: #00ff88; border-color: #00ff88; }
        .ssc-check-text { font-size: 14px; color: #ccc; }
        .ssc-check-text.done { color: #666; text-decoration: line-through; }
        .ssc-enterprise-note { background: rgba(255,180,0,0.08); border: 1px solid rgba(255,180,0,0.2); border-radius: 8px; padding: 14px; margin-top: 16px; font-size: 13px; color: #ccaa44; }
        .ssc-footer { text-align: center; margin-top: 40px; color: #444; font-size: 12px; }
        .ssc-footer a { color: #00ff88; text-decoration: none; }
      `}</style>
      <div className="ssc-wrap">
        <div className="ssc-hero">
          <h1>Anthropic Subscription Split Calculator</h1>
          <p>On June 15, 2026, Anthropic splits your Claude credits into two separate pools — interactive and programmatic. Figure out your allocation before the deadline.</p>
          <div className="ssc-countdown">
            {countdown.isPast ? (
              <span className="ssc-badge red">Split has occurred</span>
            ) : (
              <>
                <div className="ssc-cd-unit"><div className={`ssc-cd-num ${countdown.days < 14 ? 'urgent' : ''}`}>{countdown.days}</div><div className="ssc-cd-label">Days</div></div>
                <div className="ssc-cd-unit"><div className={`ssc-cd-num ${countdown.days < 14 ? 'urgent' : ''}`}>{String(countdown.hours).padStart(2, '0')}</div><div className="ssc-cd-label">Hours</div></div>
                <div className="ssc-cd-unit"><div className={`ssc-cd-num ${countdown.days < 14 ? 'urgent' : ''}`}>{String(countdown.minutes).padStart(2, '0')}</div><div className="ssc-cd-label">Min</div></div>
                <div className="ssc-cd-unit"><div className={`ssc-cd-num ${countdown.days < 14 ? 'urgent' : ''}`}>{String(countdown.seconds).padStart(2, '0')}</div><div className="ssc-cd-label">Sec</div></div>
              </>
            )}
          </div>
          {!countdown.isPast && countdown.days < 14 && <span className="ssc-badge red">Under 14 days — allocate now</span>}
        </div>

        <div className="ssc-grid">
          <div className="ssc-card">
            <h3>Interactive Usage (Claude.ai)</h3>
            <div className="ssc-field"><label>Sessions per day</label><input type="number" min={0} value={sessionsPerDay} onChange={e => setSessionsPerDay(Math.max(0, Number(e.target.value)))} /></div>
            <div className="ssc-field"><label>Avg session length (minutes)</label><input type="number" min={1} value={avgSessionMin} onChange={e => setAvgSessionMin(Math.max(1, Number(e.target.value)))} /></div>
            <div className="ssc-field"><label>Plan</label><select value={plan} onChange={e => setPlan(e.target.value)}>{Object.entries(PLANS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</select></div>
            {plan === 'enterprise' && <div className="ssc-enterprise-note">Enterprise allocations are custom. Use this calculator for a rough estimate, then confirm with your Anthropic account team.</div>}
          </div>

          <div className="ssc-card">
            <h3>API / Programmatic Usage</h3>
            <div className="ssc-field"><label>API calls per day</label><input type="number" min={0} value={apiCallsPerDay} onChange={e => setApiCallsPerDay(Math.max(0, Number(e.target.value)))} /></div>
            <div className="ssc-field"><label>Avg input tokens per call</label><input type="number" min={0} value={avgInputTokens} onChange={e => setAvgInputTokens(Math.max(0, Number(e.target.value)))} /></div>
            <div className="ssc-field"><label>Avg output tokens per call</label><input type="number" min={0} value={avgOutputTokens} onChange={e => setAvgOutputTokens(Math.max(0, Number(e.target.value)))} /></div>
            <div className="ssc-field"><label>Model</label><select value={model} onChange={e => setModel(e.target.value)}>{Object.entries(MODELS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</select></div>
          </div>
        </div>

        <div className="ssc-results">
          <h3>Recommended Split</h3>
          <div className="ssc-split-bar">
            <div className="ssc-split-int" style={{ width: `${Math.max(results.interactivePct, 5)}%` }}>{results.interactivePct}% Interactive</div>
            <div className="ssc-split-api" style={{ width: `${Math.max(results.apiPct, 5)}%` }}>{results.apiPct}% API</div>
          </div>
          <div className="ssc-metrics">
            <div className="ssc-metric"><div className="ssc-metric-label">Interactive Tokens / Month</div><div className="ssc-metric-value">{fmt(results.monthlyInteractiveTokens)}</div><div className="ssc-metric-sub">Claude.ai web/app sessions</div></div>
            <div className="ssc-metric"><div className="ssc-metric-label">API Tokens / Month</div><div className="ssc-metric-value">{fmt(results.totalApiTokens)}</div><div className="ssc-metric-sub">{fmt(results.monthlyApiInputTokens)} input + {fmt(results.monthlyApiOutputTokens)} output</div></div>
            <div className="ssc-metric"><div className="ssc-metric-label">Est. Monthly API Cost</div><div className="ssc-metric-value accent">${results.monthlyApiCost.toFixed(2)}</div><div className="ssc-metric-sub">At {MODELS[model].label} pricing</div></div>
            <div className="ssc-metric"><div className="ssc-metric-label">Allocation Advice</div><div className="ssc-metric-value" style={{ fontSize: 16 }}>{results.apiPct > 70 ? 'API-heavy — maximize programmatic pool' : results.interactivePct > 70 ? 'Chat-heavy — maximize interactive pool' : 'Balanced — split roughly even'}</div></div>
          </div>
        </div>

        <div className="ssc-checklist">
          <h3>Before June 15 Checklist</h3>
          {checklist.map((item, i) => (
            <div key={i} className="ssc-check-item" onClick={() => toggleCheck(i)}>
              <div className={`ssc-check-box ${checks[i] ? 'done' : ''}`}>{checks[i] && <span style={{ color: '#0a0a0a', fontSize: 14, fontWeight: 700 }}>&#10003;</span>}</div>
              <span className={`ssc-check-text ${checks[i] ? 'done' : ''}`}>{item}</span>
            </div>
          ))}
        </div>

        <div className="ssc-footer">
          <p>Built by <a href="/">Harel Asaf</a> · Pricing data from public Anthropic rates (June 2026)</p>
          <p style={{ marginTop: 6 }}>No login required · Fully client-side · Your data stays in your browser</p>
        </div>
      </div>
    </>
  );
}
