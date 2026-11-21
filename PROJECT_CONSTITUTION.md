# PROJECT CONSTITUTION

This document is the absolute law for Cherono's memorial PWA.

## 1. Fullscreen PWA

- `public/manifest.json` must use `"display": "fullscreen"`.
- `src/hooks/useImmersiveMode.js` must request fullscreen on the first `touchstart` or `click` user interaction.
- First-entry and splash interactions must not depend on app data loading.

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

- The Exit control must always exist in the top-right corner.
- It must be at least `44x44px`.
- Its position must use `top: max(env(safe-area-inset-top), 16px)` and `right: 16px`.

## 5. Asset and Interaction Constraint

- Do not use default blue links or browser styling.
- Styling must use the locked CSS variables and palette.
