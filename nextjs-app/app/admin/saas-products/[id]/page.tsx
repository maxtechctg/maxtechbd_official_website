import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditForm from './EditForm';

export const dynamic = 'force-dynamic';

export default async function EditSaaSProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await prisma.saaSProduct.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!product) {
    notFound();
  }

  return <EditForm item={product} />;
}
