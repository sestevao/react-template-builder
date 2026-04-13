# Template Forge

A drag-and-drop template builder built with React, TypeScript, and Vite. Create UI sections from a component palette, tweak styles and content, preview the result, and export clean HTML.

## Features

- Create and manage multiple templates
- Drag-and-drop elements onto a canvas
- Reorder, duplicate, and delete elements
- Start from prebuilt starter templates
- Edit element content and styles in a properties panel
- Preview the rendered template
- Export HTML (copy or download)

## Tech Stack

- Vite + React + TypeScript
- Tailwind CSS
- shadcn/ui + Radix UI primitives
- React Router
- Vitest + Testing Library
- ESLint

## Getting Started

```bash
npm install
npm run dev
```

Then open the URL printed in your terminal.

## Scripts

```bash
npm run dev       # start dev server
npm run build     # production build
npm run preview   # preview production build locally
npm run lint      # lint
npm test          # run tests once
```

## Project Structure

- src/pages: app routes/pages (builder lives in Index/BuilderDashboard)
- src/contexts: builder state management
- src/components/builder: canvas, palette, properties, preview, export
- src/data: starter templates
