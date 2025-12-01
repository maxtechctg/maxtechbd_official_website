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
        title: 'Custom Software',
        description: 'Provide management and maintenance of IT infrastructure, including servers, networks, and software.',
        image: '/images/services/1.webp',
        order: 1,
      },
      {
        title: 'Web Application',
        description: 'Creating and maintaining functional and efficient software applications that address a multitude of tasks.',
        image: '/images/services/2.webp',
        order: 2,
      },
      {
        title: 'Mobile App',
        description: 'Protecting digital assets by providing services like firewall management and vulnerability assessments.',
        image: '/images/services/3.webp',
        order: 3,
      },
      {
        title: 'Full-Stack',
        description: 'Designing, implementing, and managing databases, including SQL and NoSQL databases.',
        image: '/images/services/4.webp',
        order: 4,
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
