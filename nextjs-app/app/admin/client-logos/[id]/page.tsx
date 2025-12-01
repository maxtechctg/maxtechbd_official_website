import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditForm from './EditForm';
export const dynamic = 'force-dynamic';
export default async function EditClientLogoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.clientLogo.findUnique({ where: { id: parseInt(id) } });
  if (!item) notFound();
  return <EditForm item={item} />;
}
