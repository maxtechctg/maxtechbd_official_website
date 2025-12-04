'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import ImageUpload from '@/components/admin/ImageUpload';

const HtmlEditor = dynamic(() => import('@/components/admin/HtmlEditor'), { ssr: false });

interface NewsPost {
  id: number;
  title: string;
  slug: string;
  category: string | null;
  markdownContent: string | null;
  htmlContent: string | null;
  featuredImage: string | null;
  active: boolean;
  publishedAt: string | null;
  source: string;
  metaDescription: string | null;
  tags: string | null;
}

const categories = ['Technology', 'Business', 'Development', 'Cloud', 'Security', 'AI/ML', 'Company News', 'Industry', 'Other'];

export default function EditNewsForm({ post }: { post: NewsPost }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: post.title,
    slug: post.slug,
    category: post.category || '',
    featuredImage: post.featuredImage || '',
    metaDescription: post.metaDescription || '',
    tags: post.tags || '',
    active: post.active,
    publishedAt: post.publishedAt ? post.publishedAt.slice(0, 16) : '',
  });
  
  const [htmlContent, setHtmlContent] = useState(post.htmlContent || '');

  const handleChange = (name: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/admin/blog/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          htmlContent,
          markdownContent: null,
          publishedAt: formData.publishedAt ? new Date(formData.publishedAt).toISOString() : null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update article');
      }

      router.push('/admin/news');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Edit News Article</h1>
      </div>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', color: '#f5a623' }}>Article Details</h3>
          
          <div className="admin-form-group">
            <label className="admin-form-label">Title <span style={{ color: '#dc3545' }}>*</span></label>
            <input 
              type="text" 
              className="admin-form-input" 
              value={formData.title} 
              onChange={(e) => handleChange('title', e.target.value)} 
              required 
              maxLength={70}
            />
            <small style={{ color: '#6c757d' }}>{formData.title.length}/70 characters</small>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Slug (URL) <span style={{ color: '#dc3545' }}>*</span></label>
            <input 
              type="text" 
              className="admin-form-input" 
              value={formData.slug} 
              onChange={(e) => handleChange('slug', e.target.value)} 
              required 
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Category</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <select 
                className="admin-form-input" 
                value={formData.category} 
                onChange={(e) => handleChange('category', e.target.value)}
                style={{ flex: 1 }}
              >
                <option value="">Select category...</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <input 
                type="text" 
                className="admin-form-input" 
                placeholder="Or enter new category"
                style={{ flex: 1 }}
                onChange={(e) => handleChange('category', e.target.value)}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Meta Description</label>
            <textarea 
              className="admin-form-textarea" 
              value={formData.metaDescription} 
              onChange={(e) => handleChange('metaDescription', e.target.value)}
              maxLength={160}
              rows={2}
            />
            <small style={{ color: '#6c757d' }}>{formData.metaDescription.length}/160 characters</small>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Tags</label>
            <input 
              type="text" 
              className="admin-form-input" 
              value={formData.tags} 
              onChange={(e) => handleChange('tags', e.target.value)}
              placeholder="tag1, tag2, tag3"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Featured Image</label>
            <ImageUpload 
              value={formData.featuredImage} 
              onChange={(url) => handleChange('featuredImage', url)} 
              folder="maxtech/news" 
            />
          </div>
        </div>

        <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', color: '#f5a623' }}>Rich Content Editor</h3>
          <HtmlEditor value={htmlContent} onChange={setHtmlContent} placeholder="Type or paste your content here!" />
        </div>

        <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', color: '#f5a623' }}>Publishing Options</h3>
          
          <label className="admin-form-checkbox" style={{ marginBottom: '1rem' }}>
            <input 
              type="checkbox" 
              checked={formData.active} 
              onChange={(e) => handleChange('active', e.target.checked)} 
            />
            Active (visible on site)
          </label>

          <div className="admin-form-group">
            <label className="admin-form-label">Published Date</label>
            <input 
              type="datetime-local" 
              className="admin-form-input" 
              value={formData.publishedAt} 
              onChange={(e) => handleChange('publishedAt', e.target.value)}
            />
          </div>
        </div>

        <div className="admin-form-actions">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Update Article'}
          </button>
          <Link href="/admin/news" className="admin-btn admin-btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
