# Project Gemini Instructions

This project is an Android-focused React Native/Expo application migrated from the Ddsgnr web landing page. 

## Conventions
- Use `pnpm` for all package management.
- All components must be stored in `src/components/`.
- All routes must be managed by `expo-router` in `src/app/`.
- Styling must use React Native `StyleSheet`.
- No `npx` or `npm` commands.
- Focus exclusively on Android; remove or ignore all iOS-specific code or configurations.

## Architecture
- Root layout: `src/app/_layout.tsx`
- Entry point: `src/app/index.tsx`
- Assets: `src/assets/`
