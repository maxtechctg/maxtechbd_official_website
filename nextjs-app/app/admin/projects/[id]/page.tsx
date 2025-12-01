import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditForm from './EditForm';
export const dynamic = 'force-dynamic';
export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.project.findUnique({ where: { id: parseInt(id) } });
  if (!item) notFound();
  return <EditForm item={item} />;
}
