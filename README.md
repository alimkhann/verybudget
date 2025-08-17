# VeryBudget - AI-Powered Student Budgeting App

A Next.js landing page for an AI-powered student budgeting application with gamification elements. Built with modern web technologies and optimized for conversion.

## Description

VeryBudget is a student-focused budgeting app that combines AI-powered insights with playful fishbowl gamification. This repository contains the landing page built with Next.js 14, featuring a waitlist collection system, support inquiry forms, and comprehensive internationalization (English/Russian).

## Interesting Techniques

- **React Portals**: Uses [`createPortal`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) for modal rendering outside the DOM hierarchy, preventing z-index conflicts and positioning issues
- **Custom Events**: Implements real-time counter updates via [`CustomEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) and `window.dispatchEvent` for inter-component communication
- **Glassmorphism**: CSS [`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter) with subtle SVG noise textures for modern UI effects
- **Sticky Positioning**: CSS [`position: sticky`](https://developer.mozilla.org/en-US/docs/Web/CSS/position#sticky) header with maintained padding during scroll
- **Internationalization**: Lightweight dictionary-based i18n with automatic language detection from URL params and browser locale
- **Real-time Data**: Supabase integration with automatic refresh intervals and event-driven updates

## Technologies & Libraries

- **[Next.js 14](https://nextjs.org/)**: App Router with static generation, TypeScript support, and optimized builds
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first styling with custom color palette and responsive design
- **[Supabase](https://supabase.com/)**: Backend-as-a-Service for PostgreSQL database and real-time data management
- **[TypeScript](https://www.typescriptlang.org/)**: Full type safety throughout the application
- **[React 18](https://react.dev/)**: Modern hooks, concurrent features, and client-side rendering
- **[clsx](https://github.com/lukeed/clsx)**: Utility for conditional CSS class names

## Project Structure

```
VeryBudget/
├── android/                 # Android app directory
├── ios/                     # iOS app directory
├── web/                     # Next.js web application
│   ├── app/                 # App Router pages and layouts
│   │   ├── globals.css      # Global styles and custom utilities
│   │   ├── layout.tsx       # Root layout with metadata
│   │   ├── page.tsx         # Main landing page with i18n
│   │   ├── privacy/         # Privacy policy page
│   │   └── terms/           # Terms of service page
│   ├── lib/                 # Utility libraries and Supabase client
│   │   └── supabase.ts      # Supabase client configuration
│   ├── public/              # Static assets and images
│   │   ├── icon.png         # App icon
│   │   └── logo.png         # Project logo
│   ├── next.config.js       # Next.js configuration
│   ├── tailwind.config.ts   # Tailwind CSS configuration
│   ├── tsconfig.json        # TypeScript configuration
│   └── package.json         # Dependencies and scripts
├── LICENSE                  # Project license
├── logo.png                 # Project logo
└── README.md               # This file
```

### Key Directories

- **`web/app/`**: Next.js App Router with localized pages (EN/RU), modal components, and responsive layouts
- **`web/lib/`**: Supabase client configuration and database utilities
- **`web/public/`**: Static assets including app icons and project branding
- **`web/app/globals.css`**: Custom CSS utilities, glassmorphism effects, and responsive design patterns

## Features

- **Waitlist Collection**: Supabase-powered email collection with UTM tracking and attribution
- **Support System**: Contact form for user inquiries with automated responses
- **Internationalization**: Complete English/Russian localization with automatic language detection
- **Responsive Design**: Mobile-first approach with Tailwind CSS utilities
- **Performance Optimized**: Lighthouse 100/100 scores for performance and accessibility
- **Modern UI**: Glassmorphism effects, smooth animations, and accessible components

## Development

The project uses modern development practices with TypeScript for type safety, Tailwind CSS for styling, and Next.js 14 for optimal performance. The codebase demonstrates advanced React patterns including portals, custom events, and efficient state management.