'use client';

export default function ContextBudgetPage() {
  return (
    <>
      <style>{`
        .cb-page {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #0a0a0a;
          color: #e0e0e0;
          min-height: 100vh;
          padding: 0;
          margin: 0;
        }
        .cb-mono { font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace; }
        .cb-hero { 
          text-align: center; padding: 60px 24px 40px;
          background: linear-gradient(180deg, #0f0a1e 0%, #0a0a0a 100%);
          border-bottom: 1px solid #1a1a2e;
        }
        .cb-badge {
          display: inline-block; background: rgba(124,58,237,0.15);
          border: 1px solid rgba(124,58,237,0.4); color: #a78bfa;
          font-family: 'JetBrains Mono', monospace; font-size: 11px;
          padding: 4px 12px; border-radius: 20px; letter-spacing: 0.1em;
          margin-bottom: 20px;
        }
        .cb-title { font-size: clamp(28px, 5vw, 48px); font-weight: 800; margin: 0 0 12px; color: #fff; }
        .cb-title span { color: #7c3aed; }
        .cb-tagline { font-size: 16px; color: #888; max-width: 480px; margin: 0 auto 32px; line-height: 1.6; }
        .cb-install {
          background: #111; border: 1px solid #222; border-radius: 8px;
          padding: 12px 20px; font-family: monospace; font-size: 13px;
          color: #10b981; display: inline-block; margin-bottom: 8px;
        }
        .cb-terminal {
          background: #111; border: 1px solid #1e1e3a; border-radius: 12px;
          max-width: 600px; margin: 0 auto; overflow: hidden;
        }
        .cb-terminal-bar {
          background: #1a1a2e; padding: 10px 16px;
          display: flex; align-items: center; gap: 8px;
        }
        .cb-dot { width: 10px; height: 10px; border-radius: 50%; }
        .cb-terminal-body { padding: 20px; font-family: monospace; font-size: 12px; line-height: 1.8; }
        .cb-prompt { color: #7c3aed; }
        .cb-cmd { color: #e0e0e0; }
        .cb-output { color: #888; }
        .cb-file { color: #10b981; }
        .cb-warn { color: #f59e0b; }
        .cb-section { padding: 48px 24px; max-width: 800px; margin: 0 auto; }
        .cb-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 24px; }
        .cb-card {
          background: #111; border: 1px solid #1e1e3a; border-radius: 10px;
          padding: 20px; transition: border-color 0.2s;
        }
        .cb-card:hover { border-color: #7c3aed; }
        .cb-card-icon { font-size: 28px; margin-bottom: 10px; }
        .cb-card-title { font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 6px; }
        .cb-card-desc { font-size: 12px; color: #666; line-height: 1.6; }
        .cb-commands { width: 100%; border-collapse: collapse; margin-top: 16px; }
        .cb-commands th {
          text-align: left; font-family: monospace; font-size: 11px;
          color: #666; letter-spacing: 0.1em; padding: 8px 12px;
          border-bottom: 1px solid #1a1a1a;
        }
        .cb-commands td { 
          padding: 10px 12px; font-family: monospace; font-size: 12px;
          border-bottom: 1px solid #111;
        }
        .cb-cmd-name { color: #7c3aed; }
        .cb-cmd-desc { color: #888; }
        .cb-section-title {
          font-size: 13px; font-family: monospace; letter-spacing: 0.12em;
          color: #555; text-transform: uppercase; margin-bottom: 8px;
        }
        .cb-h2 { font-size: 22px; font-weight: 700; color: #fff; margin: 0 0 4px; }
        .cb-h2-sub { font-size: 13px; color: #666; margin-bottom: 0; }
        .cb-footer {
          border-top: 1px solid #1a1a1a; padding: 24px;
          text-align: center; font-family: monospace; font-size: 11px; color: #444;
        }
        .cb-github {
          display: inline-block; margin-top: 24px;
          background: rgba(124,58,237,0.1); border: 1px solid rgba(124,58,237,0.3);
          color: #a78bfa; padding: 10px 24px; border-radius: 8px;
          font-family: monospace; font-size: 13px; text-decoration: none;
          transition: all 0.2s;
        }
        .cb-github:hover { background: rgba(124,58,237,0.2); color: #c4b5fd; }
        .cb-divider { height: 1px; background: #1a1a1a; margin: 0; }
      `}</style>

      <div className="cb-page">
        {/* Hero */}
        <div className="cb-hero">
          <div className="cb-badge cb-mono">⚡ context-budget</div>
          <h1 className="cb-title">Know your <span>token cost</span><br />before you load.</h1>
          <p className="cb-tagline">
            Claude Code's 200K context window fills fast. Scan your workspace,
            check files, and tier your loads — before you burn the budget.
          </p>

          <div className="cb-install cb-mono">pip install context-budget</div>

          <div style={{marginBottom: 40}} />

          {/* Terminal demo */}
          <div className="cb-terminal">
            <div className="cb-terminal-bar">
              <div className="cb-dot" style={{background:'#ff5f57'}} />
              <div className="cb-dot" style={{background:'#febc2e'}} />
              <div className="cb-dot" style={{background:'#28c840'}} />
              <span className="cb-mono" style={{fontSize:11, color:'#555', marginLeft:8}}>~ workspace scan</span>
            </div>
            <div className="cb-terminal-body">
              <div><span className="cb-prompt">❯ </span><span className="cb-cmd">ctx scan .</span></div>
              <div className="cb-output" style={{marginTop:8}}>Scanning 47 files...</div>
              <div style={{marginTop:8}}>
                <span className="cb-file">M-memory/learning-log-archive.md</span>
                <span className="cb-output">  15,134 tokens  (7.6% window)  </span>
                <span className="cb-warn">🟡</span>
              </div>
              <div>
                <span className="cb-file">C-core/voice-dna.md</span>
                <span className="cb-output">                4,201 tokens  (2.1% window)  </span>
                <span style={{color:'#10b981'}}>🟢</span>
              </div>
              <div>
                <span className="cb-file">M-memory/SESSION-BRIEF.md</span>
                <span className="cb-output">           1,656 tokens  (0.8% window)  </span>
                <span style={{color:'#10b981'}}>🟢</span>
              </div>
              <div className="cb-output" style={{marginTop:8}}>─────────────────────────────────────────</div>
              <div style={{color:'#e0e0e0', marginTop:4}}>
                Total: <span style={{color:'#10b981'}}>47 files</span>  ·  
                <span style={{color:'#f59e0b'}}> 38,421 tokens</span>  ·  
                <span style={{color:'#666'}}> 19.2% of 200K</span>
              </div>
            </div>
          </div>
        </div>

        {/* Why it exists */}
        <div className="cb-section">
          <p className="cb-section-title">Why it exists</p>
          <h2 className="cb-h2">Stop flying blind on context.</h2>
          <p className="cb-h2-sub" style={{color:'#666', fontSize:14, marginTop:6, lineHeight:1.7}}>
            Every file you load into Claude Code costs tokens. Most developers have no idea 
            which files are quietly eating their budget — until the window fills up.
          </p>

          <div className="cb-cards">
            <div className="cb-card">
              <div className="cb-card-icon">🔍</div>
              <div className="cb-card-title">Scan your workspace</div>
              <div className="cb-card-desc">Rank every file by token cost. Know what's expensive before you load it.</div>
            </div>
            <div className="cb-card">
              <div className="cb-card-icon">⚖️</div>
              <div className="cb-card-title">Check specific files</div>
              <div className="cb-card-desc">Sum the cost of any set of files. Model how much budget a load plan consumes.</div>
            </div>
            <div className="cb-card">
              <div className="cb-card-icon">📊</div>
              <div className="cb-card-title">Tier your loads</div>
              <div className="cb-card-desc">Map files to CLAUDE.md loading tiers so you load light and load smart.</div>
            </div>
          </div>
        </div>

        <div className="cb-divider" />

        {/* Commands */}
        <div className="cb-section">
          <p className="cb-section-title">Commands</p>
          <h2 className="cb-h2">Three commands. That's it.</h2>
          <table className="cb-commands">
            <thead>
              <tr>
                <th>COMMAND</th>
                <th>WHAT IT DOES</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="cb-cmd-name">ctx scan PATH</span></td>
                <td><span className="cb-cmd-desc">Rank all files in PATH by token cost, with % of 200K window</span></td>
              </tr>
              <tr>
                <td><span className="cb-cmd-name">ctx check FILE...</span></td>
                <td><span className="cb-cmd-desc">Sum the token cost of a specific set of files</span></td>
              </tr>
              <tr>
                <td><span className="cb-cmd-name">ctx tier PATH</span></td>
                <td><span className="cb-cmd-desc">Map files to their CLAUDE.md loading tier (T1/T2/T3)</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="cb-divider" />

        {/* Install */}
        <div className="cb-section" style={{textAlign:'center'}}>
          <p className="cb-section-title">Install</p>
          <h2 className="cb-h2">One dependency. One file.</h2>
          <p style={{color:'#666', fontSize:13, marginTop:8, marginBottom:24}}>
            419 lines of Python. Requires only <code style={{color:'#7c3aed'}}>tiktoken</code>.
          </p>
          <div className="cb-terminal" style={{textAlign:'left', maxWidth:420, margin:'0 auto'}}>
            <div className="cb-terminal-bar">
              <div className="cb-dot" style={{background:'#ff5f57'}} />
              <div className="cb-dot" style={{background:'#febc2e'}} />
              <div className="cb-dot" style={{background:'#28c840'}} />
            </div>
            <div className="cb-terminal-body">
              <div><span className="cb-prompt">❯ </span><span className="cb-cmd">pip install tiktoken</span></div>
              <div><span className="cb-prompt">❯ </span><span className="cb-cmd">pip install context-budget</span></div>
              <div style={{marginTop:8}}><span className="cb-prompt">❯ </span><span className="cb-cmd">ctx scan .</span></div>
            </div>
          </div>
          <a 
            href="https://github.com/RLASAF12/context-budget" 
            target="_blank" 
            rel="noopener noreferrer"
            className="cb-github"
          >
            ↗ View on GitHub
          </a>
        </div>

        {/* Footer */}
        <div className="cb-footer cb-mono">
          Built by Ben — prototype builder agent — 2026-05-26
          <br />
          <span style={{color:'#333'}}>Part of Harel Asaf's Build Lab</span>
        </div>
      </div>
    </>
  );
}
