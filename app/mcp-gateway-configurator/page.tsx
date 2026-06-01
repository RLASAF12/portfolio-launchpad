'use client';
import { useState } from 'react';
import SubpageNav from '../components/SubpageNav';

interface Tool {
  id: number;
  name: string;
  description: string;
  endpoint: string;
  method: string;
}

let nextId = 1;

export default function MCPGatewayConfiguratorPage() {
  const [gatewayName, setGatewayName] = useState('');
  const [version, setVersion] = useState('1.0.0');
  const [authType, setAuthType] = useState<'none' | 'api_key'>('none');
  const [headerName, setHeaderName] = useState('X-API-Key');
  const [rateLimit, setRateLimit] = useState(100);
  const [tools, setTools] = useState<Tool[]>([]);
  const [generated, setGenerated] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedDocker, setCopiedDocker] = useState(false);

  const addTool = () => {
    setTools(prev => [...prev, { id: nextId++, name: '', description: '', endpoint: '', method: 'POST' }]);
    setGenerated(false);
  };

  const updateTool = (id: number, field: keyof Tool, value: string) => {
    setTools(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
    setGenerated(false);
  };

  const removeTool = (id: number) => {
    setTools(prev => prev.filter(t => t.id !== id));
    setGenerated(false);
  };

  const config = {
    gateway: {
      name: gatewayName || 'my-mcp-gateway',
      version,
      ...(authType === 'api_key' ? { auth: { type: 'api_key', header: headerName } } : {}),
      rate_limit: { requests_per_minute: rateLimit },
    },
    tools: tools.map(({ name, description, endpoint, method }) => ({
      name: name || 'unnamed-tool',
      description: description || '',
      transport: { type: 'http', url: endpoint || 'https://api.example.com', method },
    })),
  };

  const configJson = JSON.stringify(config, null, 2);
  const dockerCmd = `docker run -d \\
  --name ${gatewayName || 'my-mcp-gateway'} \\
  -p 8080:8080 \\
  -v $(pwd)/mcp-gateway.json:/config/gateway.json \\
  ghcr.io/modelcontextprotocol/mcp-gateway:latest \\
  --config /config/gateway.json`;

  const copyToClipboard = async (text: string, setter: (v: boolean) => void) => {
    try { await navigator.clipboard.writeText(text); setter(true); setTimeout(() => setter(false), 2000); } catch {}
  };

  return (
    <>
      <SubpageNav title="MCP Gateway Configurator" />
      <style>{`
        .mgc { font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace; background: #0a0a0f; color: #c8ccd4; min-height: 100vh; }
        .mgc-hero { text-align: center; padding: 56px 24px 40px; background: linear-gradient(180deg, #0d1117 0%, #0a0a0f 100%); border-bottom: 1px solid #1e2433; }
        .mgc-badge { display: inline-block; background: rgba(139,92,246,0.12); border: 1px solid rgba(139,92,246,0.35); color: #a78bfa; font-size: 11px; padding: 4px 14px; border-radius: 20px; letter-spacing: 0.1em; margin-bottom: 20px; text-transform: uppercase; }
        .mgc-title { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: clamp(28px, 5vw, 44px); font-weight: 800; margin: 0 0 10px; color: #fff; }
        .mgc-title span { background: linear-gradient(135deg, #8b5cf6, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .mgc-sub { font-family: -apple-system, sans-serif; font-size: 16px; color: #8892a4; max-width: 580px; margin: 0 auto; line-height: 1.6; }
        .mgc-main { max-width: 720px; margin: 0 auto; padding: 32px 24px 80px; }
        .mgc-section { background: #12141c; border: 1px solid #1e2433; border-radius: 12px; padding: 24px; margin-bottom: 20px; }
        .mgc-section-title { font-family: -apple-system, sans-serif; font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; color: #8b5cf6; margin: 0 0 20px; font-weight: 600; }
        .mgc-row { display: flex; gap: 12px; margin-bottom: 14px; flex-wrap: wrap; }
        .mgc-field { flex: 1; min-width: 200px; }
        .mgc-label { display: block; font-family: -apple-system, sans-serif; font-size: 12px; color: #6b7280; margin-bottom: 6px; letter-spacing: 0.03em; }
        .mgc-input { width: 100%; background: #0a0c14; border: 1px solid #2a2f3c; border-radius: 8px; padding: 10px 14px; color: #e0e0e0; font-family: inherit; font-size: 14px; outline: none; transition: border-color 0.15s; box-sizing: border-box; }
        .mgc-input:focus { border-color: #8b5cf6; }
        .mgc-select { appearance: none; background: #0a0c14 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 5l3 3 3-3' stroke='%236b7280' stroke-width='1.5' fill='none'/%3E%3C/svg%3E") no-repeat right 12px center; padding-right: 32px; }
        .mgc-tool-row { background: #0d0f17; border: 1px solid #1e2433; border-radius: 10px; padding: 16px; margin-bottom: 12px; position: relative; }
        .mgc-tool-num { position: absolute; top: 8px; left: 12px; font-size: 10px; color: #4a5568; }
        .mgc-remove { position: absolute; top: 8px; right: 8px; background: none; border: 1px solid #3b1818; color: #ef4444; font-size: 11px; padding: 2px 10px; border-radius: 6px; cursor: pointer; font-family: -apple-system, sans-serif; transition: all 0.15s; }
        .mgc-remove:hover { background: #3b1818; }
        .mgc-add { display: inline-flex; align-items: center; gap: 6px; background: rgba(139,92,246,0.1); border: 1px dashed rgba(139,92,246,0.35); color: #a78bfa; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-family: -apple-system, sans-serif; font-size: 13px; transition: all 0.15s; }
        .mgc-add:hover { background: rgba(139,92,246,0.18); }
        .mgc-gen { display: block; width: 100%; padding: 14px; background: linear-gradient(135deg, #7c3aed, #06b6d4); border: none; border-radius: 10px; color: #fff; font-family: -apple-system, sans-serif; font-size: 15px; font-weight: 700; cursor: pointer; letter-spacing: 0.02em; transition: opacity 0.15s; margin-top: 8px; }
        .mgc-gen:hover { opacity: 0.9; }
        .mgc-gen:disabled { opacity: 0.4; cursor: not-allowed; }
        .mgc-output { position: relative; }
        .mgc-code { background: #0a0c14; border: 1px solid #1e2433; border-radius: 8px; padding: 16px; overflow-x: auto; white-space: pre; font-size: 12px; line-height: 1.6; color: #a5d6ff; max-height: 400px; }
        .mgc-copy { position: absolute; top: 8px; right: 8px; background: #1e2433; border: 1px solid #2a2f3c; color: #c8ccd4; font-size: 11px; padding: 4px 12px; border-radius: 6px; cursor: pointer; font-family: -apple-system, sans-serif; transition: all 0.15s; }
        .mgc-copy:hover { background: #2a2f3c; }
        .mgc-copy-ok { background: #064e3b; border-color: #10b981; color: #34d399; }
        .mgc-output-label { font-family: -apple-system, sans-serif; font-size: 12px; color: #6b7280; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.06em; }
        .mgc-empty { text-align: center; color: #4a5568; padding: 20px; font-family: -apple-system, sans-serif; font-size: 13px; }
        .mgc-footer { text-align: center; padding: 40px 24px; font-family: -apple-system, sans-serif; font-size: 12px; color: #4a5568; border-top: 1px solid #1e2433; }
        .mgc-footer a { color: #8b5cf6; text-decoration: none; }
        .mgc-footer a:hover { text-decoration: underline; }
        @media (max-width: 500px) { .mgc-row { flex-direction: column; } .mgc-field { min-width: 0; } }
      `}</style>
      <div className="mgc">
        <div className="mgc-hero">
          <div className="mgc-badge">MCP Stateless Core</div>
          <h1 className="mgc-title">MCP Gateway <span>Configurator</span></h1>
          <p className="mgc-sub">Configure your stateless MCP gateway in seconds. Set auth, rate limits, and tool endpoints — get a ready-to-deploy JSON config and Docker command.</p>
        </div>
        <div className="mgc-main">
          <div className="mgc-section">
            <div className="mgc-section-title">Gateway Settings</div>
            <div className="mgc-row">
              <div className="mgc-field">
                <label className="mgc-label">Gateway Name</label>
                <input className="mgc-input" placeholder="my-mcp-gateway" value={gatewayName} onChange={e => { setGatewayName(e.target.value); setGenerated(false); }} />
              </div>
              <div className="mgc-field" style={{ maxWidth: 140 }}>
                <label className="mgc-label">Version</label>
                <input className="mgc-input" placeholder="1.0.0" value={version} onChange={e => { setVersion(e.target.value); setGenerated(false); }} />
              </div>
            </div>
            <div className="mgc-row">
              <div className="mgc-field">
                <label className="mgc-label">Auth Type</label>
                <select className="mgc-input mgc-select" value={authType} onChange={e => { setAuthType(e.target.value as 'none' | 'api_key'); setGenerated(false); }}>
                  <option value="none">None</option>
                  <option value="api_key">API Key</option>
                </select>
              </div>
              {authType === 'api_key' && (
                <div className="mgc-field">
                  <label className="mgc-label">Header Name</label>
                  <input className="mgc-input" placeholder="X-API-Key" value={headerName} onChange={e => { setHeaderName(e.target.value); setGenerated(false); }} />
                </div>
              )}
              <div className="mgc-field" style={{ maxWidth: 180 }}>
                <label className="mgc-label">Rate Limit (req/min)</label>
                <input className="mgc-input" type="number" min={1} value={rateLimit} onChange={e => { setRateLimit(Number(e.target.value) || 100); setGenerated(false); }} />
              </div>
            </div>
          </div>

          <div className="mgc-section">
            <div className="mgc-section-title">Tools</div>
            {tools.length === 0 && <div className="mgc-empty">No tools added yet. Click below to add your first tool endpoint.</div>}
            {tools.map((tool, idx) => (
              <div className="mgc-tool-row" key={tool.id}>
                <span className="mgc-tool-num">#{idx + 1}</span>
                <button className="mgc-remove" onClick={() => removeTool(tool.id)}>Remove</button>
                <div className="mgc-row" style={{ marginTop: 12 }}>
                  <div className="mgc-field">
                    <label className="mgc-label">Tool Name</label>
                    <input className="mgc-input" placeholder="web-search" value={tool.name} onChange={e => updateTool(tool.id, 'name', e.target.value)} />
                  </div>
                  <div className="mgc-field" style={{ maxWidth: 120 }}>
                    <label className="mgc-label">Method</label>
                    <select className="mgc-input mgc-select" value={tool.method} onChange={e => updateTool(tool.id, 'method', e.target.value)}>
                      <option value="POST">POST</option>
                      <option value="GET">GET</option>
                    </select>
                  </div>
                </div>
                <div className="mgc-row">
                  <div className="mgc-field">
                    <label className="mgc-label">Description</label>
                    <input className="mgc-input" placeholder="Search the web for results" value={tool.description} onChange={e => updateTool(tool.id, 'description', e.target.value)} />
                  </div>
                </div>
                <div className="mgc-row">
                  <div className="mgc-field">
                    <label className="mgc-label">HTTP Endpoint</label>
                    <input className="mgc-input" placeholder="https://api.example.com/search" value={tool.endpoint} onChange={e => updateTool(tool.id, 'endpoint', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
            <button className="mgc-add" onClick={addTool}>+ Add Tool</button>
          </div>

          <button className="mgc-gen" onClick={() => setGenerated(true)} disabled={tools.length === 0}>
            Generate Config
          </button>

          {generated && (
            <div style={{ marginTop: 24 }}>
              <div className="mgc-section">
                <div className="mgc-section-title">Output</div>
                <div style={{ marginBottom: 20 }}>
                  <div className="mgc-output-label">gateway.json</div>
                  <div className="mgc-output">
                    <button className={`mgc-copy ${copiedJson ? 'mgc-copy-ok' : ''}`} onClick={() => copyToClipboard(configJson, setCopiedJson)}>{copiedJson ? 'Copied!' : 'Copy'}</button>
                    <pre className="mgc-code">{configJson}</pre>
                  </div>
                </div>
                <div>
                  <div className="mgc-output-label">Docker Run</div>
                  <div className="mgc-output">
                    <button className={`mgc-copy ${copiedDocker ? 'mgc-copy-ok' : ''}`} onClick={() => copyToClipboard(dockerCmd, setCopiedDocker)}>{copiedDocker ? 'Copied!' : 'Copy'}</button>
                    <pre className="mgc-code">{dockerCmd}</pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mgc-footer">
          Built by <a href="/">Harel Asaf</a> · Inspired by the MCP Stateless Core RC · Zero auth, zero cost
        </div>
      </div>
    </>
  );
}
