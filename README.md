# Ping - Personal Relationship CRM

A minimal, fast web app to track and maintain your personal connections.

## Features

- **Email + Password Auth** - Secure signup/login with Supabase
- **Contact Management** - Add contacts with notes and context
- **Decay Indicators** - Visual borders show relationship health (green/yellow/red)
- **"People to Ping Today"** - Prioritizes contacts needing attention
- **Instant Updates** - "Pinged" button updates timestamps with optimistic UI

## Tech Stack

- Next.js 15 (App Router)
- Tailwind CSS 4
- Supabase (Auth + Database)
- TypeScript

## Setup

### 1. Clone and Install

```bash
git clone <repo>
cd ping
npm install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **Database** → **New table**
3. Run the SQL in `supabase/migrations/001_create_contacts.sql`

Or use the SQL Editor:
- Go to **SQL Editor** → **New query**
- Paste contents of `supabase/migrations/001_create_contacts.sql`
- Run

### 3. Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Find these in Supabase Dashboard → **Project Settings** → **API**:
- `SUPABASE_URL` = Project URL
- `SUPABASE_ANON_KEY` = `anon` `public` key

### 4. Auth Settings (Important!)

In Supabase Dashboard → **Authentication** → **Providers**:
- Enable **Email** provider
- Set **Confirm email** to your preference (off = instant signup)

### 5. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push
```

### 2. Deploy

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repo
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

## Database Schema

**contacts table:**
- `id` (uuid, PK)
- `user_id` (uuid, FK to auth.users)
- `name` (text, required)
- `where_met` (text)
- `notes` (text)
- `last_pinged` (timestamp)
- `created_at` (timestamp)

**RLS Policies:** Users can only CRUD their own contacts.

## Decay Indicator Logic

- 🟢 **Green border** (0-7 days) - Fresh connection
- 🟡 **Yellow border** (8-21 days) - Needs attention soon
- 🔴 **Red border** (22+ days) - Time to reach out

## License

MIT
