-- ═══════════════════════════════════════════════════════
-- EMPEROR — Supabase SQL Schema
-- Paste this in: Supabase Dashboard → SQL Editor → Run
-- ═══════════════════════════════════════════════════════

-- ── Profiles table (extends Supabase auth.users) ──────
create table if not exists public.profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  username    text,
  plan        text not null default 'free',
  discord_id  text,
  created_at  timestamp with time zone default timezone('utc', now()),
  updated_at  timestamp with time zone default timezone('utc', now())
);

-- ── Orders table ──────────────────────────────────────
create table if not exists public.orders (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references auth.users(id) on delete cascade not null,
  product_id  int not null,
  product_name text not null,
  amount      numeric(10, 2) not null,
  status      text not null default 'completed',
  created_at  timestamp with time zone default timezone('utc', now())
);

-- ── Row Level Security ────────────────────────────────
alter table public.profiles enable row level security;
alter table public.orders   enable row level security;

-- Profiles: users can only read/write their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Orders: users can only see their own orders
create policy "Users can view own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Users can insert own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

-- ── Auto-create profile on signup ────────────────────
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, plan)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    'free'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger: fires after every new signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── Done! ─────────────────────────────────────────────
-- Your Emperor database is ready.
