import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const products = await prisma.saaSProduct.findMany({
    orderBy: { order: 'asc' },
  });
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    
    if (!data.title || !data.slug || !data.shortDescription) {
      return NextResponse.json(
        { error: 'Title, slug, and short description are required' },
        { status: 400 }
      );
    }

    const existing = await prisma.saaSProduct.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'A product with this slug already exists' },
        { status: 400 }
      );
    }

    const product = await prisma.saaSProduct.create({
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
    console.error('Error creating SaaS product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
