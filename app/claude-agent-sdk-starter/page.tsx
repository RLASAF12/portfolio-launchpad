import SubpageNav from '../components/SubpageNav';

export const metadata = {
  title: 'Claude Agent SDK Starter',
  description: 'A minimal, runnable TypeScript starter kit for the Anthropic Claude Agent SDK.',
};

export default function ClaudeAgentSdkStarterPage() {
  return (
    <>
      <SubpageNav title="Claude Agent SDK Starter" />
      <style>{`
        .cas { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0a0a; color: #e6e1dc; min-height: 100vh; }
        .cas * { box-sizing: border-box; }
        .cas-hero { text-align: center; padding: 64px 24px 48px; background: linear-gradient(180deg, #160d08 0%, #0a0a0a 100%); border-bottom: 1px solid #2a1c14; }
        .cas-badge { display: inline-block; background: rgba(204,120,92,0.12); border: 1px solid rgba(204,120,92,0.4); color: #e0a285; font-family: monospace; font-size: 11px; padding: 4px 14px; border-radius: 20px; letter-spacing: 0.1em; margin-bottom: 20px; }
        .cas-title { font-size: clamp(30px, 5vw, 48px); font-weight: 800; margin: 0 0 14px; color: #fff; }
        .cas-title span { background: linear-gradient(135deg, #cc785c, #e0a285); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .cas-sub { font-size: clamp(15px, 2.5vw, 19px); color: #a89a90; max-width: 640px; margin: 0 auto 28px; line-height: 1.55; }
        .cas-cta-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .cas-btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 22px; border-radius: 10px; font-size: 14px; font-weight: 600; text-decoration: none; transition: transform 0.12s, background 0.15s; }
        .cas-btn-primary { background: linear-gradient(135deg, #cc785c, #b25e42); color: #fff; }
        .cas-btn-primary:hover { transform: translateY(-1px); }
        .cas-btn-ghost { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); color: #e6e1dc; }
        .cas-btn-ghost:hover { background: rgba(255,255,255,0.08); }
        .cas-wrap { max-width: 880px; margin: 0 auto; padding: 48px 24px; }
        .cas-section-label { font-family: monospace; font-size: 12px; color: #cc785c; letter-spacing: 0.12em; text-transform: uppercase; margin: 0 0 18px; }
        .cas-h2 { font-size: clamp(22px, 4vw, 30px); font-weight: 700; color: #fff; margin: 0 0 28px; }
        .cas-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 16px; }
        .cas-card { background: #14100d; border: 1px solid #2a1c14; border-radius: 14px; padding: 22px; }
        .cas-card-icon { font-size: 22px; margin-bottom: 12px; }
        .cas-card-title { font-size: 15px; font-weight: 700; color: #fff; margin: 0 0 6px; }
        .cas-card-text { font-size: 13.5px; color: #9a8d83; line-height: 1.5; margin: 0; }
        .cas-code { background: #120d0a; border: 1px solid #2a1c14; border-radius: 12px; padding: 20px; overflow-x: auto; font-family: 'SF Mono', Menlo, monospace; font-size: 13px; line-height: 1.7; color: #d6cec6; margin: 0 0 16px; }
        .cas-code .c { color: #7d6e63; }
        .cas-code .g { color: #e0a285; }
        .cas-code .b { color: #d8a23f; }
        .cas-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
        .cas-table th { text-align: left; color: #7d6e63; font-weight: 600; padding: 10px 12px; border-bottom: 1px solid #2a1c14; font-family: monospace; font-size: 12px; letter-spacing: 0.04em; }
        .cas-table td { padding: 11px 12px; border-bottom: 1px solid #1c1510; color: #c6bbb1; vertical-align: top; }
        .cas-table td code { color: #e0a285; font-family: 'SF Mono', Menlo, monospace; font-size: 12.5px; }
        .cas-deploy { display: flex; gap: 10px; flex-wrap: wrap; }
        .cas-chip { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 8px 14px; font-size: 13px; color: #c6bbb1; }
        .cas-foot { text-align: center; padding: 48px 24px 64px; border-top: 1px solid #1c1510; }
        .cas-foot-note { font-size: 13px; color: #7d6e63; margin-top: 18px; }
        @media (max-width: 480px) { .cas-wrap { padding: 36px 18px; } }
      `}</style>

      <div className="cas">
        <section className="cas-hero">
          <span className="cas-badge">v0.1 · OPEN SOURCE</span>
          <h1 className="cas-title">Claude <span>Agent SDK Starter</span></h1>
          <p className="cas-sub">
            A minimal, runnable TypeScript starter for Anthropic&apos;s Claude Agent SDK.
            Two real Zod-typed tools, the async iterator loop, and a clean structure —
            the working example the quickstart docs forgot to ship. Clone it, add your own
            tool in ~10 lines, run your agent.
          </p>
          <div className="cas-cta-row">
            <a className="cas-btn cas-btn-primary" href="https://github.com/RLASAF12/claude-agent-sdk-starter" target="_blank" rel="noopener noreferrer">★ View on GitHub</a>
            <a className="cas-btn cas-btn-ghost" href="#quickstart">Quick start ↓</a>
          </div>
        </section>

        <div className="cas-wrap">
          <p className="cas-section-label">Why it exists</p>
          <h2 className="cas-h2">The SDK is brand new. The clone-and-run repo wasn&apos;t.</h2>
          <p className="cas-card-text" style={{ fontSize: '15px', lineHeight: 1.65, marginBottom: '8px' }}>
            Anthropic shipped the Claude Agent SDK in 2026. The official quickstart docs explain
            the pieces, but search &ldquo;Claude Agent SDK TypeScript example&rdquo; and you find no clean,
            runnable GitHub repo. This fills that gap exactly: the async iterator pattern,
            in-process MCP tools, and Zod schemas — all the things every Claude developer needs to
            understand — shown in roughly 140 lines of readable code.
          </p>
        </div>

        <div className="cas-wrap" style={{ paddingTop: 0 }}>
          <p className="cas-section-label">What you get</p>
          <div className="cas-grid">
            <div className="cas-card">
              <div className="cas-card-icon">🔁</div>
              <h3 className="cas-card-title">Async iterator loop</h3>
              <p className="cas-card-text">Streams every message type — assistant, tool calls, and the final result — so you can see exactly how the agent thinks.</p>
            </div>
            <div className="cas-card">
              <div className="cas-card-icon">🧰</div>
              <h3 className="cas-card-title">Two real tools</h3>
              <p className="cas-card-text"><code style={{ color: '#e0a285' }}>get_word_count</code> and <code style={{ color: '#e0a285' }}>get_timestamp</code> — in-process MCP tools, not toy stubs.</p>
            </div>
            <div className="cas-card">
              <div className="cas-card-icon">✅</div>
              <h3 className="cas-card-title">Zod-typed inputs</h3>
              <p className="cas-card-text">Every tool input is validated with a Zod schema, so you get type safety and runtime checks for free.</p>
            </div>
            <div className="cas-card">
              <div className="cas-card-icon">📐</div>
              <h3 className="cas-card-title">Strict TypeScript</h3>
              <p className="cas-card-text">ES2022 + NodeNext + strict mode in <code style={{ color: '#e0a285' }}>tsconfig.json</code>. Sensible defaults, no config archaeology.</p>
            </div>
            <div className="cas-card">
              <div className="cas-card-icon">📄</div>
              <h3 className="cas-card-title">Docs that teach</h3>
              <p className="cas-card-text">README ships an architecture diagram, a tools table, and an &ldquo;add your own tool&rdquo; guide.</p>
            </div>
            <div className="cas-card">
              <div className="cas-card-icon">⚡</div>
              <h3 className="cas-card-title">Clone and run</h3>
              <p className="cas-card-text">Set one env var, <code style={{ color: '#e0a285' }}>npm install</code>, <code style={{ color: '#e0a285' }}>npm run dev</code>. Read the whole thing in one sitting.</p>
            </div>
          </div>
        </div>

        <div className="cas-wrap" style={{ paddingTop: 0 }} id="quickstart">
          <p className="cas-section-label">Quick start</p>
          <h2 className="cas-h2">Running in four commands</h2>
          <pre className="cas-code">
<span className="c"># clone, configure, install, run</span>{'\n'}
git clone https://github.com/RLASAF12/claude-agent-sdk-starter{'\n'}
cd claude-agent-sdk-starter{'\n'}
cp .env.example .env   <span className="c"># set ANTHROPIC_API_KEY</span>{'\n'}
npm install && npm run dev{'\n\n'}
<span className="c"># expected: Claude calls get_word_count + get_timestamp,</span>{'\n'}
<span className="c"># streaming each step to your terminal</span>
          </pre>
        </div>

        <div className="cas-wrap" style={{ paddingTop: 0 }}>
          <p className="cas-section-label">Starter tools</p>
          <h2 className="cas-h2">Swap the examples for your real tools</h2>
          <table className="cas-table">
            <thead>
              <tr><th>Tool</th><th>What it does</th></tr>
            </thead>
            <tbody>
              <tr><td><code>get_word_count</code></td><td>Counts words in a string. The simplest possible Zod-typed tool — the one to copy when adding your own.</td></tr>
              <tr><td><code>get_timestamp</code></td><td>Returns the current ISO timestamp. Shows a zero-argument tool and how results flow back to the model.</td></tr>
            </tbody>
          </table>
        </div>

        <div className="cas-wrap" style={{ paddingTop: 0 }}>
          <p className="cas-section-label">What&apos;s inside</p>
          <h2 className="cas-h2">Seven files, nothing you don&apos;t need</h2>
          <div className="cas-deploy">
            <span className="cas-chip">📦 @anthropic-ai/claude-code</span>
            <span className="cas-chip">🧪 zod</span>
            <span className="cas-chip">⚡ tsx</span>
            <span className="cas-chip">🟦 TypeScript 5.5</span>
          </div>
        </div>

        <footer className="cas-foot">
          <a className="cas-btn cas-btn-primary" href="https://github.com/RLASAF12/claude-agent-sdk-starter" target="_blank" rel="noopener noreferrer">★ Star it on GitHub</a>
          <p className="cas-foot-note">Built in the Build Lab · A Harel Asaf prototype</p>
        </footer>
      </div>
    </>
  );
}
