alter table public.guestbook_memories add column if not exists memory_tag text;
alter table public.guestbook_memories add column if not exists photo_url text;

create index guestbook_memories_memory_tag_idx on public.guestbook_memories(memory_tag);
create index guestbook_memories_photo_url_idx on public.guestbook_memories(photo_url);
