import prisma from "@/lib/prisma";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getData() {
  const [
    settings,
    menuItems,
    projects,
    testimonials,
    socialLinks,
    footerLinks,
  ] = await Promise.all([
    prisma.siteSettings.findFirst(),
    prisma.menuItem.findMany({
      where: { parentId: null },
      include: { children: true },
      orderBy: { order: "asc" },
    }),
    prisma.project.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }),
    prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }),
    prisma.socialLink.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }),
    prisma.footerLink.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }),
  ]);

  return {
    settings,
    menuItems,
    projects,
    testimonials,
    socialLinks,
    footerLinks,
  };
}

export default async function PortfolioPage() {
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

  const portfolioBannerImage = data.settings?.portfolioBannerImage || null;

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
          subtitle="Work with us"
          title="Study Case"
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Study Case" }]}
          backgroundImage={portfolioBannerImage || undefined}
          hasParallax={!!portfolioBannerImage}
        />

        <section className="no-top" style={{ marginTop: "120px" }}>
          <div className="container">
            <div className="row g-4 sequence">
              {data.projects.map((project) => (
                <div
                  key={project.id}
                  className="col-lg-4 col-sm-6 gallery-item"
                >
                  <div className="de-item wow">
                    <div className="d-overlay">
                      <div className="d-label">
                        {project.category || "IT Support"}
                      </div>
                      <div className="d-text">
                        <h4>{project.title}</h4>
                        <Link
                          className="btn-main btn-fullwidth btn-white"
                          href={`/portfolio/${project.slug}`}
                        >
                          Project Overview
                        </Link>
                      </div>
                    </div>
                    <img
                      src={project.image || ""}
                      className="img-fluid"
                      alt={project.title}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-dark-2 text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="subtitle s2 mb20">Customer reviews</div>
                <h2 className="wow fadeInUp">4.85 out of 5</h2>
                <div className="spacer-20"></div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div
                className="owl-carousel owl-theme wow fadeInUp"
                id="testimonial-carousel"
              >
                {data.testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="item">
                    <div className="de_testi s2">
                      <blockquote>
                        <div className="de_testi_by">
                          <img alt="" src={testimonial.authorImage || ""} />
                          <div>
                            {testimonial.authorName}
                            <span>{testimonial.authorRole}</span>
                          </div>
                        </div>
                        <p>&quot;{testimonial.quote}&quot;</p>
                        <div className="de-rating-ext">
                          <span className="d-stars">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <i key={i} className="fa fa-star"></i>
                            ))}
                          </span>
                        </div>
                      </blockquote>
                    </div>
                  </div>
                ))}
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
