export interface Project {
  id: string;
  title: string;
  description: string | null;
  emoji: string | null;
  category: string | null;
  tags: string[] | null;
  vercel_url: string | null;
  vercel_project_id: string | null;
  screenshot_url: string | null;
  is_live: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Email {
  id: string;
  email: string;
  source: string;
  created_at: string;
}

export type ProjectCategory = 'game' | 'legal-ai' | 'community' | 'ops' | 'music' | 'tool';

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'game',
  'legal-ai',
  'community',
  'ops',
  'music',
  'tool',
];
