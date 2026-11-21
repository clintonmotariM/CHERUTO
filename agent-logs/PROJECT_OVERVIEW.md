# Cherono Memorial PWA — Project Overview

**Last updated:** 2026-11-21 09:07:08 UTC

## What This App Is

Cherono Memorial PWA is a mobile-first, installable celebration-of-life experience for family, friends, and guests. It is designed to feel like a quiet gallery with a lively, warm personality. Guests can enter through a QR code and move between the story, legacy, gathering information, and memorial home from a centered floating navigation pill.

The experience is intended to remain readable and comfortable on phones, including devices with notches and safe areas. It is also built as a PWA so it can work like an app, launch fullscreen, and remain available through cached assets when network access is limited.

## Why It Is Being Made

This memorial experience is being created to provide one welcoming, lasting digital place where people can:

- Honor Cherono's life and personality.
- Remember meaningful moments and relationships.
- Learn gathering and memorial information.
- Share appreciation, memories, and support.
- Celebrate her legacy while bringing family and friends closer together.

The visual direction replaces a somber, generic memorial interface with a lively celebration of life. Warm cream, rich brown, vibrant pink, bright purple, and vivid green communicate affection, joy, memory, and connection.

## Primary Goals

1. **Make the memorial effortless to access** through mobile QR-code entry and PWA installation.
2. **Remain mobile-first** with 44px minimum touch targets, safe-area support, 100dvh layouts, and no horizontal overflow.
3. **Present a dignified but joyful experience** through an elegant script title, clean sans-serif text, photography-ready layouts, and gentle motion.
4. **Keep the experience simple** with five clear destinations: Home, Story, Legacy, Gathering, and Her Home.
5. **Support offline use** through a service worker and cached application assets.
6. **Preserve guest contributions** through Supabase-backed memories and attendance when those features are connected.
7. **Keep the interface consistent** through reusable CSS tokens and component shells.

## Current User Experience

The app currently opens directly into a vertically scrollable 600px-centered canvas on a cream background. Cherono's name is displayed in an elegant script style, while the selected page appears below it. A fixed floating pill navigation remains centered above the bottom safe area and provides access to five sections:

- **Home:** An introduction and centerpiece for Cherono's celebration.
- **Story:** A timeline-style presentation of beginnings, passions, people, and defining moments.
- **Legacy:** Reflections and a lasting statement of what Cherono leaves behind.
- **Gathering:** Memorial service and gathering details.
- **Her Home:** A place for memories and family-oriented guest interactions.

## Work Completed So Far

- Established a project constitution and explicit color and sizing rules.
- Defined the mobile-first memorial PWA architecture.
- Added fullscreen manifest metadata and PWA-safe HTML settings.
- Created an immersive-mode hook for first-touch/fullscreen activation.
- Added a cache-first service worker and PWA manifest.
- Added React, Vite, Lucide icons, Framer Motion, React Router, and Supabase dependencies.
- Established CSS token and common-style architecture.
- Added the Cherono palette: cream, brown, pink, purple, green, white, and overlay brown.
- Added Great Vibes and Inter typography tokens and font loading.
- Created reusable UI shell components for buttons, Polaroid framing, quotes, and input fields.
- Built the elevated floating pill navigation with Lucide icon and text labels.
- Added consistent pink active states and accessible 44px touch targets.
- Created Home, Story, Legacy, Gathering, and Her Home page components.
- Added subtle page transitions with Framer Motion.
- Added a 100dvh fixed app canvas with an independent vertically scrolling content column.
- Established Vite development, build, and preview scripts.
- Created Supabase migration foundations for the memorial profile, timeline, relationships, guestbook, attendance, schedule, and awareness profiles.
- Published development progress to the CHERONO GitHub repository.

## Next Intended Phase

The next phase is visual UI-shell refinement and real memorial content. This will include replacing placeholders with approved photos and family copy, creating the full hero presentation, building the story timeline, completing gathering and service details, and connecting Supabase guestbook and attendance forms.

## Screenshot Gate

A Screenshot Gate remains open for visual review of the centered memorial title, page layout, floating navigation pill, active pink state, icon clarity, mobile spacing, safe areas, and scrolling behavior.
