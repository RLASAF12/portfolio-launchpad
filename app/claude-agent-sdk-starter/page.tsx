import SubpageNav from '../components/SubpageNav';

export const metadata = {
  title: 'MCP Gateway Starter',
  description: 'A minimal, production-ready MCP HTTP server template in Node.js/TypeScript.',
};

export default function MCPGatewayStarterPage() {
  return (
    <>
      <SubpageNav title="MCP Gateway Starter" />
      <style>{`
        .mgs { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0a0a; color: #e0e0e0; min-height: 100vh; }
        .mgs * { box-sizing: border-box; }
        .mgs-hero { text-align: center; padding: 64px 24px 48px; background: linear-gradient(180deg, #0d1117 0%, #0a0a0a 100%); border-bottom: 1px solid #1b2230; }
        .mgs-badge { display: inline-block; background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.35); color: #34d399; font-family: monospace; font-size: 11px; padding: 4px 14px; border-radius: 20px; letter-spacing: 0.1em; margin-bottom: 20px; }
        .mgs-title { font-size: clamp(30px, 5vw, 48px); font-weight: 800; margin: 0 0 14px; color: #fff; }
        .mgs-title span { background: linear-gradient(135deg, #10b981, #3b82f6); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
        .mgs-sub { font-size: clamp(15px, 2.5vw, 19px); color: #9aa4b2; max-width: 620px; margin: 0 auto 28px; line-height: 1.55; }
        .mgs-cta-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .mgs-btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 22px; border-radius: 10px; font-size: 14px; font-weight: 600; text-decoration: none; transition: transform 0.12s, background 0.15s; }
        .mgs-btn-primary { background: linear-gradient(135deg, #10b981, #059669); color: #fff; }
        .mgs-btn-primary:hover { transform: translateY(-1px); }
        .mgs-btn-ghost { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); color: #e0e0e0; }
        .mgs-btn-ghost:hover { background: rgba(255,255,255,0.08); }
        .mgs-wrap { max-width: 880px; margin: 0 auto; padding: 48px 24px; }
        .mgs-section-label { font-family: monospace; font-size: 12px; color: #10b981; letter-spacing: 0.12em; text-transform: uppercase; margin: 0 0 18px; }
        .mgs-h2 { font-size: clamp(22px, 4vw, 30px); font-weight: 700; color: #fff; margin: 0 0 28px; }
        .mgs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 16px; }
        .mgs-card { background: #0f141b; border: 1px solid #1b2230; border-radius: 14px; padding: 22px; }
        .mgs-card-icon { font-size: 22px; margin-bottom: 12px; }
        .mgs-card-title { font-size: 15px; font-weight: 700; color: #fff; margin: 0 0 6px; }
        .mgs-card-text { font-size: 13.5px; color: #8b95a3; line-height: 1.5; margin: 0; }
        .mgs-code { background: #0d1117; border: 1px solid #1b2230; border-radius: 12px; padding: 20px; overflow-x: auto; font-family: 'SF Mono', Menlo, monospace; font-size: 13px; line-height: 1.7; color: #c9d1d9; margin: 0 0 16px; }
        .mgs-code .c { color: #6b7785; }
        .mgs-code .g { color: #34d399; }
        .mgs-code .b { color: #60a5fa; }
        .mgs-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
        .mgs-table th { text-align: left; color: #6b7785; font-weight: 600; padding: 10px 12px; border-bottom: 1px solid #1b2230; font-family: monospace; font-size: 12px; letter-spacing: 0.04em; }
        .mgs-table td { padding: 11px 12px; border-bottom: 1px solid #141a22; color: #c2cad4; vertical-align: top; }
        .mgs-table td code { color: #34d399; font-family: 'SF Mono', Menlo, monospace; font-size: 12.5px; }
        .mgs-deploy { display: flex; gap: 10px; flex-wrap: wrap; }
        .mgs-chip { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 8px 14px; font-size: 13px; color: #c2cad4; }
        .mgs-foot { text-align: center; padding: 48px 24px 64px; border-top: 1px solid #141a22; }
        .mgs-foot-note { font-size: 13px; color: #6b7785; margin-top: 18px; }
        @media (max-width: 480px) { .mgs-wrap { padding: 36px 18px; } }
      `}</style>

      <div className="mgs">
        <section className="mgs-hero">
          <span className="mgs-badge">v0.1 · OPEN SOURCE</span>
          <h1 className="mgs-title">MCP <span>Gateway Starter</span></h1>
          <p className="mgs-sub">
            A minimal, production-ready Model Context Protocol HTTP server template in
            Node.js + TypeScript. Bearer auth, rate limiting, URL versioning, and a
            Dockerfile — clone it, set one env var, deploy in minutes.
          </p>
          <div className="mgs-cta-row">
            <a className="mgs-btn mgs-btn-primary" href="https://github.com/RLASAF12/mcp-gateway-starter" target="_blank" rel="noopener noreferrer">★ View on GitHub</a>
            <a className="mgs-btn mgs-btn-ghost" href="#quickstart">Quick start ↓</a>
          </div>
        </section>

        <div className="mgs-wrap">
          <p className="mgs-section-label">Why it exists</p>
          <h2 className="mgs-h2">MCP went stateless. Production deployments hit the same wall.</h2>
          <p className="mgs-card-text" style={{ fontSize: '15px', lineHeight: 1.65, marginBottom: '8px' }}>
            The MCP stateless core RC shipped in 2026. Suddenly everyone building remote MCP
            servers needs the same plumbing: auth, rate limiting, versioning, and a way to run
            horizontally behind a load balancer. This is the reference starter that answers all of
            it — no framework magic, no toy stdio server. Just an HTTP endpoint you can ship.
          </p>
        </div>

        <div className="mgs-wrap" style={{ paddingTop: 0 }}>
          <p className="mgs-section-label">What you get</p>
          <div className="mgs-grid">
            <div className="mgs-card">
              <div className="mgs-card-icon">🔐</div>
              <h3 className="mgs-card-title">Bearer token auth</h3>
              <p className="mgs-card-text">Validated on every MCP request. Health check stays open for your load balancer.</p>
            </div>
            <div className="mgs-card">
              <div className="mgs-card-icon">⏱️</div>
              <h3 className="mgs-card-title">Rate limiting</h3>
              <p className="mgs-card-text">In-memory limiter at 100 req/min per IP. Swap in Redis for distributed scale.</p>
            </div>
            <div className="mgs-card">
              <div className="mgs-card-icon">🔢</div>
              <h3 className="mgs-card-title">URL versioning</h3>
              <p className="mgs-card-text">Versioned endpoint at <code style={{ color: '#34d399' }}>/v1/mcp</code> so you can evolve without breaking clients.</p>
            </div>
            <div className="mgs-card">
              <div className="mgs-card-icon">📦</div>
              <h3 className="mgs-card-title">JSON-RPC 2.0 dispatch</h3>
              <p className="mgs-card-text"><code style={{ color: '#34d399' }}>tools/list</code> and <code style={{ color: '#34d399' }}>tools/call</code> wired up with 3 starter tools.</p>
            </div>
            <div className="mgs-card">
              <div className="mgs-card-icon">🐳</div>
              <h3 className="mgs-card-title">Dockerfile included</h3>
              <p className="mgs-card-text">node:20-alpine, non-root user, production-only deps. Ready for any platform.</p>
            </div>
            <div className="mgs-card">
              <div className="mgs-card-icon">⚡</div>
              <h3 className="mgs-card-title">Zero framework magic</h3>
              <p className="mgs-card-text">Express + ~150 lines of TypeScript. Read the whole thing in one sitting.</p>
            </div>
          </div>
        </div>

        <div className="mgs-wrap" style={{ paddingTop: 0 }} id="quickstart">
          <p className="mgs-section-label">Quick start</p>
          <h2 className="mgs-h2">Running in three commands</h2>
          <pre className="mgs-code">
<span className="c"># clone, install, configure</span>{'\n'}
git clone https://github.com/RLASAF12/mcp-gateway-starter{'\n'}
cd mcp-gateway-starter && npm install{'\n'}
cp .env.example .env   <span className="c"># set BEARER_TOKEN</span>{'\n'}
npm run dev{'\n\n'}
<span className="c"># list tools</span>{'\n'}
curl -X POST http://localhost:3000<span className="b">/v1/mcp</span> \{'\n'}
  -H <span className="g">"Authorization: Bearer your-secret-token-here"</span> \{'\n'}
  -H <span className="g">"Content-Type: application/json"</span> \{'\n'}
  -d <span className="g">{`'{"jsonrpc":"2.0","id":1,"method":"tools/list"}'`}</span>
          </pre>
        </div>

        <div className="mgs-wrap" style={{ paddingTop: 0 }}>
          <p className="mgs-section-label">Starter tools</p>
          <h2 className="mgs-h2">Swap the stubs for your real APIs</h2>
          <table className="mgs-table">
            <thead>
              <tr><th>Tool</th><th>What it does</th></tr>
            </thead>
            <tbody>
              <tr><td><code>ping</code></td><td>Liveness check — returns pong. The "hello world" of the dispatch loop.</td></tr>
              <tr><td><code>echo</code></td><td>Returns its arguments back. Shows how params flow through <code>tools/call</code>.</td></tr>
              <tr><td><code>weather_stub</code></td><td>Returns fake weather data. Replace with OpenWeatherMap or any real API.</td></tr>
            </tbody>
          </table>
        </div>

        <div className="mgs-wrap" style={{ paddingTop: 0 }}>
          <p className="mgs-section-label">Deploy anywhere</p>
          <h2 className="mgs-h2">Runs behind any load balancer</h2>
          <div className="mgs-deploy">
            <span className="mgs-chip">🪰 Fly.io</span>
            <span className="mgs-chip">🚂 Railway</span>
            <span className="mgs-chip">🐳 Docker</span>
            <span className="mgs-chip">☁️ Any Node host</span>
          </div>
        </div>

        <footer className="mgs-foot">
          <a className="mgs-btn mgs-btn-primary" href="https://github.com/RLASAF12/mcp-gateway-starter" target="_blank" rel="noopener noreferrer">★ Star it on GitHub</a>
          <p className="mgs-foot-note">Built in the Build Lab · A Harel Asaf prototype</p>
        </footer>
      </div>
    </>
  );
}
