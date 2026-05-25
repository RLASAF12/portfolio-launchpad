'use client';

import { useEffect, useRef, useCallback } from 'react';
import type { Project } from '../lib/types';

interface PrototypeModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function PrototypeModal({ project, onClose }: PrototypeModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const stableClose = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') stableClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [stableClose]);

  if (!project) return null;

  const domain = project.vercel_url?.replace(/^https?:\/\//, '') || '';

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) stableClose(); }}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
        zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="modal-panel" style={{
        background: 'var(--color-card)', border: '1px solid var(--color-border)',
        borderRadius: 20, width: '90vw', maxWidth: 900, height: '80vh',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        animation: 'slide-up 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}>
        {/* Header */}
        <div className="modal-header" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px', borderBottom: '1px solid var(--color-border)', flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 24 }}>{project.emoji}</span>
            <span className="modal-header-title" style={{ fontSize: 16, fontWeight: 700 }}>{project.title}</span>
            {domain && (
              <span className="modal-domain-badge" style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-accent)',
                background: 'rgba(0,255,157,0.08)', border: '1px solid rgba(0,255,157,0.2)',
                padding: '3px 10px', borderRadius: 4,
              }}>
                {domain}
              </span>
            )}
          </div>
          <button
            onClick={stableClose}
            style={{
              background: 'none', border: '1px solid var(--color-border)', borderRadius: 8,
              color: 'var(--color-muted)', fontSize: 18, width: 32, height: 32,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{
          flex: 1, background: 'var(--color-surface)',
          display: 'flex', flexDirection: 'column',
          position: 'relative', overflow: 'hidden',
        }}>
          {project.vercel_url ? (
            <iframe
              src={project.vercel_url}
              title={project.title}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              loading="lazy"
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          ) : (
            <div style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 16,
            }}>
              <span style={{ fontSize: 64 }}>{project.emoji}</span>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: 13,
                color: 'var(--color-muted)', textAlign: 'center', lineHeight: 1.7,
              }}>
                No live URL available for this prototype.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
