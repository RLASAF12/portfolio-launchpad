'use client';

import type { Project } from '../lib/types';

interface PrototypeCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

const defaultGradients = [
  'linear-gradient(135deg, #0d1b2a 0%, #1a0533 50%, #2d0558 100%)',
  'linear-gradient(135deg, #001a0d 0%, #003322 50%, #005533 100%)',
  'linear-gradient(135deg, #1a0a00 0%, #3d1a00 50%, #662d00 100%)',
  'linear-gradient(135deg, #0a001a 0%, #1a003d 50%, #2d0066 100%)',
  'linear-gradient(135deg, #001a1a 0%, #00333d 50%, #005566 100%)',
  'linear-gradient(135deg, #1a1a00 0%, #3d3d00 50%, #666600 100%)',
];

const tagColors: Record<string, { bg: string; border: string; color: string }> = {
  default: { bg: 'rgba(0,255,157,0.08)', border: 'rgba(0,255,157,0.25)', color: 'var(--color-accent)' },
  purple: { bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.3)', color: '#a78bfa' },
  amber: { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', color: 'var(--color-accent3)' },
};

function getTagStyle(index: number) {
  if (index === 1) return tagColors.purple;
  if (index === 2) return tagColors.amber;
  return tagColors.default;
}

export default function PrototypeCard({ project, onOpen }: PrototypeCardProps) {
  const gradient = project.thumb_gradient || defaultGradients[project.sort_order % defaultGradients.length];

  return (
    <article
      className="proto-card"
      onClick={() => onOpen(project)}
      style={{
        background: 'var(--color-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 14,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        position: 'relative',
      }}
    >
      {/* Thumbnail */}
      <div style={{
        width: '100%', height: 160, position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: gradient,
      }}>
        <span style={{ fontSize: 48, position: 'relative', zIndex: 2 }}>
          {project.emoji || '🧪'}
        </span>
        <div className="thumb-overlay" style={{
          position: 'absolute', inset: 0, background: 'rgba(0,255,157,0.12)',
          opacity: 0, transition: 'opacity 0.3s',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(2px)',
        }}>
          <span style={{
            background: 'var(--color-accent)', color: '#000',
            fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700,
            padding: '8px 20px', borderRadius: 999, letterSpacing: '0.05em',
          }}>
            ▶ LAUNCH
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '16px 18px 18px' }}>
        <div style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          marginBottom: 8,
        }}>
          <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: -0.3 }}>
            {project.title}
          </span>
          <span className="card-arrow" style={{
            fontSize: 14, color: 'var(--color-accent)', transition: 'transform 0.2s',
          }}>
            ↗
          </span>
        </div>

        {project.description && (
          <p style={{
            fontSize: 12, color: 'var(--color-muted)', lineHeight: 1.6,
            marginBottom: 14, fontFamily: 'var(--font-mono)',
          }}>
            {project.description}
          </p>
        )}

        {project.tags && project.tags.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const }}>
            {project.tags.map((tag, i) => {
              const s = getTagStyle(i);
              return (
                <span key={tag} style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10, padding: '3px 8px',
                  borderRadius: 4, background: s.bg, border: `1px solid ${s.border}`,
                  color: s.color, letterSpacing: '0.03em',
                }}>
                  {tag}
                </span>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        .proto-card:hover { border-color: var(--color-accent) !important; transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,255,157,0.08); }
        .proto-card:hover .thumb-overlay { opacity: 1 !important; }
        .proto-card:hover .card-arrow { transform: translate(3px, -3px); }
      `}</style>
    </article>
  );
}
