# MaxTech - IT Solutions and Services Website (Next.js 14)

## Overview
MaxTech is a professional IT solutions and services website that has been migrated from static HTML/PHP to Next.js 14 with TypeScript. All content is now database-driven using Prisma ORM with PostgreSQL, while maintaining the exact same visual design, layout, colors, fonts, spacing, and animations as the original template.

## Project Structure
```
nextjs-app/                    # Next.js 14 application
├── app/                       # App Router pages
│   ├── layout.tsx            # Root layout with CSS imports
│   ├── page.tsx              # Homepage with server-side data fetching
│   └── api/
│       └── contact/
│           └── route.ts      # Contact form API endpoint
├── components/               # React components
│   ├── Header.tsx           # Navigation header
│   ├── Footer.tsx           # Site footer
│   ├── HeroSlider.tsx       # Hero section carousel
│   ├── ServicesGrid.tsx     # Services display grid
│   ├── VisionSection.tsx    # Company vision section
│   ├── TeamSection.tsx      # Team members section
│   ├── AboutSection.tsx     # About company section
│   ├── TestimonialsCarousel.tsx  # Customer testimonials
│   └── ClientLogos.tsx      # Client logo carousel
├── lib/
│   └── prisma.ts            # Prisma client singleton
├── prisma/
│   ├── schema.prisma        # Database schema (15 models)
│   └── seed.ts              # Database seed script
├── public/                  # Static assets
│   ├── css/                 # Original CSS files
│   ├── images/              # Original images
│   ├── fonts/               # Icon fonts
│   └── js/                  # jQuery plugins and scripts
└── package.json
```

## Technology Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon via Replit)
- **ORM**: Prisma 5.22.0
- **Styling**: Original Bootstrap 5, custom CSS (preserved)
- **Frontend Libraries**: 
  - React 18
  - jQuery (via public/js for legacy animations)
  - Swiper.js, WOW.js, Isotope (preserved)
  - Bootstrap 5.0.2
  - Font Awesome 4 & 6

## Database Models
The Prisma schema includes:
1. **SiteSettings** - Global site configuration (logo, contact info, etc.)
2. **MenuItem** - Navigation menu with hierarchical structure
3. **HeroSlide** - Homepage slider content
4. **Service** - Service offerings
5. **VisionSection** - Company vision content
6. **TeamMember** - Team member profiles with social links
7. **AboutSection** - About page content
8. **Testimonial** - Customer testimonials
9. **ClientLogo** - Client logo carousel items
10. **SocialLink** - Social media links
11. **FooterLink** - Footer navigation links
12. **Project** - Portfolio/case study items
13. **NewsPost** - Blog/news articles
14. **ContactSubmission** - Contact form submissions
15. **PageContent** - Generic page content

## Development Commands
```bash
cd nextjs-app

# Start development server
npm run dev

# Database operations
npm run prisma:generate   # Generate Prisma client
npm run prisma:push       # Push schema to database
npm run prisma:seed       # Seed database with initial data
npm run prisma:studio     # Open Prisma Studio GUI
npm run db:setup          # Push schema + seed (full setup)

# Production
npm run build             # Build for production
npm run start             # Start production server
```

## API Endpoints
- **POST /api/contact** - Submit contact form
  - Body: `{ name, email, message, phone?, subject? }`
  - Returns: `{ success, message, id }`

## Environment Variables
- **DATABASE_URL** - PostgreSQL connection string (auto-configured by Replit)

## Features
1. **Homepage**: Hero slider with dynamic content from database
2. **Services**: Database-driven service listings
3. **Team**: Team member profiles with social links
4. **Testimonials**: Customer reviews carousel
5. **Contact Form**: Next.js API route with database storage (replaces PHP)
6. **Footer**: Dynamic links and social media from database

## Migration Notes
- Original PHP site files preserved in root directory for reference
- All original CSS, images, and fonts copied to `nextjs-app/public/`
- Visual design is 100% preserved - only tech stack changed
- Contact form now stores submissions in database (email sending can be added)
- Legacy jQuery scripts loaded via Next.js Script component

## Current State (December 1, 2025)
- ✅ Next.js 14 with TypeScript configured
- ✅ Prisma ORM with PostgreSQL database connected
- ✅ All 15 database models created and seeded
- ✅ Homepage fully functional with all sections (dynamic rendering enabled)
- ✅ Header, Footer, Hero, Services, Vision, Team, About, Testimonials, Client Logos
- ✅ Contact API endpoint created and tested
- ✅ All original styling preserved
- ✅ Development server running on port 5000
- ✅ Dynamic data fetching (force-dynamic) - database changes reflect immediately

## Deployment
- **Type**: Autoscale deployment recommended
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`
