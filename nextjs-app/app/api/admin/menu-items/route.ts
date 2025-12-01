import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const items = await prisma.menuItem.findMany({ orderBy: { order: 'asc' }, include: { parent: true } });
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await request.json();
  if (data.parentId === '') data.parentId = null;
  const item = await prisma.menuItem.create({ data });
  return NextResponse.json(item);
}
