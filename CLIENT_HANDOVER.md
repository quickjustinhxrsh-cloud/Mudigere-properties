# Moodbire Properties — Client Handover

## Project access

| Service | Client needs | Purpose |
| --- | --- | --- |
| GitHub | Repository Admin access | Source code, issues, and deployment history |
| Vercel | Project Owner or Admin access | Hosting, deployments, domains, and environment variables |
| Supabase | Project Owner access | Database, Authentication, Storage, and site settings |
| Domain registrar | Domain Owner access | DNS, renewals, and domain transfer |

Repository: `https://github.com/quickjustinhxrsh-cloud/Mudigere-properties`

## Deployment workflow

1. Changes are committed and pushed to the `main` branch.
2. Vercel builds and deploys the site automatically.
3. Confirm the Vercel deployment is successful before sharing the live URL.

## Required environment variables

Set these in Vercel for Production, Preview, and Development. Do not commit their values to Git.

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_CLOUDINARY_IMAGE_BASE_URL
```

`SUPABASE_SERVICE_ROLE_KEY` is server-only. Never prefix it with `NEXT_PUBLIC_`, share it in messages, or store it in GitHub.

## Supabase security checklist

- Run `supabase/migrations/20260921_secure_admin_and_leads.sql` in the Supabase SQL Editor.
- Give the owner’s Auth user `app_metadata.role = "admin"`.
- Sign out and back into `/admin/login` after the role change.
- Enable leaked-password protection in Supabase Auth settings.
- Confirm only admin users can edit listings, settings, leads, and media.

## Acceptance test

- Public pages and mobile layouts load correctly.
- Images load on the production domain.
- Contact form submits successfully and a record appears in the `leads` table.
- Admin login works for the client owner account.
- Create, edit, publish, and delete a test listing.
- Upload a test image, then remove the test listing/image if no longer needed.
- Confirm HTTPS and DNS work on the client domain.

## Final transfer

- Move billing for Vercel, Supabase, and the domain registrar to the client.
- Enable domain auto-renewal under the client’s payment method.
- Add at least one backup client administrator for each service.
- Remove the developer’s access only after the client confirms the acceptance test is complete.
