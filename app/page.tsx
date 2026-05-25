import { createClient } from '@supabase/supabase-js';
import type { Project } from './lib/types';
import Header from './components/Header';
import PrototypeGrid from './components/PrototypeGrid';
import EmailCapture from './components/EmailCapture';
import Footer from './components/Footer';

export const revalidate = 60;

async function getProjects(): Promise<Project[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_live', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch projects:', error.message);
    return [];
  }

  return data as Project[];
}

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <div className="page-container" style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
      <Header projectCount={projects.length} />

      {/* Section label */}
      <div className="section-label" style={{
        display: 'flex', alignItems: 'center', gap: 12, margin: '48px 0 24px',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-muted)',
          letterSpacing: '0.15em', textTransform: 'uppercase' as const,
        }}>
          Prototypes
        </span>
        <div style={{ flex: 1, height: 1, background: 'var(--color-border)' }} />
      </div>

      <PrototypeGrid projects={projects} />
      <EmailCapture />
      <Footer />
    </div>
  );
}
