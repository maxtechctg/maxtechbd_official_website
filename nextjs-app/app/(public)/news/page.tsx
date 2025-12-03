import prisma from '@/lib/prisma';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getData() {
  const [
    settings,
    menuItems,
    blogPosts,
    socialLinks,
    footerLinks,
  ] = await Promise.all([
    prisma.siteSettings.findFirst(),
    prisma.menuItem.findMany({
      where: { parentId: null },
      include: { children: true },
      orderBy: { order: 'asc' },
    }),
    prisma.blogPost.findMany({
      where: { active: true, publishedAt: { not: null } },
      orderBy: { publishedAt: 'desc' },
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
    blogPosts,
    socialLinks,
    footerLinks,
  };
}

function formatDate(date: Date | null): string {
  if (!date) return '';
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

export default async function NewsPage() {
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
          subtitle="Latest News"
          title="Providing best IT solutions"
          breadcrumb={[
            { label: 'Home', href: '/' },
            { label: 'News' },
          ]}
        />

        <section className="no-top">
          <div className="container">
            <div className="row g-4">
              {data.blogPosts.map((post) => (
                <div key={post.id} className="col-lg-4 col-md-6 mb10">
                  <div className="bloglist item">
                    <div className="post-content">
                      <div className="post-image">
                        <div className="d-tagline">
                          {post.category && <span>{post.category}</span>}
                          {post.source === 'auto' && <span style={{ background: '#17a2b8' }}>AI</span>}
                        </div>
                        {post.featuredImage ? (
                          <img alt={post.title} src={post.featuredImage} className="lazy" />
                        ) : (
                          <div style={{ 
                            width: '100%', 
                            height: '200px', 
                            background: 'linear-gradient(135deg, #0a0f1a 0%, #1a2744 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#f5a623',
                            fontSize: '3rem'
                          }}>
                            <i className="fa fa-newspaper-o"></i>
                          </div>
                        )}
                      </div>
                      <div className="post-text">
                        <div className="d-date">{formatDate(post.publishedAt)}</div>
                        <h4>
                          <Link href={`/news/${post.slug}`}>{post.title}</Link>
                        </h4>
                        <p>{post.metaDescription || ''}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
