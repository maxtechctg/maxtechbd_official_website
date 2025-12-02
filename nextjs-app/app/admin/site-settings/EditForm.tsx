'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';

interface SiteSettingsData {
  id: number;
  siteName: string;
  siteTitle: string;
  description: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  logoUrl: string | null;
  logoMobileUrl: string | null;
  navbarLogo: string | null;
  navbarLogoWidth: number | null;
  navbarLogoHeight: number | null;
  footerLogo: string | null;
  footerLogoWidth: number | null;
  footerLogoHeight: number | null;
  favicon: string | null;
  copyright: string | null;
}

export default function EditForm({ item }: { item: Record<string, unknown> }) {
  const router = useRouter();
  const [formData, setFormData] = useState<SiteSettingsData>(item as unknown as SiteSettingsData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save');
      }

      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name: keyof SiteSettingsData, value: unknown) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Site Settings</h1>
      </div>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      <div className="admin-card">
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-form-group">
            <label className="admin-form-label">
              Site Name <span style={{ color: '#dc3545' }}>*</span>
            </label>
            <input
              type="text"
              className="admin-form-input"
              value={formData.siteName || ''}
              onChange={(e) => handleChange('siteName', e.target.value)}
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">
              Site Title <span style={{ color: '#dc3545' }}>*</span>
            </label>
            <input
              type="text"
              className="admin-form-input"
              value={formData.siteTitle || ''}
              onChange={(e) => handleChange('siteTitle', e.target.value)}
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Description</label>
            <textarea
              className="admin-form-textarea"
              value={formData.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Phone</label>
            <input
              type="text"
              className="admin-form-input"
              value={formData.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Email</label>
            <input
              type="email"
              className="admin-form-input"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Address</label>
            <textarea
              className="admin-form-textarea"
              value={formData.address || ''}
              onChange={(e) => handleChange('address', e.target.value)}
            />
          </div>

          <div className="admin-form-section">
            <h3 className="admin-form-section-title">Navbar Logo</h3>
            <p className="admin-form-section-desc">Upload a logo for the navigation bar with custom dimensions</p>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Logo Image</label>
              <ImageUpload
                value={formData.navbarLogo || ''}
                onChange={(url) => handleChange('navbarLogo', url)}
                folder="maxtech/branding"
              />
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group admin-form-group-half">
                <label className="admin-form-label">Width (px)</label>
                <input
                  type="number"
                  className="admin-form-input"
                  value={formData.navbarLogoWidth || 150}
                  onChange={(e) => handleChange('navbarLogoWidth', e.target.value ? Number(e.target.value) : null)}
                  min={20}
                  max={500}
                />
              </div>
              <div className="admin-form-group admin-form-group-half">
                <label className="admin-form-label">Height (px)</label>
                <input
                  type="number"
                  className="admin-form-input"
                  value={formData.navbarLogoHeight || 40}
                  onChange={(e) => handleChange('navbarLogoHeight', e.target.value ? Number(e.target.value) : null)}
                  min={20}
                  max={200}
                />
              </div>
            </div>
          </div>

          <div className="admin-form-section">
            <h3 className="admin-form-section-title">Footer Logo</h3>
            <p className="admin-form-section-desc">Upload a logo for the footer with custom dimensions</p>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Logo Image</label>
              <ImageUpload
                value={formData.footerLogo || ''}
                onChange={(url) => handleChange('footerLogo', url)}
                folder="maxtech/branding"
              />
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group admin-form-group-half">
                <label className="admin-form-label">Width (px)</label>
                <input
                  type="number"
                  className="admin-form-input"
                  value={formData.footerLogoWidth || 150}
                  onChange={(e) => handleChange('footerLogoWidth', e.target.value ? Number(e.target.value) : null)}
                  min={20}
                  max={500}
                />
              </div>
              <div className="admin-form-group admin-form-group-half">
                <label className="admin-form-label">Height (px)</label>
                <input
                  type="number"
                  className="admin-form-input"
                  value={formData.footerLogoHeight || 50}
                  onChange={(e) => handleChange('footerLogoHeight', e.target.value ? Number(e.target.value) : null)}
                  min={20}
                  max={200}
                />
              </div>
            </div>
          </div>

          <div className="admin-form-section">
            <h3 className="admin-form-section-title">Mobile Logo</h3>
            <p className="admin-form-section-desc">Optional smaller logo for mobile devices (navbar only)</p>
            
            <div className="admin-form-group">
              <label className="admin-form-label">Mobile Logo Image</label>
              <ImageUpload
                value={formData.logoMobileUrl || ''}
                onChange={(url) => handleChange('logoMobileUrl', url)}
                folder="maxtech/branding"
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Favicon</label>
            <ImageUpload
              value={formData.favicon || ''}
              onChange={(url) => handleChange('favicon', url)}
              folder="maxtech/branding"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Copyright Text</label>
            <input
              type="text"
              className="admin-form-input"
              value={formData.copyright || ''}
              onChange={(e) => handleChange('copyright', e.target.value)}
            />
          </div>

          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Update'}
            </button>
            <Link href="/admin" className="admin-btn admin-btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>

      <style jsx>{`
        .admin-form-section {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
        }
        .admin-form-section-title {
          margin: 0 0 5px 0;
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }
        .admin-form-section-desc {
          margin: 0 0 15px 0;
          font-size: 13px;
          color: #666;
        }
        .admin-form-row {
          display: flex;
          gap: 20px;
        }
        .admin-form-group-half {
          flex: 1;
        }
      `}</style>
    </div>
  );
}
