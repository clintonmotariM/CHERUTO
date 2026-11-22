alter table public.timeline_events add column if not exists start_date date;
alter table public.timeline_events add column if not exists end_date date;

alter table public.timeline_events
  add constraint timeline_events_end_after_start
  check (end_date is null or start_date is null or end_date >= start_date);

create index timeline_events_start_date_idx on public.timeline_events(start_date);
create index timeline_events_end_date_idx on public.timeline_events(end_date);
