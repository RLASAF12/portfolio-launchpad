'use client';
import { useState, useMemo } from 'react';
import SubpageNav from '../components/SubpageNav';

interface Model {
  name: string;
  provider: string;
  inputPer1M: number;
  outputPer1M: number;
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
  riskNote: string;
}

const MODELS: Model[] = [
  { name: 'GPT-4o', provider: 'OpenAI', inputPer1M: 2.5, outputPer1M: 10.0, risk: 'LOW', riskNote: 'Industry standard, broad ecosystem' },
  { name: 'GPT-4o-mini', provider: 'OpenAI', inputPer1M: 0.15, outputPer1M: 0.6, risk: 'LOW', riskNote: 'Same API, drop-in replacement' },
  { name: 'Claude 3.5 Sonnet', provider: 'Anthropic', inputPer1M: 3.0, outputPer1M: 15.0, risk: 'LOW', riskNote: 'Strong API parity, large context' },
  { name: 'Claude 3 Haiku', provider: 'Anthropic', inputPer1M: 0.25, outputPer1M: 1.25, risk: 'LOW', riskNote: 'Same API, fast + cheap' },
  { name: 'Gemini 1.5 Pro', provider: 'Google', inputPer1M: 1.25, outputPer1M: 5.0, risk: 'MEDIUM', riskNote: 'Different API, 1M context window' },
  { name: 'Gemini 1.5 Flash', provider: 'Google', inputPer1M: 0.075, outputPer1M: 0.3, risk: 'MEDIUM', riskNote: 'Different API, fastest in class' },
  { name: 'DeepSeek V3', provider: 'DeepSeek', inputPer1M: 0.27, outputPer1M: 1.1, risk: 'MEDIUM', riskNote: 'Price cut permanent, China-based' },
  { name: 'Llama 3.1 70B', provider: 'Groq', inputPer1M: 0.59, outputPer1M: 0.79, risk: 'HIGH', riskNote: 'Open source, Groq-hosted, no SLA' },
  { name: 'Mistral Large 2', provider: 'Mistral', inputPer1M: 2.0, outputPer1M: 6.0, risk: 'MEDIUM', riskNote: 'EU-based, strong multilingual' },
];

const PRESETS = [
  { label: 'Startup', input: 7_000_000, output: 3_000_000 },
  { label: 'Mid-size', input: 70_000_000, output: 30_000_000 },
  { label: 'Enterprise', input: 700_000_000, output: 300_000_000 },
];

function formatMoney(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1)}K`;
  return `$${n.toFixed(2)}`;
}

function formatTokens(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return `${n}`;
}

export default function LLMCostLensPage() {
  const [selectedModel, setSelectedModel] = useState(0);
  const [inputTokens, setInputTokens] = useState(7_000_000);
  const [outputTokens, setOutputTokens] = useState(3_000_000);
  const [activePreset, setActivePreset] = useState(0);

  const costs = useMemo(() => {
    return MODELS.map((m, i) => {
      const monthly = (inputTokens / 1_000_000) * m.inputPer1M + (outputTokens / 1_000_000) * m.outputPer1M;
      return { ...m, index: i, monthly, yearly: monthly * 12 };
    }).sort((a, b) => a.monthly - b.monthly);
  }, [inputTokens, outputTokens]);

  const currentCost = costs.find(c => c.index === selectedModel)!;
  const cheapest = costs[0];
  const savingsMonthly = currentCost.monthly - cheapest.monthly;
  const savingsYearly = savingsMonthly * 12;
  const savingsPct = currentCost.monthly > 0 ? (savingsMonthly / currentCost.monthly) * 100 : 0;

  const handlePreset = (idx: number) => {
    setActivePreset(idx);
    setInputTokens(PRESETS[idx].input);
    setOutputTokens(PRESETS[idx].output);
  };

  const riskColor = (r: string) => r === 'LOW' ? '#10b981' : r === 'MEDIUM' ? '#f59e0b' : '#ef4444';

  return (
    <>
      <SubpageNav title="LLM Cost Lens" />
      <style>{`
        .lcl { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0a0a; color: #e0e0e0; min-height: 100vh; }
        .lcl-hero { text-align: center; padding: 56px 24px 40px; background: linear-gradient(180deg, #0a1628 0%, #0a0a0a 100%); border-bottom: 1px solid #1a2744; }
        .lcl-badge { display: inline-block; background: rgba(59,130,246,0.12); border: 1px solid rgba(59,130,246,0.35); color: #60a5fa; font-family: monospace; font-size: 11px; padding: 4px 14px; border-radius: 20px; letter-spacing: 0.1em; margin-bottom: 20px; }
        .lcl-title { font-size: clamp(28px, 5vw, 44px); font-weight: 800; margin: 0 0 10px; color: #fff; }
        .lcl-title span { background: linear-gradient(135deg, #3b82f6, #10b981); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .lcl-tagline { font-size: 15px; color: #888; max-width: 500px; margin: 0 auto; line-height: 1.6; }
        .lcl-body { max-width: 840px; margin: 0 auto; padding: 32px 20px 60px; }
        .lcl-section { margin-bottom: 32px; }
        .lcl-label { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #555; font-family: monospace; margin-bottom: 10px; }
        .lcl-presets { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
        .lcl-preset { background: #111; border: 1px solid #222; border-radius: 8px; padding: 8px 18px; color: #888; font-size: 13px; cursor: pointer; transition: all 0.15s; font-family: inherit; }
        .lcl-preset:hover { border-color: #3b82f6; color: #fff; }
        .lcl-preset.active { background: rgba(59,130,246,0.12); border-color: #3b82f6; color: #60a5fa; }
        .lcl-controls { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
        @media (max-width: 520px) { .lcl-controls { grid-template-columns: 1fr; } }
        .lcl-field { background: #111; border: 1px solid #1e1e2e; border-radius: 10px; padding: 14px 16px; }
        .lcl-field label { display: block; font-size: 11px; color: #666; letter-spacing: 0.06em; margin-bottom: 6px; }
        .lcl-field input { width: 100%; background: none; border: none; color: #fff; font-size: 22px; font-weight: 700; font-family: monospace; outline: none; }
        .lcl-field .hint { font-size: 10px; color: #444; margin-top: 4px; }
        .lcl-select-wrap { margin-bottom: 20px; }
        .lcl-select { width: 100%; background: #111; border: 1px solid #1e1e2e; border-radius: 10px; padding: 12px 16px; color: #fff; font-size: 14px; font-family: inherit; outline: none; cursor: pointer; appearance: none; -webkit-appearance: none; }
        .lcl-select option { background: #111; color: #e0e0e0; }
        .lcl-savings { border-radius: 12px; padding: 20px; margin-bottom: 28px; text-align: center; }
        .lcl-savings.green { background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.25); }
        .lcl-savings.yellow { background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.25); }
        .lcl-savings.red { background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.2); }
        .lcl-savings.none { background: rgba(59,130,246,0.06); border: 1px solid rgba(59,130,246,0.2); }
        .lcl-savings-big { font-size: 28px; font-weight: 800; margin-bottom: 4px; }
        .lcl-savings-sub { font-size: 13px; color: #888; }
        .lcl-table-wrap { overflow-x: auto; border: 1px solid #1a1a2e; border-radius: 12px; background: #0d0d12; }
        .lcl-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .lcl-table th { text-align: left; padding: 10px 14px; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #555; font-family: monospace; border-bottom: 1px solid #1a1a2e; white-space: nowrap; }
        .lcl-table td { padding: 12px 14px; border-bottom: 1px solid #111; white-space: nowrap; }
        .lcl-table tr.current { background: rgba(59,130,246,0.06); }
        .lcl-table tr.cheapest td { color: #10b981; }
        .lcl-table tr:last-child td { border-bottom: none; }
        .lcl-model-name { font-weight: 600; color: #fff; }
        .lcl-provider { color: #666; font-size: 11px; }
        .lcl-risk { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; padding: 2px 8px; border-radius: 4px; display: inline-block; }
        .lcl-pct { font-family: monospace; font-weight: 700; }
        .lcl-pct.save { color: #10b981; }
        .lcl-pct.more { color: #ef4444; }
        .lcl-pct.same { color: #555; }
        .lcl-footer { text-align: center; padding: 40px 20px; color: #333; font-size: 11px; border-top: 1px solid #111; }
        .lcl-footer a { color: #3b82f6; text-decoration: none; }
        .lcl-your-cost { display: flex; justify-content: center; gap: 24px; margin-bottom: 24px; flex-wrap: wrap; }
        .lcl-cost-card { background: #111; border: 1px solid #1e1e2e; border-radius: 12px; padding: 16px 24px; text-align: center; min-width: 160px; }
        .lcl-cost-card .val { font-size: 26px; font-weight: 800; font-family: monospace; color: #fff; }
        .lcl-cost-card .lbl { font-size: 11px; color: #555; margin-top: 4px; letter-spacing: 0.06em; }
      `}</style>
      <div className="lcl">
        <div className="lcl-hero">
          <div className="lcl-badge">PRICING CALCULATOR</div>
          <h1 className="lcl-title">LLM <span>Cost Lens</span></h1>
          <p className="lcl-tagline">See exactly how much you&apos;re paying for AI inference — and how much you could save by switching models. No login. 10 seconds.</p>
        </div>
        <div className="lcl-body">

          <div className="lcl-section">
            <div className="lcl-label">Presets</div>
            <div className="lcl-presets">
              {PRESETS.map((p, i) => (
                <button key={i} className={`lcl-preset${activePreset === i ? ' active' : ''}`} onClick={() => handlePreset(i)}>
                  {p.label} ({formatTokens(p.input + p.output)}/mo)
                </button>
              ))}
            </div>
          </div>

          <div className="lcl-section">
            <div className="lcl-label">Monthly Usage</div>
            <div className="lcl-controls">
              <div className="lcl-field">
                <label>Input tokens / month</label>
                <input type="text" value={inputTokens.toLocaleString()} onChange={e => { const v = parseInt(e.target.value.replace(/\D/g, '')); if (!isNaN(v)) { setInputTokens(v); setActivePreset(-1); } }} />
                <div className="hint">1M tokens ≈ 750,000 words</div>
              </div>
              <div className="lcl-field">
                <label>Output tokens / month</label>
                <input type="text" value={outputTokens.toLocaleString()} onChange={e => { const v = parseInt(e.target.value.replace(/\D/g, '')); if (!isNaN(v)) { setOutputTokens(v); setActivePreset(-1); } }} />
                <div className="hint">Typically 20-40% of input volume</div>
              </div>
            </div>
          </div>

          <div className="lcl-section">
            <div className="lcl-label">Your current model</div>
            <div className="lcl-select-wrap">
              <select className="lcl-select" value={selectedModel} onChange={e => setSelectedModel(Number(e.target.value))}>
                {MODELS.map((m, i) => <option key={i} value={i}>{m.name} — {m.provider}</option>)}
              </select>
            </div>
          </div>

          <div className="lcl-your-cost">
            <div className="lcl-cost-card">
              <div className="val">{formatMoney(currentCost.monthly)}</div>
              <div className="lbl">per month</div>
            </div>
            <div className="lcl-cost-card">
              <div className="val">{formatMoney(currentCost.yearly)}</div>
              <div className="lbl">per year</div>
            </div>
          </div>

          {savingsMonthly > 0.01 ? (
            <div className={`lcl-savings ${savingsPct > 50 ? 'green' : savingsPct > 20 ? 'yellow' : 'red'}`}>
              <div className="lcl-savings-big" style={{ color: savingsPct > 50 ? '#10b981' : savingsPct > 20 ? '#f59e0b' : '#ef4444' }}>
                Switch to {cheapest.name} — save {formatMoney(savingsMonthly)}/mo
              </div>
              <div className="lcl-savings-sub">
                {formatMoney(savingsYearly)}/year saved · {savingsPct.toFixed(0)}% reduction · {cheapest.risk} switch risk
              </div>
            </div>
          ) : (
            <div className="lcl-savings none">
              <div className="lcl-savings-big" style={{ color: '#60a5fa' }}>You&apos;re already on the cheapest option</div>
              <div className="lcl-savings-sub">No savings available at current usage</div>
            </div>
          )}

          <div className="lcl-section">
            <div className="lcl-label">All Models Compared</div>
            <div className="lcl-table-wrap">
              <table className="lcl-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Model</th>
                    <th>Input $/1M</th>
                    <th>Output $/1M</th>
                    <th>Monthly</th>
                    <th>vs Current</th>
                    <th>Risk</th>
                  </tr>
                </thead>
                <tbody>
                  {costs.map((c, rank) => {
                    const diff = currentCost.monthly > 0 ? ((c.monthly - currentCost.monthly) / currentCost.monthly) * 100 : 0;
                    const isCurrent = c.index === selectedModel;
                    const isCheapest = rank === 0;
                    return (
                      <tr key={c.index} className={isCurrent ? 'current' : isCheapest ? 'cheapest' : ''}>
                        <td style={{ color: '#444' }}>{rank + 1}</td>
                        <td>
                          <span className="lcl-model-name">{c.name}</span><br />
                          <span className="lcl-provider">{c.provider}</span>
                        </td>
                        <td style={{ fontFamily: 'monospace' }}>${c.inputPer1M.toFixed(3)}</td>
                        <td style={{ fontFamily: 'monospace' }}>${c.outputPer1M.toFixed(2)}</td>
                        <td style={{ fontFamily: 'monospace', fontWeight: 700 }}>{formatMoney(c.monthly)}</td>
                        <td>
                          {isCurrent ? (
                            <span className="lcl-pct same">CURRENT</span>
                          ) : diff < 0 ? (
                            <span className="lcl-pct save">{diff.toFixed(0)}%</span>
                          ) : (
                            <span className="lcl-pct more">+{diff.toFixed(0)}%</span>
                          )}
                        </td>
                        <td>
                          <span className="lcl-risk" style={{ color: riskColor(c.risk), background: `${riskColor(c.risk)}15`, border: `1px solid ${riskColor(c.risk)}30` }} title={c.riskNote}>
                            {c.risk}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lcl-section" style={{ background: '#0d0d12', borderRadius: 12, padding: 20, border: '1px solid #1a1a2e' }}>
            <div className="lcl-label">About Switch Risk</div>
            <div style={{ fontSize: 13, color: '#777', lineHeight: 1.7 }}>
              <strong style={{ color: '#10b981' }}>LOW</strong> — Same or very similar API. Drop-in replacement with minimal code changes.<br />
              <strong style={{ color: '#f59e0b' }}>MEDIUM</strong> — Different API but well-documented. Expect 1-2 days of integration work.<br />
              <strong style={{ color: '#ef4444' }}>HIGH</strong> — Different ecosystem, limited SLA, or requires infrastructure changes.
            </div>
          </div>

          <div className="lcl-section" style={{ background: '#0d0d12', borderRadius: 12, padding: 20, border: '1px solid #1a1a2e', marginTop: 16 }}>
            <div className="lcl-label">How This Works</div>
            <div style={{ fontSize: 13, color: '#777', lineHeight: 1.7 }}>
              Pricing data is accurate as of May 2026. DeepSeek&apos;s 75% price cut is now permanent. Presets assume a 70/30 input-to-output token ratio. Enterprise procurement pricing (Azure OpenAI, Bedrock) varies and is not included — contact your provider for volume discounts.
            </div>
          </div>

        </div>
        <div className="lcl-footer">
          Built by <a href="/">Harel Asaf</a> · Pricing data accurate May 2026 · <a href="https://app.base44.com/apps/6a1b74f411c8046fc7d6f962" target="_blank" rel="noopener">Full app on Base44</a>
        </div>
      </div>
    </>
  );
}
