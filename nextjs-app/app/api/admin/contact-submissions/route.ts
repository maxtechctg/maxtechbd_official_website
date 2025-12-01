import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const items = await prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(items);
}
