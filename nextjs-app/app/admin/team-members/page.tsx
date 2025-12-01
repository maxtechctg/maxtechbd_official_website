import prisma from '@/lib/prisma';
import Link from 'next/link';
import { DeleteButton } from '@/components/admin/AdminCrud';
export const dynamic = 'force-dynamic';

export default async function TeamMembersPage() {
  const items = await prisma.teamMember.findMany({ orderBy: { order: 'asc' } });
  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Team Members</h1>
        <Link href="/admin/team-members/new" className="admin-btn admin-btn-primary">Add Member</Link>
      </div>
      <div className="admin-card">
        {items.length === 0 ? (
          <p className="admin-empty">No team members found.</p>
        ) : (
          <table className="admin-table">
            <thead><tr><th>Order</th><th>Image</th><th>Name</th><th>Role</th><th>Active</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.order}</td>
                  <td>{item.image && <img src={item.image} alt="" />}</td>
                  <td>{item.name}</td>
                  <td>{item.role}</td>
                  <td><span className={`badge ${item.isActive ? 'badge-success' : 'badge-danger'}`}>{item.isActive ? 'Yes' : 'No'}</span></td>
                  <td>
                    <div className="admin-actions">
                      <Link href={`/admin/team-members/${item.id}`} className="admin-btn admin-btn-secondary admin-btn-sm">Edit</Link>
                      <DeleteButton apiEndpoint={`/api/admin/team-members/${item.id}`} itemName="member" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
