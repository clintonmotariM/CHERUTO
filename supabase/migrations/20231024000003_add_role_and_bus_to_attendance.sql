alter table public.funeral_attendance add column if not exists member_role text default 'Student';
alter table public.funeral_attendance add column if not exists needs_school_transport boolean default false;

create index funeral_attendance_member_role_idx on public.funeral_attendance(member_role);
create index funeral_attendance_needs_school_transport_idx on public.funeral_attendance(needs_school_transport);
