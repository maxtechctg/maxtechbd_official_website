import prisma from '@/lib/prisma';
import Link from 'next/link';
import { DeleteButton } from '@/components/admin/AdminCrud';
export const dynamic = 'force-dynamic';

export default async function StatCountersPage() {
  const items = await prisma.statCounter.findMany({ orderBy: { order: 'asc' } });
  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Stat Counters</h1>
        <Link href="/admin/stat-counters/new" className="admin-btn admin-btn-primary">Add Counter</Link>
      </div>
      <div className="admin-card">
        {items.length === 0 ? (<p className="admin-empty">No stat counters found.</p>) : (
          <table className="admin-table">
            <thead><tr><th>Order</th><th>Value</th><th>Suffix</th><th>Label</th><th>Active</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.order}</td>
                  <td>{item.value}</td>
                  <td>{item.suffix || '-'}</td>
                  <td>{item.label}</td>
                  <td><span className={`badge ${item.isActive ? 'badge-success' : 'badge-danger'}`}>{item.isActive ? 'Yes' : 'No'}</span></td>
                  <td><div className="admin-actions"><Link href={`/admin/stat-counters/${item.id}`} className="admin-btn admin-btn-secondary admin-btn-sm">Edit</Link><DeleteButton apiEndpoint={`/api/admin/stat-counters/${item.id}`} itemName="counter" /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
