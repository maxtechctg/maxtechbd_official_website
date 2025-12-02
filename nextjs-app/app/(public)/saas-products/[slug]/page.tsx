import prisma from '@/lib/prisma';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getData(slug: string) {
  const [
    settings,
    menuItems,
    product,
    socialLinks,
    footerLinks,
  ] = await Promise.all([
    prisma.siteSettings.findFirst(),
    prisma.menuItem.findMany({
      where: { parentId: null },
      include: { children: true },
      orderBy: { order: 'asc' },
    }),
    prisma.saaSProduct.findFirst({
      where: { slug, isActive: true },
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
    product,
    socialLinks,
    footerLinks,
  };
}

export default async function SaaSProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getData(slug);

  if (!data.product) {
    notFound();
  }

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

  const features = data.product.features 
    ? data.product.features.split('|').filter(f => f.trim()) 
    : [];
  
  const techStack = data.product.techStack 
    ? data.product.techStack.split(',').map(t => t.trim()).filter(t => t) 
    : [];

  return (
    <>
      <Header 
        menuItems={data.menuItems} 
        settings={headerSettings} 
        transparent={true} 
      />

      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {/* Full-width Hero Image */}
        <section 
          className="full-height relative no-top no-bottom text-light" 
          style={{ 
            backgroundImage: `url(${data.product.mainImage || '/images/background/2.webp'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'flex-end'
          }}
        >
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))' 
          }}></div>
          <div className="container" style={{ position: 'relative', zIndex: 1, paddingBottom: '60px' }}>
            <div className="row">
              <div className="col-lg-8">
                <ul className="crumb" style={{ marginBottom: '20px' }}>
                  <li><Link href="/" style={{ color: '#fff' }}>Home</Link></li>
                  <li><Link href="/saas-products" style={{ color: '#fff' }}>SaaS Products</Link></li>
                  <li className="active" style={{ color: '#f5a623' }}>{data.product.title}</li>
                </ul>
                <h1 className="wow fadeInUp" style={{ fontSize: '48px', marginBottom: '15px' }}>
                  {data.product.title}
                </h1>
                {data.product.tagline && (
                  <p className="lead wow fadeInUp" data-wow-delay=".2s" style={{ fontSize: '22px', opacity: 0.9 }}>
                    {data.product.tagline}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Product Details */}
        <section>
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-8">
                <h3 className="wow fadeInUp">About This Product</h3>
                <div className="spacer-20"></div>
                <p className="wow fadeInUp" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                  {data.product.longDescription || data.product.shortDescription}
                </p>

                {features.length > 0 && (
                  <>
                    <div className="spacer-40"></div>
                    <h3 className="wow fadeInUp">Key Features</h3>
                    <div className="spacer-20"></div>
                    <ul className="ul-style-2 wow fadeInUp">
                      {features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <div className="col-lg-4">
                <div className="padding30 bg-grey rounded-20 wow fadeInRight">
                  <h4 style={{ marginBottom: '20px' }}>Product Info</h4>
                  
                  {techStack.length > 0 && (
                    <div style={{ marginBottom: '25px' }}>
                      <h6 style={{ color: '#666', marginBottom: '10px' }}>Tech Stack</h6>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {techStack.map((tech, index) => (
                          <span 
                            key={index}
                            style={{ 
                              background: '#f5a623', 
                              color: '#fff', 
                              padding: '5px 12px', 
                              borderRadius: '20px',
                              fontSize: '13px'
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {data.product.liveDemoUrl && (
                      <a 
                        href={data.product.liveDemoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-main btn-fullwidth"
                      >
                        <i className="fa fa-external-link" style={{ marginRight: '8px' }}></i>
                        Live Demo
                      </a>
                    )}
                    
                    {data.product.githubUrl && (
                      <a 
                        href={data.product.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-main btn-fullwidth"
                        style={{ background: '#333' }}
                      >
                        <i className="fab fa-github" style={{ marginRight: '8px' }}></i>
                        GitHub
                      </a>
                    )}

                    {data.product.documentationUrl && (
                      <a 
                        href={data.product.documentationUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-main btn-fullwidth btn-white"
                        style={{ border: '2px solid #f5a623', color: '#f5a623' }}
                      >
                        <i className="fa fa-book" style={{ marginRight: '8px' }}></i>
                        Documentation
                      </a>
                    )}
                  </div>
                </div>

                <div className="spacer-30"></div>

                <Link 
                  href="/saas-products" 
                  className="btn-main btn-fullwidth btn-white wow fadeInUp"
                  style={{ border: '2px solid #ddd', color: '#333' }}
                >
                  <i className="fa fa-arrow-left" style={{ marginRight: '8px' }}></i>
                  Back to Products
                </Link>
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
