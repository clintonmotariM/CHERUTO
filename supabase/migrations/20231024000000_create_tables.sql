create extension if not exists "pgcrypto";

create table public.deceased_profile (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  preferred_name text,
  birth_date date,
  passing_date date,
  biography text,
  hero_image_url text,
  qr_code_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.timeline_events (
  id uuid primary key default gen_random_uuid(),
  deceased_id uuid not null references public.deceased_profile(id) on delete cascade,
  event_date date,
  title text not null,
  description text,
  image_url text,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.relationships (
  id uuid primary key default gen_random_uuid(),
  deceased_id uuid not null references public.deceased_profile(id) on delete cascade,
  name text not null,
  relationship_type text,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.guestbook_memories (
  id uuid primary key default gen_random_uuid(),
  deceased_id uuid references public.deceased_profile(id) on delete cascade,
  author_name text,
  relationship text,
  memory text not null,
  email text,
  is_approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.funeral_attendance (
  id uuid primary key default gen_random_uuid(),
  deceased_id uuid references public.deceased_profile(id) on delete cascade,
  attendee_name text,
  attendee_email text,
  party_size integer not null default 1 check (party_size between 1 and 20),
  attendance_status text not null default 'attending'
    check (attendance_status in ('attending', 'maybe', 'declined')),
  note text,
  created_at timestamptz not null default now()
);

create table public.funeral_schedule (
  id uuid primary key default gen_random_uuid(),
  deceased_id uuid references public.deceased_profile(id) on delete cascade,
  event_name text not null,
  starts_at timestamptz,
  ends_at timestamptz,
  location_name text,
  address text,
  notes text,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.awareness_profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  relationship_or_context text,
  memorial_note text,
  image_url text,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index timeline_events_deceased_id_idx on public.timeline_events(deceased_id, position);
create index relationships_deceased_id_idx on public.relationships(deceased_id, display_order);
create index guestbook_memories_deceased_created_idx on public.guestbook_memories(deceased_id, created_at desc);
create index funeral_attendance_deceased_id_idx on public.funeral_attendance(deceased_id);
create index funeral_schedule_deceased_id_idx on public.funeral_schedule(deceased_id, display_order);
create index awareness_profiles_display_order_idx on public.awareness_profiles(display_order);
