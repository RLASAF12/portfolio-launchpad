'use client';
import { useState } from 'react';
import SubpageNav from '../components/SubpageNav';

interface AgentAction {
  id: number;
  agent: string;
  role: string;
  actionType: string;
  target: string;
  payload: Record<string, unknown>;
  riskLevel: 'LOW' | 'MED' | 'HIGH';
  reversible: boolean;
  riskExplanation: string;
  createdAt: number;
}

interface AuditEntry {
  id: number;
  agent: string;
  actionType: string;
  outcome: 'APPROVED' | 'DENIED';
  reason: string;
  decidedAt: number;
}

const INITIAL_ACTIONS: AgentAction[] = [
  {
    id: 1,
    agent: 'Jams',
    role: 'CMO',
    actionType: 'Post Tweet',
    target: '@haboratory',
    payload: { platform: 'X/Twitter', content: 'Most AI agent demos show what agents do. This shows what happens before they do it — the approval layer.', hashtags: ['#AIAgents', '#HITL', '#BuildInPublic'], scheduled_time: 'immediate' },
    riskLevel: 'MED',
    reversible: false,
    riskExplanation: 'Public social post cannot be unsent once published. Content represents brand voice. Medium risk due to limited blast radius (single tweet).',
    createdAt: Date.now() - 180000,
  },
  {
    id: 2,
    agent: 'Vision',
    role: 'COO',
    actionType: 'Create File',
    target: 'M-memory/learning-log.md',
    payload: { operation: 'append', section: 'Content Insights', entry: 'LinkedIn carousel format outperformed text-only by 3.2x engagement', source: 'weekly-analytics-review' },
    riskLevel: 'LOW',
    reversible: true,
    riskExplanation: 'Appending to a version-controlled memory file. Change is reversible via git revert. Low risk.',
    createdAt: Date.now() - 420000,
  },
  {
    id: 3,
    agent: 'Martin',
    role: 'CTO',
    actionType: 'Deploy Service',
    target: 'whatsapp-agent → Cloud Run (us-central1)',
    payload: { service: 'whatsapp-agent', project: 'whatsapp-bot-harel', region: 'us-central1', image: 'gcr.io/whatsapp-bot-harel/whatsapp-agent:v2.4.1', env_changes: { GEMINI_MODEL: 'gemini-2.5-flash', LOCAL_LLM_COORDINATOR: 'on' }, traffic_split: '100% to new revision' },
    riskLevel: 'HIGH',
    reversible: false,
    riskExplanation: 'Production deployment replacing live service. 100% traffic shift with no canary. Rollback requires a new deploy. HIGH risk — affects all WhatsApp users immediately.',
    createdAt: Date.now() - 60000,
  },
  {
    id: 4,
    agent: 'Alex',
    role: 'CRO',
    actionType: 'Send Email',
    target: 'prospect@enterprise.com',
    payload: { to: 'prospect@enterprise.com', subject: 'Re: AI Agent Governance — Follow Up', body: 'Hi Sarah, following up on our conversation about agent oversight frameworks...', cc: [], attachments: ['agent-governance-one-pager.pdf'] },
    riskLevel: 'MED',
    reversible: false,
    riskExplanation: 'Outbound email to external prospect. Cannot be recalled after send. Medium risk — single recipient, professional context.',
    createdAt: Date.now() - 300000,
  },
];

export default function AgentApprovalQueuePage() {
  const [actions, setActions] = useState<AgentAction[]>(INITIAL_ACTIONS);
  const [selectedId, setSelectedId] = useState<number | null>(3);
  const [auditLog, setAuditLog] = useState<AuditEntry[]>([]);
  const [reason, setReason] = useState('');
  const [reasonError, setReasonError] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formAgent, setFormAgent] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formType, setFormType] = useState('');
  const [formTarget, setFormTarget] = useState('');
  const [formRisk, setFormRisk] = useState<'LOW' | 'MED' | 'HIGH'>('LOW');
  const [formReversible, setFormReversible] = useState(true);

  const selected = actions.find(a => a.id === selectedId) || null;

  const handleDecision = (outcome: 'APPROVED' | 'DENIED') => {
    if (!reason.trim()) { setReasonError(true); return; }
    if (!selected) return;
    setAuditLog(prev => [{ id: selected.id, agent: selected.agent, actionType: selected.actionType, outcome, reason: reason.trim(), decidedAt: Date.now() }, ...prev]);
    setActions(prev => prev.filter(a => a.id !== selected.id));
    setSelectedId(null);
    setReason('');
    setReasonError(false);
  };

  const elapsed = (ts: number) => {
    const s = Math.floor((Date.now() - ts) / 1000);
    if (s < 60) return `${s}s ago`;
    if (s < 3600) return `${Math.floor(s / 60)}m ago`;
    return `${Math.floor(s / 3600)}h ago`;
  };

  const riskColor = (r: string) => r === 'HIGH' ? '#ef4444' : r === 'MED' ? '#f59e0b' : '#22c55e';

  const submitTestAction = () => {
    if (!formAgent || !formType) return;
    const newAction: AgentAction = {
      id: Date.now(),
      agent: formAgent,
      role: formRole || 'Agent',
      actionType: formType,
      target: formTarget || 'N/A',
      payload: { note: 'User-submitted test action' },
      riskLevel: formRisk,
      reversible: formReversible,
      riskExplanation: `${formRisk} risk action submitted for testing.`,
      createdAt: Date.now(),
    };
    setActions(prev => [...prev, newAction]);
    setFormAgent(''); setFormRole(''); setFormType(''); setFormTarget(''); setFormRisk('LOW'); setFormReversible(true); setShowForm(false);
  };

  return (
    <>
      <SubpageNav title="Agent Approval Queue" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .aaq { font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace; background: #0a0a0f; color: #c8ccd4; min-height: 100vh; }
        .aaq-hero { text-align: center; padding: 56px 24px 32px; background: linear-gradient(180deg, #0d1117 0%, #0a0a0f 100%); border-bottom: 1px solid #1e2433; }
        .aaq-badge { display: inline-block; background: rgba(239,68,68,0.10); border: 1px solid rgba(239,68,68,0.30); color: #f87171; font-size: 11px; padding: 4px 14px; border-radius: 20px; letter-spacing: 0.1em; margin-bottom: 16px; text-transform: uppercase; }
        .aaq-title { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 32px; font-weight: 700; color: #f0f0f0; margin-bottom: 10px; }
        .aaq-sub { color: #666; font-size: 14px; font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; line-height: 1.6; }
        .aaq-main { display: grid; grid-template-columns: 1fr 1fr; gap: 0; max-width: 1200px; margin: 0 auto; min-height: 60vh; }
        .aaq-queue { border-right: 1px solid #1e2433; padding: 24px; }
        .aaq-detail { padding: 24px; }
        .aaq-section-title { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #555; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; }
        .aaq-count { background: rgba(239,68,68,0.15); color: #f87171; font-size: 11px; padding: 2px 8px; border-radius: 10px; }
        .aaq-card { background: #111318; border: 1px solid #1e2433; border-radius: 8px; padding: 14px 16px; margin-bottom: 10px; cursor: pointer; transition: all 0.15s; }
        .aaq-card:hover { border-color: #333; background: #14161d; }
        .aaq-card.selected { border-color: #3b82f6; background: rgba(59,130,246,0.06); }
        .aaq-card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
        .aaq-agent { font-size: 14px; color: #e0e0e0; font-family: -apple-system, sans-serif; font-weight: 600; }
        .aaq-role { color: #555; font-size: 11px; margin-left: 6px; font-weight: 400; }
        .aaq-risk-badge { font-size: 10px; padding: 2px 10px; border-radius: 4px; font-weight: 700; letter-spacing: 0.08em; }
        .aaq-card-action { color: #999; font-size: 13px; }
        .aaq-card-bottom { display: flex; align-items: center; justify-content: space-between; margin-top: 8px; }
        .aaq-card-meta { color: #444; font-size: 11px; }
        .aaq-rev { font-size: 10px; padding: 1px 8px; border-radius: 3px; }
        .aaq-empty { text-align: center; color: #333; padding: 60px 20px; font-size: 14px; }
        .aaq-detail-empty { display: flex; align-items: center; justify-content: center; color: #333; font-size: 14px; height: 100%; min-height: 300px; }
        .aaq-d-header { margin-bottom: 20px; }
        .aaq-d-agent { font-size: 20px; color: #f0f0f0; font-family: -apple-system, sans-serif; font-weight: 700; }
        .aaq-d-type { color: #888; font-size: 14px; margin-top: 4px; }
        .aaq-d-target { color: #3b82f6; font-size: 13px; margin-top: 4px; }
        .aaq-d-section { margin-bottom: 20px; }
        .aaq-d-label { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #555; margin-bottom: 8px; }
        .aaq-d-risk { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
        .aaq-d-risk-text { color: #888; font-size: 13px; font-family: -apple-system, sans-serif; line-height: 1.5; }
        .aaq-payload { background: #080810; border: 1px solid #1a1d28; border-radius: 6px; padding: 14px; font-size: 12px; color: #7dd3fc; overflow-x: auto; white-space: pre-wrap; word-break: break-all; max-height: 200px; overflow-y: auto; line-height: 1.5; }
        .aaq-actions { display: flex; gap: 12px; margin-top: 20px; }
        .aaq-btn { flex: 1; padding: 12px; border: none; border-radius: 6px; font-size: 13px; font-weight: 700; cursor: pointer; letter-spacing: 0.04em; font-family: 'SF Mono', monospace; transition: all 0.15s; }
        .aaq-btn-approve { background: rgba(34,197,94,0.12); color: #4ade80; border: 1px solid rgba(34,197,94,0.25); }
        .aaq-btn-approve:hover { background: rgba(34,197,94,0.22); }
        .aaq-btn-deny { background: rgba(239,68,68,0.12); color: #f87171; border: 1px solid rgba(239,68,68,0.25); }
        .aaq-btn-deny:hover { background: rgba(239,68,68,0.22); }
        .aaq-reason { width: 100%; background: #080810; border: 1px solid #1a1d28; border-radius: 6px; padding: 10px 12px; color: #c8ccd4; font-size: 13px; font-family: 'SF Mono', monospace; resize: none; outline: none; margin-top: 12px; }
        .aaq-reason:focus { border-color: #3b82f6; }
        .aaq-reason.error { border-color: #ef4444; }
        .aaq-reason-hint { color: #ef4444; font-size: 11px; margin-top: 4px; }
        .aaq-log { max-width: 1200px; margin: 0 auto; padding: 24px; border-top: 1px solid #1e2433; }
        .aaq-log-entry { display: grid; grid-template-columns: 100px 1fr 90px 1fr 140px; gap: 12px; align-items: center; padding: 10px 0; border-bottom: 1px solid #111318; font-size: 12px; }
        .aaq-log-agent { color: #e0e0e0; }
        .aaq-log-action { color: #888; }
        .aaq-log-outcome { font-weight: 700; letter-spacing: 0.06em; }
        .aaq-log-reason { color: #666; font-style: italic; }
        .aaq-log-time { color: #444; text-align: right; }
        .aaq-add-btn { background: rgba(59,130,246,0.10); border: 1px solid rgba(59,130,246,0.25); color: #60a5fa; font-size: 11px; padding: 4px 12px; border-radius: 4px; cursor: pointer; font-family: 'SF Mono', monospace; transition: all 0.15s; }
        .aaq-add-btn:hover { background: rgba(59,130,246,0.20); }
        .aaq-form { background: #111318; border: 1px solid #1e2433; border-radius: 8px; padding: 16px; margin-top: 12px; }
        .aaq-form-row { display: flex; gap: 10px; margin-bottom: 10px; }
        .aaq-form-input { flex: 1; background: #080810; border: 1px solid #1a1d28; border-radius: 4px; padding: 8px 10px; color: #c8ccd4; font-size: 12px; font-family: 'SF Mono', monospace; outline: none; }
        .aaq-form-input:focus { border-color: #3b82f6; }
        .aaq-form-select { background: #080810; border: 1px solid #1a1d28; border-radius: 4px; padding: 8px 10px; color: #c8ccd4; font-size: 12px; font-family: 'SF Mono', monospace; outline: none; }
        .aaq-form-actions { display: flex; gap: 8px; justify-content: flex-end; }
        .aaq-form-submit { background: rgba(59,130,246,0.15); border: 1px solid rgba(59,130,246,0.30); color: #60a5fa; padding: 6px 16px; border-radius: 4px; cursor: pointer; font-size: 12px; font-family: 'SF Mono', monospace; }
        .aaq-form-cancel { background: transparent; border: 1px solid #1e2433; color: #666; padding: 6px 16px; border-radius: 4px; cursor: pointer; font-size: 12px; font-family: 'SF Mono', monospace; }
        @media (max-width: 768px) {
          .aaq-main { grid-template-columns: 1fr; }
          .aaq-queue { border-right: none; border-bottom: 1px solid #1e2433; }
          .aaq-log-entry { grid-template-columns: 1fr 1fr; gap: 4px; font-size: 11px; }
          .aaq-title { font-size: 24px; }
        }
      `}</style>
      <div className="aaq">
        <div className="aaq-hero">
          <div className="aaq-badge">Human-in-the-Loop</div>
          <h1 className="aaq-title">Agent Action Approval Queue</h1>
          <p className="aaq-sub">Every AI agent action requires human approval before execution. Review risk, inspect payloads, approve or deny with a reason. Full audit trail.</p>
        </div>

        <div className="aaq-main">
          <div className="aaq-queue">
            <div className="aaq-section-title">
              <span>Pending Actions <span className="aaq-count">{actions.length}</span></span>
              <button className="aaq-add-btn" onClick={() => setShowForm(!showForm)}>+ Test Action</button>
            </div>
            {showForm && (
              <div className="aaq-form">
                <div className="aaq-form-row">
                  <input className="aaq-form-input" placeholder="Agent name" value={formAgent} onChange={e => setFormAgent(e.target.value)} />
                  <input className="aaq-form-input" placeholder="Role" value={formRole} onChange={e => setFormRole(e.target.value)} />
                </div>
                <div className="aaq-form-row">
                  <input className="aaq-form-input" placeholder="Action type" value={formType} onChange={e => setFormType(e.target.value)} />
                  <input className="aaq-form-input" placeholder="Target" value={formTarget} onChange={e => setFormTarget(e.target.value)} />
                </div>
                <div className="aaq-form-row">
                  <select className="aaq-form-select" value={formRisk} onChange={e => setFormRisk(e.target.value as 'LOW' | 'MED' | 'HIGH')}>
                    <option value="LOW">LOW risk</option>
                    <option value="MED">MED risk</option>
                    <option value="HIGH">HIGH risk</option>
                  </select>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#888', fontSize: 12 }}>
                    <input type="checkbox" checked={formReversible} onChange={e => setFormReversible(e.target.checked)} /> Reversible
                  </label>
                </div>
                <div className="aaq-form-actions">
                  <button className="aaq-form-cancel" onClick={() => setShowForm(false)}>Cancel</button>
                  <button className="aaq-form-submit" onClick={submitTestAction}>Add Action</button>
                </div>
              </div>
            )}
            {actions.length === 0 ? (
              <div className="aaq-empty">All actions reviewed ✓</div>
            ) : (
              actions.map(a => (
                <div key={a.id} className={`aaq-card ${selectedId === a.id ? 'selected' : ''}`} onClick={() => { setSelectedId(a.id); setReason(''); setReasonError(false); }}>
                  <div className="aaq-card-top">
                    <span><span className="aaq-agent">{a.agent}</span><span className="aaq-role">({a.role})</span></span>
                    <span className="aaq-risk-badge" style={{ background: `${riskColor(a.riskLevel)}18`, color: riskColor(a.riskLevel), border: `1px solid ${riskColor(a.riskLevel)}40` }}>{a.riskLevel}</span>
                  </div>
                  <div className="aaq-card-action">{a.actionType} → {a.target}</div>
                  <div className="aaq-card-bottom">
                    <span className="aaq-card-meta">{elapsed(a.createdAt)}</span>
                    <span className="aaq-rev" style={{ background: a.reversible ? 'rgba(34,197,94,0.10)' : 'rgba(239,68,68,0.10)', color: a.reversible ? '#4ade80' : '#f87171' }}>{a.reversible ? '↩ reversible' : '⚠ irreversible'}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="aaq-detail">
            {!selected ? (
              <div className="aaq-detail-empty">← Select an action to review</div>
            ) : (
              <>
                <div className="aaq-d-header">
                  <div className="aaq-d-agent">{selected.agent} <span style={{ color: '#555', fontWeight: 400 }}>({selected.role})</span></div>
                  <div className="aaq-d-type">{selected.actionType}</div>
                  <div className="aaq-d-target">Target: {selected.target}</div>
                </div>

                <div className="aaq-d-section">
                  <div className="aaq-d-label">Risk Assessment</div>
                  <div className="aaq-d-risk">
                    <span className="aaq-risk-badge" style={{ background: `${riskColor(selected.riskLevel)}18`, color: riskColor(selected.riskLevel), border: `1px solid ${riskColor(selected.riskLevel)}40`, fontSize: 12, padding: '4px 14px' }}>{selected.riskLevel} RISK</span>
                    <span className="aaq-rev" style={{ background: selected.reversible ? 'rgba(34,197,94,0.10)' : 'rgba(239,68,68,0.10)', color: selected.reversible ? '#4ade80' : '#f87171', fontSize: 11, padding: '3px 10px' }}>{selected.reversible ? '↩ Reversible' : '⚠ Irreversible'}</span>
                  </div>
                  <div className="aaq-d-risk-text">{selected.riskExplanation}</div>
                </div>

                <div className="aaq-d-section">
                  <div className="aaq-d-label">Payload</div>
                  <pre className="aaq-payload">{JSON.stringify(selected.payload, null, 2)}</pre>
                </div>

                <div className="aaq-d-section">
                  <div className="aaq-d-label">Decision Reason <span style={{ color: '#ef4444' }}>*</span></div>
                  <textarea className={`aaq-reason ${reasonError ? 'error' : ''}`} rows={2} placeholder="Required — explain your decision..." value={reason} onChange={e => { setReason(e.target.value); setReasonError(false); }} />
                  {reasonError && <div className="aaq-reason-hint">Reason is required before approving or denying</div>}
                </div>

                <div className="aaq-actions">
                  <button className="aaq-btn aaq-btn-approve" onClick={() => handleDecision('APPROVED')}>✓ Approve</button>
                  <button className="aaq-btn aaq-btn-deny" onClick={() => handleDecision('DENIED')}>✕ Deny</button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="aaq-log">
          <div className="aaq-section-title">Audit Log <span className="aaq-count">{auditLog.length}</span></div>
          {auditLog.length === 0 ? (
            <div className="aaq-empty" style={{ padding: '30px 20px' }}>No decisions yet — review a pending action above</div>
          ) : (
            auditLog.map((e, i) => (
              <div key={i} className="aaq-log-entry">
                <span className="aaq-log-agent">{e.agent}</span>
                <span className="aaq-log-action">{e.actionType}</span>
                <span className="aaq-log-outcome" style={{ color: e.outcome === 'APPROVED' ? '#4ade80' : '#f87171' }}>{e.outcome}</span>
                <span className="aaq-log-reason">"{e.reason}"</span>
                <span className="aaq-log-time">{new Date(e.decidedAt).toLocaleTimeString()}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
