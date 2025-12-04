import prisma from "@/lib/prisma";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getData() {
  const [
    settings,
    menuItems,
    teamMembers,
    timelineMilestones,
    statCounters,
    visionSection,
    pageContent,
    teamContent,
    socialLinks,
    footerLinks,
  ] = await Promise.all([
    prisma.siteSettings.findFirst(),
    prisma.menuItem.findMany({
      where: { parentId: null },
      include: { children: true },
      orderBy: { order: "asc" },
    }),
    prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }),
    prisma.timelineMilestone.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }),
    prisma.statCounter.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    }),
    prisma.visionSection.findFirst(),
    prisma.pageContent.findFirst({ where: { pageSlug: "about" } }),
    prisma.pageContent.findFirst({ where: { pageSlug: "about-team" } }),
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
    teamMembers,
    timelineMilestones,
    statCounters,
    visionSection,
    pageContent,
    teamContent,
    socialLinks,
    footerLinks,
  };
}

export default async function AboutPage() {
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
          subtitle={data.pageContent?.subtitle || ""}
          title={data.pageContent?.title || ""}
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: data.pageContent?.subtitle || "About Us" },
          ]}
          backgroundImage="/images/background/4.webp"
          hasParallax={true}
        />

        <section className="no-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                <div className="site-timeline-content">
                  {data.timelineMilestones.map((item, index) => {
                    const images = item.images ? item.images.split("|") : [];
                    return (
                      <div
                        key={item.id}
                        className={`de-timeline-article ${index % 2 === 0 ? "odd" : "even"}`}
                      >
                        <div className="site-center-line"></div>

                        {index % 2 === 0 ? (
                          <>
                            <div className="content-left-container">
                              <div className="owl-single-dots owl-carousel owl-theme">
                                {images.map((img, imgIndex) => (
                                  <div key={imgIndex} className="item">
                                    <img src={img} alt={item.title} />
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="content-right-container">
                              <div className="year__">
                                <div className="d-line"></div>
                                <h4 className="de-timeline-year">
                                  {item.year}
                                </h4>
                              </div>
                              <div className="content-right">
                                <h3 className="de-timeline-title">
                                  {item.title}
                                </h3>
                                <p>{item.description}</p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="content-left-container">
                              <div className="year__">
                                <div className="d-line"></div>
                                <h4 className="de-timeline-year">
                                  {item.year}
                                </h4>
                              </div>
                              <div className="content-right">
                                <h3 className="de-timeline-title">
                                  {item.title}
                                </h3>
                                <p>{item.description}</p>
                              </div>
                            </div>
                            <div className="content-right-container">
                              <div className="owl-single-dots owl-carousel owl-theme">
                                {images.map((img, imgIndex) => (
                                  <div key={imgIndex} className="item">
                                    <img src={img} alt={item.title} />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </>
                        )}

                        <div className="meta-dot"></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-dark-1 text-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="subtitle s2 wow fadeInUp mb-3">
                  {data.teamContent?.subtitle || ""}
                </div>
                <h2 className="wow fadeInUp" data-wow-delay=".2s">
                  {data.teamContent?.title || ""}
                </h2>
              </div>
            </div>
            <div className="row">
              {data.teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="col-lg-3 col-md-6 text-center mb-sm-20"
                >
                  <div className="bg-dark-3 rounded-30 mb20">
                    <img
                      src={member.image}
                      className="img-fluid"
                      alt={member.name}
                    />
                  </div>
                  <h4 className="mb-0">{member.name}</h4>
                  <div>{member.role}</div>
                  <div className="social-icons s2 mt-2">
                    {member.facebook && (
                      <a href={member.facebook}>
                        <i className="fa-brands fa-facebook-f"></i>
                      </a>
                    )}
                    {member.twitter && (
                      <a href={member.twitter}>
                        <i className="fa-brands fa-twitter"></i>
                      </a>
                    )}
                    {member.discord && (
                      <a href={member.discord}>
                        <i className="fa-brands fa-discord"></i>
                      </a>
                    )}
                    {member.instagram && (
                      <a href={member.instagram}>
                        <i className="fa-brands fa-instagram"></i>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="row">
              {data.statCounters.map((stat) => (
                <div
                  key={stat.id}
                  className="col-lg-3 col-md-6 mb-sm-20 position-relative"
                >
                  <div className="de_count wow fadeInUp">
                    <h3>
                      <span
                        className="timer"
                        data-to={stat.value}
                        data-speed="3000"
                      ></span>
                      {stat.suffix || ""}
                    </h3>
                    <h4>{stat.label}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="no-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="padding60 sm-padding40 rounded-30 jarallax text-light">
                  <img
                    src={
                      data.visionSection?.backgroundImage ||
                      "/images/background/2.webp"
                    }
                    className="jarallax-img"
                    alt=""
                  />
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="subtitle s2 wow fadeInUp mb-3">
                        {data.visionSection?.subtitle || "Our Vision"}
                      </div>
                      <h2
                        className="mb20 wow fadeInUp"
                        data-wow-delay=".2s"
                        style={{
                          lineHeight: "2.4",
                          letterSpacing: "2px",
                        }}
                      >
                        {data.visionSection?.heading ||
                          "We aspire to create a digital landscape where technology seamlessly enhances productivity, connectivity, and sustainability, fostering a brighter, more efficient, and inclusive future for all."}
                      </h2>

                      <a
                        className="btn-main"
                        href={data.visionSection?.buttonUrl || "/contact"}
                      >
                        {data.visionSection?.buttonText ||
                          "Let's Work Together"}
                      </a>
                    </div>
                  </div>
                </div>
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
