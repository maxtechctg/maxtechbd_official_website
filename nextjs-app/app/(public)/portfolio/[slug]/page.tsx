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
    project,
    pageContent,
    socialLinks,
    footerLinks,
  ] = await Promise.all([
    prisma.siteSettings.findFirst(),
    prisma.menuItem.findMany({
      where: { parentId: null },
      include: { children: true },
      orderBy: { order: 'asc' },
    }),
    prisma.project.findFirst({
      where: { slug, isActive: true },
    }),
    prisma.pageContent.findFirst({ where: { pageSlug: 'portfolio' } }),
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
    project,
    pageContent,
    socialLinks,
    footerLinks,
  };
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getData(slug);

  if (!data.project) {
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

  const challenges = data.project.challenges 
    ? data.project.challenges.split('|') 
    : [];
  
  const solutions = data.project.solutions 
    ? data.project.solutions.split('|') 
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

        <section className="mt60">
          <div className="container">
            <div className="row gx-5 align-items-center">
              <div className="col-lg-6">
                <div className="subtitle s2 wow fadeInUp mb-3">{data.pageContent?.title || ''}</div>
                <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">{data.project.title}</h2>
                <ul className="crumb">
                  <li><Link href="/">Home</Link></li>
                  <li className="active">{data.pageContent?.title || ''}</li>
                </ul>
                <div className="spacer-single"></div>
              </div>

              <div className="col-lg-6">
                <img 
                  src={data.project.image || ''} 
                  className="img-fluid rounded-30" 
                  alt={data.project.title} 
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-dark-1 text-light">
          <div className="container">
            <div className="row gx-5 align-items-center">
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-6">
                    <img src="/images/study-case-single/2.webp" className="img-fluid rounded-10 wow zoomIn" alt="" />
                    <div className="spacer-single"></div>
                    <div className="col-6 offset-6">
                      <div className="de_count wow fadeInUp">
                        <h3>
                          <span className="timer" data-to={data.project.positiveFeedbacks || 0} data-speed="3000"></span>+
                        </h3>
                        <h4>Positive<br />feedbacks</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="spacer-double"></div>
                    <div className="col-6">
                      <div className="de_count wow fadeInUp">
                        <h3>
                          <span className="timer" data-to={data.project.turnoverIncrease || 0} data-speed="3000"></span>%
                        </h3>
                        <h4>Turnover<br />increased</h4>
                      </div>
                    </div>
                    <div className="spacer-10"></div>
                    <img src="/images/study-case-single/3.webp" className="img-fluid rounded-10 wow zoomIn" alt="" />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <h3>Overview</h3>
                <p>{data.project.overview || data.project.description || ''}</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="row g-5">
              <div className="col-lg-6 wow fadeInLeft">
                <div className="padding40 bg-grey rounded-30 h-100">
                  <h3>Challenges</h3>
                  <ol className="ol-style-1">
                    {challenges.map((challenge, index) => (
                      <li key={index}>{challenge}</li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="col-lg-6 wow fadeInRight">
                <div className="padding40 bg-color-2 rounded-30 h-100">
                  <h3>Solutions</h3>
                  <ol className="ol-style-1">
                    {solutions.map((solution, index) => (
                      <li key={index}>{solution}</li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="col-lg-8 wow fadeInLeft">
                <div className="padding60 sm-padding40 rounded-30 bg-color h-100 text-light">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="subtitle s2 wow fadeInUp mb-3">Testimonial</div>
                      <h2 className="mb20 wow fadeInUp" data-wow-delay=".2s">
                        &quot;{data.project.testimonialQuote || ''}&quot;
                      </h2>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 wow fadeInRight">
                <img src="/images/study-case-single/4.webp" className="img-fluid rounded-20" alt="" />
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
