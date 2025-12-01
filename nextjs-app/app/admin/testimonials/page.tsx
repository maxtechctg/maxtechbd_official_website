import prisma from '@/lib/prisma';
import Link from 'next/link';
import { DeleteButton } from '@/components/admin/AdminCrud';
export const dynamic = 'force-dynamic';

export default async function TestimonialsPage() {
  const items = await prisma.testimonial.findMany({ orderBy: { order: 'asc' } });
  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Testimonials</h1>
        <Link href="/admin/testimonials/new" className="admin-btn admin-btn-primary">Add Testimonial</Link>
      </div>
      <div className="admin-card">
        {items.length === 0 ? (
          <p className="admin-empty">No testimonials found.</p>
        ) : (
          <table className="admin-table">
            <thead><tr><th>Order</th><th>Image</th><th>Author</th><th>Role</th><th>Rating</th><th>Active</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.order}</td>
                  <td>{item.authorImage && <img src={item.authorImage} alt="" />}</td>
                  <td>{item.authorName}</td>
                  <td>{item.authorRole}</td>
                  <td>{item.rating}/5</td>
                  <td><span className={`badge ${item.isActive ? 'badge-success' : 'badge-danger'}`}>{item.isActive ? 'Yes' : 'No'}</span></td>
                  <td>
                    <div className="admin-actions">
                      <Link href={`/admin/testimonials/${item.id}`} className="admin-btn admin-btn-secondary admin-btn-sm">Edit</Link>
                      <DeleteButton apiEndpoint={`/api/admin/testimonials/${item.id}`} itemName="testimonial" />
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
