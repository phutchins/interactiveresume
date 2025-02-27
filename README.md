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

3. Build for production:
```bash
npm run build
```

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
