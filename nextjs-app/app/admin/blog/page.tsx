import prisma from '@/lib/prisma';
import Link from 'next/link';
import { DeleteButton } from '@/components/admin/AdminCrud';

export const dynamic = 'force-dynamic';

export default async function BlogManagerPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
  const generationLogs = await prisma.blogGenerationLog.findMany({ 
    orderBy: { createdAt: 'desc' },
    take: 10
  });
  
  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Blog Manager</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link href="/admin/blog/new" className="admin-btn admin-btn-primary">Add Blog Post</Link>
          <form action="/api/blog/generate" method="POST" style={{ display: 'inline' }}>
            <button type="submit" className="admin-btn admin-btn-secondary">Generate AI Post</button>
          </form>
        </div>
      </div>

      <div className="admin-card">
        <h3 style={{ marginBottom: '1rem', color: '#f5a623' }}>Blog Posts</h3>
        {posts.length === 0 ? (
          <p className="admin-empty">No blog posts found. Create your first post!</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Source</th>
                <th>Published</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    {post.featuredImage && (
                      <img src={post.featuredImage} alt="" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                    )}
                  </td>
                  <td>
                    <strong>{post.title}</strong>
                    <br />
                    <small style={{ color: '#6c757d' }}>/blog/{post.slug}</small>
                  </td>
                  <td>{post.category || '-'}</td>
                  <td>
                    <span className={`badge ${post.source === 'auto' ? 'badge-info' : 'badge-secondary'}`}>
                      {post.source === 'auto' ? 'AI Generated' : 'Manual'}
                    </span>
                  </td>
                  <td>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}</td>
                  <td>
                    <span className={`badge ${post.active ? 'badge-success' : 'badge-danger'}`}>
                      {post.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="admin-actions">
                      <Link href={`/blog/${post.slug}`} target="_blank" className="admin-btn admin-btn-secondary admin-btn-sm">View</Link>
                      <Link href={`/admin/blog/${post.id}`} className="admin-btn admin-btn-secondary admin-btn-sm">Edit</Link>
                      <DeleteButton apiEndpoint={`/api/admin/blog/${post.id}`} itemName="post" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="admin-card" style={{ marginTop: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem', color: '#f5a623' }}>Auto-Blog Generation History</h3>
        {generationLogs.length === 0 ? (
          <p className="admin-empty">No auto-blog generation logs yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
                <th>Generated Title</th>
                <th>Error</th>
              </tr>
            </thead>
            <tbody>
              {generationLogs.map((log) => (
                <tr key={log.id}>
                  <td>{new Date(log.createdAt).toLocaleString()}</td>
                  <td>
                    <span className={`badge ${log.status === 'success' ? 'badge-success' : 'badge-danger'}`}>
                      {log.status === 'success' ? 'Success' : 'Failed'}
                    </span>
                  </td>
                  <td>{log.generatedTitle || '-'}</td>
                  <td style={{ color: '#dc3545', fontSize: '0.85rem' }}>{log.errorMessage || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
