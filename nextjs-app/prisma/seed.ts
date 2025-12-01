import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Clear existing data
  await prisma.heroSlide.deleteMany();
  await prisma.service.deleteMany();
  await prisma.visionSection.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.aboutSection.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.clientLogo.deleteMany();
  await prisma.socialLink.deleteMany();
  await prisma.footerLink.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.siteSettings.deleteMany();
  await prisma.timelineMilestone.deleteMany();
  await prisma.statCounter.deleteMany();

  // Site Settings
  await prisma.siteSettings.create({
    data: {
      siteName: 'MaxTech',
      siteTitle: 'MaxTech — IT Solutions and Services',
      description: 'We are a team of tech enthusiasts dedicated to taking your technology aspirations to new heights.',
      phone: '+8801843180008',
      email: 'info@maxtechbd.com',
      address: '4th Floor, Alamgir Tower, 94 Sheikh Mujib Rd, Chittagong 4100, Chittagong, Bangladesh',
      logoUrl: '/images/logo.png',
      logoMobileUrl: '/images/logo-mobile.png',
      favicon: '/images/icon.png',
      copyright: 'Copyright 2023 - MaxTech by Designesia',
    },
  });

  // Menu Items
  const homeMenu = await prisma.menuItem.create({
    data: { label: 'Home', href: '/', order: 1 },
  });

  const portfolioMenu = await prisma.menuItem.create({
    data: { label: 'Portfolio', href: '#', order: 2 },
  });

  await prisma.menuItem.createMany({
    data: [
      { label: 'Client Projects', href: '/portfolio', order: 1, parentId: portfolioMenu.id },
      { label: 'Our SaaS Products', href: '/portfolio/saas', order: 2, parentId: portfolioMenu.id },
    ],
  });

  await prisma.menuItem.createMany({
    data: [
      { label: 'Services', href: '/services', order: 3 },
      { label: 'About Us', href: '/about', order: 4 },
      { label: 'News', href: '/news', order: 5 },
      { label: 'Contact', href: '/contact', order: 6 },
    ],
  });

  // Hero Slides
  await prisma.heroSlide.createMany({
    data: [
      {
        subtitle: 'Trusted IT Solutions',
        title: 'who we are',
        titleHighlight: 'we',
        description: 'We are team of tech enthusiasts dedicated to taking your technology aspirations to new heights.',
        primaryBtnText: 'Our Services',
        primaryBtnUrl: '/services',
        secondaryBtnText: 'Free Consultation',
        secondaryBtnUrl: '/contact',
        backgroundImage: '/images/slider/1.webp',
        order: 1,
      },
      {
        subtitle: 'Trusted IT Solutions',
        title: 'what we do',
        titleHighlight: 'do',
        description: 'We are driven by innovation, excellence, and a commitment to delivering cutting-edge IT solutions.',
        primaryBtnText: 'Our Services',
        primaryBtnUrl: '/services',
        secondaryBtnText: 'Free Consultation',
        secondaryBtnUrl: '/contact',
        backgroundImage: '/images/slider/2.webp',
        order: 2,
      },
    ],
  });

  // Services
  await prisma.service.createMany({
    data: [
      {
        title: 'Managed IT Services',
        description: 'Provide management and maintenance of IT infrastructure, including servers, networks, and software.',
        image: '/images/services/1.webp',
        icon: '/images/svg/collaboration-svgrepo-com.svg',
        order: 1,
      },
      {
        title: 'Software Development',
        description: 'Creating and maintaining functional and efficient software applications that address a multitude of tasks.',
        image: '/images/services/2.webp',
        icon: '/images/svg/embedded-live-content-svgrepo-com.svg',
        order: 2,
      },
      {
        title: 'Cybersecurity Services',
        description: 'Protecting digital assets by providing services like firewall management and vulnerability assessments.',
        image: '/images/services/3.webp',
        icon: '/images/svg/lock-svgrepo-com.svg',
        order: 3,
      },
      {
        title: 'Database Management',
        description: 'Designing, implementing, and managing databases, including SQL and NoSQL databases.',
        image: '/images/services/4.webp',
        icon: '/images/svg/data-check-svgrepo-com.svg',
        order: 4,
      },
      {
        title: 'Network Services',
        description: 'Planning computer networks and protecting networks from unauthorized access and cyber threats',
        icon: '/images/svg/all-servers-svgrepo-com.svg',
        order: 5,
      },
      {
        title: 'Help Desk Support',
        description: 'Providing technical support and assistance to end-users to resolve IT issues and problems.',
        icon: '/images/svg/users-svgrepo-com.svg',
        order: 6,
      },
      {
        title: 'Website Development',
        description: 'Web development encompasses the creation, enhancement, and maintenance of websites and web applications.',
        icon: '/images/svg/browser-svgrepo-com.svg',
        order: 7,
      },
      {
        title: 'IT Consulting',
        description: 'Providing expert advice on IT strategy, technology adoption, and digital transformation.',
        icon: '/images/svg/headset-svgrepo-com.svg',
        order: 8,
      },
    ],
  });

  // Vision Section
  await prisma.visionSection.create({
    data: {
      subtitle: 'Our Vision',
      heading: 'We aspire to create a digital landscape where technology seamlessly enhances productivity, connectivity, and sustainability, fostering a brighter, more efficient, and inclusive future for all.',
      buttonText: "Let's Work Together",
      buttonUrl: '/contact',
      backgroundImage: '/images/background/2.webp',
    },
  });

  // Team Members
  await prisma.teamMember.createMany({
    data: [
      {
        name: 'Fynley Wilkinson',
        role: 'CEO',
        image: '/images/team/1.webp',
        facebook: '#',
        twitter: '#',
        discord: '#',
        order: 1,
      },
      {
        name: 'Myra Welsh',
        role: 'CEO',
        image: '/images/team/2.webp',
        facebook: '#',
        twitter: '#',
        instagram: '#',
        order: 2,
      },
      {
        name: 'Aysha Shepard',
        role: 'CCO',
        image: '/images/team/3.webp',
        facebook: '#',
        twitter: '#',
        instagram: '#',
        order: 3,
      },
      {
        name: 'Robyn Peel',
        role: 'CTO',
        image: '/images/team/4.webp',
        facebook: '#',
        twitter: '#',
        instagram: '#',
        order: 4,
      },
    ],
  });

  // About Section
  await prisma.aboutSection.create({
    data: {
      subtitle: 'Trusted IT Solution',
      heading: 'Delivering outstanding IT services since 2008',
      description: 'We are a dynamic and forward-thinking IT company dedicated to transforming your digital world. With a passion for cutting-edge solutions and a commitment to exceptional service, we are your trusted partner in navigating the ever-evolving landscape of IT. Our team of skilled professionals is here to harness the power of technology, providing tailor-made solutions that drive your success.',
      buttonText: 'Our Services',
      buttonUrl: '/services',
      image1: '/images/misc/1.webp',
      image2: '/images/misc/2.webp',
    },
  });

  // Testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        authorName: 'Michael S.',
        authorRole: 'developer',
        authorImage: '/images/testimonial/1.jpg',
        quote: "We've entrusted our IT needs to MaxTech for several years, and they've consistently exceeded our expectations. Their proactive approach to managing our IT infrastructure has eliminated downtime and ensured a secure, efficient environment.",
        rating: 5,
        order: 1,
      },
      {
        authorName: 'Robert L.',
        authorRole: 'developer',
        authorImage: '/images/testimonial/2.jpg',
        quote: "MaxTech's IT support services have been instrumental in keeping our systems running smoothly. Their team is quick to respond, expertly resolving any issues we encounter. Knowing that they have our IT needs covered allows us to focus on our core business with confidence.",
        rating: 5,
        order: 2,
      },
      {
        authorName: 'Jake M.',
        authorRole: 'developer',
        authorImage: '/images/testimonial/3.jpg',
        quote: "MaxTech's cybersecurity solutions have transformed our security posture. Their comprehensive services have protected us from cyber threats and data breaches. We trust their expertise and diligence in monitoring and safeguarding our digital assets.",
        rating: 5,
        order: 3,
      },
      {
        authorName: 'Alex P.',
        authorRole: 'developer',
        authorImage: '/images/testimonial/4.jpg',
        quote: "MaxTech helped us seamlessly transition to the cloud. Their cloud services have reduced our IT infrastructure costs while providing flexibility and scalability. The accessibility and security of their cloud solutions have been a game-changer for our growing business.",
        rating: 5,
        order: 4,
      },
      {
        authorName: 'Carlos R.',
        authorRole: 'developer',
        authorImage: '/images/testimonial/5.jpg',
        quote: "MaxTech's data backup and recovery services have been a lifesaver for our critical data. Their solutions ensure our data's protection and quick recovery in the event of unforeseen events. Knowing our data is safe with MaxTech is a source of great comfort.",
        rating: 5,
        order: 5,
      },
      {
        authorName: 'Edward B.',
        authorRole: 'developer',
        authorImage: '/images/testimonial/6.jpg',
        quote: "MaxTech's IT consulting services have provided us with invaluable insights and strategies to optimize our IT infrastructure. Their expert advice has been instrumental in aligning our technology with our business goals and staying competitive.",
        rating: 5,
        order: 6,
      },
      {
        authorName: 'Daniel H.',
        authorRole: 'developer',
        authorImage: '/images/testimonial/7.jpg',
        quote: "MaxTech's project management services have been essential for us. Their team efficiently oversees and coordinates complex IT projects, ensuring they are delivered on time and within budget. We appreciate their attention to detail and dedication to our success.",
        rating: 5,
        order: 7,
      },
      {
        authorName: 'Bryan G.',
        authorRole: 'developer',
        authorImage: '/images/testimonial/8.jpg',
        quote: "MaxTech's network infrastructure services have transformed our connectivity. Their expertise in designing, implementing, and maintaining our network has improved our operational efficiency and communication. Their responsive support is always just a call away.",
        rating: 5,
        order: 8,
      },
    ],
  });

  // Client Logos
  await prisma.clientLogo.createMany({
    data: [
      { image: '/images/logo-clients/1.png', order: 1 },
      { image: '/images/logo-clients/2.png', order: 2 },
      { image: '/images/logo-clients/3.png', order: 3 },
      { image: '/images/logo-clients/4.png', order: 4 },
      { image: '/images/logo-clients/5.png', order: 5 },
      { image: '/images/logo-clients/6.png', order: 6 },
      { image: '/images/logo-clients/7.png', order: 7 },
      { image: '/images/logo-clients/8.png', order: 8 },
    ],
  });

  // Social Links
  await prisma.socialLink.createMany({
    data: [
      { platform: 'Facebook', url: '#', icon: 'fa-brands fa-facebook-f', order: 1 },
      { platform: 'Twitter', url: '#', icon: 'fa-brands fa-twitter', order: 2 },
      { platform: 'Discord', url: '#', icon: 'fa-brands fa-discord', order: 3 },
      { platform: 'TikTok', url: '#', icon: 'fa-brands fa-tiktok', order: 4 },
      { platform: 'YouTube', url: '#', icon: 'fa-brands fa-youtube', order: 5 },
    ],
  });

  // Footer Links
  await prisma.footerLink.createMany({
    data: [
      { category: 'Company', label: 'Home', url: '/', order: 1 },
      { category: 'Company', label: 'Our Services', url: '/services', order: 2 },
      { category: 'Company', label: 'Portfolio', url: '/portfolio', order: 3 },
      { category: 'Company', label: 'About Us', url: '/about', order: 4 },
      { category: 'Company', label: 'News', url: '/news', order: 5 },
      { category: 'Company', label: 'Contact', url: '/contact', order: 6 },
      { category: 'Services', label: 'Managed IT Services', url: '#', order: 1 },
      { category: 'Services', label: 'Software Development', url: '#', order: 2 },
      { category: 'Services', label: 'Cybersecurity Services', url: '#', order: 3 },
      { category: 'Services', label: 'Database Management', url: '#', order: 4 },
      { category: 'Services', label: 'Network Services', url: '#', order: 5 },
      { category: 'Services', label: 'Help Desk Support', url: '#', order: 6 },
    ],
  });

  // Timeline Milestones (images stored as pipe-separated values)
  await prisma.timelineMilestone.createMany({
    data: [
      {
        year: '2008',
        title: 'Company Inception',
        description: 'In the year 2000, a group of visionary tech enthusiasts came together with a shared dream of making technology accessible to everyone. Our company was founded in a small garage with just a handful of passionate individuals.',
        images: '/images/timeline/1.webp|/images/timeline/2.webp|/images/timeline/3.webp',
        order: 1,
      },
      {
        year: '2012',
        title: 'Office Expansion',
        description: 'As our team grew, we expanded our physical presence by opening a new office. This expansion was necessary to accommodate our ever-growing roster of talented professionals. Simultaneously, we launched a proprietary software product that gained rapid traction in the market.',
        images: '/images/timeline/4.webp|/images/timeline/5.webp|/images/timeline/6.webp',
        order: 2,
      },
      {
        year: '2023',
        title: '15th Anniversary',
        description: 'In 2023, we celebrated our 15th year in the IT industry. We commemorated this milestone by focusing on sustainability and green IT initiatives, committing ourselves to reduce our environmental footprint. Our efforts did not go unnoticed, as we received industry awards for our outstanding service and innovation.',
        images: '/images/timeline/7.webp|/images/timeline/8.webp|/images/timeline/9.webp',
        order: 3,
      },
    ],
  });

  // Stat Counters
  await prisma.statCounter.createMany({
    data: [
      {
        value: 25,
        suffix: '',
        label: 'Years Experience',
        order: 1,
      },
      {
        value: 12,
        suffix: '',
        label: 'Awards Earned',
        order: 2,
      },
      {
        value: 720,
        suffix: '+',
        label: 'Clients Served',
        order: 3,
      },
      {
        value: 98,
        suffix: '%',
        label: 'Success Rates',
        order: 4,
      },
    ],
  });

  // News Posts
  await prisma.newsPost.deleteMany();
  await prisma.newsPost.createMany({
    data: [
      {
        title: 'A Glimpse into the Future of Technology',
        slug: 'glimpse-into-future-technology',
        excerpt: 'Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...',
        content: '<p>Quis sunt quis do laboris eiusmod in sint dolore sit pariatur consequat commodo aliqua nulla ad dolor aliquip incididunt voluptate est aliquip adipisicing ea cupidatat nostrud incididunt aliquip dolore. Sed minim nisi duis laborum est labore nisi amet elit adipisicing proident do consectetur dolor labore sit nisi ad proident esse ad velit nisi irure reprehenderit ut et dolor labore veniam quis.</p><p>Sunt duis laboris ex et quis laborum laborum cillum mollit voluptate culpa consequat ex cupidatat dolor eiusmod proident proident cillum pariatur sint adipisicing in nostrud do dolore consectetur quis incididunt minim consectetur. Exercitation elit proident dolor est id eiusmod dolor dolor incididunt ad voluptate laboris cupidatat est est sint veniam sint officia sint incididunt est sit ut tempor commodo pariatur ut proident et do.</p><p>Sed eu in ut sint dolor irure fugiat minim veniam sed ea proident ullamco occaecat irure ut velit eu ullamco fugiat cupidatat dolore fugiat. Lorem ipsum id non deserunt id consequat duis voluptate amet aliqua pariatur laboris officia pariatur veniam velit reprehenderit sint nostrud cupidatat magna eiusmod mollit exercitation pariatur nulla minim laboris dolore aliqua consectetur cillum duis aute consectetur.</p>',
        image: '/images/news/1.webp',
        thumbnail: '/images/news-thumbnail/pic-blog-1.jpg',
        author: 'Admin',
        tags: 'tech,daily',
        publishedAt: new Date('2024-11-28'),
        isActive: true,
      },
      {
        title: 'How AI is Transforming Industries',
        slug: 'how-ai-transforming-industries',
        excerpt: 'Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...',
        content: '<p>Artificial Intelligence is revolutionizing how businesses operate across every sector. From healthcare to finance, AI-powered solutions are enabling companies to make smarter decisions, automate routine tasks, and deliver personalized experiences to customers.</p><p>Machine learning algorithms are now capable of analyzing vast amounts of data to identify patterns and insights that would be impossible for humans to discover. This capability is transforming industries in unprecedented ways.</p>',
        image: '/images/news/2.webp',
        thumbnail: '/images/news-thumbnail/pic-blog-2.jpg',
        author: 'Admin',
        tags: 'tech,AI',
        publishedAt: new Date('2024-11-27'),
        isActive: true,
      },
      {
        title: 'How Technology is Reshaping Our Lives',
        slug: 'technology-reshaping-lives',
        excerpt: 'Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...',
        content: '<p>Technology continues to transform every aspect of our daily lives, from how we communicate and work to how we shop and entertain ourselves. Smart devices have become ubiquitous, connecting us to a world of information and services at our fingertips.</p>',
        image: '/images/news/3.webp',
        thumbnail: '/images/news-thumbnail/pic-blog-3.jpg',
        author: 'Admin',
        tags: 'tech,lifestyle',
        publishedAt: new Date('2024-11-26'),
        isActive: true,
      },
      {
        title: 'Cybersecurity in the Digital Age',
        slug: 'cybersecurity-digital-age',
        excerpt: 'Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...',
        content: '<p>As our reliance on digital systems grows, so does the importance of cybersecurity. Organizations must implement robust security measures to protect their data and systems from increasingly sophisticated cyber threats.</p>',
        image: '/images/news/4.webp',
        thumbnail: '/images/news-thumbnail/pic-blog-4.jpg',
        author: 'Admin',
        tags: 'security,tech',
        publishedAt: new Date('2024-11-25'),
        isActive: true,
      },
      {
        title: 'Balancing Progress and Responsibility',
        slug: 'balancing-progress-responsibility',
        excerpt: 'Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...',
        content: '<p>As technology advances at an unprecedented pace, society faces important questions about how to balance innovation with ethical considerations. From AI bias to data privacy, these challenges require thoughtful solutions.</p>',
        image: '/images/news/5.webp',
        author: 'Admin',
        tags: 'ethics,tech',
        publishedAt: new Date('2024-11-24'),
        isActive: true,
      },
      {
        title: 'The Next Generation for the Digital Age',
        slug: 'next-generation-digital-age',
        excerpt: 'Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...',
        content: '<p>Preparing the next generation with digital skills is crucial for their success in an increasingly technology-driven world. Education systems are adapting to include coding, digital literacy, and critical thinking skills.</p>',
        image: '/images/news/6.webp',
        author: 'Admin',
        tags: 'education,tech',
        publishedAt: new Date('2024-11-23'),
        isActive: true,
      },
    ],
  });

  // Projects (all with complete content - no fallbacks)
  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: [
      {
        title: 'The Role of Managed IT Services in Small Business Success',
        slug: 'managed-it-services-small-business',
        description: 'How we helped a small business transform their IT infrastructure',
        image: '/images/study-case/1.webp',
        category: 'IT Support',
        overview: 'A restaurant business is a complex and dynamic industry that encompasses a wide range of food service establishments, from fast food and casual dining to fine dining and specialty eateries. This industry plays a significant role in the global economy, offering diverse culinary experiences to consumers while also presenting a multitude of challenges and opportunities for entrepreneurs.',
        challenges: 'The restaurant industry is highly competitive, making it challenging to stand out and attract customers.|Food costs, labor expenses, rent, and utilities can increase, putting pressure on profit margins.|Recruiting and retaining skilled chefs, servers, and kitchen staff can be difficult, leading to staff shortages and turnover.|Restaurants must comply with strict health and safety regulations, which can be time-consuming and costly.|Maintaining consistent food quality is essential to customer satisfaction, but it can be challenging, especially during busy periods.',
        solutions: 'Integrate with kitchen displays, online ordering platforms, and inventory management systems.|Allows customers to book tables online, reducing wait times and improving the dining experience.|Websites and mobile apps for online ordering and food delivery.|Integration with POS systems to streamline order processing.|Helps track and manage food and beverage inventory.|Displays orders to kitchen staff, improving order accuracy and efficiency.',
        testimonialQuote: 'Their cutting-edge IT solutions have transformed the way we operate and have greatly enhanced our customer experience.',
        positiveFeedbacks: 750,
        turnoverIncrease: 50,
        order: 1,
      },
      {
        title: 'Innovative IT Services Driving Digital Transformation in the Enterprise',
        slug: 'digital-transformation-enterprise',
        description: 'Enterprise-level digital transformation case study',
        image: '/images/study-case/2.webp',
        category: 'IT Support',
        overview: 'Large enterprises face unique challenges in digital transformation. Our comprehensive approach helps organizations modernize their legacy systems while minimizing disruption to business operations.',
        challenges: 'Legacy systems are deeply integrated with business processes, making replacement risky.|Large organizations have complex stakeholder requirements.|Data migration from old systems requires careful planning.|Employee resistance to new technologies can slow adoption.|Maintaining business continuity during transition is critical.',
        solutions: 'Phased migration approach to minimize disruption.|Comprehensive training programs for all staff levels.|Data validation and backup procedures before migration.|Change management strategies to ensure adoption.|24/7 support during the transition period.',
        testimonialQuote: 'MaxTech helped us navigate our digital transformation journey with minimal disruption to our operations.',
        positiveFeedbacks: 890,
        turnoverIncrease: 65,
        order: 2,
      },
      {
        title: 'IT Services Maximizing Efficiency and Productivity in Workplace',
        slug: 'maximizing-efficiency-workplace',
        description: 'Workplace productivity enhancement through IT solutions',
        image: '/images/study-case/3.webp',
        category: 'IT Support',
        overview: 'Modern workplaces require seamless technology integration to maximize productivity. Our solutions help organizations streamline workflows and empower employees with the right tools.',
        challenges: 'Employees waste time on repetitive manual tasks.|Communication silos between departments reduce efficiency.|Outdated hardware and software slow down operations.|Remote work requires secure and reliable access.|Tracking productivity across teams is difficult.',
        solutions: 'Automation of repetitive tasks with custom scripts.|Unified communication platform for all departments.|Hardware refresh and software modernization.|Secure VPN and cloud-based collaboration tools.|Analytics dashboard for productivity monitoring.',
        testimonialQuote: 'Our team productivity increased by 40% after implementing MaxTech solutions.',
        positiveFeedbacks: 620,
        turnoverIncrease: 40,
        order: 3,
      },
      {
        title: 'Cloud Migration Strategy for Healthcare Provider',
        slug: 'cloud-migration-healthcare',
        description: 'Secure cloud migration for healthcare data',
        image: '/images/study-case/4.webp',
        category: 'Cloud Services',
        overview: 'Healthcare providers need secure and compliant cloud solutions to manage sensitive patient data. Our HIPAA-compliant migration strategy ensures data security while improving accessibility.',
        challenges: 'HIPAA compliance requirements are strict.|Patient data security is paramount.|Legacy systems may not be cloud-compatible.|Staff training on new systems is required.|Downtime during migration must be minimized.',
        solutions: 'HIPAA-compliant cloud architecture design.|End-to-end encryption for all patient data.|Custom integration layer for legacy systems.|Comprehensive staff training program.|Zero-downtime migration strategy.',
        testimonialQuote: 'MaxTech delivered a seamless cloud migration while maintaining our strict compliance requirements.',
        positiveFeedbacks: 450,
        turnoverIncrease: 35,
        order: 4,
      },
      {
        title: 'Cybersecurity Overhaul for Financial Institution',
        slug: 'cybersecurity-financial-institution',
        description: 'Comprehensive security upgrade for banking systems',
        image: '/images/study-case/5.webp',
        category: 'Security',
        overview: 'Financial institutions are prime targets for cyberattacks. Our comprehensive security assessment and implementation protects against evolving threats while maintaining regulatory compliance.',
        challenges: 'Sophisticated cyber threats targeting financial data.|Regulatory compliance requirements are complex.|Legacy security systems have vulnerabilities.|24/7 monitoring is essential.|Employee security awareness is often lacking.',
        solutions: 'Multi-layered security architecture implementation.|Compliance framework alignment (PCI-DSS, SOX).|Security infrastructure modernization.|24/7 Security Operations Center (SOC).|Regular security awareness training for staff.',
        testimonialQuote: 'Since partnering with MaxTech, we have not experienced a single security breach.',
        positiveFeedbacks: 980,
        turnoverIncrease: 25,
        order: 5,
      },
      {
        title: 'E-commerce Platform Development',
        slug: 'ecommerce-platform-development',
        description: 'Full-stack e-commerce solution development',
        image: '/images/study-case/6.webp',
        category: 'Development',
        overview: 'Building a scalable e-commerce platform requires expertise in frontend, backend, and payment integration. Our custom solution handles high traffic while providing an exceptional user experience.',
        challenges: 'High traffic during peak seasons requires scalability.|Payment processing must be secure and reliable.|User experience impacts conversion rates.|Inventory management needs real-time updates.|Mobile responsiveness is essential.',
        solutions: 'Cloud-native architecture for auto-scaling.|PCI-compliant payment gateway integration.|UX-focused design with A/B testing.|Real-time inventory synchronization.|Mobile-first responsive design.',
        testimonialQuote: 'Our online sales tripled after launching the new platform built by MaxTech.',
        positiveFeedbacks: 1200,
        turnoverIncrease: 200,
        order: 6,
      },
    ],
  });

  // Page Content for all pages
  await prisma.pageContent.deleteMany();
  await prisma.pageContent.createMany({
    data: [
      {
        pageSlug: 'about',
        title: 'Providing best IT solutions',
        subtitle: 'About Us',
        description: 'Learn about our company history, team, and vision for the future.',
        metaTitle: 'About Us - MaxTech',
        metaDescription: 'Learn about MaxTech, our history, team, and commitment to IT excellence.',
      },
      {
        pageSlug: 'services',
        title: 'What can MaxTech do for you?',
        subtitle: 'Our services',
        description: 'Comprehensive IT solutions for your business needs.',
        metaTitle: 'Our Services - MaxTech',
        metaDescription: 'Explore our IT services including software development, cybersecurity, and more.',
      },
      {
        pageSlug: 'contact',
        title: "We're here to help you",
        subtitle: 'Contact',
        description: 'Get in touch with our team for a free consultation.',
        metaTitle: 'Contact Us - MaxTech',
        metaDescription: 'Contact MaxTech for IT solutions and services.',
      },
      {
        pageSlug: 'news',
        title: 'Providing best IT solutions',
        subtitle: 'Latest News',
        description: 'Stay updated with the latest technology trends and company news.',
        metaTitle: 'News - MaxTech',
        metaDescription: 'Latest news and updates from MaxTech.',
      },
      {
        pageSlug: 'portfolio',
        title: 'Study Case',
        subtitle: 'Work with us',
        description: 'Explore our successful projects and case studies.',
        metaTitle: 'Portfolio - MaxTech',
        metaDescription: 'View our successful IT projects and case studies.',
      },
      {
        pageSlug: 'about-team',
        title: "We're a group of IT passionate",
        subtitle: 'Our team',
        description: 'Meet our talented team of IT professionals.',
      },
    ],
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
