'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { DeleteButton } from '@/components/admin/AdminCrud';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  category: string | null;
  featuredImage: string | null;
  active: boolean;
  publishedAt: string | null;
  source: string;
}

interface GenerationLog {
  id: number;
  status: string;
  generatedTitle: string | null;
  errorMessage: string | null;
  createdAt: string;
}

export default function BlogManagerPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [generationLogs, setGenerationLogs] = useState<GenerationLog[]>([]);
  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [postsRes, logsRes] = await Promise.all([
        fetch('/api/admin/blog'),
        fetch('/api/admin/blog/logs')
      ]);
      if (postsRes.ok) setPosts(await postsRes.json());
      if (logsRes.ok) setGenerationLogs(await logsRes.json());
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGenerateAI = async () => {
    setGenerating(true);
    try {
      const res = await fetch('/api/blog/generate', { method: 'POST' });
      if (res.ok) {
        await fetchData();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to generate blog post');
      }
    } catch (error) {
      alert('Failed to generate blog post');
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return <div className="admin-card"><p>Loading...</p></div>;
  }

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Blog Manager</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link href="/admin/blog/new" className="admin-btn admin-btn-primary">Add Blog Post</Link>
          <button 
            onClick={handleGenerateAI} 
            className="admin-btn admin-btn-secondary"
            disabled={generating}
          >
            {generating ? 'Generating...' : 'Generate AI Post'}
          </button>
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
