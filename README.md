# Cheruto — Celebration of Life

## About this project

Cheruto is a mobile-first memorial PWA created to celebrate the life, relationships, stories, and legacy of Cheruto, affectionately called Cheru. It is designed for people scanning a QR code or opening a shared link at a funeral, memorial gathering, or from home.

The app follows a “Lively Celebration of Life” design language: warm cream, rich brown, vibrant rose-pink, purple, and green. The experience uses a gentle script title, compact story cards, a centered scrolling gallery, a fixed floating bottom navigation, and a full-screen entrance through the “Say Bye” pill.

## Why it exists

This project turns a memorial gathering into one shared digital place where family and friends can:

- Remember Cheruto’s life and meaningful milestones.
- Read stories from family, friends, and community.
- Find memorial gathering and venue information.
- Confirm attendance.
- Leave approved memories for family review.
- Share the memorial with someone else.
- Continue remembering Cheruto even with limited or offline internet access.

## What is included

- Home photo-arch memorial room with animated memory switching.
- Her Story timeline with milestone cards and relationship sections.
- Her Legacy reflections, values, tributes, and native sharing.
- The Gathering schedule, directions, and RSVP form.
- Her Home guestbook with pending family approval.
-  Solemn “Say Bye” PWA entrance screen.
- Fullscreen PWA manifest and service-worker shell.
- Mobile safe-area support, 44px minimum controls, and compact floating navigation.
- Offline fallback data for the memorial experience.
- Local fallback storage when Supabase credentials are not configured.

## Technology stack

- React 19
- Vite 8
- Framer Motion
- Lucide React
- React Router
- Supabase JavaScript client
- Supabase Postgres, RLS, and migrations
- Progressive Web App manifest and service worker
- Google Fonts: Great Vibes and Inter

## Run it locally

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example environment file:

```bash
cp .env.example .env
```

Add the project values:

```dotenv
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

If these values are absent, the app remains usable and falls back to its built-in warm memorial content and local storage.

Never place a Supabase service-role or secret key in this frontend environment.

### 3. Start the development server

```bash
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173/`.

### 4. Create a production build

```bash
npm run build
```

### 5. Preview the production build locally

```bash
npm run preview
```

The preview normally starts at `http://localhost:4173/`. This project can also be started on a specific port:

```bash
npm run preview -- --port 4175
```

## Supabase backend

The backend schema is stored in `supabase/migrations/`.

### Database tables

- `deceased_profile` — the memorial person’s name, dates, biography, and photos.
- `timeline_events` — ordered life-story milestones.
- `relationships` — family, friends, community, and relationship cards.
- `guestbook_memories` — submitted memories and moderation status.
- `funeral_attendance` — anonymous or identified RSVP submissions.
- `funeral_schedule` — gathering times, venue, address, attire, and program details.
- `awareness_profiles` — legacy and community awareness profiles.

### Migration files

- `20231024000000_create_tables.sql` creates all tables and indexes.
- `20231024000001_enable_rls.sql` enables Row Level Security and grants public read/controlled insert access.

Apply migrations with a configured Supabase project and CLI:

```bash
supabase db push
```

## Data and security behavior

Public memorial content is readable through Supabase RLS. Guestbook entries are inserted with `is_approved: false`, so they do not appear in the public feed until an authorized family member or administrator approves them.

Attendance submissions validate the party size from `1` to `20`. Frontend validation improves guest experience, while RLS and database constraints remain the final data boundary.

The frontend never requires Supabase credentials to boot. `src/lib/supabaseClient.js` safely exports `null` when configuration is missing, and `useMemorialData.js` supplies warm fallback memorial content.

## PWA behavior

- `public/manifest.json` defines app name, icon, theme, portrait orientation, and fullscreen display mode.
- `public/sw.js` provides a cache-first shell and stores successful GET responses.
- `index.html` includes portrait, safe-area, Apple PWA, manifest, icon, and Google Font metadata.
- The app requests browser fullscreen only through the `Say Bye` user interaction, as required by browser security rules.

PWA installation and fullscreen behavior are strongest on HTTPS or localhost and may vary on iOS, Android, and desktop browsers.

## Offline behavior

Without configured Supabase keys or with an unreachable backend:

- Memorial story, schedule, relationship, and tribute fallbacks remain visible.
- RSVP submissions are saved in browser `localStorage` under `cheruto-rsvp`.
- Guestbook submissions are stored locally under `cheruto-memories` and shown as pending family blessing.

These local records should be synchronized through a future moderation/admin workflow before they are considered permanent.

## Project structure

```text
public/
  icons/
  manifest.json
  sw.js
src/
  App.jsx
  components/layout/BottomNav.jsx
  components/SplashScreen.jsx
  components/ui/
  hooks/useMemorialData.js
  hooks/useImmersiveMode.js
  lib/supabaseClient.js
  pages/
  styles/
supabase/
  migrations/
agent-logs/
PROJECT_CONSTITUTION.md
```

## Development status

The core UI shell, splash screen, five memorial rooms, fallback data, BottomNav, Supabase schema, and guest submission flows are implemented. Before real-world launch, the family should approve final names, dates, venue details, photos, relationship stories, memorial copy, service information, and guestbook moderation access.

## Repository

GitHub: https://github.com/clintonmotariM/CHERUTO

## License

No license is currently specified. A license should be chosen before public or commercial reuse.
