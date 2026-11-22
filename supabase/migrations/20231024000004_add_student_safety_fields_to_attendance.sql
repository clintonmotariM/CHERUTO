alter table public.funeral_attendance add column if not exists gender text;
alter table public.funeral_attendance add column if not exists student_id text;
alter table public.funeral_attendance add column if not exists emergency_contact text;

create index funeral_attendance_gender_idx on public.funeral_attendance(gender);
create index funeral_attendance_student_id_idx on public.funeral_attendance(student_id);
create index funeral_attendance_emergency_contact_idx on public.funeral_attendance(emergency_contact);
