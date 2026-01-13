# Product Management App

A clean product listing app inspired by dub.sh with smooth animations and a modern UI.

## What's Inside

Built this with React and TypeScript. Got full CRUD operations, responsive design that switches between modal and drawer based on screen size, and everything's animated nicely with Framer Motion. Data persists in localStorage using React Query.

## Stack

- React 18 + TypeScript
- Vite for fast builds
- TanStack Table & React Query
- Framer Motion for animations
- Zod for validation
- Shadcn UI components
- Tailwind CSS

## Quick Start

```bash
npm install
npm run dev
```

App runs on `http://localhost:5173`

```bash
npm run build
npm run preview
```

## Features

**Header** - Sticky nav with the logo and auth buttons

**Hero Section** - Quick intro with CTA button to create products

**Product Cards** - Card-based layout showing all product details with hover actions

**Edit & Delete** - Icons appear on hover, click to edit or remove products

**Responsive Modal/Drawer** - Modal on desktop, drawer on mobile

**Search** - Filter products by name, category, or description

**Form Validation** - Real-time validation using Zod schema

**Smooth Animations** - Everything animates in nicely

**Local Storage** - Products persist across sessions using React Query

## Structure

```
src/
├── components/     UI components
├── hooks/          Custom hooks (useProducts, useMediaQuery)
├── data/           Mock data
├── types/          TypeScript types
└── lib/            Utils
```

## How It Works

React Query handles all the data operations. Products get saved to localStorage automatically. TanStack Table powers the product list with filtering. Form validation happens through React Hook Form + Zod. Framer Motion adds the smooth transitions.

Everything's built with accessibility in mind using Radix UI primitives under Shadcn components.
