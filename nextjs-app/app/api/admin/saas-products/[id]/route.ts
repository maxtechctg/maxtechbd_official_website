import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const product = await prisma.saaSProduct.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
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

    if (!data.title || !data.slug || !data.shortDescription) {
      return NextResponse.json(
        { error: 'Title, slug, and short description are required' },
        { status: 400 }
      );
    }

    const existing = await prisma.saaSProduct.findFirst({
      where: {
        slug: data.slug,
        NOT: { id },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Another product with this slug already exists' },
        { status: 400 }
      );
    }

    const product = await prisma.saaSProduct.update({
      where: { id },
      data: {
        title: data.title.trim(),
        slug: data.slug.trim().toLowerCase(),
        tagline: data.tagline?.trim() || null,
        shortDescription: data.shortDescription.trim(),
        longDescription: data.longDescription?.trim() || null,
        mainImage: data.mainImage?.trim() || null,
        features: data.features?.trim() || null,
        techStack: data.techStack?.trim() || null,
        liveDemoUrl: data.liveDemoUrl?.trim() || null,
        githubUrl: data.githubUrl?.trim() || null,
        documentationUrl: data.documentationUrl?.trim() || null,
        order: parseInt(String(data.order)) || 0,
        isActive: data.isActive ?? true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating SaaS product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
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
    await prisma.saaSProduct.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting SaaS product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
