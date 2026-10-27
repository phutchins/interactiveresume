# Interactive Resume - Philip Hutchins

An interactive web-based resume built with Vue 3 and TypeScript.

## Features

- Interactive sections with animations and hover effects
- Dark/Light mode toggle
- Typing effect for one-liners
- Expandable technical skill categories
- Responsive design for all screen sizes
- Multiple resume versions support through query parameters
- Expandable experience cards
- Mobile and web portfolio with App Store links
- Downloadable approved PDF resume

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
- `src/config/resumeContent.ts` is the typed source for profile details, summary, experience, projects, skills, education, and advisory roles. Section components receive this content as props.
- The section components preserve expandable experience and skill categories. Expansion state uses stable role IDs, so adding a job cannot shift another job's state.
- Files in `public/` are copied directly into `dist/` by Vite. The PDF download must be updated alongside the web content.

The production site is https://resume.phutchins.com and the source repository is https://github.com/phutchins/interactiveresume. This repository builds a static `dist/` directory; it does not contain a deployment workflow. Verify changes with `npm test`, the production build, and local preview before merging.

## Resume Versions

You can create different versions of the resume by adding query parameters to the URL:

- Default version: `/?version=default`
- Create additional versions by adding them to the `resumeVersions` configuration in `src/config/resumeVersions.ts`
- Each version supplies all of its content and section visibility flags. Unknown, repeated, or invalid version parameters fall back to the default resume.

## Customization

- Edit shared resume content in `src/config/resumeContent.ts`; override it per version in `src/config/resumeVersions.ts`
- Use stable, unique `id` values for experience entries and set `expandedByDefault` on roles to show initially
- Set section visibility in the version's `sections` object; the default omits strengths to match the approved resume
- Replace `public/PhilipHutchinsResume-2026.pdf` with the approved source PDF when updating resume facts, and update `profile.resumePdf` if its filename changes
- Modify themes and styles in component files
- Add or remove sections by updating the Resume component

## Content Source

The October 27, 2026 update follows the approved `Philip-Hutchins-Senior-Principal-Mobile-Resume.pdf` (photo layout) and the corrected LinkedIn timeline from the same day. The downloadable PDF is an unchanged copy of that approved document. The website follows its combined employer entries; the resume explicitly notes the July 2017 promotion to CTO at Storj.

Preserve these qualifications when editing: Creative Glu and Pencil are part time; Pencil is maintained outside business hours; Android projects are unpublished; Swift, GraphQL, and JVM experience is limited; education is one year of coursework without a degree. DIMO ended in May 2025, IPC ended in April 2026, and the DFM contract ran March–June 2020.

## Technologies Used

- Vue 3
- TypeScript
- Vue Router
- Chart.js
- FontAwesome
- SCSS
