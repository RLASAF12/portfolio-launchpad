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
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = activeCategory
    ? projects.filter((p) => p.category === activeCategory)
    : projects;

  return (
    <section className="space-y-8">
      <FilterBar
        activeCategory={activeCategory}
        onFilterChange={setActiveCategory}
      />

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/[0.08] py-20 text-center">
          <span className="text-4xl">🔍</span>
          <p className="mt-4 text-sm text-white/30">
            No prototypes in this category yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <PrototypeCard
              key={project.id}
              project={project}
              onOpen={setSelectedProject}
              index={i}
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
