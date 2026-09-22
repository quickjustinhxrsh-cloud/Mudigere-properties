-- Set an admin user's Auth app_metadata before using the admin area:
-- update auth.users set raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'::jsonb where email = 'owner@example.com';

create or replace function public.is_admin()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role' = 'admin', false);
$$;

create table if not exists public.lead_rate_limits (
  ip text primary key,
  window_started_at timestamptz not null default now(),
  submission_count integer not null default 0 check (submission_count >= 0)
);

alter table public.lead_rate_limits enable row level security;

create or replace function public.allow_lead_submission(request_ip text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  permitted boolean;
begin
  insert into public.lead_rate_limits (ip, window_started_at, submission_count)
  values (request_ip, now(), 1)
  on conflict (ip) do update set
    window_started_at = case
      when public.lead_rate_limits.window_started_at < now() - interval '1 hour' then now()
      else public.lead_rate_limits.window_started_at
    end,
    submission_count = case
      when public.lead_rate_limits.window_started_at < now() - interval '1 hour' then 1
      else public.lead_rate_limits.submission_count + 1
    end
  returning submission_count <= 5 into permitted;

  return permitted;
end;
$$;

revoke all on function public.allow_lead_submission(text) from public;
grant execute on function public.allow_lead_submission(text) to service_role;

drop policy if exists "Authenticated users manage properties" on public.properties;
create policy "Admins manage properties"
on public.properties for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Authenticated users manage leads" on public.leads;
create policy "Admins manage leads"
on public.leads for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Anyone can create leads" on public.leads;

drop policy if exists "Anyone can manage settings" on public.settings;
drop policy if exists "Authenticated users manage settings" on public.settings;
create policy "Admins manage settings"
on public.settings for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Authenticated users upload property media" on storage.objects;
drop policy if exists "Authenticated users update property media" on storage.objects;
drop policy if exists "Authenticated users delete property media" on storage.objects;
create policy "Admins manage property media"
on storage.objects for all
to authenticated
using (bucket_id = 'property-media' and public.is_admin())
with check (bucket_id = 'property-media' and public.is_admin());

update public.properties
set title = 'Premium Villa', slug = 'premium-villa'
where slug = 'premium-house';
