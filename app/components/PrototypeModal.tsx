'use client';

import { useEffect, useRef, useCallback } from 'react';
import { X, ExternalLink } from 'lucide-react';
import type { Project } from '../lib/types';

interface PrototypeModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function PrototypeModal({ project, onClose }: PrototypeModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const stableClose = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project) {
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      dialog.close();
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') stableClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [stableClose]);

  if (!project) return null;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-0 h-full w-full max-h-none max-w-none border-0 bg-transparent p-0"
      onClick={(e) => {
        if (e.target === dialogRef.current) stableClose();
      }}
    >
      <div className="flex h-full w-full items-center justify-center p-4 sm:p-8">
        <div className="relative flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-surface shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
            <div className="flex items-center gap-3">
              {project.emoji && (
                <span className="text-xl">{project.emoji}</span>
              )}
              <h2 className="font-semibold tracking-tight text-white">
                {project.title}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {project.vercel_url && (
                <a
                  className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-3 py-1.5 text-xs font-medium text-white/50 transition-colors hover:border-white/[0.15] hover:text-white/80"
                  href={project.vercel_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-3 w-3" />
                  Open in new tab
                </a>
              )}
              <button
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white/80"
                onClick={stableClose}
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Iframe */}
          <div className="relative flex-1 bg-black">
            {project.vercel_url ? (
              <iframe
                className="h-full w-full border-0"
                src={project.vercel_url}
                title={project.title}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-white/30">
                  No live URL available for this prototype.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
