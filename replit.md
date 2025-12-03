# MaxTech - IT Solutions and Services Website (Next.js 14)

## Overview
MaxTech is a professional IT solutions and services website that has been fully migrated from static HTML/PHP to Next.js 14 with TypeScript. All content is database-driven using Prisma ORM with PostgreSQL. The project's main purpose is to provide a comprehensive online presence for MaxTech, showcasing IT solutions, services, and a portfolio of work, while maintaining the exact same visual design, layout, colors, fonts, spacing, and animations as the original template. It includes a public-facing website and a full-featured admin dashboard for content management, including AI-powered blog generation and a sophisticated SaaS product showcase.

## User Preferences
- All content is stored in the PostgreSQL database.
- Use Prisma Studio (`npm run prisma:studio`) for a GUI to manage content.
- Or use the Replit Database tool to view/edit data.
- Changes reflect immediately (force-dynamic rendering enabled).

## System Architecture
MaxTech is built on Next.js 14 with the App Router, using TypeScript for type safety. The UI/UX strictly adheres to the original template's design, preserving all visual elements, including Bootstrap 5 styling, custom CSS, and legacy jQuery-dependent animations (Swiper.js, WOW.js, Isotope).

**Technical Implementations & Feature Specifications:**
- **Database-driven Content**: All website content, from navigation menus to project details and news articles, is managed via a PostgreSQL database using Prisma ORM.
- **Admin Dashboard**: A comprehensive admin panel provides CRUD (Create, Read, Update, Delete) operations for all content types, secured with JWT-based authentication.
- **Dynamic Content Management**: Content changes via the admin dashboard or Prisma Studio reflect immediately on the live site due to dynamic rendering.
- **Image Management**: Integrated with Cloudinary for image uploads, offering drag-and-drop, click-to-upload, and direct URL entry. Images are organized into specific folders (e.g., `maxtech/hero`, `maxtech/services`).
- **AI-Powered Blog Module**: The admin dashboard includes a blog manager with a markdown editor, category management, SEO support, and a one-click GPT-4o-mini powered blog post generation feature with history tracking.
- **Smart Header**: The header dynamically adjusts its text color (white/black) based on the background section it scrolls over, ensuring readability, with smooth CSS transitions.
- **Tabbed SaaS Products Component**: A modern, dark-themed tabbed interface for showcasing SaaS products, featuring horizontal scrolling tabs, detailed product pages with key features, pricing tables, parallax video sections, client reviews, and configurable CTAs. This component supports accessibility with ARIA attributes and keyboard navigation.
- **Client-side Navigation Fix**: A `ScriptInitializer` component re-initializes legacy scripts (Swiper, WOW.js, Jarallax, Owl Carousel) on route changes to ensure proper rendering after client-side navigation.
- **Project Structure**: Organized with `app/` for Next.js App Router pages, `components/` for reusable React components, `lib/` for utility functions (like Prisma client), `prisma/` for schema and seeding, and `public/` for static assets (CSS, images, fonts, legacy JS).

**UI/UX Decisions:**
- **Visual Fidelity**: 100% preservation of the original HTML/PHP template's visual design, including color schemes, fonts, spacing, and animations.
- **Responsive Design**: Inherits responsiveness from the original Bootstrap 5 template.
- **Interactive Elements**: Utilizes existing libraries like Swiper.js, WOW.js, and Isotope for carousels, animations, and filtering, integrated seamlessly into the Next.js environment.

## External Dependencies
- **Database**: PostgreSQL (hosted on Neon via Replit)
- **ORM**: Prisma 5.22.0
- **Cloud Storage**: Cloudinary (for image uploads and hosting)
- **AI Integration**: OpenAI API (for AI blog post generation, specifically GPT-4o-mini)
- **Frontend Libraries**:
    - React 18
    - Next.js 14
    - TypeScript
    - Bootstrap 5.0.2
    - jQuery (for legacy animations and scripts)
    - Swiper.js
    - WOW.js
    - Isotope
    - Font Awesome 4 & 6
- **Environment Variables**:
    - `DATABASE_URL`
    - `JWT_SECRET`
    - `CLOUDINARY_CLOUD_NAME`
    - `CLOUDINARY_API_KEY`
    - `CLOUDINARY_API_SECRET`
    - `OPENAI_API_KEY`
    - `OPENAI_MODEL`