import prisma from '@/lib/prisma';
import Link from 'next/link';
import { DeleteButton } from '@/components/admin/AdminCrud';
import PortfolioBannerUpload from '@/components/admin/PortfolioBannerUpload';
export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const items = await prisma.project.findMany({ orderBy: { order: 'asc' } });
  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Projects / Case Studies</h1>
        <Link href="/admin/projects/new" className="admin-btn admin-btn-primary">Add Project</Link>
      </div>
      
      <PortfolioBannerUpload />
      
      <div className="admin-card">
        {items.length === 0 ? (
          <p className="admin-empty">No projects found.</p>
        ) : (
          <table className="admin-table">
            <thead><tr><th>Order</th><th>Image</th><th>Title</th><th>Category</th><th>Active</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.order}</td>
                  <td>{item.image && <img src={item.image} alt="" />}</td>
                  <td>{item.title}</td>
                  <td>{item.category}</td>
                  <td><span className={`badge ${item.isActive ? 'badge-success' : 'badge-danger'}`}>{item.isActive ? 'Yes' : 'No'}</span></td>
                  <td>
                    <div className="admin-actions">
                      <Link href={`/admin/projects/${item.id}`} className="admin-btn admin-btn-secondary admin-btn-sm">Edit</Link>
                      <DeleteButton apiEndpoint={`/api/admin/projects/${item.id}`} itemName="project" />
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
