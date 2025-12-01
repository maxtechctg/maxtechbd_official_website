import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const items = await prisma.newsPost.findMany({ orderBy: { publishedAt: 'desc' } });
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await request.json();
  if (data.publishedAt) data.publishedAt = new Date(data.publishedAt);
  const item = await prisma.newsPost.create({ data });
  return NextResponse.json(item);
}
