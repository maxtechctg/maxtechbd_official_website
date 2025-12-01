import prisma from '@/lib/prisma';
import Link from 'next/link';
import { DeleteButton } from '@/components/admin/AdminCrud';

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } });

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Services</h1>
        <Link href="/admin/services/new" className="admin-btn admin-btn-primary">
          Add Service
        </Link>
      </div>

      <div className="admin-card">
        {services.length === 0 ? (
          <p className="admin-empty">No services found. Create one to get started.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Icon</th>
                <th>Title</th>
                <th>Description</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td>{service.order}</td>
                  <td>{service.icon && <img src={service.icon} alt="" />}</td>
                  <td>{service.title}</td>
                  <td className="truncate">{service.description}</td>
                  <td>
                    <span className={`badge ${service.isActive ? 'badge-success' : 'badge-danger'}`}>
                      {service.isActive ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td>
                    <div className="admin-actions">
                      <Link href={`/admin/services/${service.id}`} className="admin-btn admin-btn-secondary admin-btn-sm">
                        Edit
                      </Link>
                      <DeleteButton apiEndpoint={`/api/admin/services/${service.id}`} itemName="service" />
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
