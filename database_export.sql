--
-- PostgreSQL database dump
--

\restrict InhEQjfwF0ikjRxVMmCzwbIbkI8ONPV0fawzkQL1A7LNf2E8HTCU2JHADiPlqBS

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
-- Name: AboutSection; Type: TABLE; Schema: public; Owner: -
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


--
-- Name: AboutSection_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."AboutSection_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: AboutSection_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."AboutSection_id_seq" OWNED BY public."AboutSection".id;


--
-- Name: AdminUser; Type: TABLE; Schema: public; Owner: -
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


--
-- Name: AdminUser_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."AdminUser_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: AdminUser_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."AdminUser_id_seq" OWNED BY public."AdminUser".id;


--
-- Name: ClientLogo; Type: TABLE; Schema: public; Owner: -
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


--
-- Name: ClientLogo_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."ClientLogo_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ClientLogo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."ClientLogo_id_seq" OWNED BY public."ClientLogo".id;


--
-- Name: ContactSubmission; Type: TABLE; Schema: public; Owner: -
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


--
-- Name: ContactSubmission_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."ContactSubmission_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ContactSubmission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."ContactSubmission_id_seq" OWNED BY public."ContactSubmission".id;


--
-- Name: FooterLink; Type: TABLE; Schema: public; Owner: -
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


--
-- Name: FooterLink_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."FooterLink_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: FooterLink_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."FooterLink_id_seq" OWNED BY public."FooterLink".id;


--
-- Name: HeroSlide; Type: TABLE; Schema: public; Owner: -
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


--
-- Name: HeroSlide_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."HeroSlide_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: HeroSlide_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."HeroSlide_id_seq" OWNED BY public."HeroSlide".id;


--
-- Name: MenuItem; Type: TABLE; Schema: public; Owner: -
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


--
-- Name: MenuItem_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."MenuItem_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: MenuItem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."MenuItem_id_seq" OWNED BY public."MenuItem".id;


--
-- Name: NewsPost; Type: TABLE; Schema: public; Owner: -
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


--
-- Name: NewsPost_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."NewsPost_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: NewsPost_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."NewsPost_id_seq" OWNED BY public."NewsPost".id;


--
-- Name: PageContent; Type: TABLE; Schema: public; Owner: -
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


--
-- Name: PageContent_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."PageContent_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: PageContent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."PageContent_id_seq" OWNED BY public."PageContent".id;


--
-- Name: Project; Type: TABLE; Schema: public; Owner: -
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


--
-- Name: Project_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Project_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Project_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Project_id_seq" OWNED BY public."Project".id;


--
-- Name: Service; Type: TABLE; Schema: public; Owner: -
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


--
-- Name: Service_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Service_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Service_id_seq" OWNED BY public."Service".id;


--
-- Name: SiteSettings; Type: TABLE; Schema: public; Owner: -
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
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: SiteSettings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."SiteSettings_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: SiteSettings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."SiteSettings_id_seq" OWNED BY public."SiteSettings".id;


--
-- Name: SocialLink; Type: TABLE; Schema: public; Owner: -
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


--
-- Name: SocialLink_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."SocialLink_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: SocialLink_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."SocialLink_id_seq" OWNED BY public."SocialLink".id;


--
-- Name: StatCounter; Type: TABLE; Schema: public; Owner: -
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


--
-- Name: StatCounter_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."StatCounter_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: StatCounter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."StatCounter_id_seq" OWNED BY public."StatCounter".id;


--
-- Name: TeamMember; Type: TABLE; Schema: public; Owner: -
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


--
-- Name: TeamMember_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."TeamMember_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: TeamMember_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."TeamMember_id_seq" OWNED BY public."TeamMember".id;


--
-- Name: Testimonial; Type: TABLE; Schema: public; Owner: -
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


--
-- Name: Testimonial_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Testimonial_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: Testimonial_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Testimonial_id_seq" OWNED BY public."Testimonial".id;


--
-- Name: TimelineMilestone; Type: TABLE; Schema: public; Owner: -
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


--
-- Name: TimelineMilestone_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."TimelineMilestone_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: TimelineMilestone_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."TimelineMilestone_id_seq" OWNED BY public."TimelineMilestone".id;


--
-- Name: VisionSection; Type: TABLE; Schema: public; Owner: -
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


--
-- Name: VisionSection_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."VisionSection_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: VisionSection_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."VisionSection_id_seq" OWNED BY public."VisionSection".id;


--
-- Name: AboutSection id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AboutSection" ALTER COLUMN id SET DEFAULT nextval('public."AboutSection_id_seq"'::regclass);


--
-- Name: AdminUser id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AdminUser" ALTER COLUMN id SET DEFAULT nextval('public."AdminUser_id_seq"'::regclass);


--
-- Name: ClientLogo id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ClientLogo" ALTER COLUMN id SET DEFAULT nextval('public."ClientLogo_id_seq"'::regclass);


--
-- Name: ContactSubmission id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ContactSubmission" ALTER COLUMN id SET DEFAULT nextval('public."ContactSubmission_id_seq"'::regclass);


--
-- Name: FooterLink id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."FooterLink" ALTER COLUMN id SET DEFAULT nextval('public."FooterLink_id_seq"'::regclass);


--
-- Name: HeroSlide id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."HeroSlide" ALTER COLUMN id SET DEFAULT nextval('public."HeroSlide_id_seq"'::regclass);


--
-- Name: MenuItem id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."MenuItem" ALTER COLUMN id SET DEFAULT nextval('public."MenuItem_id_seq"'::regclass);


--
-- Name: NewsPost id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."NewsPost" ALTER COLUMN id SET DEFAULT nextval('public."NewsPost_id_seq"'::regclass);


--
-- Name: PageContent id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PageContent" ALTER COLUMN id SET DEFAULT nextval('public."PageContent_id_seq"'::regclass);


--
-- Name: Project id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Project" ALTER COLUMN id SET DEFAULT nextval('public."Project_id_seq"'::regclass);


--
-- Name: Service id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Service" ALTER COLUMN id SET DEFAULT nextval('public."Service_id_seq"'::regclass);


--
-- Name: SiteSettings id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SiteSettings" ALTER COLUMN id SET DEFAULT nextval('public."SiteSettings_id_seq"'::regclass);


--
-- Name: SocialLink id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SocialLink" ALTER COLUMN id SET DEFAULT nextval('public."SocialLink_id_seq"'::regclass);


--
-- Name: StatCounter id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."StatCounter" ALTER COLUMN id SET DEFAULT nextval('public."StatCounter_id_seq"'::regclass);


--
-- Name: TeamMember id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TeamMember" ALTER COLUMN id SET DEFAULT nextval('public."TeamMember_id_seq"'::regclass);


--
-- Name: Testimonial id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Testimonial" ALTER COLUMN id SET DEFAULT nextval('public."Testimonial_id_seq"'::regclass);


--
-- Name: TimelineMilestone id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TimelineMilestone" ALTER COLUMN id SET DEFAULT nextval('public."TimelineMilestone_id_seq"'::regclass);


--
-- Name: VisionSection id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."VisionSection" ALTER COLUMN id SET DEFAULT nextval('public."VisionSection_id_seq"'::regclass);


--
-- Data for Name: AboutSection; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."AboutSection" (id, subtitle, heading, description, "buttonText", "buttonUrl", image1, image2, "createdAt", "updatedAt") FROM stdin;
7	Trusted IT Solution	Delivering outstanding IT services since 2008	We are a dynamic and forward-thinking IT company dedicated to transforming your digital world. With a passion for cutting-edge solutions and a commitment to exceptional service, we are your trusted partner in navigating the ever-evolving landscape of IT. Our team of skilled professionals is here to harness the power of technology, providing tailor-made solutions that drive your success.	Our Services	/services	/images/misc/1.webp	/images/misc/2.webp	2025-12-01 11:36:11.146	2025-12-01 11:36:11.146
\.


--
-- Data for Name: AdminUser; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."AdminUser" (id, email, password, name, "isActive", "createdAt", "updatedAt") FROM stdin;
1	admin@maxtech.com	$2b$10$hb.izoGjBhsTqSHPbCcjNOLROPGdHMQTUF2oeLP3OWHMYTwp60//i	Admin	t	2025-12-01 11:36:04.993	2025-12-01 11:36:04.993
\.


--
-- Data for Name: ClientLogo; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ClientLogo" (id, name, image, url, "order", "isActive", "createdAt", "updatedAt") FROM stdin;
49	\N	/images/logo-clients/1.png	\N	1	t	2025-12-01 11:36:12.425	2025-12-01 11:36:12.425
50	\N	/images/logo-clients/2.png	\N	2	t	2025-12-01 11:36:12.425	2025-12-01 11:36:12.425
51	\N	/images/logo-clients/3.png	\N	3	t	2025-12-01 11:36:12.425	2025-12-01 11:36:12.425
52	\N	/images/logo-clients/4.png	\N	4	t	2025-12-01 11:36:12.425	2025-12-01 11:36:12.425
53	\N	/images/logo-clients/5.png	\N	5	t	2025-12-01 11:36:12.425	2025-12-01 11:36:12.425
54	\N	/images/logo-clients/6.png	\N	6	t	2025-12-01 11:36:12.425	2025-12-01 11:36:12.425
55	\N	/images/logo-clients/7.png	\N	7	t	2025-12-01 11:36:12.425	2025-12-01 11:36:12.425
56	\N	/images/logo-clients/8.png	\N	8	t	2025-12-01 11:36:12.425	2025-12-01 11:36:12.425
\.


--
-- Data for Name: ContactSubmission; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ContactSubmission" (id, name, email, message, phone, subject, "isRead", "createdAt") FROM stdin;
1	Test User	test@example.com	This is a test message	\N	\N	t	2025-12-01 09:35:01.029
2	Hridoy 	hridoy@gmail.com	hello there	123456789012	\N	t	2025-12-01 12:03:04.466
\.


--
-- Data for Name: FooterLink; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."FooterLink" (id, category, label, url, "order", "isActive", "createdAt", "updatedAt") FROM stdin;
73	Company	Home	/	1	t	2025-12-01 11:36:14.133	2025-12-01 11:36:14.133
74	Company	Our Services	/services	2	t	2025-12-01 11:36:14.133	2025-12-01 11:36:14.133
75	Company	Portfolio	/portfolio	3	t	2025-12-01 11:36:14.133	2025-12-01 11:36:14.133
76	Company	About Us	/about	4	t	2025-12-01 11:36:14.133	2025-12-01 11:36:14.133
77	Company	News	/news	5	t	2025-12-01 11:36:14.133	2025-12-01 11:36:14.133
78	Company	Contact	/contact	6	t	2025-12-01 11:36:14.133	2025-12-01 11:36:14.133
79	Services	Managed IT Services	#	1	t	2025-12-01 11:36:14.133	2025-12-01 11:36:14.133
80	Services	Software Development	#	2	t	2025-12-01 11:36:14.133	2025-12-01 11:36:14.133
81	Services	Cybersecurity Services	#	3	t	2025-12-01 11:36:14.133	2025-12-01 11:36:14.133
82	Services	Database Management	#	4	t	2025-12-01 11:36:14.133	2025-12-01 11:36:14.133
83	Services	Network Services	#	5	t	2025-12-01 11:36:14.133	2025-12-01 11:36:14.133
84	Services	Help Desk Support	#	6	t	2025-12-01 11:36:14.133	2025-12-01 11:36:14.133
\.


--
-- Data for Name: HeroSlide; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."HeroSlide" (id, subtitle, title, "titleHighlight", description, "primaryBtnText", "primaryBtnUrl", "secondaryBtnText", "secondaryBtnUrl", "backgroundImage", "order", "isActive", "createdAt", "updatedAt") FROM stdin;
13	Trusted IT Solutions	who we are	we	We are team of tech enthusiasts dedicated to taking your technology aspirations to new heights.	Our Services	/services	Free Consultation	/contact	/images/slider/1.webp	1	t	2025-12-01 11:36:08.174	2025-12-01 11:36:08.174
14	Trusted IT Solutions	what we do	do	We are driven by innovation, excellence, and a commitment to delivering cutting-edge IT solutions.	Our Services	/services	Free Consultation	/contact	/images/slider/2.webp	2	t	2025-12-01 11:36:08.174	2025-12-01 11:36:08.174
\.


--
-- Data for Name: MenuItem; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."MenuItem" (id, label, href, "order", "parentId", "createdAt", "updatedAt") FROM stdin;
49	Home	/	1	\N	2025-12-01 11:36:05.845	2025-12-01 11:36:05.845
50	Portfolio	#	2	\N	2025-12-01 11:36:06.27	2025-12-01 11:36:06.27
51	Client Projects	/portfolio	1	50	2025-12-01 11:36:06.483	2025-12-01 11:36:06.483
52	Our SaaS Products	/portfolio/saas	2	50	2025-12-01 11:36:06.483	2025-12-01 11:36:06.483
53	Services	/services	3	\N	2025-12-01 11:36:07.329	2025-12-01 11:36:07.329
54	About Us	/about	4	\N	2025-12-01 11:36:07.329	2025-12-01 11:36:07.329
55	News	/news	5	\N	2025-12-01 11:36:07.329	2025-12-01 11:36:07.329
56	Contact	/contact	6	\N	2025-12-01 11:36:07.329	2025-12-01 11:36:07.329
\.


--
-- Data for Name: NewsPost; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."NewsPost" (id, title, slug, excerpt, content, image, author, "publishedAt", "isActive", "createdAt", "updatedAt", tags, thumbnail) FROM stdin;
31	A Glimpse into the Future of Technology	glimpse-into-future-technology	Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...	<p>Quis sunt quis do laboris eiusmod in sint dolore sit pariatur consequat commodo aliqua nulla ad dolor aliquip incididunt voluptate est aliquip adipisicing ea cupidatat nostrud incididunt aliquip dolore. Sed minim nisi duis laborum est labore nisi amet elit adipisicing proident do consectetur dolor labore sit nisi ad proident esse ad velit nisi irure reprehenderit ut et dolor labore veniam quis.</p><p>Sunt duis laboris ex et quis laborum laborum cillum mollit voluptate culpa consequat ex cupidatat dolor eiusmod proident proident cillum pariatur sint adipisicing in nostrud do dolore consectetur quis incididunt minim consectetur. Exercitation elit proident dolor est id eiusmod dolor dolor incididunt ad voluptate laboris cupidatat est est sint veniam sint officia sint incididunt est sit ut tempor commodo pariatur ut proident et do.</p><p>Sed eu in ut sint dolor irure fugiat minim veniam sed ea proident ullamco occaecat irure ut velit eu ullamco fugiat cupidatat dolore fugiat. Lorem ipsum id non deserunt id consequat duis voluptate amet aliqua pariatur laboris officia pariatur veniam velit reprehenderit sint nostrud cupidatat magna eiusmod mollit exercitation pariatur nulla minim laboris dolore aliqua consectetur cillum duis aute consectetur.</p>	/images/news/1.webp	Admin	2024-11-28 00:00:00	t	2025-12-01 11:36:17.332	2025-12-01 11:36:17.332	tech,daily	/images/news-thumbnail/pic-blog-1.jpg
32	How AI is Transforming Industries	how-ai-transforming-industries	Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...	<p>Artificial Intelligence is revolutionizing how businesses operate across every sector. From healthcare to finance, AI-powered solutions are enabling companies to make smarter decisions, automate routine tasks, and deliver personalized experiences to customers.</p><p>Machine learning algorithms are now capable of analyzing vast amounts of data to identify patterns and insights that would be impossible for humans to discover. This capability is transforming industries in unprecedented ways.</p>	/images/news/2.webp	Admin	2024-11-27 00:00:00	t	2025-12-01 11:36:17.332	2025-12-01 11:36:17.332	tech,AI	/images/news-thumbnail/pic-blog-2.jpg
33	How Technology is Reshaping Our Lives	technology-reshaping-lives	Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...	<p>Technology continues to transform every aspect of our daily lives, from how we communicate and work to how we shop and entertain ourselves. Smart devices have become ubiquitous, connecting us to a world of information and services at our fingertips.</p>	/images/news/3.webp	Admin	2024-11-26 00:00:00	t	2025-12-01 11:36:17.332	2025-12-01 11:36:17.332	tech,lifestyle	/images/news-thumbnail/pic-blog-3.jpg
34	Cybersecurity in the Digital Age	cybersecurity-digital-age	Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...	<p>As our reliance on digital systems grows, so does the importance of cybersecurity. Organizations must implement robust security measures to protect their data and systems from increasingly sophisticated cyber threats.</p>	/images/news/4.webp	Admin	2024-11-25 00:00:00	t	2025-12-01 11:36:17.332	2025-12-01 11:36:17.332	security,tech	/images/news-thumbnail/pic-blog-4.jpg
35	Balancing Progress and Responsibility	balancing-progress-responsibility	Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...	<p>As technology advances at an unprecedented pace, society faces important questions about how to balance innovation with ethical considerations. From AI bias to data privacy, these challenges require thoughtful solutions.</p>	/images/news/5.webp	Admin	2024-11-24 00:00:00	t	2025-12-01 11:36:17.332	2025-12-01 11:36:17.332	ethics,tech	\N
36	The Next Generation for the Digital Age	next-generation-digital-age	Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...	<p>Preparing the next generation with digital skills is crucial for their success in an increasingly technology-driven world. Education systems are adapting to include coding, digital literacy, and critical thinking skills.</p>	/images/news/6.webp	Admin	2024-11-23 00:00:00	t	2025-12-01 11:36:17.332	2025-12-01 11:36:17.332	education,tech	\N
\.


--
-- Data for Name: PageContent; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."PageContent" (id, "pageSlug", title, subtitle, description, "metaTitle", "metaDescription", "createdAt", "updatedAt") FROM stdin;
7	about	Providing best IT solutions	About Us	Learn about our company history, team, and vision for the future.	About Us - MaxTech	Learn about MaxTech, our history, team, and commitment to IT excellence.	2025-12-01 11:36:19.9	2025-12-01 11:36:19.9
8	services	What can MaxTech do for you?	Our services	Comprehensive IT solutions for your business needs.	Our Services - MaxTech	Explore our IT services including software development, cybersecurity, and more.	2025-12-01 11:36:19.9	2025-12-01 11:36:19.9
9	contact	We're here to help you	Contact	Get in touch with our team for a free consultation.	Contact Us - MaxTech	Contact MaxTech for IT solutions and services.	2025-12-01 11:36:19.9	2025-12-01 11:36:19.9
10	news	Providing best IT solutions	Latest News	Stay updated with the latest technology trends and company news.	News - MaxTech	Latest news and updates from MaxTech.	2025-12-01 11:36:19.9	2025-12-01 11:36:19.9
11	portfolio	Study Case	Work with us	Explore our successful projects and case studies.	Portfolio - MaxTech	View our successful IT projects and case studies.	2025-12-01 11:36:19.9	2025-12-01 11:36:19.9
12	about-team	We're a group of IT passionate	Our team	Meet our talented team of IT professionals.	\N	\N	2025-12-01 11:36:19.9	2025-12-01 11:36:19.9
\.


--
-- Data for Name: Project; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Project" (id, title, slug, description, content, image, category, client, date, "order", "isActive", "createdAt", "updatedAt", challenges, overview, "positiveFeedbacks", solutions, "testimonialQuote", "turnoverIncrease") FROM stdin;
31	The Role of Managed IT Services in Small Business Success	managed-it-services-small-business	How we helped a small business transform their IT infrastructure	\N	/images/study-case/1.webp	IT Support	\N	\N	1	t	2025-12-01 11:36:18.621	2025-12-01 11:36:18.621	The restaurant industry is highly competitive, making it challenging to stand out and attract customers.|Food costs, labor expenses, rent, and utilities can increase, putting pressure on profit margins.|Recruiting and retaining skilled chefs, servers, and kitchen staff can be difficult, leading to staff shortages and turnover.|Restaurants must comply with strict health and safety regulations, which can be time-consuming and costly.|Maintaining consistent food quality is essential to customer satisfaction, but it can be challenging, especially during busy periods.	A restaurant business is a complex and dynamic industry that encompasses a wide range of food service establishments, from fast food and casual dining to fine dining and specialty eateries. This industry plays a significant role in the global economy, offering diverse culinary experiences to consumers while also presenting a multitude of challenges and opportunities for entrepreneurs.	750	Integrate with kitchen displays, online ordering platforms, and inventory management systems.|Allows customers to book tables online, reducing wait times and improving the dining experience.|Websites and mobile apps for online ordering and food delivery.|Integration with POS systems to streamline order processing.|Helps track and manage food and beverage inventory.|Displays orders to kitchen staff, improving order accuracy and efficiency.	Their cutting-edge IT solutions have transformed the way we operate and have greatly enhanced our customer experience.	50
32	Innovative IT Services Driving Digital Transformation in the Enterprise	digital-transformation-enterprise	Enterprise-level digital transformation case study	\N	/images/study-case/2.webp	IT Support	\N	\N	2	t	2025-12-01 11:36:18.621	2025-12-01 11:36:18.621	Legacy systems are deeply integrated with business processes, making replacement risky.|Large organizations have complex stakeholder requirements.|Data migration from old systems requires careful planning.|Employee resistance to new technologies can slow adoption.|Maintaining business continuity during transition is critical.	Large enterprises face unique challenges in digital transformation. Our comprehensive approach helps organizations modernize their legacy systems while minimizing disruption to business operations.	890	Phased migration approach to minimize disruption.|Comprehensive training programs for all staff levels.|Data validation and backup procedures before migration.|Change management strategies to ensure adoption.|24/7 support during the transition period.	MaxTech helped us navigate our digital transformation journey with minimal disruption to our operations.	65
33	IT Services Maximizing Efficiency and Productivity in Workplace	maximizing-efficiency-workplace	Workplace productivity enhancement through IT solutions	\N	/images/study-case/3.webp	IT Support	\N	\N	3	t	2025-12-01 11:36:18.621	2025-12-01 11:36:18.621	Employees waste time on repetitive manual tasks.|Communication silos between departments reduce efficiency.|Outdated hardware and software slow down operations.|Remote work requires secure and reliable access.|Tracking productivity across teams is difficult.	Modern workplaces require seamless technology integration to maximize productivity. Our solutions help organizations streamline workflows and empower employees with the right tools.	620	Automation of repetitive tasks with custom scripts.|Unified communication platform for all departments.|Hardware refresh and software modernization.|Secure VPN and cloud-based collaboration tools.|Analytics dashboard for productivity monitoring.	Our team productivity increased by 40% after implementing MaxTech solutions.	40
34	Cloud Migration Strategy for Healthcare Provider	cloud-migration-healthcare	Secure cloud migration for healthcare data	\N	/images/study-case/4.webp	Cloud Services	\N	\N	4	t	2025-12-01 11:36:18.621	2025-12-01 11:36:18.621	HIPAA compliance requirements are strict.|Patient data security is paramount.|Legacy systems may not be cloud-compatible.|Staff training on new systems is required.|Downtime during migration must be minimized.	Healthcare providers need secure and compliant cloud solutions to manage sensitive patient data. Our HIPAA-compliant migration strategy ensures data security while improving accessibility.	450	HIPAA-compliant cloud architecture design.|End-to-end encryption for all patient data.|Custom integration layer for legacy systems.|Comprehensive staff training program.|Zero-downtime migration strategy.	MaxTech delivered a seamless cloud migration while maintaining our strict compliance requirements.	35
35	Cybersecurity Overhaul for Financial Institution	cybersecurity-financial-institution	Comprehensive security upgrade for banking systems	\N	/images/study-case/5.webp	Security	\N	\N	5	t	2025-12-01 11:36:18.621	2025-12-01 11:36:18.621	Sophisticated cyber threats targeting financial data.|Regulatory compliance requirements are complex.|Legacy security systems have vulnerabilities.|24/7 monitoring is essential.|Employee security awareness is often lacking.	Financial institutions are prime targets for cyberattacks. Our comprehensive security assessment and implementation protects against evolving threats while maintaining regulatory compliance.	980	Multi-layered security architecture implementation.|Compliance framework alignment (PCI-DSS, SOX).|Security infrastructure modernization.|24/7 Security Operations Center (SOC).|Regular security awareness training for staff.	Since partnering with MaxTech, we have not experienced a single security breach.	25
36	E-commerce Platform Development	ecommerce-platform-development	Full-stack e-commerce solution development	\N	/images/study-case/6.webp	Development	\N	\N	6	t	2025-12-01 11:36:18.621	2025-12-01 11:36:18.621	High traffic during peak seasons requires scalability.|Payment processing must be secure and reliable.|User experience impacts conversion rates.|Inventory management needs real-time updates.|Mobile responsiveness is essential.	Building a scalable e-commerce platform requires expertise in frontend, backend, and payment integration. Our custom solution handles high traffic while providing an exceptional user experience.	1200	Cloud-native architecture for auto-scaling.|PCI-compliant payment gateway integration.|UX-focused design with A/B testing.|Real-time inventory synchronization.|Mobile-first responsive design.	Our online sales tripled after launching the new platform built by MaxTech.	200
\.


--
-- Data for Name: Service; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Service" (id, title, description, image, icon, "order", "isActive", "createdAt", "updatedAt") FROM stdin;
45	Managed IT Services	Provide management and maintenance of IT infrastructure, including servers, networks, and software.	/images/services/1.webp	/images/svg/collaboration-svgrepo-com.svg	1	t	2025-12-01 11:36:09.021	2025-12-01 11:36:09.021
46	Software Development	Creating and maintaining functional and efficient software applications that address a multitude of tasks.	/images/services/2.webp	/images/svg/embedded-live-content-svgrepo-com.svg	2	t	2025-12-01 11:36:09.021	2025-12-01 11:36:09.021
47	Cybersecurity Services	Protecting digital assets by providing services like firewall management and vulnerability assessments.	/images/services/3.webp	/images/svg/lock-svgrepo-com.svg	3	t	2025-12-01 11:36:09.021	2025-12-01 11:36:09.021
48	Database Management	Designing, implementing, and managing databases, including SQL and NoSQL databases.	/images/services/4.webp	/images/svg/data-check-svgrepo-com.svg	4	t	2025-12-01 11:36:09.021	2025-12-01 11:36:09.021
49	Network Services	Planning computer networks and protecting networks from unauthorized access and cyber threats	\N	/images/svg/all-servers-svgrepo-com.svg	5	t	2025-12-01 11:36:09.021	2025-12-01 11:36:09.021
50	Help Desk Support	Providing technical support and assistance to end-users to resolve IT issues and problems.	\N	/images/svg/users-svgrepo-com.svg	6	t	2025-12-01 11:36:09.021	2025-12-01 11:36:09.021
51	Website Development	Web development encompasses the creation, enhancement, and maintenance of websites and web applications.	\N	/images/svg/browser-svgrepo-com.svg	7	t	2025-12-01 11:36:09.021	2025-12-01 11:36:09.021
52	IT Consulting	Providing expert advice on IT strategy, technology adoption, and digital transformation.	\N	/images/svg/headset-svgrepo-com.svg	8	t	2025-12-01 11:36:09.021	2025-12-01 11:36:09.021
\.


--
-- Data for Name: SiteSettings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."SiteSettings" (id, "siteName", "siteTitle", description, phone, email, address, "logoUrl", "logoMobileUrl", favicon, copyright, "createdAt", "updatedAt") FROM stdin;
7	MaxTech	MaxTech — IT Solutions and Services	We are a team of tech enthusiasts dedicated to taking your technology aspirations to new heights.	+8801843180008	info@maxtechbd.com	4th Floor, Alamgir Tower, 94 Sheikh Mujib Rd, Chittagong 4100, Chittagong, Bangladesh	/images/logo.png	/images/logo-mobile.png	/images/icon.png	Copyright 2023 - MaxTech by Designesia	2025-12-01 11:36:05.419	2025-12-01 11:36:05.419
\.


--
-- Data for Name: SocialLink; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."SocialLink" (id, platform, url, icon, "order", "isActive", "createdAt", "updatedAt") FROM stdin;
31	Facebook	#	fa-brands fa-facebook-f	1	t	2025-12-01 11:36:13.278	2025-12-01 11:36:13.278
32	Twitter	#	fa-brands fa-twitter	2	t	2025-12-01 11:36:13.278	2025-12-01 11:36:13.278
33	Discord	#	fa-brands fa-discord	3	t	2025-12-01 11:36:13.278	2025-12-01 11:36:13.278
34	TikTok	#	fa-brands fa-tiktok	4	t	2025-12-01 11:36:13.278	2025-12-01 11:36:13.278
35	YouTube	#	fa-brands fa-youtube	5	t	2025-12-01 11:36:13.278	2025-12-01 11:36:13.278
\.


--
-- Data for Name: StatCounter; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."StatCounter" (id, value, suffix, label, icon, "order", "isActive", "createdAt", "updatedAt") FROM stdin;
17	25		Years Experience	\N	1	t	2025-12-01 11:36:16.053	2025-12-01 11:36:16.053
18	12		Awards Earned	\N	2	t	2025-12-01 11:36:16.053	2025-12-01 11:36:16.053
19	720	+	Clients Served	\N	3	t	2025-12-01 11:36:16.053	2025-12-01 11:36:16.053
20	98	%	Success Rates	\N	4	t	2025-12-01 11:36:16.053	2025-12-01 11:36:16.053
\.


--
-- Data for Name: TeamMember; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."TeamMember" (id, name, role, image, facebook, twitter, instagram, discord, linkedin, "order", "isActive", "createdAt", "updatedAt") FROM stdin;
25	Fynley Wilkinson	CEO	/images/team/1.webp	#	#	\N	#	\N	1	t	2025-12-01 11:36:10.298	2025-12-01 11:36:10.298
26	Myra Welsh	CEO	/images/team/2.webp	#	#	#	\N	\N	2	t	2025-12-01 11:36:10.298	2025-12-01 11:36:10.298
27	Aysha Shepard	CCO	/images/team/3.webp	#	#	#	\N	\N	3	t	2025-12-01 11:36:10.298	2025-12-01 11:36:10.298
28	Robyn Peel	CTO	/images/team/4.webp	#	#	#	\N	\N	4	t	2025-12-01 11:36:10.298	2025-12-01 11:36:10.298
29	Monsur	Developer	/images/team/1.webp	#	#	#	#	#	1	t	2025-12-01 12:00:54.106	2025-12-01 12:00:54.106
\.


--
-- Data for Name: Testimonial; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Testimonial" (id, "authorName", "authorRole", "authorImage", quote, rating, "order", "isActive", "createdAt", "updatedAt") FROM stdin;
49	Michael S.	developer	/images/testimonial/1.jpg	We've entrusted our IT needs to MaxTech for several years, and they've consistently exceeded our expectations. Their proactive approach to managing our IT infrastructure has eliminated downtime and ensured a secure, efficient environment.	5	1	t	2025-12-01 11:36:11.574	2025-12-01 11:36:11.574
50	Robert L.	developer	/images/testimonial/2.jpg	MaxTech's IT support services have been instrumental in keeping our systems running smoothly. Their team is quick to respond, expertly resolving any issues we encounter. Knowing that they have our IT needs covered allows us to focus on our core business with confidence.	5	2	t	2025-12-01 11:36:11.574	2025-12-01 11:36:11.574
51	Jake M.	developer	/images/testimonial/3.jpg	MaxTech's cybersecurity solutions have transformed our security posture. Their comprehensive services have protected us from cyber threats and data breaches. We trust their expertise and diligence in monitoring and safeguarding our digital assets.	5	3	t	2025-12-01 11:36:11.574	2025-12-01 11:36:11.574
52	Alex P.	developer	/images/testimonial/4.jpg	MaxTech helped us seamlessly transition to the cloud. Their cloud services have reduced our IT infrastructure costs while providing flexibility and scalability. The accessibility and security of their cloud solutions have been a game-changer for our growing business.	5	4	t	2025-12-01 11:36:11.574	2025-12-01 11:36:11.574
53	Carlos R.	developer	/images/testimonial/5.jpg	MaxTech's data backup and recovery services have been a lifesaver for our critical data. Their solutions ensure our data's protection and quick recovery in the event of unforeseen events. Knowing our data is safe with MaxTech is a source of great comfort.	5	5	t	2025-12-01 11:36:11.574	2025-12-01 11:36:11.574
54	Edward B.	developer	/images/testimonial/6.jpg	MaxTech's IT consulting services have provided us with invaluable insights and strategies to optimize our IT infrastructure. Their expert advice has been instrumental in aligning our technology with our business goals and staying competitive.	5	6	t	2025-12-01 11:36:11.574	2025-12-01 11:36:11.574
55	Daniel H.	developer	/images/testimonial/7.jpg	MaxTech's project management services have been essential for us. Their team efficiently oversees and coordinates complex IT projects, ensuring they are delivered on time and within budget. We appreciate their attention to detail and dedication to our success.	5	7	t	2025-12-01 11:36:11.574	2025-12-01 11:36:11.574
56	Bryan G.	developer	/images/testimonial/8.jpg	MaxTech's network infrastructure services have transformed our connectivity. Their expertise in designing, implementing, and maintaining our network has improved our operational efficiency and communication. Their responsive support is always just a call away.	5	8	t	2025-12-01 11:36:11.574	2025-12-01 11:36:11.574
\.


--
-- Data for Name: TimelineMilestone; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."TimelineMilestone" (id, year, title, description, "order", "isActive", "createdAt", "updatedAt", images) FROM stdin;
15	2008	Company Inception	In the year 2000, a group of visionary tech enthusiasts came together with a shared dream of making technology accessible to everyone. Our company was founded in a small garage with just a handful of passionate individuals.	1	t	2025-12-01 11:36:15.203	2025-12-01 11:36:15.203	/images/timeline/1.webp|/images/timeline/2.webp|/images/timeline/3.webp
16	2012	Office Expansion	As our team grew, we expanded our physical presence by opening a new office. This expansion was necessary to accommodate our ever-growing roster of talented professionals. Simultaneously, we launched a proprietary software product that gained rapid traction in the market.	2	t	2025-12-01 11:36:15.203	2025-12-01 11:36:15.203	/images/timeline/4.webp|/images/timeline/5.webp|/images/timeline/6.webp
17	2023	15th Anniversary	In 2023, we celebrated our 15th year in the IT industry. We commemorated this milestone by focusing on sustainability and green IT initiatives, committing ourselves to reduce our environmental footprint. Our efforts did not go unnoticed, as we received industry awards for our outstanding service and innovation.	3	t	2025-12-01 11:36:15.203	2025-12-01 11:36:15.203	/images/timeline/7.webp|/images/timeline/8.webp|/images/timeline/9.webp
\.


--
-- Data for Name: VisionSection; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."VisionSection" (id, subtitle, heading, "buttonText", "buttonUrl", "backgroundImage", "createdAt", "updatedAt") FROM stdin;
7	Our Vision	We aspire to create a digital landscape where technology seamlessly enhances productivity, connectivity, and sustainability, fostering a brighter, more efficient, and inclusive future for all.	Let's Work Together	/contact	/images/background/2.webp	2025-12-01 11:36:09.868	2025-12-01 11:36:09.868
\.


--
-- Name: AboutSection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."AboutSection_id_seq"', 7, true);


--
-- Name: AdminUser_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."AdminUser_id_seq"', 1, true);


--
-- Name: ClientLogo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."ClientLogo_id_seq"', 56, true);


--
-- Name: ContactSubmission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."ContactSubmission_id_seq"', 2, true);


--
-- Name: FooterLink_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."FooterLink_id_seq"', 84, true);


--
-- Name: HeroSlide_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."HeroSlide_id_seq"', 14, true);


--
-- Name: MenuItem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."MenuItem_id_seq"', 56, true);


--
-- Name: NewsPost_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."NewsPost_id_seq"', 36, true);


--
-- Name: PageContent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."PageContent_id_seq"', 12, true);


--
-- Name: Project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Project_id_seq"', 36, true);


--
-- Name: Service_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Service_id_seq"', 52, true);


--
-- Name: SiteSettings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."SiteSettings_id_seq"', 7, true);


--
-- Name: SocialLink_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."SocialLink_id_seq"', 35, true);


--
-- Name: StatCounter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."StatCounter_id_seq"', 20, true);


--
-- Name: TeamMember_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."TeamMember_id_seq"', 29, true);


--
-- Name: Testimonial_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Testimonial_id_seq"', 56, true);


--
-- Name: TimelineMilestone_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."TimelineMilestone_id_seq"', 17, true);


--
-- Name: VisionSection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."VisionSection_id_seq"', 7, true);


--
-- Name: AboutSection AboutSection_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AboutSection"
    ADD CONSTRAINT "AboutSection_pkey" PRIMARY KEY (id);


--
-- Name: AdminUser AdminUser_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."AdminUser"
    ADD CONSTRAINT "AdminUser_pkey" PRIMARY KEY (id);


--
-- Name: ClientLogo ClientLogo_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ClientLogo"
    ADD CONSTRAINT "ClientLogo_pkey" PRIMARY KEY (id);


--
-- Name: ContactSubmission ContactSubmission_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ContactSubmission"
    ADD CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY (id);


--
-- Name: FooterLink FooterLink_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."FooterLink"
    ADD CONSTRAINT "FooterLink_pkey" PRIMARY KEY (id);


--
-- Name: HeroSlide HeroSlide_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."HeroSlide"
    ADD CONSTRAINT "HeroSlide_pkey" PRIMARY KEY (id);


--
-- Name: MenuItem MenuItem_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."MenuItem"
    ADD CONSTRAINT "MenuItem_pkey" PRIMARY KEY (id);


--
-- Name: NewsPost NewsPost_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."NewsPost"
    ADD CONSTRAINT "NewsPost_pkey" PRIMARY KEY (id);


--
-- Name: PageContent PageContent_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."PageContent"
    ADD CONSTRAINT "PageContent_pkey" PRIMARY KEY (id);


--
-- Name: Project Project_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_pkey" PRIMARY KEY (id);


--
-- Name: Service Service_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Service"
    ADD CONSTRAINT "Service_pkey" PRIMARY KEY (id);


--
-- Name: SiteSettings SiteSettings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SiteSettings"
    ADD CONSTRAINT "SiteSettings_pkey" PRIMARY KEY (id);


--
-- Name: SocialLink SocialLink_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SocialLink"
    ADD CONSTRAINT "SocialLink_pkey" PRIMARY KEY (id);


--
-- Name: StatCounter StatCounter_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."StatCounter"
    ADD CONSTRAINT "StatCounter_pkey" PRIMARY KEY (id);


--
-- Name: TeamMember TeamMember_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TeamMember"
    ADD CONSTRAINT "TeamMember_pkey" PRIMARY KEY (id);


--
-- Name: Testimonial Testimonial_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Testimonial"
    ADD CONSTRAINT "Testimonial_pkey" PRIMARY KEY (id);


--
-- Name: TimelineMilestone TimelineMilestone_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."TimelineMilestone"
    ADD CONSTRAINT "TimelineMilestone_pkey" PRIMARY KEY (id);


--
-- Name: VisionSection VisionSection_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."VisionSection"
    ADD CONSTRAINT "VisionSection_pkey" PRIMARY KEY (id);


--
-- Name: AdminUser_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "AdminUser_email_key" ON public."AdminUser" USING btree (email);


--
-- Name: NewsPost_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "NewsPost_slug_key" ON public."NewsPost" USING btree (slug);


--
-- Name: PageContent_pageSlug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "PageContent_pageSlug_key" ON public."PageContent" USING btree ("pageSlug");


--
-- Name: Project_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Project_slug_key" ON public."Project" USING btree (slug);


--
-- Name: MenuItem MenuItem_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."MenuItem"
    ADD CONSTRAINT "MenuItem_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public."MenuItem"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

\unrestrict InhEQjfwF0ikjRxVMmCzwbIbkI8ONPV0fawzkQL1A7LNf2E8HTCU2JHADiPlqBS

