'use client';
import { useState, useMemo } from 'react';
import SubpageNav from '../components/SubpageNav';

function tokenCount(text: string): number {
  return Math.ceil(text.length / 4);
}

interface DiffLine {
  type: 'added' | 'removed' | 'unchanged';
  text: string;
  lineNum?: number;
}

function computeDiff(a: string, b: string): DiffLine[] {
  const linesA = a.split('\n');
  const linesB = b.split('\n');
  const m = linesA.length;
  const n = linesB.length;

  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (linesA[i - 1] === linesB[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const result: DiffLine[] = [];
  let i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && linesA[i - 1] === linesB[j - 1]) {
      result.unshift({ type: 'unchanged', text: linesA[i - 1] });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({ type: 'added', text: linesB[j - 1] });
      j--;
    } else {
      result.unshift({ type: 'removed', text: linesA[i - 1] });
      i--;
    }
  }
  return result;
}

function diffToMarkdown(diff: DiffLine[]): string {
  let md = '```diff\n';
  for (const line of diff) {
    if (line.type === 'removed') md += `- ${line.text}\n`;
    else if (line.type === 'added') md += `+ ${line.text}\n`;
    else md += `  ${line.text}\n`;
  }
  md += '```';
  return md;
}

export default function PromptDiffPage() {
  const [promptA, setPromptA] = useState('');
  const [promptB, setPromptB] = useState('');
  const [showDiff, setShowDiff] = useState(false);
  const [copied, setCopied] = useState(false);

  const tokensA = useMemo(() => tokenCount(promptA), [promptA]);
  const tokensB = useMemo(() => tokenCount(promptB), [promptB]);
  const tokenDelta = tokensB - tokensA;

  const diff = useMemo(() => {
    if (!showDiff) return [];
    return computeDiff(promptA, promptB);
  }, [promptA, promptB, showDiff]);

  const stats = useMemo(() => {
    const added = diff.filter(d => d.type === 'added').length;
    const removed = diff.filter(d => d.type === 'removed').length;
    const unchanged = diff.filter(d => d.type === 'unchanged').length;
    return { added, removed, unchanged };
  }, [diff]);

  const handleDiff = () => setShowDiff(true);
  const handleClear = () => { setPromptA(''); setPromptB(''); setShowDiff(false); };
  const handleCopy = async () => {
    const md = diffToMarkdown(diff);
    await navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SubpageNav title="Prompt Diff" />
      <style>{`
        .pd { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0a0a; color: #e0e0e0; min-height: 100vh; }
        .pd-hero { text-align: center; padding: 56px 24px 32px; background: linear-gradient(180deg, #0f1a2e 0%, #0a0a0a 100%); border-bottom: 1px solid #1a2744; }
        .pd-badge { display: inline-block; background: rgba(168,85,247,0.12); border: 1px solid rgba(168,85,247,0.35); color: #c084fc; font-family: monospace; font-size: 11px; padding: 4px 14px; border-radius: 20px; letter-spacing: 0.1em; margin-bottom: 20px; }
        .pd-title { font-size: clamp(28px, 5vw, 44px); font-weight: 800; margin: 0 0 10px; color: #fff; }
        .pd-title span { background: linear-gradient(135deg, #a855f7, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .pd-sub { color: #888; font-size: 16px; margin: 0; max-width: 500px; margin-left: auto; margin-right: auto; line-height: 1.5; }
        .pd-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding: 32px 24px; max-width: 1200px; margin: 0 auto; }
        @media (max-width: 768px) { .pd-grid { grid-template-columns: 1fr; } }
        .pd-panel { background: #111; border: 1px solid #222; border-radius: 12px; padding: 16px; display: flex; flex-direction: column; }
        .pd-panel-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .pd-label { font-size: 13px; color: #888; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; }
        .pd-tokens { font-family: monospace; font-size: 13px; color: #c084fc; background: rgba(168,85,247,0.1); padding: 3px 10px; border-radius: 6px; }
        .pd-textarea { background: #0a0a0a; border: 1px solid #222; border-radius: 8px; color: #e0e0e0; font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace; font-size: 13px; padding: 14px; resize: vertical; min-height: 280px; width: 100%; box-sizing: border-box; line-height: 1.6; outline: none; transition: border-color 0.15s; }
        .pd-textarea:focus { border-color: #a855f7; }
        .pd-textarea::placeholder { color: #444; }
        .pd-actions { display: flex; justify-content: center; gap: 12px; padding: 0 24px 32px; max-width: 1200px; margin: 0 auto; }
        .pd-btn { padding: 12px 32px; border-radius: 8px; border: none; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.15s; }
        .pd-btn-primary { background: linear-gradient(135deg, #a855f7, #3b82f6); color: #fff; }
        .pd-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(168,85,247,0.3); }
        .pd-btn-secondary { background: #1a1a1a; color: #888; border: 1px solid #333; }
        .pd-btn-secondary:hover { color: #e0e0e0; border-color: #555; }
        .pd-result { max-width: 1200px; margin: 0 auto; padding: 0 24px 48px; }
        .pd-stats { display: flex; gap: 16px; margin-bottom: 20px; flex-wrap: wrap; }
        .pd-stat { background: #111; border: 1px solid #222; border-radius: 10px; padding: 14px 20px; flex: 1; min-width: 120px; text-align: center; }
        .pd-stat-val { font-size: 28px; font-weight: 800; font-family: monospace; }
        .pd-stat-label { font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 4px; }
        .pd-stat-green .pd-stat-val { color: #10b981; }
        .pd-stat-red .pd-stat-val { color: #ef4444; }
        .pd-stat-blue .pd-stat-val { color: #3b82f6; }
        .pd-stat-purple .pd-stat-val { color: #c084fc; }
        .pd-diff-box { background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 12px; overflow: hidden; }
        .pd-diff-header { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: #111; border-bottom: 1px solid #1a1a1a; }
        .pd-diff-title { font-size: 13px; color: #888; font-weight: 600; }
        .pd-copy-btn { padding: 6px 16px; border-radius: 6px; border: 1px solid #333; background: #1a1a1a; color: #888; font-size: 12px; cursor: pointer; transition: all 0.15s; }
        .pd-copy-btn:hover { color: #e0e0e0; border-color: #555; }
        .pd-copy-btn.copied { background: rgba(16,185,129,0.15); border-color: #10b981; color: #10b981; }
        .pd-diff-lines { padding: 0; margin: 0; list-style: none; font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace; font-size: 13px; line-height: 1.7; max-height: 500px; overflow-y: auto; }
        .pd-diff-line { padding: 2px 16px; white-space: pre-wrap; word-break: break-all; }
        .pd-line-added { background: rgba(16,185,129,0.08); color: #6ee7b7; }
        .pd-line-added::before { content: '+ '; color: #10b981; font-weight: 700; }
        .pd-line-removed { background: rgba(239,68,68,0.08); color: #fca5a5; text-decoration: line-through; text-decoration-color: rgba(239,68,68,0.4); }
        .pd-line-removed::before { content: '- '; color: #ef4444; font-weight: 700; }
        .pd-line-unchanged { color: #555; }
        .pd-line-unchanged::before { content: '  '; }
        .pd-footer { text-align: center; padding: 32px 24px; color: #333; font-size: 12px; }
        .pd-delta-pos { color: #ef4444; }
        .pd-delta-neg { color: #10b981; }
        .pd-delta-zero { color: #555; }
      `}</style>
      <div className="pd">
        <div className="pd-hero">
          <div className="pd-badge">PROMPT ENGINEERING TOOL</div>
          <h1 className="pd-title">Prompt <span>Diff</span></h1>
          <p className="pd-sub">Compare two versions of a system prompt. See what changed line by line, with token count deltas.</p>
        </div>

        <div className="pd-grid">
          <div className="pd-panel">
            <div className="pd-panel-head">
              <span className="pd-label">Prompt A — Before</span>
              <span className="pd-tokens">{tokensA.toLocaleString()} tokens</span>
            </div>
            <textarea
              className="pd-textarea"
              placeholder="Paste your original prompt here..."
              value={promptA}
              onChange={e => { setPromptA(e.target.value); setShowDiff(false); }}
            />
          </div>
          <div className="pd-panel">
            <div className="pd-panel-head">
              <span className="pd-label">Prompt B — After</span>
              <span className="pd-tokens">{tokensB.toLocaleString()} tokens</span>
            </div>
            <textarea
              className="pd-textarea"
              placeholder="Paste your revised prompt here..."
              value={promptB}
              onChange={e => { setPromptB(e.target.value); setShowDiff(false); }}
            />
          </div>
        </div>

        <div className="pd-actions">
          <button className="pd-btn pd-btn-primary" onClick={handleDiff} disabled={!promptA && !promptB}>Diff</button>
          <button className="pd-btn pd-btn-secondary" onClick={handleClear}>Clear</button>
        </div>

        {showDiff && diff.length > 0 && (
          <div className="pd-result">
            <div className="pd-stats">
              <div className="pd-stat pd-stat-green">
                <div className="pd-stat-val">+{stats.added}</div>
                <div className="pd-stat-label">Lines Added</div>
              </div>
              <div className="pd-stat pd-stat-red">
                <div className="pd-stat-val">-{stats.removed}</div>
                <div className="pd-stat-label">Lines Removed</div>
              </div>
              <div className="pd-stat pd-stat-blue">
                <div className="pd-stat-val">{stats.unchanged}</div>
                <div className="pd-stat-label">Unchanged</div>
              </div>
              <div className="pd-stat pd-stat-purple">
                <div className="pd-stat-val">
                  <span className={tokenDelta > 0 ? 'pd-delta-pos' : tokenDelta < 0 ? 'pd-delta-neg' : 'pd-delta-zero'}>
                    {tokenDelta > 0 ? '+' : ''}{tokenDelta.toLocaleString()}
                  </span>
                </div>
                <div className="pd-stat-label">Token Delta</div>
              </div>
            </div>

            <div className="pd-diff-box">
              <div className="pd-diff-header">
                <span className="pd-diff-title">Diff Output</span>
                <button className={`pd-copy-btn${copied ? ' copied' : ''}`} onClick={handleCopy}>
                  {copied ? '✓ Copied' : 'Copy as Markdown'}
                </button>
              </div>
              <ul className="pd-diff-lines">
                {diff.map((line, i) => (
                  <li key={i} className={`pd-diff-line pd-line-${line.type}`}>{line.text || ' '}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="pd-footer">
          Token counts are estimates (1 token ≈ 4 characters). Built by Harel Asaf.
        </div>
      </div>
    </>
  );
}
