'use client';

export default function SubpageNav({ title }: { title?: string }) {
  return (
    <>
      <style>{`
        .sp-nav {
          position: sticky;
          top: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 24px;
          background: rgba(10, 10, 15, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 13px;
        }
        .sp-nav-back {
          color: #888;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.15s;
        }
        .sp-nav-back:hover {
          color: #e0e0e0;
        }
        .sp-nav-arrow {
          font-size: 16px;
          line-height: 1;
        }
        .sp-nav-title {
          color: #555;
          font-size: 12px;
          letter-spacing: 0.04em;
        }
        .sp-nav-brand {
          color: #555;
          font-size: 11px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        @media (max-width: 480px) {
          .sp-nav { padding: 8px 16px; }
          .sp-nav-title { display: none; }
        }
      `}</style>
      <nav className="sp-nav">
        <a href="/" className="sp-nav-back">
          <span className="sp-nav-arrow">←</span>
          <span>Build Lab</span>
        </a>
        {title && <span className="sp-nav-title">{title}</span>}
        <span className="sp-nav-brand">Harel Asaf</span>
      </nav>
    </>
  );
}
