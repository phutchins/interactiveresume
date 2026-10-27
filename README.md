# Interactive Resume - Philip Hutchins

An interactive web-based resume built with Vue 3 and TypeScript.

## Features

- Interactive sections with animations and hover effects
- Dark/Light mode toggle
- Typing effect for one-liners
- Interactive skill visualization with radar charts
- Responsive design for all screen sizes
- Multiple resume versions support through query parameters
- Expandable experience cards

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Type-check and build for production:
```bash
npm run build
```

4. Preview the production build:
```bash
npm run preview
```

## Application Structure

- `src/main.ts` registers the router and shared icons; `src/App.vue` owns the light/dark theme.
- `src/components/Resume.vue` composes the resume, contact links, typing animation, and PDF download.
- `src/config/resumeVersions.ts` selects content with the `?version=` query parameter, falling back to `default`.
- The section components render expandable experience and skill categories, strengths, and advisory roles.
- Files in `public/` are copied directly into `dist/` by Vite. The PDF download must be updated alongside the web content.

The production site is https://resume.phutchins.com and the source repository is https://github.com/phutchins/interactiveresume. This repository builds a static `dist/` directory; it does not contain a deployment workflow. Verify changes with the production build and local preview before merging.

## Resume Versions

You can create different versions of the resume by adding query parameters to the URL:

- Default version: `/?version=default`
- Create additional versions by adding them to the `resumeVersions` configuration in `src/config/resumeVersions.ts`

## Customization

- Edit resume content in `src/config/resumeVersions.ts`
- Modify themes and styles in component files
- Add or remove sections by updating the Resume component

## Technologies Used

- Vue 3
- TypeScript
- Vue Router
- Chart.js
- FontAwesome
- SCSS
