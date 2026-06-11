# Mudigere Properties

Next.js 14 real-estate website for Mudigere Properties.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Supabase

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`.
The contact form inserts into an `inquiries` table with these columns:

```sql
create table inquiries (
  id bigint generated always as identity primary key,
  full_name text not null,
  phone text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);
```

## Cloudinary

Set `NEXT_PUBLIC_CLOUDINARY_IMAGE_BASE_URL` to a transformed upload base URL, for example:

```text
https://res.cloudinary.com/your-cloud-name/image/upload/f_auto,q_auto
```

Then upload images using the public IDs referenced in `lib/images.ts`, such as `mudigere/hero-hillside-villa`.
