# Alan Wang Personal Branding Website

## Overview

This is a single-page personal branding website for Alan Wang, a Master's student at Georgia Tech specializing in healthcare analytics and data science. The website showcases his education, professional experience, technical skills, and projects with a modern healthcare technology aesthetic. Built as a React single-page application with a Node.js/Express backend, the site features smooth scrolling navigation, animated backgrounds, and responsive design optimized for both desktop and mobile viewing.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Wouter for lightweight client-side routing (though currently single-page)
- Single-page application architecture with smooth scroll navigation between sections

**UI Component System**
- shadcn/ui component library (New York style variant) with Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Component structure follows atomic design with reusable UI components in `client/src/components/ui/`
- Custom sections (Hero, Education, Experience, Skills, Projects, Contact) as feature components

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management and API caching
- React Hook Form with Zod resolvers for form validation (infrastructure present but not actively used)
- Custom hooks for scroll animations and responsive behavior

**Styling & Design System**
- Healthcare technology aesthetic with medical blue color palette
- CSS custom properties for theming (light/dark mode support configured)
- DM Sans and Inter fonts from Google Fonts for clean typography
- Responsive design with mobile-first breakpoints

**Animation & Interactivity**
- Custom canvas-based animated background with particle system and mouse interaction
- Intersection Observer API for scroll-triggered animations
- Smooth scroll behavior for navigation
- Hover and active states with elevation effects

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript
- Custom middleware for request logging and JSON body parsing
- Modular route registration system (currently minimal routes defined)
- Development/production environment handling

**Development Tools**
- Vite middleware integration for HMR in development
- Runtime error overlay for debugging
- Replit-specific plugins for development banner and cartographer

**Storage Layer**
- Abstract storage interface (`IStorage`) for CRUD operations
- In-memory storage implementation (`MemStorage`) as default
- User schema defined with Drizzle ORM for future database integration
- Designed for easy migration to PostgreSQL with Neon serverless

### Database Schema

**Current Schema** (defined but not actively used)
- Users table with UUID primary keys, username, and password fields
- Drizzle ORM configured for PostgreSQL dialect
- Schema validation using Drizzle-Zod for type-safe data insertion
- Migration support configured via `drizzle-kit`

**Design Rationale**
- Static content currently hard-coded in components (education, experience, projects)
- Database infrastructure prepared for future features like authentication, dynamic content, or contact form submissions
- Separation of concerns between schema definition (`shared/schema.ts`) and storage implementation

## External Dependencies

### Third-Party Services

**Neon Database**
- Serverless PostgreSQL provider configured via `@neondatabase/serverless`
- Connection string expected via `DATABASE_URL` environment variable
- Currently not actively used but infrastructure ready for activation

### Key Libraries & Frameworks

**UI & Styling**
- Radix UI primitives (accordion, dialog, dropdown, navigation, etc.) for accessible component foundations
- Tailwind CSS with PostCSS and Autoprefixer for styling
- class-variance-authority and clsx for dynamic class management
- Embla Carousel for potential carousel functionality

**Form & Validation**
- React Hook Form for form state management
- Zod for schema validation
- @hookform/resolvers for integrating Zod with React Hook Form

**Data & State**
- TanStack Query for server state and API caching
- Drizzle ORM for database operations and schema management

**Utilities**
- date-fns for date manipulation
- Lucide React for icon components
- nanoid for unique ID generation

**Development**
- TypeScript for type safety
- tsx for executing TypeScript in Node.js
- esbuild for production builds
- Replit-specific development plugins

### Build & Deployment

**Build Process**
- Client: Vite builds React application to `dist/public`
- Server: esbuild bundles Express server to `dist/index.js`
- Path aliases configured for clean imports (`@/`, `@shared/`, `@assets/`)

**Scripts**
- `dev`: Development server with hot reloading
- `build`: Production build of both client and server
- `start`: Production server execution
- `db:push`: Drizzle schema push to database