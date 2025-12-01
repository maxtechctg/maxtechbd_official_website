import prisma from '@/lib/prisma';
import Link from 'next/link';
import { DeleteButton } from '@/components/admin/AdminCrud';

export const dynamic = 'force-dynamic';

export default async function SaaSProductsPage() {
  const products = await prisma.saaSProduct.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">SaaS Products</h1>
        <Link href="/admin/saas-products/new" className="admin-btn admin-btn-primary">
          Add Product
        </Link>
      </div>

      <div className="admin-card">
        {products.length === 0 ? (
          <div className="admin-empty">No SaaS products yet. Create your first one!</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    {product.mainImage && (
                      <img src={product.mainImage} alt={product.title} />
                    )}
                  </td>
                  <td>{product.title}</td>
                  <td className="truncate">{product.slug}</td>
                  <td>
                    <span className={`badge ${product.isActive ? 'badge-success' : 'badge-danger'}`}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{product.order}</td>
                  <td>
                    <div className="admin-actions">
                      <Link
                        href={`/admin/saas-products/${product.id}`}
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                      >
                        Edit
                      </Link>
                      <DeleteButton
                        apiEndpoint={`/api/admin/saas-products/${product.id}`}
                        itemName="product"
                      />
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
