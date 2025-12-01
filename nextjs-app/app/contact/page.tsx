import prisma from '@/lib/prisma';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import ContactForm from '@/components/ContactForm';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getData() {
  const [
    settings,
    menuItems,
    socialLinks,
    footerLinks,
  ] = await Promise.all([
    prisma.siteSettings.findFirst(),
    prisma.menuItem.findMany({
      where: { parentId: null },
      include: { children: true },
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
    socialLinks,
    footerLinks,
  };
}

export default async function ContactPage() {
  const data = await getData();

  const headerSettings = {
    logoUrl: data.settings?.logoUrl || null,
    logoMobileUrl: data.settings?.logoMobileUrl || null,
    phone: data.settings?.phone || null,
  };

  const footerSettings = {
    logoUrl: data.settings?.logoUrl || null,
    phone: data.settings?.phone || null,
    email: data.settings?.email || null,
    address: data.settings?.address || null,
    copyright: data.settings?.copyright || null,
    description: data.settings?.description || null,
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

        <PageHeader
          subtitle="Contact"
          title="We're here to help you"
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: 'Contact' },
          ]}
          backgroundImage="/images/background/5.webp"
          hasParallax={true}
        />

        <section className="no-top no-bottom text-light">
          <div className="container-fluid">
            <div className="row g-0">
              <div className="col-lg-4 col-md-6">
                <div className="de-icon-text bg-dark-1 p-4">
                  <img src="/images/svg/phone-svgrepo-com-white.svg" alt="Phone" />
                  <div className="d-text">
                    <h4>Phone</h4>
                    {data.settings?.phone || '+880184318008'}
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="de-icon-text bg-dark-2 p-4">
                  <img src="/images/svg/email-address-svgrepo-com-white.svg" alt="Email" />
                  <div className="d-text">
                    <h4>Email</h4>
                    {data.settings?.email || 'hallo@madebydesignesia.com'}
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6">
                <div className="de-icon-text bg-dark-3 p-4">
                  <img src="/images/svg/map-pin-svgrepo-com-white.svg" alt="Address" />
                  <div className="d-text">
                    <h4>Address</h4>
                    {data.settings?.address || '100 S Main St, Los Angeles, CA'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                <ContactForm />
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
