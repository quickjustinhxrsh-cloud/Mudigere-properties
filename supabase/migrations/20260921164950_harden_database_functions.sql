-- `is_admin` only reads the caller's JWT and does not need elevated privileges.
create or replace function public.is_admin()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role' = 'admin', false);
$$;

-- This function intentionally bypasses RLS to update the private rate-limit
-- counter. Its callers are restricted to the server-side service role.
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

revoke all on function public.allow_lead_submission(text) from public, anon, authenticated;
grant execute on function public.allow_lead_submission(text) to service_role;
