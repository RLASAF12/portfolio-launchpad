'use client';

import { useState } from 'react';
import type { Project, ProjectCategory } from '../lib/types';
import FilterBar from './FilterBar';
import PrototypeCard from './PrototypeCard';
import PrototypeModal from './PrototypeModal';

interface PrototypeGridProps {
  projects: Project[];
}

export default function PrototypeGrid({ projects }: PrototypeGridProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section>
      <FilterBar activeCategory={activeCategory} onFilterChange={setActiveCategory} />

      {filtered.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '60px 0',
          fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--color-muted)',
        }}>
          No prototypes in this category yet.
        </div>
      ) : (
        <div className="card-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20,
        }}>
          {filtered.map((project) => (
            <PrototypeCard
              key={project.id}
              project={project}
              onOpen={setSelectedProject}
            />
          ))}
        </div>
      )}

      <PrototypeModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
