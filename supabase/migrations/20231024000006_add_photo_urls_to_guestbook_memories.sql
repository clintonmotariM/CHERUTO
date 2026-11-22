alter table public.guestbook_memories add column if not exists photo_urls jsonb default '[]'::jsonb;

create index guestbook_memories_photo_urls_idx on public.guestbook_memories using gin(photo_urls);
