import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditServiceForm from './EditForm';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditServicePage({ params }: PageProps) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id: parseInt(id) } });

  if (!service) {
    notFound();
  }

  return <EditServiceForm service={service} />;
}
