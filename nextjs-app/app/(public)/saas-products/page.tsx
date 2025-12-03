import prisma from "@/lib/prisma";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getData() {
  const [settings, menuItems, products, socialLinks, footerLinks, pageContent] =
    await Promise.all([
      prisma.siteSettings.findFirst(),
      prisma.menuItem.findMany({
        where: { parentId: null },
        include: { children: true },
        orderBy: { order: "asc" },
      }),
      prisma.saaSProduct.findMany({
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
      prisma.pageContent.findFirst({ where: { pageSlug: "saas-products" } }),
    ]);

  return {
    settings,
    menuItems,
    products,
    socialLinks,
    footerLinks,
    pageContent,
  };
}

export default async function SaaSProductsPage() {
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
          subtitle={data.pageContent?.subtitle || "Our Products"}
          title={data.pageContent?.title || "SaaS Products"}
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "SaaS Products" },
          ]}
        />

        <section className="no-top">
          <div className="container">
            <div className="row g-4">
              {data.products.length === 0 ? (
                <div className="col-12 text-center">
                  <p>No products available yet. Check back soon!</p>
                </div>
              ) : (
                data.products.map((product) => (
                  <div key={product.id} className="col-lg-4 col-md-6">
                    <div
                      className="de-item wow fadeInUp"
                      style={{
                        background: "#fff",
                        borderRadius: "20px",
                        overflow: "hidden",
                        boxShadow: "0 5px 30px rgba(0,0,0,0.08)",
                      }}
                    >
                      {/* <div
                        style={{
                          position: "relative",
                          paddingTop: "60%",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={product.mainImage || "/images/misc/empty.webp"}
                          alt={product.title}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div> */}
                      {/* <div style={{ padding: '25px' }}>
                        <h4 style={{ marginBottom: '10px' }}>{product.title}</h4>
                        {product.tagline && (
                          <p style={{ color: '#f5a623', fontSize: '14px', marginBottom: '10px' }}>
                            {product.tagline}
                          </p>
                        )}
                        <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
                          {product.shortDescription}
                        </p>
                        <Link 
                          href={`/saas-products/${product.slug}`}
                          className="btn-main"
                        >
                          View Details
                        </Link>
                      </div> */}
                    </div>
                  </div>
                ))
              )}
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
