import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const item = await prisma.visionSection.findFirst();
  return NextResponse.json(item);
}

export async function PUT(request: NextRequest) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await request.json();
  const existing = await prisma.visionSection.findFirst();
  let item;
  if (existing) {
    item = await prisma.visionSection.update({ where: { id: existing.id }, data });
  } else {
    item = await prisma.visionSection.create({ data });
  }
  return NextResponse.json(item);
}
