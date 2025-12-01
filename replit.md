# MaxTech - IT Solutions and Services Website (Next.js 14)

## Overview
MaxTech is a professional IT solutions and services website that has been fully migrated from static HTML/PHP to Next.js 14 with TypeScript. All content is database-driven using Prisma ORM with PostgreSQL, while maintaining the exact same visual design, layout, colors, fonts, spacing, and animations as the original template.

## Project Structure
```
nextjs-app/                    # Next.js 14 application
├── app/                       # App Router pages
│   ├── layout.tsx            # Root layout with CSS imports
│   ├── page.tsx              # Homepage with server-side data fetching
│   ├── about/page.tsx        # About page with timeline and stats
│   ├── services/page.tsx     # Services listing page
│   ├── contact/page.tsx      # Contact page with form
│   ├── news/
│   │   ├── page.tsx          # News listing page
│   │   └── [slug]/page.tsx   # Individual news article
│   ├── portfolio/
│   │   ├── page.tsx          # Portfolio/Study Case listing
│   │   └── [slug]/page.tsx   # Individual case study
│   └── api/
│       └── contact/route.ts  # Contact form API endpoint
├── components/               # React components
│   ├── Header.tsx           # Navigation header
│   ├── Footer.tsx           # Site footer
│   ├── HeroSlider.tsx       # Hero section carousel
│   ├── ServicesGrid.tsx     # Services display grid
│   ├── VisionSection.tsx    # Company vision section
│   ├── TeamSection.tsx      # Team members section
│   ├── AboutSection.tsx     # About company section
│   ├── TestimonialsCarousel.tsx  # Customer testimonials
│   ├── ClientLogos.tsx      # Client logo carousel
│   ├── PageHeader.tsx       # Reusable page header with breadcrumbs
│   ├── Timeline.tsx         # Company history timeline
│   ├── StatsSection.tsx     # Statistics counters section
│   └── ContactForm.tsx      # Contact form component
├── lib/
│   └── prisma.ts            # Prisma client singleton
├── prisma/
│   ├── schema.prisma        # Database schema (17 models)
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

## Database Models (17 Total)
1. **SiteSettings** - Global site configuration (logo, contact info, etc.)
2. **MenuItem** - Navigation menu with hierarchical structure
3. **HeroSlide** - Homepage slider content
4. **Service** - Service offerings (8 services seeded)
5. **VisionSection** - Company vision content
6. **TeamMember** - Team member profiles with social links
7. **AboutSection** - About page content
8. **Testimonial** - Customer testimonials
9. **ClientLogo** - Client logo carousel items
10. **SocialLink** - Social media links
11. **FooterLink** - Footer navigation links
12. **Project** - Portfolio/case study items (6 projects with full content)
13. **NewsPost** - Blog/news articles (6 articles seeded)
14. **ContactSubmission** - Contact form submissions
15. **PageContent** - Page headers and subtitles for all routes
16. **TimelineMilestone** - Company history timeline events with images
17. **StatCounter** - Statistics counters (experience, projects, clients, etc.)

## Pages & Routes
| Route | Description | Database Content |
|-------|-------------|------------------|
| `/` | Homepage | HeroSlides, Services, Vision, Team, Testimonials, Client Logos |
| `/about` | About page | PageContent, TimelineMilestones, StatCounters, TeamMembers |
| `/services` | Services listing | Services, PageContent |
| `/contact` | Contact page | SiteSettings, ContactForm submission |
| `/news` | News listing | NewsPosts, PageContent |
| `/news/[slug]` | News article | Individual NewsPost |
| `/portfolio` | Portfolio listing | Projects, Testimonials |
| `/portfolio/[slug]` | Case study | Individual Project with challenges/solutions |

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

## Content Management
- All content is stored in the PostgreSQL database
- Use Prisma Studio (`npm run prisma:studio`) for a GUI to manage content
- Or use the Replit Database tool to view/edit data
- Changes reflect immediately (force-dynamic rendering enabled)

## Migration Notes
- Original PHP site files preserved in root directory for reference
- All original CSS, images, and fonts copied to `nextjs-app/public/`
- Visual design is 100% preserved - only tech stack changed
- Contact form now stores submissions in database
- Legacy jQuery scripts loaded via Next.js Script component
- Hydration warnings from legacy jQuery integration are expected behavior

## Current State (December 1, 2025)
- All 8 pages fully migrated and functional
- All content database-driven (no hardcoded text)
- 17 database models with comprehensive seed data
- Timeline milestones support multiple images for carousel
- Portfolio projects have complete content (challenges, solutions, testimonials)
- Dynamic rendering enabled for real-time database updates
- Development server running on port 5000

## Deployment
- **Type**: Autoscale deployment recommended
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`
