import prisma from '@/lib/prisma';
import Link from 'next/link';
import { DeleteButton } from '@/components/admin/AdminCrud';
export const dynamic = 'force-dynamic';

export default async function TimelineMilestonesPage() {
  const items = await prisma.timelineMilestone.findMany({ orderBy: { order: 'asc' } });
  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Timeline Milestones</h1>
        <Link href="/admin/timeline-milestones/new" className="admin-btn admin-btn-primary">Add Milestone</Link>
      </div>
      <div className="admin-card">
        {items.length === 0 ? (<p className="admin-empty">No timeline milestones found.</p>) : (
          <table className="admin-table">
            <thead><tr><th>Order</th><th>Year</th><th>Title</th><th>Active</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.order}</td>
                  <td>{item.year}</td>
                  <td>{item.title}</td>
                  <td><span className={`badge ${item.isActive ? 'badge-success' : 'badge-danger'}`}>{item.isActive ? 'Yes' : 'No'}</span></td>
                  <td><div className="admin-actions"><Link href={`/admin/timeline-milestones/${item.id}`} className="admin-btn admin-btn-secondary admin-btn-sm">Edit</Link><DeleteButton apiEndpoint={`/api/admin/timeline-milestones/${item.id}`} itemName="milestone" /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
