--
-- PostgreSQL database dump
--

\restrict bzx5xm6iBsSU1J6cj4rI6wEXD2urPDz9DLAfDP74QGdoPbFdTRhFldNm1bW1Hip

-- Dumped from database version 16.10 (0374078)
-- Dumped by pg_dump version 16.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: AboutSection; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."AboutSection" (
    id integer NOT NULL,
    subtitle text NOT NULL,
    heading text NOT NULL,
    description text NOT NULL,
    "buttonText" text,
    "buttonUrl" text,
    image1 text,
    image2 text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."AboutSection" OWNER TO neondb_owner;

--
-- Name: AboutSection_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public."AboutSection_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."AboutSection_id_seq" OWNER TO neondb_owner;

--
-- Name: AboutSection_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public."AboutSection_id_seq" OWNED BY public."AboutSection".id;


--
-- Name: AdminUser; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."AdminUser" (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."AdminUser" OWNER TO neondb_owner;

--
-- Name: AdminUser_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public."AdminUser_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."AdminUser_id_seq" OWNER TO neondb_owner;

--
-- Name: AdminUser_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public."AdminUser_id_seq" OWNED BY public."AdminUser".id;


--
-- Name: BlogGenerationLog; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."BlogGenerationLog" (
    id integer NOT NULL,
    status text NOT NULL,
    "generatedTitle" text,
    "errorMessage" text,
    "blogPostId" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."BlogGenerationLog" OWNER TO neondb_owner;

--
-- Name: BlogGenerationLog_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public."BlogGenerationLog_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."BlogGenerationLog_id_seq" OWNER TO neondb_owner;

--
-- Name: BlogGenerationLog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public."BlogGenerationLog_id_seq" OWNED BY public."BlogGenerationLog".id;


--
-- Name: BlogPost; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."BlogPost" (
    id integer NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    category text,
    "markdownContent" text,
    "htmlContent" text,
    "featuredImage" text,
    active boolean DEFAULT true NOT NULL,
    "publishedAt" timestamp(3) without time zone,
    source text DEFAULT 'manual'::text NOT NULL,
    "metaDescription" text,
    tags text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."BlogPost" OWNER TO neondb_owner;

--
-- Name: BlogPost_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public."BlogPost_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."BlogPost_id_seq" OWNER TO neondb_owner;

--
-- Name: BlogPost_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public."BlogPost_id_seq" OWNED BY public."BlogPost".id;


--
-- Name: ClientLogo; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."ClientLogo" (
    id integer NOT NULL,
    name text,
    image text NOT NULL,
    url text,
    "order" integer DEFAULT 0 NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ClientLogo" OWNER TO neondb_owner;

--
-- Name: ClientLogo_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public."ClientLogo_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ClientLogo_id_seq" OWNER TO neondb_owner;

--
-- Name: ClientLogo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public."ClientLogo_id_seq" OWNED BY public."ClientLogo".id;


--
-- Name: ContactSubmission; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."ContactSubmission" (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    message text NOT NULL,
    phone text,
    subject text,
    "isRead" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ContactSubmission" OWNER TO neondb_owner;

--
-- Name: ContactSubmission_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public."ContactSubmission_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ContactSubmission_id_seq" OWNER TO neondb_owner;

--
-- Name: ContactSubmission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public."ContactSubmission_id_seq" OWNED BY public."ContactSubmission".id;


--
-- Name: FooterLink; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."FooterLink" (
    id integer NOT NULL,
    category text NOT NULL,
    label text NOT NULL,
    url text NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."FooterLink" OWNER TO neondb_owner;

--
-- Name: FooterLink_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public."FooterLink_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."FooterLink_id_seq" OWNER TO neondb_owner;

--
-- Name: FooterLink_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public."FooterLink_id_seq" OWNED BY public."FooterLink".id;


--
-- Name: HeroSlide; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."HeroSlide" (
    id integer NOT NULL,
    subtitle text NOT NULL,
    title text NOT NULL,
    "titleHighlight" text,
    description text NOT NULL,
    "primaryBtnText" text,
    "primaryBtnUrl" text,
    "secondaryBtnText" text,
    "secondaryBtnUrl" text,
    "backgroundImage" text NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."HeroSlide" OWNER TO neondb_owner;

--
-- Name: HeroSlide_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public."HeroSlide_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."HeroSlide_id_seq" OWNER TO neondb_owner;

--
-- Name: HeroSlide_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public."HeroSlide_id_seq" OWNED BY public."HeroSlide".id;


--
-- Name: MenuItem; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."MenuItem" (
    id integer NOT NULL,
    label text NOT NULL,
    href text NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    "parentId" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."MenuItem" OWNER TO neondb_owner;

--
-- Name: MenuItem_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public."MenuItem_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."MenuItem_id_seq" OWNER TO neondb_owner;

--
-- Name: MenuItem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public."MenuItem_id_seq" OWNED BY public."MenuItem".id;


--
-- Name: NewsPost; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."NewsPost" (
    id integer NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    excerpt text,
    content text,
    image text,
    author text,
    "publishedAt" timestamp(3) without time zone,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    tags text,
    thumbnail text
);


ALTER TABLE public."NewsPost" OWNER TO neondb_owner;

--
-- Name: NewsPost_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public."NewsPost_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."NewsPost_id_seq" OWNER TO neondb_owner;

--
-- Name: NewsPost_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public."NewsPost_id_seq" OWNED BY public."NewsPost".id;


--
-- Name: PageContent; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."PageContent" (
    id integer NOT NULL,
    "pageSlug" text NOT NULL,
    title text NOT NULL,
    subtitle text,
    description text,
    "metaTitle" text,
    "metaDescription" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."PageContent" OWNER TO neondb_owner;

--
-- Name: PageContent_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public."PageContent_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."PageContent_id_seq" OWNER TO neondb_owner;

--
-- Name: PageContent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public."PageContent_id_seq" OWNED BY public."PageContent".id;


--
-- Name: Project; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Project" (
    id integer NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    description text,
    content text,
    image text,
    category text,
    client text,
    date timestamp(3) without time zone,
    "order" integer DEFAULT 0 NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    challenges text,
    overview text,
    "positiveFeedbacks" integer,
    solutions text,
    "testimonialQuote" text,
    "turnoverIncrease" integer
);


ALTER TABLE public."Project" OWNER TO neondb_owner;

--
-- Name: Project_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public."Project_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Project_id_seq" OWNER TO neondb_owner;

--
-- Name: Project_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public."Project_id_seq" OWNED BY public."Project".id;


--
-- Name: SaaSProduct; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."SaaSProduct" (
    id integer NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    tagline text,
    "shortDescription" text NOT NULL,
    "longDescription" text,
    "mainImage" text,
    features text,
    "techStack" text,
    "liveDemoUrl" text,
    "githubUrl" text,
    "documentationUrl" text,
    "order" integer DEFAULT 0 NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "bannerImage" text,
    "clientReviews" text,
    "demoVideoUrl" text,
    "featureCards" text,
    "keyFeatures" text,
    "parallaxDescription" text,
    "parallaxImage" text,
    "parallaxTitle" text,
    "pricingPlans" text,
    rating double precision DEFAULT 0,
    "totalUsers" text,
    "requestDemoText" text DEFAULT 'Request For Demo'::text,
    "requestDemoUrl" text
);


ALTER TABLE public."SaaSProduct" OWNER TO neondb_owner;

--
-- Name: SaaSProduct_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public."SaaSProduct_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SaaSProduct_id_seq" OWNER TO neondb_owner;

--
-- Name: SaaSProduct_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public."SaaSProduct_id_seq" OWNED BY public."SaaSProduct".id;


--
-- Name: Service; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Service" (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    image text,
    icon text,
    "order" integer DEFAULT 0 NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Service" OWNER TO neondb_owner;

--
-- Name: Service_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public."Service_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Service_id_seq" OWNER TO neondb_owner;

--
-- Name: Service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public."Service_id_seq" OWNED BY public."Service".id;


--
-- Name: SiteSettings; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."SiteSettings" (
    id integer NOT NULL,
    "siteName" text NOT NULL,
    "siteTitle" text NOT NULL,
    description text,
    phone text,
    email text,
    address text,
    "logoUrl" text,
    "logoMobileUrl" text,
    favicon text,
    copyright text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "footerLogo" text,
    "footerLogoHeight" integer DEFAULT 50,
    "footerLogoWidth" integer DEFAULT 150,
    "navbarLogo" text,
    "navbarLogoHeight" integer DEFAULT 40,
    "navbarLogoWidth" integer DEFAULT 150,
    "portfolioBannerImage" text,
    "saasProductsBannerImage" text
);


ALTER TABLE public."SiteSettings" OWNER TO neondb_owner;

--
-- Name: SiteSettings_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public."SiteSettings_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SiteSettings_id_seq" OWNER TO neondb_owner;

--
-- Name: SiteSettings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public."SiteSettings_id_seq" OWNED BY public."SiteSettings".id;


--
-- Name: SocialLink; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."SocialLink" (
    id integer NOT NULL,
    platform text NOT NULL,
    url text NOT NULL,
    icon text NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."SocialLink" OWNER TO neondb_owner;

--
-- Name: SocialLink_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public."SocialLink_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SocialLink_id_seq" OWNER TO neondb_owner;

--
-- Name: SocialLink_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public."SocialLink_id_seq" OWNED BY public."SocialLink".id;


--
-- Name: StatCounter; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."StatCounter" (
    id integer NOT NULL,
    value integer NOT NULL,
    suffix text,
    label text NOT NULL,
    icon text,
    "order" integer DEFAULT 0 NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."StatCounter" OWNER TO neondb_owner;

--
-- Name: StatCounter_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public."StatCounter_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."StatCounter_id_seq" OWNER TO neondb_owner;

--
-- Name: StatCounter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public."StatCounter_id_seq" OWNED BY public."StatCounter".id;


--
-- Name: TeamMember; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."TeamMember" (
    id integer NOT NULL,
    name text NOT NULL,
    role text NOT NULL,
    image text NOT NULL,
    facebook text,
    twitter text,
    instagram text,
    discord text,
    linkedin text,
    "order" integer DEFAULT 0 NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."TeamMember" OWNER TO neondb_owner;

--
-- Name: TeamMember_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public."TeamMember_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TeamMember_id_seq" OWNER TO neondb_owner;

--
-- Name: TeamMember_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public."TeamMember_id_seq" OWNED BY public."TeamMember".id;


--
-- Name: Testimonial; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Testimonial" (
    id integer NOT NULL,
    "authorName" text NOT NULL,
    "authorRole" text NOT NULL,
    "authorImage" text,
    quote text NOT NULL,
    rating integer DEFAULT 5 NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Testimonial" OWNER TO neondb_owner;

--
-- Name: Testimonial_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public."Testimonial_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Testimonial_id_seq" OWNER TO neondb_owner;

--
-- Name: Testimonial_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public."Testimonial_id_seq" OWNED BY public."Testimonial".id;


--
-- Name: TimelineMilestone; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."TimelineMilestone" (
    id integer NOT NULL,
    year text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    images text
);


ALTER TABLE public."TimelineMilestone" OWNER TO neondb_owner;

--
-- Name: TimelineMilestone_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public."TimelineMilestone_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TimelineMilestone_id_seq" OWNER TO neondb_owner;

--
-- Name: TimelineMilestone_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public."TimelineMilestone_id_seq" OWNED BY public."TimelineMilestone".id;


--
-- Name: VisionSection; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."VisionSection" (
    id integer NOT NULL,
    subtitle text NOT NULL,
    heading text NOT NULL,
    "buttonText" text,
    "buttonUrl" text,
    "backgroundImage" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."VisionSection" OWNER TO neondb_owner;

--
-- Name: VisionSection_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public."VisionSection_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."VisionSection_id_seq" OWNER TO neondb_owner;

--
-- Name: VisionSection_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public."VisionSection_id_seq" OWNED BY public."VisionSection".id;


--
-- Name: AboutSection id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."AboutSection" ALTER COLUMN id SET DEFAULT nextval('public."AboutSection_id_seq"'::regclass);


--
-- Name: AdminUser id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."AdminUser" ALTER COLUMN id SET DEFAULT nextval('public."AdminUser_id_seq"'::regclass);


--
-- Name: BlogGenerationLog id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."BlogGenerationLog" ALTER COLUMN id SET DEFAULT nextval('public."BlogGenerationLog_id_seq"'::regclass);


--
-- Name: BlogPost id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."BlogPost" ALTER COLUMN id SET DEFAULT nextval('public."BlogPost_id_seq"'::regclass);


--
-- Name: ClientLogo id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."ClientLogo" ALTER COLUMN id SET DEFAULT nextval('public."ClientLogo_id_seq"'::regclass);


--
-- Name: ContactSubmission id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."ContactSubmission" ALTER COLUMN id SET DEFAULT nextval('public."ContactSubmission_id_seq"'::regclass);


--
-- Name: FooterLink id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."FooterLink" ALTER COLUMN id SET DEFAULT nextval('public."FooterLink_id_seq"'::regclass);


--
-- Name: HeroSlide id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."HeroSlide" ALTER COLUMN id SET DEFAULT nextval('public."HeroSlide_id_seq"'::regclass);


--
-- Name: MenuItem id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."MenuItem" ALTER COLUMN id SET DEFAULT nextval('public."MenuItem_id_seq"'::regclass);


--
-- Name: NewsPost id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."NewsPost" ALTER COLUMN id SET DEFAULT nextval('public."NewsPost_id_seq"'::regclass);


--
-- Name: PageContent id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."PageContent" ALTER COLUMN id SET DEFAULT nextval('public."PageContent_id_seq"'::regclass);


--
-- Name: Project id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Project" ALTER COLUMN id SET DEFAULT nextval('public."Project_id_seq"'::regclass);


--
-- Name: SaaSProduct id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."SaaSProduct" ALTER COLUMN id SET DEFAULT nextval('public."SaaSProduct_id_seq"'::regclass);


--
-- Name: Service id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Service" ALTER COLUMN id SET DEFAULT nextval('public."Service_id_seq"'::regclass);


--
-- Name: SiteSettings id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."SiteSettings" ALTER COLUMN id SET DEFAULT nextval('public."SiteSettings_id_seq"'::regclass);


--
-- Name: SocialLink id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."SocialLink" ALTER COLUMN id SET DEFAULT nextval('public."SocialLink_id_seq"'::regclass);


--
-- Name: StatCounter id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."StatCounter" ALTER COLUMN id SET DEFAULT nextval('public."StatCounter_id_seq"'::regclass);


--
-- Name: TeamMember id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."TeamMember" ALTER COLUMN id SET DEFAULT nextval('public."TeamMember_id_seq"'::regclass);


--
-- Name: Testimonial id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Testimonial" ALTER COLUMN id SET DEFAULT nextval('public."Testimonial_id_seq"'::regclass);


--
-- Name: TimelineMilestone id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."TimelineMilestone" ALTER COLUMN id SET DEFAULT nextval('public."TimelineMilestone_id_seq"'::regclass);


--
-- Name: VisionSection id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."VisionSection" ALTER COLUMN id SET DEFAULT nextval('public."VisionSection_id_seq"'::regclass);


--
-- Data for Name: AboutSection; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."AboutSection" (id, subtitle, heading, description, "buttonText", "buttonUrl", image1, image2, "createdAt", "updatedAt") FROM stdin;
8	Trusted IT Solution	Delivering outstanding IT services since 2008	We are a dynamic and forward-thinking IT company dedicated to transforming your digital world. With a passion for cutting-edge solutions and a commitment to exceptional service, we are your trusted partner in navigating the ever-evolving landscape of IT. Our team of skilled professionals is here to harness the power of technology, providing tailor-made solutions that drive your success.	Our Services	/services	/images/misc/1.webp	/images/misc/2.webp	2025-12-01 13:15:41.758	2025-12-01 13:15:41.758
\.


--
-- Data for Name: AdminUser; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."AdminUser" (id, email, password, name, "isActive", "createdAt", "updatedAt") FROM stdin;
2	admin@maxtech.com	$2b$10$Y9NX1Kis0UST.8tdWWRiFutCiiyox9rQqCLM2Vahg1vAyMPBjgY8K	Admin	t	2025-12-01 13:15:35.54	2025-12-01 13:15:35.54
\.


--
-- Data for Name: BlogGenerationLog; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."BlogGenerationLog" (id, status, "generatedTitle", "errorMessage", "blogPostId", "createdAt") FROM stdin;
1	success	Transform Your Business with Cloud Computing Solutions	\N	1	2025-12-03 09:58:34.202
2	success	Transforming Businesses with Cloud Computing Solutions	\N	2	2025-12-03 11:51:27.507
3	success	Transforming Your Business with Cloud Computing Solutions	\N	3	2025-12-03 11:52:56.937
4	success	Enhancing Customer Experience with Innovative Technology Solutions	\N	4	2025-12-03 12:04:35.362
5	success	Unlocking Business Insights: Data Analytics and Business Intelligence	\N	5	2025-12-03 12:58:11.427
\.


--
-- Data for Name: BlogPost; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."BlogPost" (id, title, slug, category, "markdownContent", "htmlContent", "featuredImage", active, "publishedAt", source, "metaDescription", tags, "createdAt", "updatedAt") FROM stdin;
3	Transforming Your Business with Cloud Computing Solutions	transforming-your-business-with-cloud-computing-so-1764762748618	Technology	# Transforming Your Business with Cloud Computing Solutions\n\nIn today's fast-paced digital world, businesses are continually seeking innovative ways to improve efficiency, reduce costs, and enhance collaboration. One of the most powerful tools available is **cloud computing**. With its myriad of benefits, cloud technology has become a cornerstone for organizations looking to thrive in the modern marketplace. In this article, we will explore how cloud computing solutions can transform your business operations and provide a competitive edge.\n\n## What is Cloud Computing?\n\nCloud computing is the delivery of various services over the internet, including data storage, servers, databases, networking, software, and analytics. Instead of relying on local servers or personal computers, businesses can access these resources remotely, enabling flexibility and scalability.\n\n### Key Benefits of Cloud Computing\n\n1. **Cost Efficiency**\n   - **Reduced IT Costs**: By migrating to the cloud, organizations can eliminate the need for expensive hardware and reduce maintenance costs.\n   - **Pay-as-you-go Pricing**: Most cloud services operate on a subscription basis, allowing businesses to pay only for what they use.\n\n2. **Scalability**\n   - **On-demand Resources**: Cloud services can be scaled up or down based on the organization's needs, enabling businesses to adapt to changing demands quickly.\n   - **Global Reach**: Cloud providers often have data centers worldwide, allowing businesses to expand their reach without significant investment.\n\n3. **Enhanced Collaboration**\n   - **Remote Access**: Cloud computing enables employees to access files and applications from anywhere, fostering a remote work environment.\n   - **Real-time Collaboration**: Team members can work together on projects in real-time, improving productivity and innovation.\n\n4. **Improved Security**\n   - **Data Protection**: Cloud providers implement robust security measures, including encryption and multi-factor authentication, to protect sensitive information.\n   - **Disaster Recovery**: Cloud services often include backup and recovery options, ensuring data is safe in the event of a disaster.\n\n5. **Automatic Updates**\n   - **Latest Features**: Cloud service providers regularly update their software, ensuring that businesses always have access to the latest features and improvements without manual intervention.\n\n## How to Choose the Right Cloud Solution for Your Business\n\nWhen considering cloud computing for your organization, it's essential to choose the right solution. Here are some factors to consider:\n\n### 1. Identify Your Needs\n   - Assess what specific services your business requires (e.g., storage, computing power, applications) and how they align with your goals.\n\n### 2. Evaluate Security Measures\n   - Look for cloud providers that prioritize data security and compliance with industry standards, such as GDPR or HIPAA.\n\n### 3. Consider Integration\n   - Ensure that the cloud solution can integrate seamlessly with your existing systems and software to avoid disruptions.\n\n### 4. Determine Support and Training\n   - Choose a provider that offers comprehensive support and training resources to help your team transition smoothly to the cloud.\n\n### 5. Cost Analysis\n   - Compare pricing models among different providers and consider any hidden fees that may arise over time.\n\n## Implementation of Cloud Solutions\n\nImplementing cloud solutions requires strategic planning and execution. Here’s a step-by-step guide:\n\n### Step 1: Develop a Cloud Strategy\n   - Define your business objectives and how cloud computing aligns with them. This includes identifying which applications and data will be migrated to the cloud.\n\n### Step 2: Choose a Cloud Model\n   - Decide between public, private, or hybrid cloud models based on your security, compliance, and performance needs.\n\n### Step 3: Data Migration\n   - Plan the migration process carefully to ensure minimal disruption. This may involve backing up data and testing the migration in phases.\n\n### Step 4: Employee Training\n   - Provide training resources to help employees understand the new tools and processes associated with cloud computing.\n\n### Step 5: Monitor and Optimize\n   - After implementation, continuously monitor cloud performance and make necessary adjustments to optimize efficiency.\n\n## Conclusion\n\nCloud computing is not just a technology trend; it is a fundamental shift in how businesses operate and compete. By embracing cloud solutions, organizations can improve operational efficiencies, enhance collaboration, and secure their data. The transition to the cloud may seem daunting, but with the right strategy and support, it can lead to significant long-term benefits.\n\nAre you ready to transform your business with cloud computing solutions? **Contact us today** to learn more about how our IT solutions can help you leverage the power of the cloud!\n\n---	<h1>Transforming Your Business with Cloud Computing Solutions</h1>\n<p>In today&#39;s fast-paced digital world, businesses are continually seeking innovative ways to improve efficiency, reduce costs, and enhance collaboration. One of the most powerful tools available is <strong>cloud computing</strong>. With its myriad of benefits, cloud technology has become a cornerstone for organizations looking to thrive in the modern marketplace. In this article, we will explore how cloud computing solutions can transform your business operations and provide a competitive edge.</p>\n<h2>What is Cloud Computing?</h2>\n<p>Cloud computing is the delivery of various services over the internet, including data storage, servers, databases, networking, software, and analytics. Instead of relying on local servers or personal computers, businesses can access these resources remotely, enabling flexibility and scalability.</p>\n<h3>Key Benefits of Cloud Computing</h3>\n<ol>\n<li><p><strong>Cost Efficiency</strong></p>\n<ul>\n<li><strong>Reduced IT Costs</strong>: By migrating to the cloud, organizations can eliminate the need for expensive hardware and reduce maintenance costs.</li>\n<li><strong>Pay-as-you-go Pricing</strong>: Most cloud services operate on a subscription basis, allowing businesses to pay only for what they use.</li>\n</ul>\n</li>\n<li><p><strong>Scalability</strong></p>\n<ul>\n<li><strong>On-demand Resources</strong>: Cloud services can be scaled up or down based on the organization&#39;s needs, enabling businesses to adapt to changing demands quickly.</li>\n<li><strong>Global Reach</strong>: Cloud providers often have data centers worldwide, allowing businesses to expand their reach without significant investment.</li>\n</ul>\n</li>\n<li><p><strong>Enhanced Collaboration</strong></p>\n<ul>\n<li><strong>Remote Access</strong>: Cloud computing enables employees to access files and applications from anywhere, fostering a remote work environment.</li>\n<li><strong>Real-time Collaboration</strong>: Team members can work together on projects in real-time, improving productivity and innovation.</li>\n</ul>\n</li>\n<li><p><strong>Improved Security</strong></p>\n<ul>\n<li><strong>Data Protection</strong>: Cloud providers implement robust security measures, including encryption and multi-factor authentication, to protect sensitive information.</li>\n<li><strong>Disaster Recovery</strong>: Cloud services often include backup and recovery options, ensuring data is safe in the event of a disaster.</li>\n</ul>\n</li>\n<li><p><strong>Automatic Updates</strong></p>\n<ul>\n<li><strong>Latest Features</strong>: Cloud service providers regularly update their software, ensuring that businesses always have access to the latest features and improvements without manual intervention.</li>\n</ul>\n</li>\n</ol>\n<h2>How to Choose the Right Cloud Solution for Your Business</h2>\n<p>When considering cloud computing for your organization, it&#39;s essential to choose the right solution. Here are some factors to consider:</p>\n<h3>1. Identify Your Needs</h3>\n<ul>\n<li>Assess what specific services your business requires (e.g., storage, computing power, applications) and how they align with your goals.</li>\n</ul>\n<h3>2. Evaluate Security Measures</h3>\n<ul>\n<li>Look for cloud providers that prioritize data security and compliance with industry standards, such as GDPR or HIPAA.</li>\n</ul>\n<h3>3. Consider Integration</h3>\n<ul>\n<li>Ensure that the cloud solution can integrate seamlessly with your existing systems and software to avoid disruptions.</li>\n</ul>\n<h3>4. Determine Support and Training</h3>\n<ul>\n<li>Choose a provider that offers comprehensive support and training resources to help your team transition smoothly to the cloud.</li>\n</ul>\n<h3>5. Cost Analysis</h3>\n<ul>\n<li>Compare pricing models among different providers and consider any hidden fees that may arise over time.</li>\n</ul>\n<h2>Implementation of Cloud Solutions</h2>\n<p>Implementing cloud solutions requires strategic planning and execution. Here’s a step-by-step guide:</p>\n<h3>Step 1: Develop a Cloud Strategy</h3>\n<ul>\n<li>Define your business objectives and how cloud computing aligns with them. This includes identifying which applications and data will be migrated to the cloud.</li>\n</ul>\n<h3>Step 2: Choose a Cloud Model</h3>\n<ul>\n<li>Decide between public, private, or hybrid cloud models based on your security, compliance, and performance needs.</li>\n</ul>\n<h3>Step 3: Data Migration</h3>\n<ul>\n<li>Plan the migration process carefully to ensure minimal disruption. This may involve backing up data and testing the migration in phases.</li>\n</ul>\n<h3>Step 4: Employee Training</h3>\n<ul>\n<li>Provide training resources to help employees understand the new tools and processes associated with cloud computing.</li>\n</ul>\n<h3>Step 5: Monitor and Optimize</h3>\n<ul>\n<li>After implementation, continuously monitor cloud performance and make necessary adjustments to optimize efficiency.</li>\n</ul>\n<h2>Conclusion</h2>\n<p>Cloud computing is not just a technology trend; it is a fundamental shift in how businesses operate and compete. By embracing cloud solutions, organizations can improve operational efficiencies, enhance collaboration, and secure their data. The transition to the cloud may seem daunting, but with the right strategy and support, it can lead to significant long-term benefits.</p>\n<p>Are you ready to transform your business with cloud computing solutions? <strong>Contact us today</strong> to learn more about how our IT solutions can help you leverage the power of the cloud!</p>\n<hr>\n	https://res.cloudinary.com/dxn7swwvn/image/upload/v1764762767/maxtech/news/n62b7y1mj33u2pgffugc.jpg	t	2025-12-03 11:52:56.085	auto	Discover how cloud computing can elevate your business operations and enhance efficiency with our comprehensive IT solutions.	cloud computing, IT solutions, digital transformation, cybersecurity, business efficiency	2025-12-03 11:52:56.087	2025-12-03 11:52:56.087
4	Enhancing Customer Experience with Innovative Technology Solutions	enhancing-customer-experience-with-innovative-tech-1764763451113	Technology	# Enhancing Customer Experience with Innovative Technology Solutions\n\nIn today's competitive landscape, businesses are increasingly recognizing the critical role that customer experience (CX) plays in driving satisfaction and loyalty. With the rapid evolution of technology, companies now have access to an array of tools that can help enhance their customer interactions. In this article, we'll explore the various facets of customer experience technology and examine how organizations can leverage these solutions to boost engagement, satisfaction, and ultimately, growth.\n\n## Understanding Customer Experience Technology\n\nCustomer experience technology encompasses a wide range of tools and platforms designed to improve the interactions between a business and its customers. This can include everything from customer relationship management (CRM) systems and chatbots to data analytics tools and omnichannel marketing platforms. By harnessing these technologies, businesses can gain deeper insights into their customers' needs and preferences, allowing for more personalized and efficient service.\n\n### Key Components of Customer Experience Technology\n\n1. **Customer Relationship Management (CRM) Systems**  \n   CRM systems centralize customer data, making it easier for businesses to track interactions, manage relationships, and analyze customer journeys. Popular CRM solutions like Salesforce and HubSpot offer comprehensive features that help businesses streamline their customer interaction processes.\n\n2. **Chatbots and Virtual Assistants**  \n   These AI-powered tools can handle customer inquiries 24/7, providing instant responses to frequently asked questions. Implementing chatbots not only improves response times but also frees up human resources for more complex tasks.\n\n3. **Data Analytics Platforms**  \n   Understanding customer behavior requires data, and analytics platforms provide actionable insights into customer preferences and demographics. Tools such as Google Analytics and Tableau allow businesses to create data-driven strategies that enhance customer experiences.\n\n4. **Omnichannel Communication Tools**  \n   Consumers expect seamless experiences across multiple channels—be it social media, email, or live chat. Omnichannel tools help integrate these communications, ensuring that customers receive consistent messaging and support regardless of how they choose to engage with a brand.\n\n5. **Feedback and Survey Tools**  \n   Gaining insights from customers about their experiences is vital for improvement. Tools like SurveyMonkey and Qualtrics enable businesses to collect and analyze customer feedback, helping them make informed decisions that enhance service quality.\n\n## How Technology Enhances Customer Experience\n\nEmbracing customer experience technology can significantly transform how businesses interact with their customers. Here are some of the ways technology enhances CX:\n\n### Personalization\n\nPersonalized experiences are no longer a luxury; they are an expectation. By utilizing customer data effectively, businesses can tailor their offerings to individual preferences. For instance, e-commerce platforms can recommend products based on previous purchases, leading to higher conversion rates and customer satisfaction.\n\n### Efficiency and Convenience\n\nTechnology streamlines processes, making it easier for customers to get what they need quickly. Automated responses, easy access to information, and self-service options improve convenience, leading to a more positive overall experience.\n\n### Proactive Engagement\n\nWith the right tools, businesses can anticipate customer needs and proactively engage with them. For example, if a customer frequently browses a certain product category, companies can send targeted promotions or recommendations, showcasing their attentiveness and enhancing loyalty.\n\n### Consistent Experiences\n\nOmnichannel solutions ensure that customers receive consistent support, regardless of the platform they use. This consistency builds trust and reinforces a brand's reliability in the eyes of its customers.\n\n### Real-time Feedback and Adaptation\n\nTechnology allows businesses to gather feedback in real-time, enabling them to adapt quickly to customer needs and preferences. By monitoring customer interactions, organizations can identify pain points and implement solutions before they escalate.\n\n## Best Practices for Implementing Customer Experience Technology\n\nAdopting customer experience technology requires careful planning and execution. Here are some best practices to consider:\n\n1. **Start with a Strategy**  \n   Determine your goals for implementing customer experience technology. This might include improving customer satisfaction scores or reducing response times. A clear strategy will guide your technology selection and implementation efforts.\n\n2. **Choose the Right Tools**  \n   Not every tool will be suitable for your organization. Assess your customer journey and select tools that align with your specific needs. Prioritize solutions that integrate well with your existing systems for a seamless transition.\n\n3. **Invest in Training**  \n   Your team plays a crucial role in leveraging technology effectively. Provide training to ensure that employees can use the tools to their full potential, maximizing the benefits of the technology.\n\n4. **Monitor and Optimize**  \n   Customer preferences and technology are constantly evolving. Regularly review the performance of your customer experience technology and be open to making adjustments based on feedback and data insights.\n\n5. **Foster a Customer-Centric Culture**  \n   Encourage a culture that prioritizes customer experience across all levels of the organization. When every team member is committed to enhancing CX, it becomes ingrained in the company’s values.\n\n## Conclusion\n\nIn an era where customer expectations are at an all-time high, leveraging customer experience technology is no longer optional for businesses—it's essential. By understanding and implementing the right tools, organizations can create meaningful interactions and foster lasting relationships with their customers. \n\nAre you ready to enhance your customer experience with innovative technology solutions? Contact us today to learn how our IT solutions can help you elevate your business and drive customer satisfaction!	<h1>Enhancing Customer Experience with Innovative Technology Solutions</h1>\n<p>In today&#39;s competitive landscape, businesses are increasingly recognizing the critical role that customer experience (CX) plays in driving satisfaction and loyalty. With the rapid evolution of technology, companies now have access to an array of tools that can help enhance their customer interactions. In this article, we&#39;ll explore the various facets of customer experience technology and examine how organizations can leverage these solutions to boost engagement, satisfaction, and ultimately, growth.</p>\n<h2>Understanding Customer Experience Technology</h2>\n<p>Customer experience technology encompasses a wide range of tools and platforms designed to improve the interactions between a business and its customers. This can include everything from customer relationship management (CRM) systems and chatbots to data analytics tools and omnichannel marketing platforms. By harnessing these technologies, businesses can gain deeper insights into their customers&#39; needs and preferences, allowing for more personalized and efficient service.</p>\n<h3>Key Components of Customer Experience Technology</h3>\n<ol>\n<li><p><strong>Customer Relationship Management (CRM) Systems</strong><br>CRM systems centralize customer data, making it easier for businesses to track interactions, manage relationships, and analyze customer journeys. Popular CRM solutions like Salesforce and HubSpot offer comprehensive features that help businesses streamline their customer interaction processes.</p>\n</li>\n<li><p><strong>Chatbots and Virtual Assistants</strong><br>These AI-powered tools can handle customer inquiries 24/7, providing instant responses to frequently asked questions. Implementing chatbots not only improves response times but also frees up human resources for more complex tasks.</p>\n</li>\n<li><p><strong>Data Analytics Platforms</strong><br>Understanding customer behavior requires data, and analytics platforms provide actionable insights into customer preferences and demographics. Tools such as Google Analytics and Tableau allow businesses to create data-driven strategies that enhance customer experiences.</p>\n</li>\n<li><p><strong>Omnichannel Communication Tools</strong><br>Consumers expect seamless experiences across multiple channels—be it social media, email, or live chat. Omnichannel tools help integrate these communications, ensuring that customers receive consistent messaging and support regardless of how they choose to engage with a brand.</p>\n</li>\n<li><p><strong>Feedback and Survey Tools</strong><br>Gaining insights from customers about their experiences is vital for improvement. Tools like SurveyMonkey and Qualtrics enable businesses to collect and analyze customer feedback, helping them make informed decisions that enhance service quality.</p>\n</li>\n</ol>\n<h2>How Technology Enhances Customer Experience</h2>\n<p>Embracing customer experience technology can significantly transform how businesses interact with their customers. Here are some of the ways technology enhances CX:</p>\n<h3>Personalization</h3>\n<p>Personalized experiences are no longer a luxury; they are an expectation. By utilizing customer data effectively, businesses can tailor their offerings to individual preferences. For instance, e-commerce platforms can recommend products based on previous purchases, leading to higher conversion rates and customer satisfaction.</p>\n<h3>Efficiency and Convenience</h3>\n<p>Technology streamlines processes, making it easier for customers to get what they need quickly. Automated responses, easy access to information, and self-service options improve convenience, leading to a more positive overall experience.</p>\n<h3>Proactive Engagement</h3>\n<p>With the right tools, businesses can anticipate customer needs and proactively engage with them. For example, if a customer frequently browses a certain product category, companies can send targeted promotions or recommendations, showcasing their attentiveness and enhancing loyalty.</p>\n<h3>Consistent Experiences</h3>\n<p>Omnichannel solutions ensure that customers receive consistent support, regardless of the platform they use. This consistency builds trust and reinforces a brand&#39;s reliability in the eyes of its customers.</p>\n<h3>Real-time Feedback and Adaptation</h3>\n<p>Technology allows businesses to gather feedback in real-time, enabling them to adapt quickly to customer needs and preferences. By monitoring customer interactions, organizations can identify pain points and implement solutions before they escalate.</p>\n<h2>Best Practices for Implementing Customer Experience Technology</h2>\n<p>Adopting customer experience technology requires careful planning and execution. Here are some best practices to consider:</p>\n<ol>\n<li><p><strong>Start with a Strategy</strong><br>Determine your goals for implementing customer experience technology. This might include improving customer satisfaction scores or reducing response times. A clear strategy will guide your technology selection and implementation efforts.</p>\n</li>\n<li><p><strong>Choose the Right Tools</strong><br>Not every tool will be suitable for your organization. Assess your customer journey and select tools that align with your specific needs. Prioritize solutions that integrate well with your existing systems for a seamless transition.</p>\n</li>\n<li><p><strong>Invest in Training</strong><br>Your team plays a crucial role in leveraging technology effectively. Provide training to ensure that employees can use the tools to their full potential, maximizing the benefits of the technology.</p>\n</li>\n<li><p><strong>Monitor and Optimize</strong><br>Customer preferences and technology are constantly evolving. Regularly review the performance of your customer experience technology and be open to making adjustments based on feedback and data insights.</p>\n</li>\n<li><p><strong>Foster a Customer-Centric Culture</strong><br>Encourage a culture that prioritizes customer experience across all levels of the organization. When every team member is committed to enhancing CX, it becomes ingrained in the company’s values.</p>\n</li>\n</ol>\n<h2>Conclusion</h2>\n<p>In an era where customer expectations are at an all-time high, leveraging customer experience technology is no longer optional for businesses—it&#39;s essential. By understanding and implementing the right tools, organizations can create meaningful interactions and foster lasting relationships with their customers. </p>\n<p>Are you ready to enhance your customer experience with innovative technology solutions? Contact us today to learn how our IT solutions can help you elevate your business and drive customer satisfaction!</p>\n	https://res.cloudinary.com/dxn7swwvn/image/upload/v1764763470/maxtech/news/jqknshom4373jcyjzhmi.jpg	t	2025-12-03 12:04:31.292	auto	Discover how customer experience technology transforms interactions and boosts satisfaction. Explore practical insights for your business.	customerexperience, technology, ITsolutions, businessgrowth, innovation	2025-12-03 12:04:31.293	2025-12-03 12:04:31.293
5	Unlocking Business Insights: Data Analytics and Business Intelligence	unlocking-business-insights-data-analytics-and-bus-1764766673006	Technology	# Unlocking Business Insights: Data Analytics and Business Intelligence\n\nIn today's fast-paced digital age, businesses are inundated with data from various sources. From customer interactions to market trends, the volume of information can be overwhelming. However, the potential for insightful decision-making is immense. This is where **data analytics** and **business intelligence (BI)** come into play, enabling organizations to transform raw data into actionable insights. \n\n## Understanding Data Analytics and Business Intelligence\n\n**Data analytics** refers to the systematic computational analysis of data. It involves various techniques, including statistical analysis, predictive modeling, and data mining, to uncover patterns and trends. Meanwhile, **business intelligence** encompasses the technologies, applications, and practices for the collection, integration, analysis, and presentation of business information. Together, they form a comprehensive approach to understanding and leveraging data for better business outcomes.\n\n### Why Data Analytics and Business Intelligence Matter\n\n1. **Informed Decision-Making**: By transforming raw data into meaningful insights, organizations can make better decisions that are backed by substantial evidence rather than intuition.\n   \n2. **Enhanced Operational Efficiency**: Data analytics helps identify inefficiencies in processes, allowing businesses to streamline operations, reduce costs, and improve productivity.\n\n3. **Customer Insights**: By analyzing consumer behavior, businesses can gain a deeper understanding of their customers, leading to better-targeted marketing strategies and improved customer satisfaction.\n\n4. **Competitive Advantage**: Companies leveraging data analytics and BI can identify market trends and insights faster than their competitors, positioning them to respond to market changes proactively.\n\n5. **Risk Management**: Effective data analysis can help organizations anticipate risks and develop strategies to mitigate them, safeguarding their investments.\n\n## The Components of Effective Data Analytics and BI\n\nFor businesses to harness the power of data analytics and business intelligence effectively, they should consider the following components:\n\n### 1. Data Collection\n\nThe first step in any data analytics strategy is gathering the right data. Organizations often collect data from diverse sources, such as CRM systems, social media platforms, transactional databases, and more. Utilizing tools like Google Analytics or customer feedback software can enhance data collection efforts.\n\n### 2. Data Cleaning\n\nData is often messy, with inconsistencies, inaccuracies, or duplicates. Cleaning the data ensures that the analysis is based on accurate and relevant information, increasing the reliability of the insights derived.\n\n### 3. Data Analysis Tools\n\nModern businesses have access to various powerful data analytics tools. Some popular options include:\n\n- **Tableau**: Great for data visualization and easy to use for non-technical users.\n- **Power BI**: A Microsoft tool that integrates seamlessly with other Microsoft services, providing rich analytics and visualization capabilities.\n- **Google Analytics**: An essential tool for tracking website performance and user behavior.\n- **Apache Hadoop**: An open-source framework that enables distributed storage and processing of large data sets.\n\n### 4. Data Visualization\n\nEffective data visualization is crucial for presenting data-driven insights in a way that can be easily understood. Tools like Tableau and Power BI enable companies to create dynamic dashboards and visual reports that highlight key metrics and trends.\n\n### 5. Implementation and Monitoring\n\nEstablishing a culture of data-driven decision-making requires ongoing monitoring and evaluation. Organizations must continuously analyze data and adjust their strategies based on real-time feedback to maintain a competitive edge.\n\n## Best Practices for Leveraging Data Analytics and BI\n\n- **Define Clear Objectives**: Start with specific questions you want your data to answer. Defining clear goals will guide your analysis and help focus on what really matters.\n  \n- **Invest in Training**: Equip your team with the necessary skills to utilize data analytics and BI tools effectively. Continuous training will enhance their ability to derive valuable insights.\n\n- **Foster Collaboration**: Encourage different departments to work together, sharing data and insights. A collaborative approach can lead to more comprehensive analysis and innovative solutions.\n\n- **Stay Updated on Trends**: The fields of data analytics and BI are constantly evolving. Stay informed about emerging technologies and trends to keep your systems and strategies cutting-edge.\n\n- **Prioritize Data Security**: As businesses collect and analyze more data, ensuring data privacy and security becomes paramount. Implement robust security measures to protect sensitive information.\n\n## Conclusion\n\nData analytics and business intelligence have become essential components for businesses looking to thrive in a data-driven world. By effectively utilizing these tools, organizations can unlock valuable insights that drive strategic decision-making, boost operational efficiency, and enhance customer satisfaction. \n\nAre you ready to harness the power of data for your business? Contact our IT solutions company today to learn how we can help you implement a robust data analytics and business intelligence strategy tailored to your needs!\n\n---\n\n**Call to Action**: If you’re interested in transforming your business through data analytics and business intelligence, don’t hesitate to reach out! Let’s discuss how we can help you achieve your goals today.	<h1>Unlocking Business Insights: Data Analytics and Business Intelligence</h1>\n<p>In today&#39;s fast-paced digital age, businesses are inundated with data from various sources. From customer interactions to market trends, the volume of information can be overwhelming. However, the potential for insightful decision-making is immense. This is where <strong>data analytics</strong> and <strong>business intelligence (BI)</strong> come into play, enabling organizations to transform raw data into actionable insights. </p>\n<h2>Understanding Data Analytics and Business Intelligence</h2>\n<p><strong>Data analytics</strong> refers to the systematic computational analysis of data. It involves various techniques, including statistical analysis, predictive modeling, and data mining, to uncover patterns and trends. Meanwhile, <strong>business intelligence</strong> encompasses the technologies, applications, and practices for the collection, integration, analysis, and presentation of business information. Together, they form a comprehensive approach to understanding and leveraging data for better business outcomes.</p>\n<h3>Why Data Analytics and Business Intelligence Matter</h3>\n<ol>\n<li><p><strong>Informed Decision-Making</strong>: By transforming raw data into meaningful insights, organizations can make better decisions that are backed by substantial evidence rather than intuition.</p>\n</li>\n<li><p><strong>Enhanced Operational Efficiency</strong>: Data analytics helps identify inefficiencies in processes, allowing businesses to streamline operations, reduce costs, and improve productivity.</p>\n</li>\n<li><p><strong>Customer Insights</strong>: By analyzing consumer behavior, businesses can gain a deeper understanding of their customers, leading to better-targeted marketing strategies and improved customer satisfaction.</p>\n</li>\n<li><p><strong>Competitive Advantage</strong>: Companies leveraging data analytics and BI can identify market trends and insights faster than their competitors, positioning them to respond to market changes proactively.</p>\n</li>\n<li><p><strong>Risk Management</strong>: Effective data analysis can help organizations anticipate risks and develop strategies to mitigate them, safeguarding their investments.</p>\n</li>\n</ol>\n<h2>The Components of Effective Data Analytics and BI</h2>\n<p>For businesses to harness the power of data analytics and business intelligence effectively, they should consider the following components:</p>\n<h3>1. Data Collection</h3>\n<p>The first step in any data analytics strategy is gathering the right data. Organizations often collect data from diverse sources, such as CRM systems, social media platforms, transactional databases, and more. Utilizing tools like Google Analytics or customer feedback software can enhance data collection efforts.</p>\n<h3>2. Data Cleaning</h3>\n<p>Data is often messy, with inconsistencies, inaccuracies, or duplicates. Cleaning the data ensures that the analysis is based on accurate and relevant information, increasing the reliability of the insights derived.</p>\n<h3>3. Data Analysis Tools</h3>\n<p>Modern businesses have access to various powerful data analytics tools. Some popular options include:</p>\n<ul>\n<li><strong>Tableau</strong>: Great for data visualization and easy to use for non-technical users.</li>\n<li><strong>Power BI</strong>: A Microsoft tool that integrates seamlessly with other Microsoft services, providing rich analytics and visualization capabilities.</li>\n<li><strong>Google Analytics</strong>: An essential tool for tracking website performance and user behavior.</li>\n<li><strong>Apache Hadoop</strong>: An open-source framework that enables distributed storage and processing of large data sets.</li>\n</ul>\n<h3>4. Data Visualization</h3>\n<p>Effective data visualization is crucial for presenting data-driven insights in a way that can be easily understood. Tools like Tableau and Power BI enable companies to create dynamic dashboards and visual reports that highlight key metrics and trends.</p>\n<h3>5. Implementation and Monitoring</h3>\n<p>Establishing a culture of data-driven decision-making requires ongoing monitoring and evaluation. Organizations must continuously analyze data and adjust their strategies based on real-time feedback to maintain a competitive edge.</p>\n<h2>Best Practices for Leveraging Data Analytics and BI</h2>\n<ul>\n<li><p><strong>Define Clear Objectives</strong>: Start with specific questions you want your data to answer. Defining clear goals will guide your analysis and help focus on what really matters.</p>\n</li>\n<li><p><strong>Invest in Training</strong>: Equip your team with the necessary skills to utilize data analytics and BI tools effectively. Continuous training will enhance their ability to derive valuable insights.</p>\n</li>\n<li><p><strong>Foster Collaboration</strong>: Encourage different departments to work together, sharing data and insights. A collaborative approach can lead to more comprehensive analysis and innovative solutions.</p>\n</li>\n<li><p><strong>Stay Updated on Trends</strong>: The fields of data analytics and BI are constantly evolving. Stay informed about emerging technologies and trends to keep your systems and strategies cutting-edge.</p>\n</li>\n<li><p><strong>Prioritize Data Security</strong>: As businesses collect and analyze more data, ensuring data privacy and security becomes paramount. Implement robust security measures to protect sensitive information.</p>\n</li>\n</ul>\n<h2>Conclusion</h2>\n<p>Data analytics and business intelligence have become essential components for businesses looking to thrive in a data-driven world. By effectively utilizing these tools, organizations can unlock valuable insights that drive strategic decision-making, boost operational efficiency, and enhance customer satisfaction. </p>\n<p>Are you ready to harness the power of data for your business? Contact our IT solutions company today to learn how we can help you implement a robust data analytics and business intelligence strategy tailored to your needs!</p>\n<hr>\n<p><strong>Call to Action</strong>: If you’re interested in transforming your business through data analytics and business intelligence, don’t hesitate to reach out! Let’s discuss how we can help you achieve your goals today.</p>\n	https://res.cloudinary.com/dxn7swwvn/image/upload/v1764766689/maxtech/news/ngxhzsshgnosqz5acgcq.jpg	t	2025-12-03 12:58:10.726	auto	Discover how data analytics and business intelligence can transform your business decisions and drive growth.	data analytics, business intelligence, IT solutions, data-driven decisions, technology trends	2025-12-03 12:58:10.727	2025-12-03 12:58:10.727
\.


--
-- Data for Name: ClientLogo; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."ClientLogo" (id, name, image, url, "order", "isActive", "createdAt", "updatedAt") FROM stdin;
57	\N	/images/logo-clients/1.png	\N	1	t	2025-12-01 13:15:43.032	2025-12-01 13:15:43.032
58	\N	/images/logo-clients/2.png	\N	2	t	2025-12-01 13:15:43.032	2025-12-01 13:15:43.032
59	\N	/images/logo-clients/3.png	\N	3	t	2025-12-01 13:15:43.032	2025-12-01 13:15:43.032
60	\N	/images/logo-clients/4.png	\N	4	t	2025-12-01 13:15:43.032	2025-12-01 13:15:43.032
61	\N	/images/logo-clients/5.png	\N	5	t	2025-12-01 13:15:43.032	2025-12-01 13:15:43.032
62	\N	/images/logo-clients/6.png	\N	6	t	2025-12-01 13:15:43.032	2025-12-01 13:15:43.032
63	\N	/images/logo-clients/7.png	\N	7	t	2025-12-01 13:15:43.032	2025-12-01 13:15:43.032
64	\N	/images/logo-clients/8.png	\N	8	t	2025-12-01 13:15:43.032	2025-12-01 13:15:43.032
\.


--
-- Data for Name: ContactSubmission; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."ContactSubmission" (id, name, email, message, phone, subject, "isRead", "createdAt") FROM stdin;
1	Test User	test@example.com	This is a test message	\N	\N	t	2025-12-01 09:35:01.029
2	Hridoy 	hridoy@gmail.com	hello there	123456789012	\N	t	2025-12-01 12:03:04.466
\.


--
-- Data for Name: FooterLink; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."FooterLink" (id, category, label, url, "order", "isActive", "createdAt", "updatedAt") FROM stdin;
85	Company	Home	/	1	t	2025-12-01 13:15:44.725	2025-12-01 13:15:44.725
86	Company	Our Services	/services	2	t	2025-12-01 13:15:44.725	2025-12-01 13:15:44.725
87	Company	Portfolio	/portfolio	3	t	2025-12-01 13:15:44.725	2025-12-01 13:15:44.725
88	Company	About Us	/about	4	t	2025-12-01 13:15:44.725	2025-12-01 13:15:44.725
89	Company	News	/news	5	t	2025-12-01 13:15:44.725	2025-12-01 13:15:44.725
90	Company	Contact	/contact	6	t	2025-12-01 13:15:44.725	2025-12-01 13:15:44.725
91	Services	Managed IT Services	#	1	t	2025-12-01 13:15:44.725	2025-12-01 13:15:44.725
92	Services	Software Development	#	2	t	2025-12-01 13:15:44.725	2025-12-01 13:15:44.725
93	Services	Cybersecurity Services	#	3	t	2025-12-01 13:15:44.725	2025-12-01 13:15:44.725
94	Services	Database Management	#	4	t	2025-12-01 13:15:44.725	2025-12-01 13:15:44.725
95	Services	Network Services	#	5	t	2025-12-01 13:15:44.725	2025-12-01 13:15:44.725
96	Services	Help Desk Support	#	6	t	2025-12-01 13:15:44.725	2025-12-01 13:15:44.725
\.


--
-- Data for Name: HeroSlide; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."HeroSlide" (id, subtitle, title, "titleHighlight", description, "primaryBtnText", "primaryBtnUrl", "secondaryBtnText", "secondaryBtnUrl", "backgroundImage", "order", "isActive", "createdAt", "updatedAt") FROM stdin;
15	Trusted IT Solutions	who we are	we	We are team of tech enthusiasts dedicated to taking your technology aspirations to new heights.	Our Services	/services	Free Consultation	/contact	/images/slider/1.webp	1	t	2025-12-01 13:15:38.74	2025-12-01 13:15:38.74
16	Trusted IT Solutions	what we do	do	We are driven by innovation, excellence, and a commitment to delivering cutting-edge IT solutions.	Our Services	/services	Free Consultation	/contact	/images/slider/2.webp	2	t	2025-12-01 13:15:38.74	2025-12-01 13:15:38.74
\.


--
-- Data for Name: MenuItem; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."MenuItem" (id, label, href, "order", "parentId", "createdAt", "updatedAt") FROM stdin;
57	Home	/	1	\N	2025-12-01 13:15:36.405	2025-12-01 13:15:36.405
58	Portfolio	#	2	\N	2025-12-01 13:15:36.831	2025-12-01 13:15:36.831
59	Client Projects	/portfolio	1	58	2025-12-01 13:15:37.044	2025-12-01 13:15:37.044
60	Our SaaS Products	/saas-products	2	58	2025-12-01 13:15:37.044	2025-12-01 13:15:37.044
61	Services	/services	3	\N	2025-12-01 13:15:37.891	2025-12-01 13:15:37.891
62	About Us	/about	4	\N	2025-12-01 13:15:37.891	2025-12-01 13:15:37.891
63	News	/news	5	\N	2025-12-01 13:15:37.891	2025-12-01 13:15:37.891
64	Contact	/contact	6	\N	2025-12-01 13:15:37.891	2025-12-01 13:15:37.891
\.


--
-- Data for Name: NewsPost; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."NewsPost" (id, title, slug, excerpt, content, image, author, "publishedAt", "isActive", "createdAt", "updatedAt", tags, thumbnail) FROM stdin;
37	A Glimpse into the Future of Technology	glimpse-into-future-technology	Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...	<p>Quis sunt quis do laboris eiusmod in sint dolore sit pariatur consequat commodo aliqua nulla ad dolor aliquip incididunt voluptate est aliquip adipisicing ea cupidatat nostrud incididunt aliquip dolore. Sed minim nisi duis laborum est labore nisi amet elit adipisicing proident do consectetur dolor labore sit nisi ad proident esse ad velit nisi irure reprehenderit ut et dolor labore veniam quis.</p><p>Sunt duis laboris ex et quis laborum laborum cillum mollit voluptate culpa consequat ex cupidatat dolor eiusmod proident proident cillum pariatur sint adipisicing in nostrud do dolore consectetur quis incididunt minim consectetur. Exercitation elit proident dolor est id eiusmod dolor dolor incididunt ad voluptate laboris cupidatat est est sint veniam sint officia sint incididunt est sit ut tempor commodo pariatur ut proident et do.</p><p>Sed eu in ut sint dolor irure fugiat minim veniam sed ea proident ullamco occaecat irure ut velit eu ullamco fugiat cupidatat dolore fugiat. Lorem ipsum id non deserunt id consequat duis voluptate amet aliqua pariatur laboris officia pariatur veniam velit reprehenderit sint nostrud cupidatat magna eiusmod mollit exercitation pariatur nulla minim laboris dolore aliqua consectetur cillum duis aute consectetur.</p>	/images/news/1.webp	Admin	2024-11-28 00:00:00	t	2025-12-01 13:15:47.905	2025-12-01 13:15:47.905	tech,daily	/images/news-thumbnail/pic-blog-1.jpg
38	How AI is Transforming Industries	how-ai-transforming-industries	Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...	<p>Artificial Intelligence is revolutionizing how businesses operate across every sector. From healthcare to finance, AI-powered solutions are enabling companies to make smarter decisions, automate routine tasks, and deliver personalized experiences to customers.</p><p>Machine learning algorithms are now capable of analyzing vast amounts of data to identify patterns and insights that would be impossible for humans to discover. This capability is transforming industries in unprecedented ways.</p>	/images/news/2.webp	Admin	2024-11-27 00:00:00	t	2025-12-01 13:15:47.905	2025-12-01 13:15:47.905	tech,AI	/images/news-thumbnail/pic-blog-2.jpg
39	How Technology is Reshaping Our Lives	technology-reshaping-lives	Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...	<p>Technology continues to transform every aspect of our daily lives, from how we communicate and work to how we shop and entertain ourselves. Smart devices have become ubiquitous, connecting us to a world of information and services at our fingertips.</p>	/images/news/3.webp	Admin	2024-11-26 00:00:00	t	2025-12-01 13:15:47.905	2025-12-01 13:15:47.905	tech,lifestyle	/images/news-thumbnail/pic-blog-3.jpg
40	Cybersecurity in the Digital Age	cybersecurity-digital-age	Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...	<p>As our reliance on digital systems grows, so does the importance of cybersecurity. Organizations must implement robust security measures to protect their data and systems from increasingly sophisticated cyber threats.</p>	/images/news/4.webp	Admin	2024-11-25 00:00:00	t	2025-12-01 13:15:47.905	2025-12-01 13:15:47.905	security,tech	/images/news-thumbnail/pic-blog-4.jpg
41	Balancing Progress and Responsibility	balancing-progress-responsibility	Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...	<p>As technology advances at an unprecedented pace, society faces important questions about how to balance innovation with ethical considerations. From AI bias to data privacy, these challenges require thoughtful solutions.</p>	/images/news/5.webp	Admin	2024-11-24 00:00:00	t	2025-12-01 13:15:47.905	2025-12-01 13:15:47.905	ethics,tech	\N
42	The Next Generation for the Digital Age	next-generation-digital-age	Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...	<p>Preparing the next generation with digital skills is crucial for their success in an increasingly technology-driven world. Education systems are adapting to include coding, digital literacy, and critical thinking skills.</p>	/images/news/6.webp	Admin	2024-11-23 00:00:00	t	2025-12-01 13:15:47.905	2025-12-01 13:15:47.905	education,tech	\N
\.


--
-- Data for Name: PageContent; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."PageContent" (id, "pageSlug", title, subtitle, description, "metaTitle", "metaDescription", "createdAt", "updatedAt") FROM stdin;
13	about	Providing best IT solutions	About Us	Learn about our company history, team, and vision for the future.	About Us - MaxTech	Learn about MaxTech, our history, team, and commitment to IT excellence.	2025-12-01 13:15:50.46	2025-12-01 13:15:50.46
14	services	What can MaxTech do for you?	Our services	Comprehensive IT solutions for your business needs.	Our Services - MaxTech	Explore our IT services including software development, cybersecurity, and more.	2025-12-01 13:15:50.46	2025-12-01 13:15:50.46
15	contact	We're here to help you	Contact	Get in touch with our team for a free consultation.	Contact Us - MaxTech	Contact MaxTech for IT solutions and services.	2025-12-01 13:15:50.46	2025-12-01 13:15:50.46
16	news	Providing best IT solutions	Latest News	Stay updated with the latest technology trends and company news.	News - MaxTech	Latest news and updates from MaxTech.	2025-12-01 13:15:50.46	2025-12-01 13:15:50.46
17	portfolio	Study Case	Work with us	Explore our successful projects and case studies.	Portfolio - MaxTech	View our successful IT projects and case studies.	2025-12-01 13:15:50.46	2025-12-01 13:15:50.46
18	about-team	We're a group of IT passionate	Our team	Meet our talented team of IT professionals.	\N	\N	2025-12-01 13:15:50.46	2025-12-01 13:15:50.46
19	saas-products	Our SaaS Products	Products	Explore our suite of software-as-a-service solutions.	SaaS Products - MaxTech	Discover MaxTech SaaS products designed to streamline your business.	2025-12-01 13:15:50.46	2025-12-01 13:15:50.46
\.


--
-- Data for Name: Project; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Project" (id, title, slug, description, content, image, category, client, date, "order", "isActive", "createdAt", "updatedAt", challenges, overview, "positiveFeedbacks", solutions, "testimonialQuote", "turnoverIncrease") FROM stdin;
37	The Role of Managed IT Services in Small Business Success	managed-it-services-small-business	How we helped a small business transform their IT infrastructure	\N	/images/study-case/1.webp	IT Support	\N	\N	1	t	2025-12-01 13:15:49.182	2025-12-01 13:15:49.182	The restaurant industry is highly competitive, making it challenging to stand out and attract customers.|Food costs, labor expenses, rent, and utilities can increase, putting pressure on profit margins.|Recruiting and retaining skilled chefs, servers, and kitchen staff can be difficult, leading to staff shortages and turnover.|Restaurants must comply with strict health and safety regulations, which can be time-consuming and costly.|Maintaining consistent food quality is essential to customer satisfaction, but it can be challenging, especially during busy periods.	A restaurant business is a complex and dynamic industry that encompasses a wide range of food service establishments, from fast food and casual dining to fine dining and specialty eateries. This industry plays a significant role in the global economy, offering diverse culinary experiences to consumers while also presenting a multitude of challenges and opportunities for entrepreneurs.	750	Integrate with kitchen displays, online ordering platforms, and inventory management systems.|Allows customers to book tables online, reducing wait times and improving the dining experience.|Websites and mobile apps for online ordering and food delivery.|Integration with POS systems to streamline order processing.|Helps track and manage food and beverage inventory.|Displays orders to kitchen staff, improving order accuracy and efficiency.	Their cutting-edge IT solutions have transformed the way we operate and have greatly enhanced our customer experience.	50
38	Innovative IT Services Driving Digital Transformation in the Enterprise	digital-transformation-enterprise	Enterprise-level digital transformation case study	\N	/images/study-case/2.webp	IT Support	\N	\N	2	t	2025-12-01 13:15:49.182	2025-12-01 13:15:49.182	Legacy systems are deeply integrated with business processes, making replacement risky.|Large organizations have complex stakeholder requirements.|Data migration from old systems requires careful planning.|Employee resistance to new technologies can slow adoption.|Maintaining business continuity during transition is critical.	Large enterprises face unique challenges in digital transformation. Our comprehensive approach helps organizations modernize their legacy systems while minimizing disruption to business operations.	890	Phased migration approach to minimize disruption.|Comprehensive training programs for all staff levels.|Data validation and backup procedures before migration.|Change management strategies to ensure adoption.|24/7 support during the transition period.	MaxTech helped us navigate our digital transformation journey with minimal disruption to our operations.	65
39	IT Services Maximizing Efficiency and Productivity in Workplace	maximizing-efficiency-workplace	Workplace productivity enhancement through IT solutions	\N	/images/study-case/3.webp	IT Support	\N	\N	3	t	2025-12-01 13:15:49.182	2025-12-01 13:15:49.182	Employees waste time on repetitive manual tasks.|Communication silos between departments reduce efficiency.|Outdated hardware and software slow down operations.|Remote work requires secure and reliable access.|Tracking productivity across teams is difficult.	Modern workplaces require seamless technology integration to maximize productivity. Our solutions help organizations streamline workflows and empower employees with the right tools.	620	Automation of repetitive tasks with custom scripts.|Unified communication platform for all departments.|Hardware refresh and software modernization.|Secure VPN and cloud-based collaboration tools.|Analytics dashboard for productivity monitoring.	Our team productivity increased by 40% after implementing MaxTech solutions.	40
40	Cloud Migration Strategy for Healthcare Provider	cloud-migration-healthcare	Secure cloud migration for healthcare data	\N	/images/study-case/4.webp	Cloud Services	\N	\N	4	t	2025-12-01 13:15:49.182	2025-12-01 13:15:49.182	HIPAA compliance requirements are strict.|Patient data security is paramount.|Legacy systems may not be cloud-compatible.|Staff training on new systems is required.|Downtime during migration must be minimized.	Healthcare providers need secure and compliant cloud solutions to manage sensitive patient data. Our HIPAA-compliant migration strategy ensures data security while improving accessibility.	450	HIPAA-compliant cloud architecture design.|End-to-end encryption for all patient data.|Custom integration layer for legacy systems.|Comprehensive staff training program.|Zero-downtime migration strategy.	MaxTech delivered a seamless cloud migration while maintaining our strict compliance requirements.	35
41	Cybersecurity Overhaul for Financial Institution	cybersecurity-financial-institution	Comprehensive security upgrade for banking systems	\N	/images/study-case/5.webp	Security	\N	\N	5	t	2025-12-01 13:15:49.182	2025-12-01 13:15:49.182	Sophisticated cyber threats targeting financial data.|Regulatory compliance requirements are complex.|Legacy security systems have vulnerabilities.|24/7 monitoring is essential.|Employee security awareness is often lacking.	Financial institutions are prime targets for cyberattacks. Our comprehensive security assessment and implementation protects against evolving threats while maintaining regulatory compliance.	980	Multi-layered security architecture implementation.|Compliance framework alignment (PCI-DSS, SOX).|Security infrastructure modernization.|24/7 Security Operations Center (SOC).|Regular security awareness training for staff.	Since partnering with MaxTech, we have not experienced a single security breach.	25
42	E-commerce Platform Development	ecommerce-platform-development	Full-stack e-commerce solution development	\N	/images/study-case/6.webp	Development	\N	\N	6	t	2025-12-01 13:15:49.182	2025-12-01 13:15:49.182	High traffic during peak seasons requires scalability.|Payment processing must be secure and reliable.|User experience impacts conversion rates.|Inventory management needs real-time updates.|Mobile responsiveness is essential.	Building a scalable e-commerce platform requires expertise in frontend, backend, and payment integration. Our custom solution handles high traffic while providing an exceptional user experience.	1200	Cloud-native architecture for auto-scaling.|PCI-compliant payment gateway integration.|UX-focused design with A/B testing.|Real-time inventory synchronization.|Mobile-first responsive design.	Our online sales tripled after launching the new platform built by MaxTech.	200
\.


--
-- Data for Name: SaaSProduct; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."SaaSProduct" (id, title, slug, tagline, "shortDescription", "longDescription", "mainImage", features, "techStack", "liveDemoUrl", "githubUrl", "documentationUrl", "order", "isActive", "createdAt", "updatedAt", "bannerImage", "clientReviews", "demoVideoUrl", "featureCards", "keyFeatures", "parallaxDescription", "parallaxImage", "parallaxTitle", "pricingPlans", rating, "totalUsers", "requestDemoText", "requestDemoUrl") FROM stdin;
2	SecureVault	securevault	Enterprise Password Management	Zero-knowledge password manager with team collaboration features and advanced security analytics.	SecureVault provides military-grade password protection for organizations of all sizes. Our zero-knowledge architecture means even we cannot access your data. With advanced features like breach monitoring, password health scores, and seamless SSO integration, SecureVault is the complete solution for enterprise credential management.	/images/services/3.webp	Zero-knowledge encryption architecture|SSO integration with SAML 2.0 and OIDC|Breach monitoring and alerts|Password health analytics dashboard|Role-based access controls|Audit logs and compliance reports	Rust, PostgreSQL, React, Docker, GCP	https://demo.securevault.example.com	https://github.com/example/securevault	https://docs.securevault.example.com	2	t	2025-12-01 13:15:51.732	2025-12-01 13:15:51.732	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	\N	Request For Demo	\N
3	Analytics360	analytics360	Business Intelligence Made Simple	Comprehensive analytics platform with AI-powered insights and beautiful, customizable dashboards.	Analytics360 transforms your raw data into actionable insights. Our AI-powered analytics engine automatically identifies trends, anomalies, and opportunities in your data. With drag-and-drop dashboard builders and natural language queries, anyone on your team can become a data analyst.	/images/services/2.webp	AI-powered trend detection and forecasting|Natural language query interface|Drag-and-drop dashboard builder|Real-time data streaming support|50+ data source connectors|White-label reporting options	Python, TensorFlow, PostgreSQL, React, Kubernetes	https://demo.analytics360.example.com	\N	https://docs.analytics360.example.com	3	t	2025-12-01 13:15:51.732	2025-12-01 13:15:51.732	\N	\N	\N	\N	\N	\N	\N	\N	\N	0	\N	Request For Demo	\N
1	CloudSync Pro	cloudsync-pro	Seamless Cloud Integration	Enterprise-grade cloud synchronization platform that keeps your data in sync across all devices and services.	CloudSync Pro is our flagship cloud integration solution designed for businesses that need reliable, real-time data synchronization. With support for over 100 popular cloud services and on-premise systems, CloudSync Pro ensures your team always has access to the latest information, regardless of where they are or what device they use.	/images/services/1.webp	Real-time bidirectional sync across unlimited devices|End-to-end encryption with AES-256|Automatic conflict resolution with version history|REST API for custom integrations|99.99% uptime SLA|24/7 enterprise support	Node.js, PostgreSQL, Redis, Kubernetes, AWS	https://demo.cloudsync.example.com	\N	https://docs.cloudsync.example.com	1	t	2025-12-01 13:15:51.732	2025-12-03 12:32:26.319	https://res.cloudinary.com/dxn7swwvn/image/upload/v1764764551/maxtech/saas-products/od0zl5jys63gh7dghhnw.webp	[{"authorName":"sera eri","authorRole":"Malik","authorImage":"https://res.cloudinary.com/dxn7swwvn/image/upload/v1764765098/maxtech/testimonials/lg1ieqebksquyrbjdexf.png","quote":"o bap sera software","rating":5,"companyUrl":""}]	\N	[{"icon":"fa-check","title":"af","description":"adf"}]	[{"icon":"fa-star","title":"Hagoi","description":"mar gur diye ruti chini diye cha fuu diye khaaaaaaa","buttonText":"hakhdlkf","buttonUrl":"asdfasdf"}]	\N	https://res.cloudinary.com/dxn7swwvn/image/upload/v1764765053/maxtech/saas-products/eoyadwqx6hmwtnnvk8mm.webp	\N	[{"name":"Hagoi plan","price1Month":"9","price6Month":"99","price12Month":"999","features":["kene solor ki hai bolor"],"isPopular":true}]	5	45000	Request For Demo	/contact
\.


--
-- Data for Name: Service; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Service" (id, title, description, image, icon, "order", "isActive", "createdAt", "updatedAt") FROM stdin;
53	Managed IT Services	Provide management and maintenance of IT infrastructure, including servers, networks, and software.	/images/services/1.webp	/images/svg/collaboration-svgrepo-com.svg	1	t	2025-12-01 13:15:39.637	2025-12-01 13:15:39.637
54	Software Development	Creating and maintaining functional and efficient software applications that address a multitude of tasks.	/images/services/2.webp	/images/svg/embedded-live-content-svgrepo-com.svg	2	t	2025-12-01 13:15:39.637	2025-12-01 13:15:39.637
55	Cybersecurity Services	Protecting digital assets by providing services like firewall management and vulnerability assessments.	/images/services/3.webp	/images/svg/lock-svgrepo-com.svg	3	t	2025-12-01 13:15:39.637	2025-12-01 13:15:39.637
56	Database Management	Designing, implementing, and managing databases, including SQL and NoSQL databases.	/images/services/4.webp	/images/svg/data-check-svgrepo-com.svg	4	t	2025-12-01 13:15:39.637	2025-12-01 13:15:39.637
57	Network Services	Planning computer networks and protecting networks from unauthorized access and cyber threats	\N	/images/svg/all-servers-svgrepo-com.svg	5	t	2025-12-01 13:15:39.637	2025-12-01 13:15:39.637
58	Help Desk Support	Providing technical support and assistance to end-users to resolve IT issues and problems.	\N	/images/svg/users-svgrepo-com.svg	6	t	2025-12-01 13:15:39.637	2025-12-01 13:15:39.637
59	Website Development	Web development encompasses the creation, enhancement, and maintenance of websites and web applications.	\N	/images/svg/browser-svgrepo-com.svg	7	t	2025-12-01 13:15:39.637	2025-12-01 13:15:39.637
60	IT Consulting	Providing expert advice on IT strategy, technology adoption, and digital transformation.	\N	/images/svg/headset-svgrepo-com.svg	8	t	2025-12-01 13:15:39.637	2025-12-01 13:15:39.637
\.


--
-- Data for Name: SiteSettings; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."SiteSettings" (id, "siteName", "siteTitle", description, phone, email, address, "logoUrl", "logoMobileUrl", favicon, copyright, "createdAt", "updatedAt", "footerLogo", "footerLogoHeight", "footerLogoWidth", "navbarLogo", "navbarLogoHeight", "navbarLogoWidth", "portfolioBannerImage", "saasProductsBannerImage") FROM stdin;
8	MaxTech	MaxTech — IT Solutions and Services	We are a team of tech enthusiasts dedicated to taking your technology aspirations to new heights.	+8801843180008	info@maxtechbd.com	4th Floor, Alamgir Tower, 94 Sheikh Mujib Rd, Chittagong 4100, Chittagong, Bangladesh	https://res.cloudinary.com/dxn7swwvn/image/upload/v1764653696/maxtech/branding/sntfb7ndj6nw6fu3clnl.svg	/images/logo-mobile.png	https://res.cloudinary.com/dxn7swwvn/image/upload/v1764652512/maxtech/branding/lzee7vvoeczfea2hnwvy.jpg	Copyright 2023 - MaxTechBD	2025-12-01 13:15:35.978	2025-12-03 13:11:36.244	https://res.cloudinary.com/dxn7swwvn/image/upload/v1764670736/maxtech/branding/qeac3y8losuk0rjc5vqc.svg	50	150	https://res.cloudinary.com/dxn7swwvn/image/upload/v1764670725/maxtech/branding/sdjqfat9mbxa0mx3qual.png	50	150	https://res.cloudinary.com/dxn7swwvn/image/upload/v1764763920/maxtech/portfolio-banner/a117mbd1o0pgsvyyhgzk.webp	https://res.cloudinary.com/dxn7swwvn/image/upload/v1764767494/maxtech/saas-products-banner/zvz6vjsiqlkoyt71krch.webp
\.


--
-- Data for Name: SocialLink; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."SocialLink" (id, platform, url, icon, "order", "isActive", "createdAt", "updatedAt") FROM stdin;
36	Facebook	#	fa-brands fa-facebook-f	1	t	2025-12-01 13:15:43.879	2025-12-01 13:15:43.879
37	Twitter	#	fa-brands fa-twitter	2	t	2025-12-01 13:15:43.879	2025-12-01 13:15:43.879
38	Discord	#	fa-brands fa-discord	3	t	2025-12-01 13:15:43.879	2025-12-01 13:15:43.879
39	TikTok	#	fa-brands fa-tiktok	4	t	2025-12-01 13:15:43.879	2025-12-01 13:15:43.879
40	YouTube	#	fa-brands fa-youtube	5	t	2025-12-01 13:15:43.879	2025-12-01 13:15:43.879
\.


--
-- Data for Name: StatCounter; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."StatCounter" (id, value, suffix, label, icon, "order", "isActive", "createdAt", "updatedAt") FROM stdin;
21	25		Years Experience	\N	1	t	2025-12-01 13:15:46.63	2025-12-01 13:15:46.63
22	12		Awards Earned	\N	2	t	2025-12-01 13:15:46.63	2025-12-01 13:15:46.63
23	720	+	Clients Served	\N	3	t	2025-12-01 13:15:46.63	2025-12-01 13:15:46.63
24	98	%	Success Rates	\N	4	t	2025-12-01 13:15:46.63	2025-12-01 13:15:46.63
\.


--
-- Data for Name: TeamMember; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."TeamMember" (id, name, role, image, facebook, twitter, instagram, discord, linkedin, "order", "isActive", "createdAt", "updatedAt") FROM stdin;
30	Farid Reza	CEO	/images/team/1.webp	#	#	\N	#	\N	1	t	2025-12-01 13:15:40.912	2025-12-01 13:15:40.912
31	Abul Monsur	Sr. Developer	/images/team/2.webp	#	#	#	\N	\N	2	t	2025-12-01 13:15:40.912	2025-12-01 13:15:40.912
32	Hridoy Shil	Operation Head	/images/team/3.webp	#	#	#	\N	\N	3	t	2025-12-01 13:15:40.912	2025-12-01 13:15:40.912
33	Moinul Faisal	Web Developer	/images/team/4.webp	#https://www.facebook.com/moinul.islam.faisal	https://x.com/faisal_akondo	#	https://moinulfaisal.vercel.app/	https://www.linkedin.com/in/moinulfaisal/	4	t	2025-12-01 13:15:40.912	2025-12-01 13:15:40.912
\.


--
-- Data for Name: Testimonial; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Testimonial" (id, "authorName", "authorRole", "authorImage", quote, rating, "order", "isActive", "createdAt", "updatedAt") FROM stdin;
57	Michael S.	developer	/images/testimonial/1.jpg	We've entrusted our IT needs to MaxTech for several years, and they've consistently exceeded our expectations. Their proactive approach to managing our IT infrastructure has eliminated downtime and ensured a secure, efficient environment.	5	1	t	2025-12-01 13:15:42.184	2025-12-01 13:15:42.184
58	Robert L.	developer	/images/testimonial/2.jpg	MaxTech's IT support services have been instrumental in keeping our systems running smoothly. Their team is quick to respond, expertly resolving any issues we encounter. Knowing that they have our IT needs covered allows us to focus on our core business with confidence.	5	2	t	2025-12-01 13:15:42.184	2025-12-01 13:15:42.184
59	Jake M.	developer	/images/testimonial/3.jpg	MaxTech's cybersecurity solutions have transformed our security posture. Their comprehensive services have protected us from cyber threats and data breaches. We trust their expertise and diligence in monitoring and safeguarding our digital assets.	5	3	t	2025-12-01 13:15:42.184	2025-12-01 13:15:42.184
60	Alex P.	developer	/images/testimonial/4.jpg	MaxTech helped us seamlessly transition to the cloud. Their cloud services have reduced our IT infrastructure costs while providing flexibility and scalability. The accessibility and security of their cloud solutions have been a game-changer for our growing business.	5	4	t	2025-12-01 13:15:42.184	2025-12-01 13:15:42.184
61	Carlos R.	developer	/images/testimonial/5.jpg	MaxTech's data backup and recovery services have been a lifesaver for our critical data. Their solutions ensure our data's protection and quick recovery in the event of unforeseen events. Knowing our data is safe with MaxTech is a source of great comfort.	5	5	t	2025-12-01 13:15:42.184	2025-12-01 13:15:42.184
62	Edward B.	developer	/images/testimonial/6.jpg	MaxTech's IT consulting services have provided us with invaluable insights and strategies to optimize our IT infrastructure. Their expert advice has been instrumental in aligning our technology with our business goals and staying competitive.	5	6	t	2025-12-01 13:15:42.184	2025-12-01 13:15:42.184
63	Daniel H.	developer	/images/testimonial/7.jpg	MaxTech's project management services have been essential for us. Their team efficiently oversees and coordinates complex IT projects, ensuring they are delivered on time and within budget. We appreciate their attention to detail and dedication to our success.	5	7	t	2025-12-01 13:15:42.184	2025-12-01 13:15:42.184
64	Bryan G.	developer	/images/testimonial/8.jpg	MaxTech's network infrastructure services have transformed our connectivity. Their expertise in designing, implementing, and maintaining our network has improved our operational efficiency and communication. Their responsive support is always just a call away.	5	8	t	2025-12-01 13:15:42.184	2025-12-01 13:15:42.184
\.


--
-- Data for Name: TimelineMilestone; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."TimelineMilestone" (id, year, title, description, "order", "isActive", "createdAt", "updatedAt", images) FROM stdin;
18	2008	Company Inception	In the year 2000, a group of visionary tech enthusiasts came together with a shared dream of making technology accessible to everyone. Our company was founded in a small garage with just a handful of passionate individuals.	1	t	2025-12-01 13:15:45.785	2025-12-01 13:15:45.785	/images/timeline/1.webp|/images/timeline/2.webp|/images/timeline/3.webp
19	2012	Office Expansion	As our team grew, we expanded our physical presence by opening a new office. This expansion was necessary to accommodate our ever-growing roster of talented professionals. Simultaneously, we launched a proprietary software product that gained rapid traction in the market.	2	t	2025-12-01 13:15:45.785	2025-12-01 13:15:45.785	/images/timeline/4.webp|/images/timeline/5.webp|/images/timeline/6.webp
20	2023	15th Anniversary	In 2023, we celebrated our 15th year in the IT industry. We commemorated this milestone by focusing on sustainability and green IT initiatives, committing ourselves to reduce our environmental footprint. Our efforts did not go unnoticed, as we received industry awards for our outstanding service and innovation.	3	t	2025-12-01 13:15:45.785	2025-12-01 13:15:45.785	/images/timeline/7.webp|/images/timeline/8.webp|/images/timeline/9.webp
\.


--
-- Data for Name: VisionSection; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."VisionSection" (id, subtitle, heading, "buttonText", "buttonUrl", "backgroundImage", "createdAt", "updatedAt") FROM stdin;
8	Our Vision	We aspire to create a digital landscape where technology seamlessly enhances productivity, connectivity, and sustainability, fostering a brighter, more efficient, and inclusive future for all.	Let's Work Together	/contact	/images/background/2.webp	2025-12-01 13:15:40.485	2025-12-01 13:15:40.485
\.


--
-- Name: AboutSection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public."AboutSection_id_seq"', 8, true);


--
-- Name: AdminUser_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public."AdminUser_id_seq"', 2, true);


--
-- Name: BlogGenerationLog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public."BlogGenerationLog_id_seq"', 5, true);


--
-- Name: BlogPost_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public."BlogPost_id_seq"', 5, true);


--
-- Name: ClientLogo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public."ClientLogo_id_seq"', 64, true);


--
-- Name: ContactSubmission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public."ContactSubmission_id_seq"', 2, true);


--
-- Name: FooterLink_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public."FooterLink_id_seq"', 96, true);


--
-- Name: HeroSlide_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public."HeroSlide_id_seq"', 16, true);


--
-- Name: MenuItem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public."MenuItem_id_seq"', 64, true);


--
-- Name: NewsPost_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public."NewsPost_id_seq"', 42, true);


--
-- Name: PageContent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public."PageContent_id_seq"', 19, true);


--
-- Name: Project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public."Project_id_seq"', 42, true);


--
-- Name: SaaSProduct_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public."SaaSProduct_id_seq"', 3, true);


--
-- Name: Service_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public."Service_id_seq"', 60, true);


--
-- Name: SiteSettings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public."SiteSettings_id_seq"', 8, true);


--
-- Name: SocialLink_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public."SocialLink_id_seq"', 40, true);


--
-- Name: StatCounter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public."StatCounter_id_seq"', 24, true);


--
-- Name: TeamMember_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public."TeamMember_id_seq"', 33, true);


--
-- Name: Testimonial_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public."Testimonial_id_seq"', 64, true);


--
-- Name: TimelineMilestone_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public."TimelineMilestone_id_seq"', 20, true);


--
-- Name: VisionSection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public."VisionSection_id_seq"', 8, true);


--
-- Name: AboutSection AboutSection_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."AboutSection"
    ADD CONSTRAINT "AboutSection_pkey" PRIMARY KEY (id);


--
-- Name: AdminUser AdminUser_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."AdminUser"
    ADD CONSTRAINT "AdminUser_pkey" PRIMARY KEY (id);


--
-- Name: BlogGenerationLog BlogGenerationLog_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."BlogGenerationLog"
    ADD CONSTRAINT "BlogGenerationLog_pkey" PRIMARY KEY (id);


--
-- Name: BlogPost BlogPost_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."BlogPost"
    ADD CONSTRAINT "BlogPost_pkey" PRIMARY KEY (id);


--
-- Name: ClientLogo ClientLogo_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."ClientLogo"
    ADD CONSTRAINT "ClientLogo_pkey" PRIMARY KEY (id);


--
-- Name: ContactSubmission ContactSubmission_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."ContactSubmission"
    ADD CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY (id);


--
-- Name: FooterLink FooterLink_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."FooterLink"
    ADD CONSTRAINT "FooterLink_pkey" PRIMARY KEY (id);


--
-- Name: HeroSlide HeroSlide_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."HeroSlide"
    ADD CONSTRAINT "HeroSlide_pkey" PRIMARY KEY (id);


--
-- Name: MenuItem MenuItem_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."MenuItem"
    ADD CONSTRAINT "MenuItem_pkey" PRIMARY KEY (id);


--
-- Name: NewsPost NewsPost_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."NewsPost"
    ADD CONSTRAINT "NewsPost_pkey" PRIMARY KEY (id);


--
-- Name: PageContent PageContent_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."PageContent"
    ADD CONSTRAINT "PageContent_pkey" PRIMARY KEY (id);


--
-- Name: Project Project_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_pkey" PRIMARY KEY (id);


--
-- Name: SaaSProduct SaaSProduct_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."SaaSProduct"
    ADD CONSTRAINT "SaaSProduct_pkey" PRIMARY KEY (id);


--
-- Name: Service Service_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Service"
    ADD CONSTRAINT "Service_pkey" PRIMARY KEY (id);


--
-- Name: SiteSettings SiteSettings_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."SiteSettings"
    ADD CONSTRAINT "SiteSettings_pkey" PRIMARY KEY (id);


--
-- Name: SocialLink SocialLink_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."SocialLink"
    ADD CONSTRAINT "SocialLink_pkey" PRIMARY KEY (id);


--
-- Name: StatCounter StatCounter_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."StatCounter"
    ADD CONSTRAINT "StatCounter_pkey" PRIMARY KEY (id);


--
-- Name: TeamMember TeamMember_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."TeamMember"
    ADD CONSTRAINT "TeamMember_pkey" PRIMARY KEY (id);


--
-- Name: Testimonial Testimonial_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Testimonial"
    ADD CONSTRAINT "Testimonial_pkey" PRIMARY KEY (id);


--
-- Name: TimelineMilestone TimelineMilestone_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."TimelineMilestone"
    ADD CONSTRAINT "TimelineMilestone_pkey" PRIMARY KEY (id);


--
-- Name: VisionSection VisionSection_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."VisionSection"
    ADD CONSTRAINT "VisionSection_pkey" PRIMARY KEY (id);


--
-- Name: AdminUser_email_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "AdminUser_email_key" ON public."AdminUser" USING btree (email);


--
-- Name: BlogPost_slug_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "BlogPost_slug_key" ON public."BlogPost" USING btree (slug);


--
-- Name: NewsPost_slug_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "NewsPost_slug_key" ON public."NewsPost" USING btree (slug);


--
-- Name: PageContent_pageSlug_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "PageContent_pageSlug_key" ON public."PageContent" USING btree ("pageSlug");


--
-- Name: Project_slug_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "Project_slug_key" ON public."Project" USING btree (slug);


--
-- Name: SaaSProduct_slug_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "SaaSProduct_slug_key" ON public."SaaSProduct" USING btree (slug);


--
-- Name: MenuItem MenuItem_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."MenuItem"
    ADD CONSTRAINT "MenuItem_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public."MenuItem"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

\unrestrict bzx5xm6iBsSU1J6cj4rI6wEXD2urPDz9DLAfDP74QGdoPbFdTRhFldNm1bW1Hip

