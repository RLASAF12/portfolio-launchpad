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
    <>
      <Header />
      <main className="mx-auto max-w-6xl space-y-12 px-6 py-12">
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Prototypes
            </h2>
            <p className="mt-1.5 text-sm text-white/40">
              Click any card to try it live — right here.
            </p>
          </div>
          <PrototypeGrid projects={projects} />
        </section>

        <EmailCapture />
      </main>
      <Footer />
    </>
  );
}
