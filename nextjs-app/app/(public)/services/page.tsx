import prisma from '@/lib/prisma';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getData() {
  const [
    settings,
    menuItems,
    services,
    socialLinks,
    footerLinks,
  ] = await Promise.all([
    prisma.siteSettings.findFirst(),
    prisma.menuItem.findMany({
      where: { parentId: null },
      include: { children: true },
      orderBy: { order: 'asc' },
    }),
    prisma.service.findMany({
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
  ]);

  return {
    settings,
    menuItems,
    services,
    socialLinks,
    footerLinks,
  };
}

export default async function ServicesPage() {
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

  const delayMap = ['0s', '.2s', '.4s', '.6s'];

  return (
    <>
      <Header 
        menuItems={data.menuItems} 
        settings={headerSettings} 
        transparent={true} 
      />

      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <PageHeader
          subtitle="Our services"
          title="What can MaxTech do for you?"
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: 'Services' },
          ]}
          backgroundImage="/images/background/3.webp"
          hasParallax={true}
        />

        <section>
          <div className="container">
            <div className="row g-3">
              {data.services.map((service, index) => (
                <div 
                  key={service.id} 
                  className="col-lg-3 col-md-6 wow fadeInRight" 
                  data-wow-delay={delayMap[index % 4]}
                >
                  <div className="p-4 pb-2 bg-grey h-100">
                    <img src={service.icon || ''} className="w-80px mb20" alt={service.title} />
                    <h4>{service.title}</h4>
                    <hr className="s2" />
                    <p>{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-dark-2 text-light">
          <div className="container">
            <div className="row align-items-center gx-5">
              <div className="col-lg-6 mb-sm-20 position-relative">
                <div className="images-deco-1">
                  <img src="/images/misc/1.webp" className="d-img-1 wow zoomIn" data-wow-delay="0s" alt="" />
                  <img src="/images/misc/2.webp" className="d-img-2 wow zoomIn" data-wow-delay=".5s" data-jarallax-element="100" alt="" />
                  <div className="d-img-3 bg-color wow zoomIn" data-wow-delay=".6s" data-jarallax-element="-50"></div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="subtitle s2 wow fadeInUp mb-3">Trusted IT Solution</div>
                <h2 className="wow fadeInUp" data-wow-delay=".2s">Delivering outstanding IT services since 2008</h2>
                <p className="wow fadeInUp">We are a dynamic and forward-thinking IT company dedicated to transforming your digital world. With a passion for cutting-edge solutions and a commitment to exceptional service, we are your trusted partner in navigating the ever-evolving landscape of IT. Our team of skilled professionals is here to harness the power of technology, providing tailor-made solutions that drive your success.</p>
                <hr className="s2" />
                <div className="spacer-10"></div>
                <a className="btn-line mb10" href="/services">Our Services</a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer 
        settings={footerSettings}
        socialLinks={data.socialLinks}
        footerLinks={data.footerLinks}
      />
    </>
  );
}
