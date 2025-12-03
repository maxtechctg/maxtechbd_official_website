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

## Database Models (19 Total)
1. **SiteSettings** - Global site configuration (separate navbar/footer logos with customizable sizes, contact info, etc.)
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
18. **AdminUser** - Admin dashboard users with JWT authentication
19. **SaaSProduct** - SaaS product listings with features, tech stack, and demo links

## Pages & Routes

### Public Pages
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
| `/saas-products` | SaaS Products listing | SaaSProducts with card layout |
| `/saas-products/[slug]` | Product detail | Individual SaaSProduct with full-width hero |

### Admin Dashboard
| Route | Description |
|-------|-------------|
| `/login` | Admin login page |
| `/admin` | Dashboard home with statistics |
| `/admin/services` | Manage services (CRUD) |
| `/admin/hero-slides` | Manage hero slider content |
| `/admin/team-members` | Manage team members |
| `/admin/testimonials` | Manage testimonials |
| `/admin/projects` | Manage portfolio/case studies |
| `/admin/news-posts` | Manage news articles |
| `/admin/site-settings` | Edit site configuration |
| `/admin/client-logos` | Manage client logos |
| `/admin/social-links` | Manage social media links |
| `/admin/footer-links` | Manage footer links |
| `/admin/menu-items` | Manage navigation menu |
| `/admin/stat-counters` | Manage statistics counters |
| `/admin/timeline-milestones` | Manage company timeline |
| `/admin/page-content` | Manage page headers/subtitles |
| `/admin/about-section` | Edit about section |
| `/admin/vision-section` | Edit vision section |
| `/admin/contact-submissions` | View contact form submissions |
| `/admin/saas-products` | Manage SaaS products (CRUD) |

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
- **JWT_SECRET** - Secret key for JWT authentication (required)
- **CLOUDINARY_CLOUD_NAME** - Cloudinary cloud name for image uploads
- **CLOUDINARY_API_KEY** - Cloudinary API key
- **CLOUDINARY_API_SECRET** - Cloudinary API secret

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
- **Client-side Navigation Fix**: `ScriptInitializer` component re-initializes legacy scripts (Swiper, WOW.js, Jarallax, Owl Carousel) on route changes to ensure proper rendering after client-side navigation

## Admin Dashboard Authentication
- **Login URL**: `/login`
- **Default Credentials**: admin@maxtech.com / admin123
- **Authentication**: JWT-based with HTTP-only cookies
- **Session Duration**: 7 days
- **Protected Routes**: All `/admin/*` routes require authentication

## Cloudinary Image Uploads
The admin dashboard integrates with Cloudinary for image management:
- **Drag & Drop Upload**: Drag images directly onto upload areas
- **Click to Upload**: Click upload areas to select files from device
- **Image Preview**: See uploaded images with option to remove
- **Direct URL Entry**: Optionally paste image URLs directly
- **Organized Folders**: Images are organized in Cloudinary by type:
  - `maxtech/hero` - Hero slider backgrounds
  - `maxtech/services` - Service images and icons
  - `maxtech/team` - Team member photos
  - `maxtech/testimonials` - Testimonial author photos
  - `maxtech/projects` - Portfolio/case study images
  - `maxtech/news` - News article images
  - `maxtech/clients` - Client logos
  - `maxtech/about` - About section images
  - `maxtech/vision` - Vision section backgrounds
  - `maxtech/branding` - Site logos and favicon

## Smart Header Feature
The header automatically adapts its text color based on the background it's over:
- **Over dark sections** (HeroSlider, VisionSection, TestimonialsCarousel, PageHeader with parallax): White text for visibility
- **Over light sections** (ServicesGrid, AboutSection, etc.): Black text for readability
- **Smooth transitions**: CSS transitions provide smooth color changes (0.3s)
- **Implementation**: Scroll detection using getBoundingClientRect, sections tagged with `data-header-theme="dark"`
- **CSS file**: `public/css/header-theme.css` contains all theme-related styles

## TabbedSaaSProducts Component
A modern tabbed interface for displaying SaaS products on the `/saas-products` page:
- **Horizontal scrolling tabs**: Each product displayed as a card tab with hover effects
- **Two-column detail layout**: Overview + features list on left, media (image/video/gif) on right
- **Scroll-triggered animations**: Media slides in from side with smooth cubic-bezier transition using IntersectionObserver
- **Content fade transitions**: Smooth fade effect when switching between tabs
- **Media support**: Supports images, videos, and GIFs with automatic fallback placeholders
- **Features list**: Styled bullet points with gradient accent
- **Media directory**: `public/images/modules/` for product screenshots/demos
- **CSS file**: `public/css/tabbed-bootstrap.css` contains all component styles
- **Products**: SchoolERP, CRM, ERP, HRMS, Helpdesk (data in component, media paths configurable)

## Current State (December 3, 2025)
- All 10 public pages fully migrated and functional
- All content database-driven (no hardcoded text)
- 19 database models with comprehensive seed data
- Admin dashboard with complete CRUD for all models
- JWT authentication with secure session management
- Cloudinary integration for image uploads in admin forms
- Timeline milestones support multiple images for carousel
- Portfolio projects have complete content (challenges, solutions, testimonials)
- Dynamic rendering enabled for real-time database updates
- Separate navbar/footer logos with customizable sizes
- Client-side navigation properly re-initializes interactive components
- Smart header with adaptive text color based on background sections
- TabbedSaaSProducts component for modern product showcase
- Development server running on port 5000

## Deployment
- **Type**: Autoscale deployment recommended
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`
