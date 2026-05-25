'use client';

import { ExternalLink } from 'lucide-react';
import type { Project } from '../lib/types';
import { cn } from '../lib/utils';

interface PrototypeCardProps {
  project: Project;
  onOpen: (project: Project) => void;
  index: number;
}

export default function PrototypeCard({ project, onOpen, index }: PrototypeCardProps) {
  const formattedDate = new Date(project.created_at).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  return (
    <article
      className={cn(
        'group relative cursor-pointer overflow-hidden rounded-xl',
        'border border-white/[0.06] bg-surface-raised',
        'transition-all duration-300 ease-out',
        'hover:-translate-y-1 hover:border-white/[0.12] hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)]'
      )}
      style={{ animation: `fade-in-up 0.5s ease-out ${index * 0.08}s both` }}
      onClick={() => onOpen(project)}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Thumbnail area */}
      <div className="relative flex h-32 items-center justify-center border-b border-white/[0.04] bg-white/[0.02]">
        {project.screenshot_url ? (
          <img
            className="h-full w-full object-cover"
            src={project.screenshot_url}
            alt={`Screenshot of ${project.title}`}
            loading="lazy"
          />
        ) : (
          <span className="text-5xl transition-transform duration-300 group-hover:scale-110">
            {project.emoji || '🧪'}
          </span>
        )}

        {/* External link hint */}
        <div className="absolute right-3 top-3 rounded-md bg-black/50 p-1.5 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
          <ExternalLink className="h-3.5 w-3.5 text-white/70" />
        </div>
      </div>

      {/* Content */}
      <div className="relative space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold tracking-tight text-white/90 group-hover:text-white">
            {project.title}
          </h3>
          {project.category && (
            <span className="shrink-0 rounded-md bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/40">
              {project.category}
            </span>
          )}
        </div>

        {project.description && (
          <p className="line-clamp-2 text-sm leading-relaxed text-white/40">
            {project.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-1">
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[11px] text-white/30 transition-colors group-hover:bg-white/[0.06] group-hover:text-white/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <time className="ml-auto text-[11px] text-white/20" dateTime={project.created_at}>
            {formattedDate}
          </time>
        </div>
      </div>
    </article>
  );
}
