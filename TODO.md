# Tailwind v4 Migration - Fix PostCSS/Sucrase Parse Error in app.css

## Status: In Progress

### Steps:

1. [x] Update package.json with Tailwind v4 dependencies
2. [x] Update vite.config.js with @tailwindcss/vite plugin
3. [x] Update tailwind.config.js to v4 format (added JS content paths)
4. [ ] Delete postcss.config.js
5. [ ] Run `npm install`
6. [ ] Clear Vite cache (`rmdir /s /q node_modules\\.vite`)
7. [ ] Test `npm run dev`
8. [ ] Verify fix and complete
