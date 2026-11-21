# PROJECT CONSTITUTION

This document is the absolute law for Cherono's memorial PWA.

## 1. Fullscreen PWA

- `public/manifest.json` must use `"display": "fullscreen"`.
- `src/hooks/useImmersiveMode.js` must request fullscreen on the first `touchstart` or `click` user interaction.
- First-entry and splash interactions must not depend on app data loading.
- The splash entrance must display the centered `Cherono` script title and a pink `Say Bye` pill button; it must not use a generic “Tap anywhere” prompt.

## 2. Design System

- `--bg-cream`: `#FFF9F2`
- `--text-brown`: `#5D4037`
- `--btn-pink`: `#FF4D85`
- `--accent-purple`: `#9D4EDD`
- `--accent-green`: `#2ECC71`
- `--touch-target`: `44px`
- `--nav-height`: `64px`
- `--base-font`: `16px`

## 3. Mobile-First

- The viewport meta tag must include `viewport-fit=cover`.
- App height must use `100dvh`.
- Horizontal scrolling is prohibited.
- Overscroll rubber-banding is disabled with `overscroll-behavior-y: none`.

## 4. The Exit Code

- The Exit control must always exist inside the bottom floating navigation pill.
- It must remain at least `44x44px`.
- It must appear at the far-right end beside the icon-only Home control.
- It must exit fullscreen and return to the splash gate when tapped.

## 5. Asset and Interaction Constraint

- Do not use default blue links or browser styling.
- Styling must use the locked CSS variables and palette.
