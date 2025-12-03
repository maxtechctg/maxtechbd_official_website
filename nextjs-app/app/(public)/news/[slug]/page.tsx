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
    post,
    recentPosts,
    socialLinks,
    footerLinks,
  ] = await Promise.all([
    prisma.siteSettings.findFirst(),
    prisma.menuItem.findMany({
      where: { parentId: null },
      include: { children: true },
      orderBy: { order: 'asc' },
    }),
    prisma.blogPost.findFirst({
      where: { slug, active: true },
    }),
    prisma.blogPost.findMany({
      where: { active: true, publishedAt: { not: null } },
      orderBy: { publishedAt: 'desc' },
      take: 4,
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
    post,
    recentPosts,
    socialLinks,
    footerLinks,
  };
}

export default async function NewsPostPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getData(slug);

  if (!data.post) {
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

  const tags = data.post.tags ? data.post.tags.split(',').map(t => t.trim()) : [];

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
                <div className="subtitle s2 wow fadeInUp mb-3">{data.post.category || 'Latest News'}</div>
                <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">{data.post.title}</h2>
                <ul className="crumb">
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/news">News</Link></li>
                  <li className="active">{data.post.title}</li>
                </ul>
                <div className="spacer-single"></div>
              </div>

              <div className="col-lg-6">
                {data.post.featuredImage ? (
                  <img 
                    src={data.post.featuredImage} 
                    className="img-fluid rounded-30" 
                    alt={data.post.title} 
                  />
                ) : (
                  <div style={{ 
                    width: '100%', 
                    height: '300px', 
                    background: 'linear-gradient(135deg, #0a0f1a 0%, #1a2744 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#f5a623',
                    fontSize: '4rem',
                    borderRadius: '30px'
                  }}>
                    <i className="fa fa-newspaper-o"></i>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="no-top">
          <div className="container">
            <div className="row gx-5">
              <div className="col-lg-8">
                <div className="blog-read">
                  <div className="d-flex gap-3 mb-4">
                    {data.post.publishedAt && (
                      <span style={{ color: '#6c757d', fontSize: '0.9rem' }}>
                        {data.post.publishedAt.toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    )}
                    {data.post.source === 'auto' && (
                      <span style={{ 
                        background: '#17a2b8', 
                        color: '#fff', 
                        padding: '0.2rem 0.6rem', 
                        borderRadius: '4px',
                        fontSize: '0.75rem'
                      }}>
                        AI Generated
                      </span>
                    )}
                  </div>
                  <div 
                    className="post-text blog-content" 
                    dangerouslySetInnerHTML={{ __html: data.post.htmlContent || '' }} 
                  />
                </div>

                {tags.length > 0 && (
                  <div className="mt-4 pt-4" style={{ borderTop: '1px solid #e9ecef' }}>
                    <strong>Tags: </strong>
                    {tags.map((tag, index) => (
                      <span 
                        key={index}
                        style={{ 
                          display: 'inline-block',
                          background: '#f8f9fa', 
                          padding: '0.25rem 0.75rem', 
                          borderRadius: '20px',
                          margin: '0.25rem',
                          fontSize: '0.85rem',
                          color: '#495057'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="spacer-single"></div>
              </div>

              <div className="col-lg-4">
                <div className="widget widget-post">
                  <h4>Recent Posts</h4>
                  <ul className="de-bloglist-type-1">
                    {data.recentPosts.filter(p => p.id !== data.post!.id).slice(0, 3).map((recentPost) => (
                      <li key={recentPost.id}>
                        <div className="d-image">
                          {recentPost.featuredImage ? (
                            <img src={recentPost.featuredImage} alt={recentPost.title} />
                          ) : (
                            <div style={{ 
                              width: '80px', 
                              height: '60px', 
                              background: '#1a2744',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#f5a623'
                            }}>
                              <i className="fa fa-newspaper-o"></i>
                            </div>
                          )}
                        </div>
                        <div className="d-content">
                          <Link href={`/news/${recentPost.slug}`}>
                            <h4>{recentPost.title}</h4>
                          </Link>
                          <div className="d-date">
                            {recentPost.publishedAt?.toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {tags.length > 0 && (
                  <div className="widget widget_tags">
                    <h4>Tags</h4>
                    <ul>
                      {tags.map((tag) => (
                        <li key={tag}>
                          <a href="#">{tag}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
