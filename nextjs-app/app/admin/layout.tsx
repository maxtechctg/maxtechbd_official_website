import { redirect } from 'next/navigation';
import { getAuthUser } from '@/lib/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';
import '@/app/admin/admin.css';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="admin-layout">
      <AdminSidebar userName={user.name} />
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
