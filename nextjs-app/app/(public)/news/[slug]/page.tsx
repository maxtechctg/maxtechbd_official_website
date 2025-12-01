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
    prisma.newsPost.findFirst({
      where: { slug, isActive: true },
    }),
    prisma.newsPost.findMany({
      where: { isActive: true },
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

const popularTags = [
  'Art', 'Application', 'Design', 'Entertainment', 
  'Internet', 'Marketing', 'Multipurpose', 'Music',
  'Print', 'Programming', 'Responsive', 'Website'
];

export default async function NewsPostPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getData(slug);

  if (!data.post) {
    notFound();
  }

  const headerSettings = {
    logoUrl: data.settings?.logoUrl || null,
    logoMobileUrl: data.settings?.logoMobileUrl || null,
    phone: data.settings?.phone || null,
  };

  const footerSettings = {
    logoUrl: data.settings?.logoUrl || null,
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

        <section className="mt60">
          <div className="container">
            <div className="row gx-5 align-items-center">
              <div className="col-lg-6">
                <div className="subtitle s2 wow fadeInUp mb-3">Latest News</div>
                <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">{data.post.title}</h2>
                <ul className="crumb">
                  <li><Link href="/">Home</Link></li>
                  <li className="active">News</li>
                </ul>
                <div className="spacer-single"></div>
              </div>

              <div className="col-lg-6">
                <img 
                  src={data.post.image || '/images/news/1.webp'} 
                  className="img-fluid rounded-30" 
                  alt={data.post.title} 
                />
              </div>
            </div>
          </div>
        </section>

        <section className="no-top">
          <div className="container">
            <div className="row gx-5">
              <div className="col-lg-8">
                <div className="blog-read">
                  <div className="post-text" dangerouslySetInnerHTML={{ __html: data.post.content || '' }} />
                </div>

                <div className="spacer-single"></div>

                <div id="blog-comment">
                  <h4>Comments (0)</h4>
                  <div className="spacer-half"></div>
                  <p>No comments yet. Be the first to comment!</p>

                  <div className="spacer-single"></div>

                  <div id="comment-form-wrapper">
                    <h4>Leave a Comment</h4>
                    <div className="comment_form_holder">
                      <form id="contact_form" name="form1" className="form-border" method="post" action="#">
                        <label>Name</label>
                        <input type="text" name="name" id="name" className="form-control" />

                        <label>Email <span className="req">*</span></label>
                        <input type="text" name="email" id="email" className="form-control" />

                        <label>Message <span className="req">*</span></label>
                        <textarea cols={10} rows={10} name="message" id="message" className="form-control"></textarea>

                        <p id="btnsubmit">
                          <input type="submit" id="send" value="Send" className="btn-main" />
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="widget widget-post">
                  <h4>Recent Posts</h4>
                  <ul className="de-bloglist-type-1">
                    {data.recentPosts.map((recentPost) => (
                      <li key={recentPost.id}>
                        <div className="d-image">
                          <img src={recentPost.thumbnail || recentPost.image || ''} alt={recentPost.title} />
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
                
                <div className="widget widget_tags">
                  <h4>Popular Tags</h4>
                  <ul>
                    {popularTags.map((tag) => (
                      <li key={tag}>
                        <a href="#">{tag}</a>
                      </li>
                    ))}
                  </ul>
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
