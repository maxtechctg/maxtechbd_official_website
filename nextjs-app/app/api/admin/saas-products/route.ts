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
        title: data.title,
        slug: data.slug,
        tagline: data.tagline || null,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription || null,
        mainImage: data.mainImage || null,
        features: data.features || null,
        techStack: data.techStack || null,
        liveDemoUrl: data.liveDemoUrl || null,
        githubUrl: data.githubUrl || null,
        documentationUrl: data.documentationUrl || null,
        order: data.order || 0,
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
