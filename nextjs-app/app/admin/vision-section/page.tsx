import prisma from '@/lib/prisma';
import EditForm from './EditForm';
export const dynamic = 'force-dynamic';
export default async function VisionSectionPage() {
  const item = await prisma.visionSection.findFirst();
  return <EditForm item={item || {}} />;
}
