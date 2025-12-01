import prisma from '@/lib/prisma';
import Link from 'next/link';
import { DeleteButton } from '@/components/admin/AdminCrud';
export const dynamic = 'force-dynamic';

export default async function ClientLogosPage() {
  const items = await prisma.clientLogo.findMany({ orderBy: { order: 'asc' } });
  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Client Logos</h1>
        <Link href="/admin/client-logos/new" className="admin-btn admin-btn-primary">Add Logo</Link>
      </div>
      <div className="admin-card">
        {items.length === 0 ? (<p className="admin-empty">No client logos found.</p>) : (
          <table className="admin-table">
            <thead><tr><th>Order</th><th>Image</th><th>Name</th><th>URL</th><th>Active</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.order}</td>
                  <td>{item.image && <img src={item.image} alt="" />}</td>
                  <td>{item.name || 'N/A'}</td>
                  <td className="truncate">{item.url || 'N/A'}</td>
                  <td><span className={`badge ${item.isActive ? 'badge-success' : 'badge-danger'}`}>{item.isActive ? 'Yes' : 'No'}</span></td>
                  <td><div className="admin-actions"><Link href={`/admin/client-logos/${item.id}`} className="admin-btn admin-btn-secondary admin-btn-sm">Edit</Link><DeleteButton apiEndpoint={`/api/admin/client-logos/${item.id}`} itemName="logo" /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
