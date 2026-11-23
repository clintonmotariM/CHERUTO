-- ==============================================================================
-- CHERUTO MEMORIAL - DATABASE MIGRATION & STORAGE SETUP
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/kjacigahowymxsbtgbal/sql
-- ==============================================================================

-- 1. Ensure columns exist on timeline_events
alter table public.timeline_events add column if not exists start_date date;
alter table public.timeline_events add column if not exists end_date date;

-- 2. Ensure columns exist on funeral_attendance
alter table public.funeral_attendance add column if not exists member_role text default 'Student';
alter table public.funeral_attendance add column if not exists needs_school_transport boolean default false;
alter table public.funeral_attendance add column if not exists gender text;
alter table public.funeral_attendance add column if not exists student_id text;
alter table public.funeral_attendance add column if not exists emergency_contact text;

-- 3. Ensure columns exist on guestbook_memories
alter table public.guestbook_memories add column if not exists memory_tag text;
alter table public.guestbook_memories add column if not exists photo_url text;
alter table public.guestbook_memories add column if not exists photo_urls jsonb default '[]'::jsonb;

-- 4. Create public storage bucket for photos & media (supports uploading 30+ photos)
insert into storage.buckets (id, name, public)
values ('photos', 'photos', true)
on conflict (id) do update set public = true;

-- 5. Set up Storage Policies for public read and insert
create policy "Public can view memorial photos"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'photos');

create policy "Public can upload memorial photos"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'photos');

-- 6. Reload PostgREST schema cache
notify pgrst, 'reload schema';
