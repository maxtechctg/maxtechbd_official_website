import prisma from '@/lib/prisma';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import ServicesGrid from '@/components/ServicesGrid';
import VisionSection from '@/components/VisionSection';
import TeamSection from '@/components/TeamSection';
import AboutSection from '@/components/AboutSection';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import ClientLogos from '@/components/ClientLogos';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getData() {
  const [
    settings,
    menuItems,
    heroSlides,
    services,
    visionSection,
    teamMembers,
    aboutSection,
    testimonials,
    clientLogos,
    socialLinks,
    footerLinks,
    pageContent,
  ] = await Promise.all([
    prisma.siteSettings.findFirst(),
    prisma.menuItem.findMany({
      where: { parentId: null },
      include: { children: true },
      orderBy: { order: 'asc' },
    }),
    prisma.heroSlide.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    }),
    prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    }),
    prisma.visionSection.findFirst(),
    prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    }),
    prisma.aboutSection.findFirst(),
    prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    }),
    prisma.clientLogo.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    }),
    prisma.socialLink.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    }),
    prisma.footerLink.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    }),
    prisma.pageContent.findFirst({
      where: { pageSlug: 'home' },
    }),
  ]);

  return {
    settings,
    menuItems,
    heroSlides,
    services,
    visionSection,
    teamMembers,
    aboutSection,
    testimonials,
    clientLogos,
    socialLinks,
    footerLinks,
    pageContent,
  };
}

export default async function HomePage() {
  const data = await getData();

  const headerSettings = {
    logoUrl: data.settings?.logoUrl || null,
    logoMobileUrl: data.settings?.logoMobileUrl || null,
    navbarLogo: data.settings?.navbarLogo || null,
    navbarLogoWidth: data.settings?.navbarLogoWidth || null,
    navbarLogoHeight: data.settings?.navbarLogoHeight || null,
    phone: data.settings?.phone || null,
  };

  const footerSettings = {
    logoUrl: data.settings?.logoUrl || null,
    footerLogo: data.settings?.footerLogo || null,
    footerLogoWidth: data.settings?.footerLogoWidth || null,
    footerLogoHeight: data.settings?.footerLogoHeight || null,
    phone: data.settings?.phone || null,
    email: data.settings?.email || null,
    address: data.settings?.address || null,
    copyright: data.settings?.copyright || null,
    description: data.settings?.description || null,
  };

  const teamSectionContent = {
    subtitle: 'Our team',
    heading: "We're a group of IT passionate",
  };

  const testimonialsSectionContent = {
    subtitle: 'Customer reviews',
    rating: '4.85 out of 5',
  };

  return (
    <>
      <Header 
        menuItems={data.menuItems} 
        settings={headerSettings} 
        transparent={true} 
      />

      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <HeroSlider slides={data.heroSlides} />

        <ServicesGrid services={data.services} />

        {data.visionSection && (
          <VisionSection
            subtitle={data.visionSection.subtitle}
            heading={data.visionSection.heading}
            buttonText={data.visionSection.buttonText}
            buttonUrl={data.visionSection.buttonUrl}
            backgroundImage={data.visionSection.backgroundImage}
          />
        )}

        <TeamSection 
          members={data.teamMembers}
          subtitle={teamSectionContent.subtitle}
          heading={teamSectionContent.heading}
        />

        {data.aboutSection && (
          <AboutSection
            subtitle={data.aboutSection.subtitle}
            heading={data.aboutSection.heading}
            description={data.aboutSection.description}
            buttonText={data.aboutSection.buttonText}
            buttonUrl={data.aboutSection.buttonUrl}
            image1={data.aboutSection.image1}
            image2={data.aboutSection.image2}
          />
        )}

        <TestimonialsCarousel 
          testimonials={data.testimonials}
          subtitle={testimonialsSectionContent.subtitle}
          rating={testimonialsSectionContent.rating}
        />

        <ClientLogos logos={data.clientLogos} />
      </div>

      <Footer 
        settings={footerSettings}
        socialLinks={data.socialLinks}
        footerLinks={data.footerLinks}
      />
    </>
  );
}
