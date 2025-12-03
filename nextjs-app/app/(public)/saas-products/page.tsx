import prisma from "@/lib/prisma";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import TabbedSaaSProducts from "@/components/TabbedSaaSProducts";

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

  const formattedProducts = data.products.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    tagline: p.tagline,
    shortDescription: p.shortDescription,
    longDescription: p.longDescription,
    mainImage: p.mainImage,
    bannerImage: p.bannerImage,
    features: p.features,
    rating: p.rating,
    totalUsers: p.totalUsers,
    keyFeatures: p.keyFeatures,
    pricingPlans: p.pricingPlans,
    parallaxTitle: p.parallaxTitle,
    parallaxDescription: p.parallaxDescription,
    parallaxImage: p.parallaxImage,
    demoVideoUrl: p.demoVideoUrl,
    featureCards: p.featureCards,
    clientReviews: p.clientReviews,
    liveDemoUrl: p.liveDemoUrl,
  }));

  return (
    <>
      <Header
        menuItems={data.menuItems}
        settings={headerSettings}
        transparent={true}
      />

      <div className="no-bottom no-top saas-products-page" id="content">
        <div id="top"></div>

        <PageHeader
          subtitle={data.pageContent?.subtitle || "Our Products"}
          title={data.pageContent?.title || "SaaS Products"}
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "SaaS Products" },
          ]}
        />

        <TabbedSaaSProducts products={formattedProducts} />
      </div>

      <Footer
        settings={footerSettings}
        socialLinks={data.socialLinks}
        footerLinks={data.footerLinks}
      />
    </>
  );
}
