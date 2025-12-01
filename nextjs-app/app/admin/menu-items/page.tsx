import prisma from '@/lib/prisma';
import Link from 'next/link';
import { DeleteButton } from '@/components/admin/AdminCrud';
export const dynamic = 'force-dynamic';

export default async function MenuItemsPage() {
  const items = await prisma.menuItem.findMany({ orderBy: { order: 'asc' }, include: { parent: true } });
  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Menu Items</h1>
        <Link href="/admin/menu-items/new" className="admin-btn admin-btn-primary">Add Item</Link>
      </div>
      <div className="admin-card">
        {items.length === 0 ? (<p className="admin-empty">No menu items found.</p>) : (
          <table className="admin-table">
            <thead><tr><th>Order</th><th>Label</th><th>URL</th><th>Parent</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.order}</td>
                  <td>{item.label}</td>
                  <td>{item.href}</td>
                  <td>{item.parent?.label || '-'}</td>
                  <td><div className="admin-actions"><Link href={`/admin/menu-items/${item.id}`} className="admin-btn admin-btn-secondary admin-btn-sm">Edit</Link><DeleteButton apiEndpoint={`/api/admin/menu-items/${item.id}`} itemName="item" /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
