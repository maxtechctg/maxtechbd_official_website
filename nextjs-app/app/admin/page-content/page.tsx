import prisma from '@/lib/prisma';
import Link from 'next/link';
import { DeleteButton } from '@/components/admin/AdminCrud';
export const dynamic = 'force-dynamic';

export default async function PageContentPage() {
  const items = await prisma.pageContent.findMany({ orderBy: { pageSlug: 'asc' } });
  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Page Content</h1>
        <Link href="/admin/page-content/new" className="admin-btn admin-btn-primary">Add Page</Link>
      </div>
      <div className="admin-card">
        {items.length === 0 ? (<p className="admin-empty">No page content found.</p>) : (
          <table className="admin-table">
            <thead><tr><th>Page Slug</th><th>Title</th><th>Subtitle</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.pageSlug}</td>
                  <td>{item.title}</td>
                  <td>{item.subtitle}</td>
                  <td><div className="admin-actions"><Link href={`/admin/page-content/${item.id}`} className="admin-btn admin-btn-secondary admin-btn-sm">Edit</Link><DeleteButton apiEndpoint={`/api/admin/page-content/${item.id}`} itemName="page" /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
