import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug, active: true },
  });

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.metaDescription || post.title,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug, active: true },
  });

  if (!post) {
    notFound();
  }

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

  const tags = post.tags ? post.tags.split(',').map(t => t.trim()) : [];

  return (
    <>
      <Header menuItems={menuItems} settings={siteSettings!} />
      <PageHeader 
        title={post.title}
        subtitle={post.category || 'Blog'}
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: post.title, href: `/blog/${post.slug}` },
        ]}
      />

      <section className="section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {post.featuredImage && (
                <div style={{ marginBottom: '2rem', borderRadius: '12px', overflow: 'hidden' }}>
                  <img 
                    src={post.featuredImage} 
                    alt={post.title}
                    style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover' }}
                  />
                </div>
              )}

              <div style={{ marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                {post.category && (
                  <span style={{ 
                    background: '#f5a623', 
                    color: '#fff', 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    fontWeight: '500'
                  }}>
                    {post.category}
                  </span>
                )}
                {post.publishedAt && (
                  <span style={{ color: '#6c757d', fontSize: '0.9rem' }}>
                    Published: {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                )}
                {post.source === 'auto' && (
                  <span style={{ 
                    background: '#17a2b8', 
                    color: '#fff', 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '4px',
                    fontSize: '0.75rem'
                  }}>
                    AI Generated
                  </span>
                )}
              </div>

              <article 
                className="blog-content"
                style={{ 
                  fontSize: '1.1rem', 
                  lineHeight: '1.8',
                  color: '#333'
                }}
                dangerouslySetInnerHTML={{ __html: post.htmlContent || '' }}
              />

              {tags.length > 0 && (
                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #e9ecef' }}>
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
            </div>
          </div>
        </div>
      </section>

      <Footer settings={siteSettings!} socialLinks={socialLinks} footerLinks={footerLinks} />
    </>
  );
}
