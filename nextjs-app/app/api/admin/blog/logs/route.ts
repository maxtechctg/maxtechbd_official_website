import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function GET() {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const logs = await prisma.blogGenerationLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
  });
  
  return NextResponse.json(logs);
}
