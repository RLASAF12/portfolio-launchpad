'use client';

import { PROJECT_CATEGORIES, type ProjectCategory } from '../lib/types';
import { cn } from '../lib/utils';

interface FilterBarProps {
  activeCategory: ProjectCategory | null;
  onFilterChange: (category: ProjectCategory | null) => void;
}

const categoryLabels: Record<ProjectCategory, string> = {
  game: '🎮 Games',
  'legal-ai': '⚖️ Legal AI',
  community: '👥 Community',
  ops: '⚙️ Ops',
  music: '🎵 Music',
  tool: '🛠 Tools',
};

export default function FilterBar({ activeCategory, onFilterChange }: FilterBarProps) {
  return (
    <nav className="flex flex-wrap gap-2" aria-label="Filter by category">
      <button
        className={cn(
          'rounded-lg border px-3 py-1.5 text-sm font-medium transition-all duration-200',
          activeCategory === null
            ? 'border-white/20 bg-white/10 text-white'
            : 'border-white/[0.06] bg-transparent text-white/40 hover:border-white/10 hover:text-white/70'
        )}
        onClick={() => onFilterChange(null)}
        aria-pressed={activeCategory === null}
      >
        All
      </button>

      {PROJECT_CATEGORIES.map((category) => (
        <button
          key={category}
          className={cn(
            'rounded-lg border px-3 py-1.5 text-sm font-medium transition-all duration-200',
            activeCategory === category
              ? 'border-white/20 bg-white/10 text-white'
              : 'border-white/[0.06] bg-transparent text-white/40 hover:border-white/10 hover:text-white/70'
          )}
          onClick={() => onFilterChange(category)}
          aria-pressed={activeCategory === category}
        >
          {categoryLabels[category]}
        </button>
      ))}
    </nav>
  );
}
