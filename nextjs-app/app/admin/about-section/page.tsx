import prisma from '@/lib/prisma';
import EditForm from './EditForm';
export const dynamic = 'force-dynamic';
export default async function AboutSectionPage() {
  const item = await prisma.aboutSection.findFirst();
  return <EditForm item={item || {}} />;
}
