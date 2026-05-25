import type { Project } from '../lib/types';

interface HeaderProps {
  projectCount: number;
}

export default function Header({ projectCount }: HeaderProps) {
  return (
    <header style={{ padding: '32px 0 0' }}>
      <div style={{
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        gap: 24, flexWrap: 'wrap' as const,
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <h1 style={{
              fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800,
              letterSpacing: -1, lineHeight: 1, fontFamily: 'var(--font-syne)',
            }}>
              Harel <span style={{ color: 'var(--color-accent)' }}>Asaf</span>
            </h1>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(0,255,157,0.08)', border: '1px solid rgba(0,255,157,0.3)',
              borderRadius: 999, padding: '4px 12px',
              fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-accent)',
            }}>
              <div style={{
                width: 7, height: 7, borderRadius: '50%', background: 'var(--color-accent)',
                animation: 'pulse 2s infinite',
              }} />
              BUILDING
            </div>
          </div>

          <p style={{
            fontSize: 14, color: 'var(--color-muted)', fontFamily: 'var(--font-mono)', marginTop: 6,
          }}>
            AI Operator · Legal DNA · <span style={{ color: 'var(--color-accent3)' }}>Elementor</span> · Prototype Pusher
          </p>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)',
            borderRadius: 8, padding: '6px 12px',
            fontFamily: 'var(--font-mono)', fontSize: 10, color: '#a78bfa',
            marginTop: 8,
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%', background: '#a78bfa',
              animation: 'pulse 1.5s infinite',
            }} />
            Ben (agent) · auto-deploying to Vercel
          </div>
        </div>

        <nav style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 4 }}>
          {[
            { label: 'GitHub', href: 'https://github.com/RLASAF12' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/harel-asaf' },
            { label: 'Podcast', href: '#' },
          ].map((link) => (
            <a
              key={link.label}
              className="nav-link-btn"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-muted)',
                textDecoration: 'none', border: '1px solid var(--color-border)', borderRadius: 6,
                padding: '6px 14px', transition: 'all 0.2s',
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Stats bar */}
      <div style={{
        display: 'flex', gap: 32, marginTop: 28, padding: '20px 0',
        borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)',
        flexWrap: 'wrap' as const,
      }}>
        {[
          { num: String(projectCount), label: 'Prototypes Live' },
          { num: '3', label: 'Agent Builders' },
          { num: '∞', label: 'Iterations' },
          { num: '1', label: 'DB · Supabase' },
        ].map((stat) => (
          <div key={stat.label} style={{ display: 'flex', flexDirection: 'column' as const, gap: 4 }}>
            <span style={{
              fontSize: 28, fontWeight: 800, color: 'var(--color-accent)', letterSpacing: -1,
            }}>
              {stat.num}
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-muted)',
              letterSpacing: '0.1em', textTransform: 'uppercase' as const,
            }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </header>
  );
}
