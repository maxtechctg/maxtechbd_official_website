import prisma from '@/lib/prisma';
import Link from 'next/link';
import { DeleteButton } from '@/components/admin/AdminCrud';
export const dynamic = 'force-dynamic';

export default async function SocialLinksPage() {
  const items = await prisma.socialLink.findMany({ orderBy: { order: 'asc' } });
  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Social Links</h1>
        <Link href="/admin/social-links/new" className="admin-btn admin-btn-primary">Add Link</Link>
      </div>
      <div className="admin-card">
        {items.length === 0 ? (<p className="admin-empty">No social links found.</p>) : (
          <table className="admin-table">
            <thead><tr><th>Order</th><th>Platform</th><th>URL</th><th>Icon</th><th>Active</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.order}</td>
                  <td>{item.platform}</td>
                  <td className="truncate">{item.url}</td>
                  <td>{item.icon}</td>
                  <td><span className={`badge ${item.isActive ? 'badge-success' : 'badge-danger'}`}>{item.isActive ? 'Yes' : 'No'}</span></td>
                  <td><div className="admin-actions"><Link href={`/admin/social-links/${item.id}`} className="admin-btn admin-btn-secondary admin-btn-sm">Edit</Link><DeleteButton apiEndpoint={`/api/admin/social-links/${item.id}`} itemName="link" /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
