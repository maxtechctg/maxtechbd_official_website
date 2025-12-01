import prisma from '@/lib/prisma';
import Link from 'next/link';
import { DeleteButton } from '@/components/admin/AdminCrud';
export const dynamic = 'force-dynamic';

export default async function NewsPostsPage() {
  const items = await prisma.newsPost.findMany({ orderBy: { publishedAt: 'desc' } });
  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">News Posts</h1>
        <Link href="/admin/news-posts/new" className="admin-btn admin-btn-primary">Add Post</Link>
      </div>
      <div className="admin-card">
        {items.length === 0 ? (
          <p className="admin-empty">No news posts found.</p>
        ) : (
          <table className="admin-table">
            <thead><tr><th>Image</th><th>Title</th><th>Author</th><th>Published</th><th>Active</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.image && <img src={item.image} alt="" />}</td>
                  <td>{item.title}</td>
                  <td>{item.author}</td>
                  <td>{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : 'Not set'}</td>
                  <td><span className={`badge ${item.isActive ? 'badge-success' : 'badge-danger'}`}>{item.isActive ? 'Yes' : 'No'}</span></td>
                  <td>
                    <div className="admin-actions">
                      <Link href={`/admin/news-posts/${item.id}`} className="admin-btn admin-btn-secondary admin-btn-sm">Edit</Link>
                      <DeleteButton apiEndpoint={`/api/admin/news-posts/${item.id}`} itemName="post" />
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
