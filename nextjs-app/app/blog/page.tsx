import prisma from '@/lib/prisma';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog - MaxTech',
  description: 'Read the latest insights, tips, and news about IT solutions, technology, and digital transformation.',
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { active: true, publishedAt: { not: null } },
    orderBy: { publishedAt: 'desc' },
  });

  const menuItems = await prisma.menuItem.findMany({
    where: { parentId: null },
    include: { children: { orderBy: { order: 'asc' } } },
    orderBy: { order: 'asc' },
  });

  const siteSettings = await prisma.siteSettings.findFirst();
  const socialLinks = await prisma.socialLink.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  });
  const footerLinks = await prisma.footerLink.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  });

  const pageContent = await prisma.pageContent.findUnique({
    where: { pageSlug: 'blog' },
  });

  return (
    <>
      <Header menuItems={menuItems} settings={siteSettings!} />
      <PageHeader 
        title={pageContent?.title || 'Our Blog'}
        subtitle={pageContent?.subtitle || 'Latest Insights'}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
        ]}
      />

      <section className="section-padding">
        <div className="container">
          {posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <h3>No blog posts yet</h3>
              <p style={{ color: '#6c757d' }}>Check back soon for the latest updates!</p>
            </div>
          ) : (
            <div className="row">
              {posts.map((post) => (
                <div key={post.id} className="col-lg-4 col-md-6" style={{ marginBottom: '2rem' }}>
                  <div style={{ 
                    background: '#fff', 
                    borderRadius: '12px', 
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    {post.featuredImage ? (
                      <Link href={`/blog/${post.slug}`}>
                        <img 
                          src={post.featuredImage} 
                          alt={post.title}
                          style={{ 
                            width: '100%', 
                            height: '200px', 
                            objectFit: 'cover'
                          }}
                        />
                      </Link>
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
                        <i className="fa fa-file-text-o"></i>
                      </div>
                    )}
                    <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {post.category && (
                          <span style={{ 
                            background: '#f5a623', 
                            color: '#fff', 
                            padding: '0.2rem 0.6rem', 
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: '500'
                          }}>
                            {post.category}
                          </span>
                        )}
                        {post.source === 'auto' && (
                          <span style={{ 
                            background: '#17a2b8', 
                            color: '#fff', 
                            padding: '0.2rem 0.5rem', 
                            borderRadius: '4px',
                            fontSize: '0.7rem'
                          }}>
                            AI
                          </span>
                        )}
                      </div>
                      <h4 style={{ marginBottom: '0.75rem', fontSize: '1.15rem', lineHeight: '1.4' }}>
                        <Link href={`/blog/${post.slug}`} style={{ color: '#0a0f1a', textDecoration: 'none' }}>
                          {post.title}
                        </Link>
                      </h4>
                      {post.metaDescription && (
                        <p style={{ color: '#6c757d', fontSize: '0.9rem', marginBottom: '1rem', flex: 1 }}>
                          {post.metaDescription.length > 100 
                            ? post.metaDescription.substring(0, 100) + '...' 
                            : post.metaDescription}
                        </p>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                        <span style={{ color: '#adb5bd', fontSize: '0.8rem' }}>
                          {post.publishedAt && new Date(post.publishedAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                        <Link href={`/blog/${post.slug}`} style={{ color: '#f5a623', fontSize: '0.85rem', fontWeight: '500' }}>
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer settings={siteSettings!} socialLinks={socialLinks} footerLinks={footerLinks} />
    </>
  );
}
