import SubpageNav from '../components/SubpageNav';

export default function WhatsAppDedupGuardPage() {
  return (
    <>
      <SubpageNav title="WhatsApp Dedup Guard" />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .wdg-hero {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #0d1f0d 40%, #0a2a1a 70%, #0d0d0d 100%);
          color: #e0e0e0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding: 80px 24px 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .wdg-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(34, 197, 94, 0.12);
          border: 1px solid rgba(34, 197, 94, 0.25);
          color: #4ade80;
          font-size: 13px;
          font-weight: 500;
          padding: 6px 14px;
          border-radius: 20px;
          margin-bottom: 24px;
        }
        .wdg-title {
          font-size: clamp(2.2rem, 5vw, 3.6rem);
          font-weight: 700;
          color: #ffffff;
          text-align: center;
          line-height: 1.15;
          margin-bottom: 16px;
        }
        .wdg-title span {
          background: linear-gradient(90deg, #4ade80, #22d3ee);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .wdg-subtitle {
          font-size: 1.15rem;
          color: #9ca3af;
          text-align: center;
          max-width: 580px;
          line-height: 1.6;
          margin-bottom: 40px;
        }
        .wdg-stats {
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 48px;
        }
        .wdg-stat {
          text-align: center;
        }
        .wdg-stat-value {
          font-size: 2.4rem;
          font-weight: 700;
          color: #4ade80;
        }
        .wdg-stat-label {
          font-size: 0.85rem;
          color: #6b7280;
          margin-top: 4px;
        }
        .wdg-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
          max-width: 900px;
          width: 100%;
          margin-bottom: 48px;
        }
        .wdg-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 24px;
        }
        .wdg-card-icon {
          font-size: 1.8rem;
          margin-bottom: 12px;
        }
        .wdg-card h3 {
          color: #f3f4f6;
          font-size: 1.05rem;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .wdg-card p {
          color: #9ca3af;
          font-size: 0.9rem;
          line-height: 1.5;
        }
        .wdg-code-block {
          background: rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 24px;
          max-width: 700px;
          width: 100%;
          margin-bottom: 48px;
          overflow-x: auto;
        }
        .wdg-code-block pre {
          color: #d1d5db;
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-size: 0.85rem;
          line-height: 1.7;
          white-space: pre;
        }
        .wdg-code-block .cmd { color: #4ade80; }
        .wdg-code-block .comment { color: #6b7280; }
        .wdg-code-block .arg { color: #93c5fd; }
        .wdg-tech {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 48px;
        }
        .wdg-tech-tag {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: #d1d5db;
          font-size: 0.8rem;
          padding: 6px 14px;
          border-radius: 8px;
        }
        .wdg-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: #fff;
          font-weight: 600;
          font-size: 1rem;
          padding: 14px 28px;
          border-radius: 12px;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .wdg-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(34, 197, 94, 0.3);
        }
        .wdg-footer {
          margin-top: 60px;
          color: #4b5563;
          font-size: 0.8rem;
          text-align: center;
        }
      `}</style>
      <div className="wdg-hero">
        <div className="wdg-badge">🧹 CLI Tool · Python</div>
        <h1 className="wdg-title">
          WhatsApp <span>Dedup Guard</span>
        </h1>
        <p className="wdg-subtitle">
          Scans your WhatsApp bot inbox for duplicate message files caused by parallel LLM processing — and cleans up the noise.
        </p>

        <div className="wdg-stats">
          <div className="wdg-stat">
            <div className="wdg-stat-value">152</div>
            <div className="wdg-stat-label">Files scanned</div>
          </div>
          <div className="wdg-stat">
            <div className="wdg-stat-value">24</div>
            <div className="wdg-stat-label">Duplicates found</div>
          </div>
          <div className="wdg-stat">
            <div className="wdg-stat-value">15.8%</div>
            <div className="wdg-stat-label">Duplicate rate</div>
          </div>
        </div>

        <div className="wdg-card-grid">
          <div className="wdg-card">
            <div className="wdg-card-icon">🔍</div>
            <h3>Scan &amp; Report</h3>
            <p>Parse Message ID headers, group by ID, and identify duplicate copies — all read-only, no changes to your files.</p>
          </div>
          <div className="wdg-card">
            <div className="wdg-card-icon">🏷️</div>
            <h3>Safe Marking</h3>
            <p>Mark duplicates with a header flag instead of deleting. Dry-run first, then commit — you stay in control.</p>
          </div>
          <div className="wdg-card">
            <div className="wdg-card-icon">📊</div>
            <h3>Stats &amp; Exit Codes</h3>
            <p>Get duplicate rate stats. Exit code 0 = clean, 1 = duplicates found — perfect for cron and CI alerts.</p>
          </div>
        </div>

        <div className="wdg-code-block">
          <pre>
            <span className="comment"># Scan for duplicates (read-only)</span>{'\n'}
            <span className="cmd">python3</span> <span className="arg">whatsapp_dedup_guard.py scan</span> /path/to/inbox/{'\n'}{'\n'}
            <span className="comment"># Full report with details</span>{'\n'}
            <span className="cmd">python3</span> <span className="arg">whatsapp_dedup_guard.py report</span> /path/to/inbox/{'\n'}{'\n'}
            <span className="comment"># Mark duplicates (dry-run first)</span>{'\n'}
            <span className="cmd">python3</span> <span className="arg">whatsapp_dedup_guard.py mark --dry-run</span> /path/to/inbox/
          </pre>
        </div>

        <div className="wdg-tech">
          <span className="wdg-tech-tag">Python 3.10+</span>
          <span className="wdg-tech-tag">Zero Dependencies</span>
          <span className="wdg-tech-tag">stdlib only</span>
          <span className="wdg-tech-tag">CLI</span>
        </div>

        <a
          className="wdg-cta"
          href="https://github.com/RLASAF12/whatsapp-dedup-guard"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub →
        </a>

        <div className="wdg-footer">
          Built by Ben (nightly builder) · 2026-05-28 · Part of Harel&apos;s AI Agent System
        </div>
      </div>
    </>
  );
}
