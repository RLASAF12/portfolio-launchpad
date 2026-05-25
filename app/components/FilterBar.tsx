'use client';

import { PROJECT_CATEGORIES } from '../lib/types';
import type { ProjectCategory } from '../lib/types';

interface FilterBarProps {
  activeCategory: ProjectCategory | 'all';
  onFilterChange: (category: ProjectCategory | 'all') => void;
}

export default function FilterBar({ activeCategory, onFilterChange }: FilterBarProps) {
  return (
    <div className="filter-bar" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, marginBottom: 28 }}>
      {PROJECT_CATEGORIES.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onFilterChange(value)}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            padding: '6px 14px',
            borderRadius: 6,
            border: `1px solid ${activeCategory === value ? 'var(--color-accent)' : 'var(--color-border)'}`,
            background: activeCategory === value ? 'var(--color-accent)' : 'transparent',
            color: activeCategory === value ? '#000' : 'var(--color-muted)',
            fontWeight: activeCategory === value ? 700 : 400,
            cursor: 'pointer',
            transition: 'all 0.2s',
            letterSpacing: '0.05em',
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
