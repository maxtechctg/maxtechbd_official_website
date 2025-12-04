'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { DeleteButton } from '@/components/admin/AdminCrud';

interface NewsPost {
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

export default function NewsManagerPage() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [generationLogs, setGenerationLogs] = useState<GenerationLog[]>([]);
  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [bannerUploading, setBannerUploading] = useState(false);
  const [bannerUrlInput, setBannerUrlInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const bannerFileRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    try {
      const [postsRes, logsRes, bannerRes] = await Promise.all([
        fetch('/api/admin/blog'),
        fetch('/api/admin/blog/logs'),
        fetch('/api/admin/news-banner')
      ]);
      if (postsRes.ok) setPosts(await postsRes.json());
      if (logsRes.ok) setGenerationLogs(await logsRes.json());
      if (bannerRes.ok) {
        const bannerData = await bannerRes.json();
        setBannerImage(bannerData.newsBannerImage);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBannerUpload = async (file: File) => {
    setBannerUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/news-banner', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setBannerImage(data.newsBannerImage);
      } else {
        alert('Failed to upload banner');
      }
    } catch (error) {
      alert('Failed to upload banner');
    } finally {
      setBannerUploading(false);
    }
  };

  const handleBannerUrlSubmit = async () => {
    if (!bannerUrlInput.trim()) return;
    setBannerUploading(true);
    try {
      const formData = new FormData();
      formData.append('imageUrl', bannerUrlInput.trim());
      const res = await fetch('/api/admin/news-banner', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setBannerImage(data.newsBannerImage);
        setBannerUrlInput('');
      } else {
        alert('Failed to set banner URL');
      }
    } catch (error) {
      alert('Failed to set banner URL');
    } finally {
      setBannerUploading(false);
    }
  };

  const handleBannerRemove = async () => {
    if (!confirm('Remove the banner image?')) return;
    try {
      const res = await fetch('/api/admin/news-banner', { method: 'DELETE' });
      if (res.ok) {
        setBannerImage(null);
      }
    } catch (error) {
      alert('Failed to remove banner');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleBannerUpload(file);
    }
  };

  const handleGenerateAI = async () => {
    setGenerating(true);
    try {
      const res = await fetch('/api/blog/generate', { method: 'POST' });
      if (res.ok) {
        await fetchData();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to generate news article');
      }
    } catch (error) {
      alert('Failed to generate news article');
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
        <h1 className="admin-title">News Manager</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link href="/admin/news/new" className="admin-btn admin-btn-primary">Add News Article</Link>
          <button 
            onClick={handleGenerateAI} 
            className="admin-btn admin-btn-secondary"
            disabled={generating}
          >
            {generating ? 'Generating...' : 'Generate AI Article'}
          </button>
        </div>
      </div>

      <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem', color: '#f5a623' }}>Page Header Banner</h3>
        <p style={{ color: '#6c757d', marginBottom: '1rem', fontSize: '0.9rem' }}>
          Upload a banner image to display in the News page header. Recommended size: 1920x400px.
        </p>
        
        {bannerImage ? (
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ 
              position: 'relative', 
              borderRadius: '8px', 
              overflow: 'hidden',
              maxWidth: '600px'
            }}>
              <img 
                src={bannerImage} 
                alt="News Banner" 
                style={{ 
                  width: '100%', 
                  height: '150px', 
                  objectFit: 'cover',
                  display: 'block'
                }} 
              />
              <button
                onClick={handleBannerRemove}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '4px 12px',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => bannerFileRef.current?.click()}
            style={{
              border: `2px dashed ${isDragging ? '#f5a623' : '#dee2e6'}`,
              borderRadius: '8px',
              padding: '2rem',
              textAlign: 'center',
              cursor: 'pointer',
              marginBottom: '1rem',
              background: isDragging ? 'rgba(245, 166, 35, 0.1)' : '#ffffff',
              transition: 'all 0.2s ease'
            }}
          >
            <input
              ref={bannerFileRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleBannerUpload(file);
              }}
            />
            <div style={{ fontSize: '2rem', color: '#6c757d', marginBottom: '0.5rem' }}>
              <i className="fa fa-cloud-upload"></i>
            </div>
            <p style={{ margin: 0, color: '#6c757d' }}>
              {bannerUploading ? 'Uploading...' : 'Drag & drop an image or click to browse'}
            </p>
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Or enter image URL..."
            value={bannerUrlInput}
            onChange={(e) => setBannerUrlInput(e.target.value)}
            style={{
              flex: 1,
              padding: '0.5rem 0.75rem',
              borderRadius: '4px',
              border: '1px solid #dee2e6',
              fontSize: '0.9rem'
            }}
          />
          <button
            onClick={handleBannerUrlSubmit}
            disabled={!bannerUrlInput.trim() || bannerUploading}
            className="admin-btn admin-btn-secondary"
          >
            Set URL
          </button>
        </div>
      </div>

      <div className="admin-card">
        <h3 style={{ marginBottom: '1rem', color: '#f5a623' }}>News Articles</h3>
        {posts.length === 0 ? (
          <p className="admin-empty">No news articles found. Create your first article!</p>
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
                    <small style={{ color: '#6c757d' }}>/news/{post.slug}</small>
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
                      <Link href={`/news/${post.slug}`} target="_blank" className="admin-btn admin-btn-secondary admin-btn-sm">View</Link>
                      <Link href={`/admin/news/${post.id}`} className="admin-btn admin-btn-secondary admin-btn-sm">Edit</Link>
                      <DeleteButton apiEndpoint={`/api/admin/blog/${post.id}`} itemName="article" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="admin-card" style={{ marginTop: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem', color: '#f5a623' }}>AI Generation History</h3>
        {generationLogs.length === 0 ? (
          <p className="admin-empty">No AI generation logs yet.</p>
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
