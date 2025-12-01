import prisma from '@/lib/prisma';
import Link from 'next/link';
import { DeleteButton } from '@/components/admin/AdminCrud';

export const dynamic = 'force-dynamic';

export default async function HeroSlidesPage() {
  const items = await prisma.heroSlide.findMany({ orderBy: { order: 'asc' } });

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Hero Slides</h1>
        <Link href="/admin/hero-slides/new" className="admin-btn admin-btn-primary">Add Slide</Link>
      </div>
      <div className="admin-card">
        {items.length === 0 ? (
          <p className="admin-empty">No hero slides found.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Subtitle</th>
                <th>Title</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.order}</td>
                  <td>{item.subtitle}</td>
                  <td>{item.title}</td>
                  <td><span className={`badge ${item.isActive ? 'badge-success' : 'badge-danger'}`}>{item.isActive ? 'Yes' : 'No'}</span></td>
                  <td>
                    <div className="admin-actions">
                      <Link href={`/admin/hero-slides/${item.id}`} className="admin-btn admin-btn-secondary admin-btn-sm">Edit</Link>
                      <DeleteButton apiEndpoint={`/api/admin/hero-slides/${item.id}`} itemName="slide" />
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
