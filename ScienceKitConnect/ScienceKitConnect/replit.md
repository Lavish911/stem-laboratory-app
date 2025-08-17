# Overview

ScienceKit Pro is a full-stack e-commerce web application for selling STEM education kits and materials. Built as a modern React/Express application, it provides a complete online shopping experience for chemistry sets, robotics kits, Arduino projects, and educational lab manuals. The platform features product browsing, search functionality, shopping cart management, and a streamlined checkout process.

# User Preferences

Preferred communication style: Simple, everyday language.

# Trademark Information

ScienceKit Pro website created by Lavish Rahangdale and Om Ninave. This trademark information is displayed prominently on the website footer and hero section.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript, built using Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **State Management**: React Context API for cart state management across components
- **Data Fetching**: TanStack Query (React Query) for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON responses
- **Data Storage**: In-memory storage implementation with interface for future database integration
- **Development Server**: Custom Vite integration for hot module replacement in development

## Component Organization
- **UI Components**: Reusable shadcn/ui components in `/client/src/components/ui/`
- **Feature Components**: Business logic components like ProductCard, ShoppingCart, and CategorySection
- **Page Components**: Route-level components for Home, Catalog, Product details, and Checkout
- **Layout Components**: Header and Footer for consistent site structure

## Data Management
- **Schema Definition**: Shared TypeScript schemas using Drizzle ORM for type safety
- **Product Data**: In-memory storage with seeded sample data for development
- **Cart Persistence**: Browser localStorage with React Context for state management
- **Query Caching**: TanStack Query for automatic background refetching and cache management

## Styling and Design System
- **CSS Framework**: Tailwind CSS with custom design tokens and color palette
- **Design System**: Consistent spacing, typography, and component variants
- **Responsive Design**: Mobile-first approach with responsive grid layouts
- **Theme Support**: CSS custom properties for consistent theming

## Development and Build Pipeline
- **Bundling**: Vite for frontend assets, esbuild for backend production builds
- **Type Safety**: Full TypeScript coverage across frontend, backend, and shared schemas
- **Code Organization**: Monorepo structure with shared types and utilities
- **Path Aliases**: Configured import aliases for clean import statements

# External Dependencies

## Database and ORM
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL support configured
- **Neon Database**: Serverless PostgreSQL database service integration
- **Database Migrations**: Drizzle Kit for schema migrations and database management

## UI and Component Libraries
- **Radix UI**: Unstyled, accessible UI primitives for complex components
- **shadcn/ui**: Pre-built component library with consistent design patterns
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Lucide React**: Icon library for consistent iconography

## Development Tools
- **Vite**: Fast development server and build tool with plugin ecosystem
- **Replit Integration**: Custom plugins for Replit development environment
- **TypeScript**: Static type checking with strict configuration
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer

## Runtime Dependencies
- **React Query**: Server state management and caching
- **React Hook Form**: Form handling with validation
- **Zod**: Runtime type validation and schema parsing
- **Date-fns**: Date manipulation and formatting utilities
- **Class Variance Authority**: Type-safe CSS class management for component variants