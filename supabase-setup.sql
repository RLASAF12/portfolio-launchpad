-- Portfolio Launchpad — Supabase schema
-- Run this in the Supabase SQL Editor

-- Projects table
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  emoji text,
  category text check (category in ('game', 'legal-ai', 'community', 'ops', 'music', 'tool')),
  tags text[] default '{}',
  vercel_url text,
  vercel_project_id text,
  screenshot_url text,
  is_live boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Emails table
create table if not exists emails (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text default 'portfolio',
  created_at timestamptz default now()
);

-- RLS: projects — public read, service_role write
alter table projects enable row level security;

create policy "Public can read live projects"
  on projects for select
  to anon
  using (true);

-- RLS: emails — public insert, service_role read
alter table emails enable row level security;

create policy "Anyone can subscribe"
  on emails for insert
  to anon
  with check (true);

-- Auto-update updated_at on projects
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger projects_updated_at
  before update on projects
  for each row
  execute function update_updated_at();

-- Seed data: existing prototypes
insert into projects (title, description, emoji, category, tags, vercel_url, sort_order) values
  ('AI Mafia', 'Multiplayer social deduction game powered by AI agents', '🎭', 'game', array['game', 'multiplayer', 'ai-agents'], 'https://ai-mafia.vercel.app', 1),
  ('ctxauditor', 'Context window audit tool for Claude Code sessions', '🔍', 'tool', array['claude-code', 'context', 'audit'], 'https://ctxauditor.vercel.app', 2)
on conflict do nothing;
