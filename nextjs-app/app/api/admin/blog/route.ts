import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { marked } from 'marked';

export async function GET() {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    
    if (!data.title || !data.slug) {
      return NextResponse.json(
        { error: 'Title and slug are required' },
        { status: 400 }
      );
    }

    const existing = await prisma.blogPost.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 400 }
      );
    }

    let htmlContent = data.htmlContent || null;
    if (!htmlContent && data.markdownContent) {
      htmlContent = await marked(data.markdownContent);
    }

    const post = await prisma.blogPost.create({
      data: {
        title: data.title.trim(),
        slug: data.slug.trim().toLowerCase(),
        category: data.category?.trim() || null,
        markdownContent: data.markdownContent || null,
        htmlContent,
        source: data.source || 'manual',
        featuredImage: data.featuredImage?.trim() || null,
        active: data.active ?? true,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
        metaDescription: data.metaDescription?.trim() || null,
        tags: data.tags?.trim() || null,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
