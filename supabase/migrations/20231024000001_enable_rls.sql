alter table public.deceased_profile enable row level security;
alter table public.timeline_events enable row level security;
alter table public.relationships enable row level security;
alter table public.guestbook_memories enable row level security;
alter table public.funeral_attendance enable row level security;
alter table public.funeral_schedule enable row level security;
alter table public.awareness_profiles enable row level security;

create policy "Public can read deceased profile"
  on public.deceased_profile for select
  to anon, authenticated
  using (true);

create policy "Public can read timeline events"
  on public.timeline_events for select
  to anon, authenticated
  using (true);

create policy "Public can read relationships"
  on public.relationships for select
  to anon, authenticated
  using (true);

create policy "Public can read approved guestbook memories"
  on public.guestbook_memories for select
  to anon, authenticated
  using (is_approved = true);

create policy "Public can submit guestbook memories"
  on public.guestbook_memories for insert
  to anon, authenticated
  with check (
    is_approved = false
    and length(trim(memory)) between 1 and 5000
  );

create policy "Public can submit funeral attendance"
  on public.funeral_attendance for insert
  to anon, authenticated
  with check (party_size between 1 and 20);

create policy "Public can read funeral schedule"
  on public.funeral_schedule for select
  to anon, authenticated
  using (true);

create policy "Public can read awareness profiles"
  on public.awareness_profiles for select
  to anon, authenticated
  using (true);

grant select on table public.deceased_profile to anon, authenticated;
grant select on table public.timeline_events to anon, authenticated;
grant select on table public.relationships to anon, authenticated;
grant select, insert on table public.guestbook_memories to anon, authenticated;
grant insert on table public.funeral_attendance to anon, authenticated;
grant select on table public.funeral_schedule to anon, authenticated;
grant select on table public.awareness_profiles to anon, authenticated;
