# Portfolio Launchpad

Single-page portfolio site that dynamically displays AI prototypes from Supabase. Each card opens an inline iframe to the prototype's Vercel deployment.

## Setup

### 1. Supabase

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Open the SQL Editor and run `supabase-setup.sql` — this creates the `projects` and `emails` tables with RLS policies and seeds two starter projects
3. Copy your project URL and anon key from Settings → API

### 2. Local development

```bash
cp .env.local.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

npm install
npm run dev
```

### 3. Deploy to Vercel

1. Push this folder to a GitHub repo
2. Import the repo in Vercel
3. Add the two env vars (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in Vercel project settings
4. Deploy

### Adding a new prototype

Insert a row into the `projects` table via Supabase dashboard or SQL:

```sql
insert into projects (title, description, emoji, category, tags, vercel_url, sort_order)
values ('My New App', 'Description here', '🚀', 'tool', array['ai', 'demo'], 'https://my-app.vercel.app', 3);
```

The site revalidates every 60 seconds — new projects appear within a minute.

## Architecture

- **SSR with ISR** — `page.tsx` fetches projects server-side, revalidates every 60s
- **Client-side interactivity** — filter bar, modal, and email form are client components
- **No CSS included** — semantic HTML with class names only; design is applied separately
- **RLS security** — anon users can read projects and insert emails; mutations require service_role
