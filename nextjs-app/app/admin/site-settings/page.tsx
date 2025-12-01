import prisma from '@/lib/prisma';
import EditForm from './EditForm';
export const dynamic = 'force-dynamic';

export default async function SiteSettingsPage() {
  const item = await prisma.siteSettings.findFirst();
  return <EditForm item={item || {}} />;
}
