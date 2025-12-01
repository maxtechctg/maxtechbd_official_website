import prisma from '@/lib/prisma';
import Link from 'next/link';
import { DeleteButton } from '@/components/admin/AdminCrud';
export const dynamic = 'force-dynamic';

export default async function FooterLinksPage() {
  const items = await prisma.footerLink.findMany({ orderBy: { order: 'asc' } });
  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Footer Links</h1>
        <Link href="/admin/footer-links/new" className="admin-btn admin-btn-primary">Add Link</Link>
      </div>
      <div className="admin-card">
        {items.length === 0 ? (<p className="admin-empty">No footer links found.</p>) : (
          <table className="admin-table">
            <thead><tr><th>Order</th><th>Category</th><th>Label</th><th>URL</th><th>Active</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.order}</td>
                  <td>{item.category}</td>
                  <td>{item.label}</td>
                  <td className="truncate">{item.url}</td>
                  <td><span className={`badge ${item.isActive ? 'badge-success' : 'badge-danger'}`}>{item.isActive ? 'Yes' : 'No'}</span></td>
                  <td><div className="admin-actions"><Link href={`/admin/footer-links/${item.id}`} className="admin-btn admin-btn-secondary admin-btn-sm">Edit</Link><DeleteButton apiEndpoint={`/api/admin/footer-links/${item.id}`} itemName="link" /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
