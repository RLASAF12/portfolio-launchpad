'use client';
import { useEffect } from 'react';
import SubpageNav from '../components/SubpageNav';

export default function RaceFloorPage() {
  useEffect(() => {
    // ── Scenarios ──────────────────────────────────────────────────────────────
    const SCENARIOS: Record<string, { resources: string[]; writes: string[][]; bad: string }> = {
      ticket: {
        resources: ['Ticket #47', 'Ticket #83', 'Ticket #121', 'Ticket #204'],
        writes: [
          ['status → RESOLVED', 'status → ESCALATED'],
          ['assigned → team-A', 'assigned → team-B'],
          ['priority → LOW', 'priority → HIGH'],
        ],
        bad: 'Customer received 2 contradictory emails',
      },
      doc: {
        resources: ['Q3 Report', 'Meeting Notes', 'Proposal v2', 'Sprint Plan'],
        writes: [
          ['section-3 ADDED', 'section-3 DELETED'],
          ['title → "FINAL"', 'title → "DRAFT v2"'],
          ['budget figure: $1.2M', 'budget figure: $980K'],
        ],
        bad: 'Document saved with conflicting figures',
      },
      db: {
        resources: ['users.balance', 'orders.status', 'inventory.qty', 'cart.total'],
        writes: [
          ['balance -= 50.00', 'balance -= 50.00'],
          ['status = shipped', 'status = cancelled'],
          ['qty = 0', 'qty = 3'],
        ],
        bad: 'Double-charge: $100 deducted instead of $50',
      },
      memory: {
        resources: ['Agent Memory', 'Plan State', 'Goal Stack', 'Context Buffer'],
        writes: [
          ['task_3 = complete', 'task_3 = pending'],
          ['phase = execution', 'phase = planning'],
          ['goal = "ship feature"', 'goal = "gather requirements"'],
        ],
        bad: 'Agent re-ran completed task, overwriting output',
      },
    };

    const COLORS = [
      '#f97316', '#3b82f6', '#22c55e', '#a855f7', '#ec4899',
      '#06b6d4', '#eab308', '#ef4444', '#14b8a6', '#8b5cf6',
      '#f43f5e', '#0ea5e9', '#84cc16', '#d946ef', '#fb923c',
      '#2dd4bf', '#fbbf24', '#60a5fa', '#34d399', '#c084fc',
    ];

    // ── State ──────────────────────────────────────────────────────────────────
    const canvas = document.getElementById('c') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    let agents: any[] = [], resources: any[] = [];
    let running = false, paused = false, colPending = false;
    let rafId: number | null = null, detected = 0, logTotal = 0;
    let lastColCheck = 0;
    let logData: any[] = [];

    const $ = (id: string) => document.getElementById(id) as HTMLElement;

    // ── Math helpers ───────────────────────────────────────────────────────────
    const nAgents = () => +(($('slAgent') as HTMLInputElement).value);
    const nRes = () => +(($('slRes') as HTMLInputElement).value);
    const scenario = () => SCENARIOS[($('scenarioSel') as HTMLSelectElement).value];

    function updateMath() {
      const n = nAgents(), c = n * (n - 1) / 2;
      $('vAgent').textContent = String(n);
      $('cfNum').textContent = String(c);
      $('hAgents').textContent = String(n);
      $('hConflicts').textContent = String(c);
    }
    $('slRes').addEventListener('input', () => {
      $('vRes').textContent = String(nRes());
    });
    $('slAgent').addEventListener('input', () => {
      updateMath();
      if (running) resetSim();
    });

    // ── Canvas resize ──────────────────────────────────────────────────────────
    function resize() {
      const wrap = canvas.parentElement!;
      canvas.width = wrap.offsetWidth;
      canvas.height = wrap.offsetHeight;
    }
    const onResize = () => { resize(); if (running) place(); };
    window.addEventListener('resize', onResize);

    // ── Place agents & resources ───────────────────────────────────────────────
    function place() {
      resize();
      const W = canvas.width, H = canvas.height;
      const sc = scenario();
      const rc = Math.min(nRes(), sc.resources.length);

      resources = [];
      for (let i = 0; i < rc; i++) {
        const a = (i / rc) * Math.PI * 2 - Math.PI / 2;
        const r = Math.min(W, H) * (rc === 1 ? 0 : 0.22);
        resources.push({
          x: W / 2 + Math.cos(a) * r, y: H / 2 + Math.sin(a) * r,
          label: sc.resources[i], contested: false, flash: 0,
        });
      }

      const ac = nAgents();
      agents = [];
      for (let i = 0; i < ac; i++) {
        const a = (i / ac) * Math.PI * 2;
        const r = Math.min(W, H) * 0.42;
        const sx = W / 2 + Math.cos(a) * r, sy = H / 2 + Math.sin(a) * r;
        agents.push({
          id: i, x: sx, y: sy, sx, sy,
          color: COLORS[i % COLORS.length],
          tri: i % resources.length,
          spd: 0.5 + Math.random() * 0.9,
          st: 'move',
          wait: 0,
          reached: false,
          trail: [],
        });
      }
    }

    // ── Animation loop ─────────────────────────────────────────────────────────
    function loop() {
      if (!running || paused || colPending) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      grid();
      drawResources();
      moveAgents();
      drawAgents();
      maybeCollide();
      rafId = requestAnimationFrame(loop);
    }

    function grid() {
      ctx.strokeStyle = '#12141c'; ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 44) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 44) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }
    }

    function drawResources() {
      resources.forEach(r => {
        if (r.flash > 0) { r.flash--; ctx.shadowColor = '#ef4444'; ctx.shadowBlur = 30; }
        else { ctx.shadowColor = r.contested ? '#ef4444' : '#f97316'; ctx.shadowBlur = r.contested ? 18 : 8; }

        ctx.beginPath(); ctx.arc(r.x, r.y, 36, 0, Math.PI * 2);
        ctx.strokeStyle = r.contested ? '#ef4444' : '#f97316'; ctx.lineWidth = 2; ctx.stroke();

        ctx.beginPath(); ctx.arc(r.x, r.y, 31, 0, Math.PI * 2);
        ctx.fillStyle = r.contested ? 'rgba(239,68,68,.12)' : 'rgba(249,115,22,.08)'; ctx.fill();

        ctx.shadowBlur = 0;
        ctx.textAlign = 'center';
        ctx.fillStyle = r.contested ? '#ef4444' : '#f97316';
        ctx.font = 'bold 11px SF Mono,monospace'; ctx.fillText(r.label, r.x, r.y - 4);
        ctx.fillStyle = '#475569';
        ctx.font = '9px SF Mono,monospace'; ctx.fillText('shared resource', r.x, r.y + 9);
        r.contested = false;
      });
    }

    function moveAgents() {
      agents.forEach(a => {
        if (a.st === 'idle') {
          if (--a.wait <= 0) {
            a.tri = Math.floor(Math.random() * resources.length);
            a.x = a.sx; a.y = a.sy;
            a.reached = false; a.st = 'move'; a.trail = [];
          }
          return;
        }
        const r = resources[a.tri];
        const dx = r.x - a.x, dy = r.y - a.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 34) {
          if (!a.reached) {
            a.reached = true; r.contested = true;
            addLog('ok', a.id, `Acquired ${r.label}`, r.label);
          }
          a.st = 'idle'; a.wait = 60 + Math.floor(Math.random() * 90);
        } else {
          a.trail.push({ x: a.x, y: a.y });
          if (a.trail.length > 9) a.trail.shift();
          a.x += (dx / d) * a.spd; a.y += (dy / d) * a.spd;
        }
      });
    }

    function drawAgents() {
      agents.forEach(a => {
        a.trail.forEach((t: any, i: number) => {
          ctx.beginPath(); ctx.arc(t.x, t.y, 3, 0, Math.PI * 2);
          const al = Math.floor((i / a.trail.length) * 70).toString(16).padStart(2, '0');
          ctx.fillStyle = a.color + al; ctx.fill();
        });
        ctx.shadowColor = a.color; ctx.shadowBlur = 14;
        ctx.beginPath(); ctx.arc(a.x, a.y, 12, 0, Math.PI * 2);
        ctx.fillStyle = a.color; ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#0a0b0e';
        ctx.font = 'bold 9px SF Mono,monospace'; ctx.textAlign = 'center';
        ctx.fillText('A' + a.id, a.x, a.y + 3);
      });
    }

    function maybeCollide() {
      if (Date.now() - lastColCheck < 250) return;
      lastColCheck = Date.now();
      resources.forEach((r) => {
        const at = agents.filter(a => {
          const dx = r.x - a.x, dy = r.y - a.y;
          return Math.sqrt(dx * dx + dy * dy) < 34 && a.reached;
        });
        if (at.length >= 2 && Math.random() < 0.07) {
          showCollision(at[0], at[1], r);
        }
      });
    }

    // ── Collision logic ────────────────────────────────────────────────────────
    function showCollision(A: any, B: any, r: any) {
      colPending = true;
      detected++;
      $('hDetected').textContent = String(detected);
      r.flash = 25;

      const sc = scenario();
      const wi = Math.floor(Math.random() * sc.writes.length);
      const [wA, wB] = sc.writes[wi];

      addLog('collision', `${A.id}+${B.id}`, `COLLISION on ${r.label}`, r.label);

      $('colDetails').innerHTML = `
        <div class="col-row">
          <div class="col-agent" style="color:${A.color}">● Agent-${A.id}</div>
          <div class="col-write">WRITE → ${r.label}: ${wA}</div>
        </div>
        <div class="col-row">
          <div class="col-agent" style="color:${B.color}">● Agent-${B.id}</div>
          <div class="col-write">WRITE → ${r.label}: ${wB}</div>
        </div>`;

      $('colWinner').innerHTML = `
        <div class="col-winner-hd">💀 Last Write Wins</div>
        <div class="col-winner-state">Final state: <strong>${wB}</strong></div>
        <div class="col-winner-bad">→ ${sc.bad}</div>`;

      $('colOverlay').classList.add('show');
    }

    function dismiss() {
      $('colOverlay').classList.remove('show');
      colPending = false;
      rafId = requestAnimationFrame(loop);
    }

    // ── Force collision ────────────────────────────────────────────────────────
    function forceCollision() {
      if (!running || paused || agents.length < 2 || resources.length < 1) return;
      const r = resources[0];
      [agents[0], agents[1]].forEach((a, i) => {
        a.x = r.x + (i === 0 ? -20 : 20); a.y = r.y;
        a.reached = true; a.st = 'idle'; a.wait = 250; a.tri = 0;
      });
      setTimeout(() => showCollision(agents[0], agents[1], r), 80);
    }

    // ── Controls ───────────────────────────────────────────────────────────────
    function startSim() {
      logData = []; logTotal = 0; detected = 0;
      $('hDetected').textContent = '0';
      $('logEntries').innerHTML = '';
      $('logCount').textContent = '0 events';

      place(); running = true; paused = false;

      $('startBtn').style.display = 'none';
      $('pauseBtn').style.display = 'block';
      $('injectBtn').style.display = 'block';
      $('statusPill').innerHTML =
        '<div class="dot dot-green"></div><span style="color:#22c55e">Running — agents competing for shared state</span>';

      rafId = requestAnimationFrame(loop);
    }

    function togglePause() {
      paused = !paused;
      $('pauseBtn').textContent = paused ? '▶ Resume' : '⏸ Pause';
      if (!paused) { colPending = false; rafId = requestAnimationFrame(loop); }
    }

    function resetSim() {
      running = false; paused = false; colPending = false;
      if (rafId) cancelAnimationFrame(rafId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      $('colOverlay').classList.remove('show');
      $('startBtn').style.display = 'block';
      $('pauseBtn').style.display = 'none';
      $('injectBtn').style.display = 'none';
      $('statusPill').innerHTML =
        '<div class="dot dot-orange"></div><span style="color:#f97316">Ready — press Start</span>';
      logData = []; logTotal = 0; detected = 0;
      $('hDetected').textContent = '0';
      $('logEntries').innerHTML = '';
      $('logCount').textContent = '0 events';
      idle();
    }

    // ── Log ───────────────────────────────────────────────────────────────────
    function addLog(type: string, ids: any, msg: string, res: string) {
      logTotal++;
      const t = new Date().toLocaleTimeString('en', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      logData.unshift({ type, ids, msg, res, t });
      if (logData.length > 60) logData.pop();
      renderLog();
    }

    function renderLog() {
      $('logCount').textContent = logTotal + ' events';
      const map: Record<string, string> = { ok: 'b-ok SUCCESS', collision: 'b-collision COLLISION', stale: 'b-stale STALE' };
      $('logEntries').innerHTML = logData.slice(0, 18).map(e => {
        const [cls, lbl] = map[e.type].split(' ');
        return `<div class="log-entry">
          <span class="log-time">${e.t}</span>
          <span class="log-badge ${cls}">${lbl}</span>
          <span class="log-msg">${e.msg}</span>
          <span class="log-res">↔ ${e.res}</span>
        </div>`;
      }).join('');
    }

    // ── Idle state ────────────────────────────────────────────────────────────
    function idle() {
      resize();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      grid();
      ctx.textAlign = 'center';
      ctx.fillStyle = '#1e2130'; ctx.font = '13px SF Mono,monospace';
      ctx.fillText('Configure agents & resources, then press Start →', canvas.width / 2, canvas.height / 2 - 18);
      ctx.fillStyle = '#475569'; ctx.font = '11px SF Mono,monospace';
      ctx.fillText('N agents + shared state = N×(N−1)/2 potential race conditions. Both writes succeed. One is silently lost.', canvas.width / 2, canvas.height / 2 + 12);
    }

    // ── Wire up controls ────────────────────────────────────────────────────────
    ($('startBtn') as HTMLButtonElement).onclick = startSim;
    ($('pauseBtn') as HTMLButtonElement).onclick = togglePause;
    ($('resetBtn') as HTMLButtonElement).onclick = resetSim;
    ($('injectBtn') as HTMLButtonElement).onclick = forceCollision;
    ($('dismissBtn') as HTMLButtonElement).onclick = dismiss;

    // ── Boot ──────────────────────────────────────────────────────────────────
    updateMath();
    idle();

    return () => {
      window.removeEventListener('resize', onResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <SubpageNav title="RaceFloor" />
      <style>{`
        .rf-app, .rf-app * { box-sizing: border-box; margin: 0; padding: 0; }
        .rf-app {
          background: #0a0b0e;
          color: #e2e8f0;
          font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
          height: calc(100vh - 42px);
          display: grid;
          grid-template-columns: 280px 1fr;
          grid-template-rows: 60px 1fr 200px;
          overflow: hidden;
        }
        .rf-app .header {
          grid-column: 1 / -1;
          background: #111218;
          border-bottom: 1px solid #1e2130;
          display: flex;
          align-items: center;
          padding: 0 20px;
          gap: 14px;
        }
        .rf-app .header-logo { font-size: 19px; font-weight: 700; color: #f97316; letter-spacing: -0.5px; }
        .rf-app .header-sub  { font-size: 12px; color: #475569; }
        .rf-app .header-stats { margin-left: auto; display: flex; gap: 28px; }
        .rf-app .stat { text-align: center; }
        .rf-app .stat-num   { font-size: 22px; font-weight: 700; color: #ef4444; line-height: 1; }
        .rf-app .stat-label { font-size: 10px; color: #64748b; margin-top: 2px; text-transform: uppercase; letter-spacing: .06em; }

        .rf-app .sidebar {
          background: #111218;
          border-right: 1px solid #1e2130;
          padding: 18px 16px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          overflow-y: auto;
        }
        .rf-app .ctrl-label {
          display: block;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: .07em;
          color: #94a3b8;
          margin-bottom: 7px;
        }
        .rf-app .slider-row { display: flex; align-items: center; gap: 10px; }
        .rf-app input[type=range] {
          flex: 1; -webkit-appearance: none;
          height: 4px; background: #1e2130; border-radius: 2px; outline: none;
        }
        .rf-app input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px; height: 16px; border-radius: 50%;
          background: #f97316; cursor: pointer;
        }
        .rf-app .sval { font-size: 17px; font-weight: 700; color: #f97316; width: 28px; text-align: right; }

        .rf-app select {
          width: 100%;
          background: #1a1d28;
          border: 1px solid #252938;
          color: #e2e8f0;
          padding: 8px 10px;
          border-radius: 6px;
          font-family: inherit;
          font-size: 12px;
          outline: none;
        }

        .rf-app .conflict-box {
          background: #0d0f16;
          border: 1px solid #1e2130;
          border-radius: 8px;
          padding: 14px;
          text-align: center;
        }
        .rf-app .cf-formula { font-size: 10px; color: #64748b; margin-bottom: 6px; }
        .rf-app .cf-num  { font-size: 44px; font-weight: 700; color: #ef4444; line-height: 1; }
        .rf-app .cf-unit { font-size: 11px; color: #94a3b8; margin-top: 3px; }

        .rf-app .btn {
          width: 100%; padding: 9px 12px;
          border-radius: 6px; border: none;
          font-family: inherit; font-size: 13px; font-weight: 600;
          cursor: pointer; transition: all .15s;
        }
        .rf-app .btn-primary   { background: #f97316; color: #0a0b0e; }
        .rf-app .btn-primary:hover   { background: #fb923c; }
        .rf-app .btn-secondary { background: #1e2130; color: #94a3b8; }
        .rf-app .btn-secondary:hover { background: #252938; }
        .rf-app .btn-danger    { background: #ef4444; color: #fff; }
        .rf-app .btn-danger:hover    { background: #f87171; }

        .rf-app .status-pill {
          display: flex; align-items: center; gap: 7px;
          font-size: 11px; padding: 6px 0;
        }
        .rf-app .dot { width: 8px; height: 8px; border-radius: 50%; }
        .rf-app .dot-green { background: #22c55e; animation: rf-pulse 1.5s infinite; }
        .rf-app .dot-orange { background: #f97316; }
        @keyframes rf-pulse { 0%,100%{opacity:1} 50%{opacity:.3} }

        .rf-app .tip {
          background: #0d0f16;
          border: 1px solid #1e2130;
          border-radius: 6px;
          padding: 10px;
          font-size: 11px;
          color: #64748b;
          line-height: 1.55;
        }
        .rf-app .tip strong { color: #94a3b8; }

        .rf-app .canvas-wrap {
          position: relative;
          overflow: hidden;
        }
        .rf-app canvas { display: block; width: 100%; height: 100%; }

        .rf-app .col-overlay {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(10,11,14,.96);
          border: 2px solid #ef4444;
          border-radius: 12px;
          padding: 22px 24px;
          min-width: 380px; max-width: 440px;
          display: none; z-index: 20;
        }
        .rf-app .col-overlay.show { display: block; }
        .rf-app .col-title {
          font-size: 13px; font-weight: 700; color: #ef4444;
          margin-bottom: 14px; display: flex; align-items: center; gap: 8px;
        }
        .rf-app .col-row {
          background: #111218; border-radius: 6px;
          padding: 9px 12px; margin-bottom: 7px; font-size: 12px;
        }
        .rf-app .col-agent { color: #64748b; margin-bottom: 3px; }
        .rf-app .col-write { color: #22c55e; }
        .rf-app .col-http200 {
          margin-top: 8px; padding: 7px 10px;
          background: #0d1117; border-radius: 5px;
          font-size: 11px; color: #64748b;
        }
        .rf-app .col-winner {
          background: #1a0a0a; border: 1px solid #ef4444;
          border-radius: 6px; padding: 10px 12px; margin-top: 10px; font-size: 12px;
        }
        .rf-app .col-winner-hd { color: #ef4444; font-weight: 600; margin-bottom: 4px; }
        .rf-app .col-winner-state { color: #fbbf24; }
        .rf-app .col-winner-bad { color: #ef4444; font-size: 11px; margin-top: 5px; }

        .rf-app .log-panel {
          grid-column: 1 / -1;
          background: #0d0f16;
          border-top: 1px solid #1e2130;
          padding: 10px 18px;
          overflow-y: auto;
          font-size: 12px;
        }
        .rf-app .log-hdr {
          font-size: 10px; text-transform: uppercase;
          letter-spacing: .08em; color: #64748b;
          margin-bottom: 7px; display: flex; gap: 16px;
        }
        .rf-app .log-entry {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 5px 0; border-bottom: 1px solid #12141c;
        }
        .rf-app .log-time  { color: #475569; min-width: 50px; }
        .rf-app .log-badge {
          padding: 1px 6px; border-radius: 3px;
          font-size: 10px; font-weight: 700;
          min-width: 66px; text-align: center;
        }
        .rf-app .b-ok        { background:#14532d; color:#22c55e; }
        .rf-app .b-collision { background:#450a0a; color:#ef4444; }
        .rf-app .b-stale     { background:#431407; color:#f97316; }
        .rf-app .log-msg  { color: #cbd5e1; flex: 1; }
        .rf-app .log-res  { color: #64748b; }

        @media (max-width: 760px) {
          .rf-app { grid-template-columns: 1fr; grid-template-rows: 60px auto 1fr 160px; }
          .rf-app .sidebar { grid-row: 2; }
        }
      `}</style>

      <div className="rf-app">
        <header className="header">
          <span className="header-logo">⚡ RaceFloor</span>
          <span className="header-sub">Multi-Agent Race Condition Simulator</span>
          <div className="header-stats">
            <div className="stat">
              <div className="stat-num" id="hAgents">5</div>
              <div className="stat-label">Active Agents</div>
            </div>
            <div className="stat">
              <div className="stat-num" id="hConflicts">10</div>
              <div className="stat-label">Potential Conflicts</div>
            </div>
            <div className="stat">
              <div className="stat-num" id="hDetected">0</div>
              <div className="stat-label">Collisions This Run</div>
            </div>
          </div>
        </header>

        <aside className="sidebar">
          <div>
            <label className="ctrl-label">Parallel Agents</label>
            <div className="slider-row">
              <input type="range" id="slAgent" min="2" max="20" defaultValue="5" />
              <span className="sval" id="vAgent">5</span>
            </div>
          </div>

          <div>
            <label className="ctrl-label">Shared Resources</label>
            <div className="slider-row">
              <input type="range" id="slRes" min="1" max="4" defaultValue="2" />
              <span className="sval" id="vRes">2</span>
            </div>
          </div>

          <div>
            <label className="ctrl-label">Scenario</label>
            <select id="scenarioSel" defaultValue="ticket">
              <option value="ticket">Customer Support Queue</option>
              <option value="doc">Shared Document Edit</option>
              <option value="db">Database Record Update</option>
              <option value="memory">Agent Memory Write</option>
            </select>
          </div>

          <div className="conflict-box">
            <div className="cf-formula">N × (N−1) ÷ 2 potential conflicts</div>
            <div className="cf-num" id="cfNum">10</div>
            <div className="cf-unit">concurrent conflict surfaces</div>
          </div>

          <div className="status-pill" id="statusPill">
            <div className="dot dot-orange"></div>
            <span style={{ color: '#f97316' }}>Ready — press Start</span>
          </div>

          <button className="btn btn-primary" id="startBtn">▶ Start Simulation</button>
          <button className="btn btn-secondary" id="pauseBtn" style={{ display: 'none' }}>⏸ Pause</button>
          <button className="btn btn-secondary" id="resetBtn">↺ Reset</button>
          <button className="btn btn-danger" id="injectBtn" style={{ display: 'none' }}>💥 Force Race Condition</button>

          <div className="tip">
            <strong>How it works:</strong><br />
            Each dot = one AI agent. When ≥2 agents reach the same resource simultaneously, a race condition fires. Both return HTTP 200 — no error — but last write silently wins. The damage is invisible.
          </div>
        </aside>

        <div className="canvas-wrap">
          <canvas id="c"></canvas>

          <div className="col-overlay" id="colOverlay">
            <div className="col-title">⚠ RACE CONDITION DETECTED</div>
            <div id="colDetails"></div>
            <div className="col-http200">Both writes returned <strong style={{ color: '#22c55e' }}>HTTP 200 OK</strong> — system reported zero errors</div>
            <div className="col-winner" id="colWinner"></div>
            <button className="btn btn-secondary" id="dismissBtn" style={{ marginTop: '12px', width: 'auto', padding: '6px 18px', fontSize: '12px' }}>Continue →</button>
          </div>
        </div>

        <div className="log-panel">
          <div className="log-hdr">
            <span>Agent Activity Log</span>
            <span id="logCount" style={{ color: '#475569' }}>0 events</span>
          </div>
          <div id="logEntries"></div>
        </div>
      </div>
    </>
  );
}
