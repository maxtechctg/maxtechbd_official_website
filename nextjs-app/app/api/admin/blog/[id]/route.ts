import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';
import { marked } from 'marked';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const post = await prisma.blogPost.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const id = parseInt(params.id);

    if (!data.title || !data.slug) {
      return NextResponse.json(
        { error: 'Title and slug are required' },
        { status: 400 }
      );
    }

    const existing = await prisma.blogPost.findFirst({
      where: {
        slug: data.slug,
        NOT: { id },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Another post with this slug already exists' },
        { status: 400 }
      );
    }

    let htmlContent = data.htmlContent || null;
    if (!htmlContent && data.markdownContent) {
      htmlContent = await marked(data.markdownContent);
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        title: data.title.trim(),
        slug: data.slug.trim().toLowerCase(),
        category: data.category?.trim() || null,
        markdownContent: data.markdownContent || null,
        htmlContent,
        featuredImage: data.featuredImage?.trim() || null,
        active: data.active ?? true,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
        metaDescription: data.metaDescription?.trim() || null,
        tags: data.tags?.trim() || null,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await prisma.blogPost.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
