'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Field {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'email' | 'url' | 'checkbox' | 'date' | 'datetime-local';
  required?: boolean;
  placeholder?: string;
}

interface AdminFormProps {
  title: string;
  fields: Field[];
  apiEndpoint: string;
  backUrl: string;
  initialData?: Record<string, unknown>;
  isEdit?: boolean;
}

export function AdminForm({ title, fields, apiEndpoint, backUrl, initialData, isEdit }: AdminFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Record<string, unknown>>(initialData || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(apiEndpoint, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save');
      }

      router.push(backUrl);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">{title}</h1>
      </div>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      <div className="admin-card">
        <form onSubmit={handleSubmit} className="admin-form">
          {fields.map((field) => (
            <div key={field.name} className="admin-form-group">
              {field.type === 'checkbox' ? (
                <label className="admin-form-checkbox">
                  <input
                    type="checkbox"
                    checked={Boolean(formData[field.name])}
                    onChange={(e) => handleChange(field.name, e.target.checked)}
                  />
                  {field.label}
                </label>
              ) : (
                <>
                  <label className="admin-form-label">
                    {field.label}
                    {field.required && <span style={{ color: '#dc3545' }}> *</span>}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      className="admin-form-textarea"
                      value={String(formData[field.name] || '')}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      required={field.required}
                      placeholder={field.placeholder}
                    />
                  ) : (
                    <input
                      type={field.type}
                      className="admin-form-input"
                      value={
                        field.type === 'number' 
                          ? (formData[field.name] as number) || '' 
                          : field.type === 'date' || field.type === 'datetime-local'
                            ? formatDateForInput(formData[field.name] as string, field.type)
                            : String(formData[field.name] || '')
                      }
                      onChange={(e) => handleChange(
                        field.name, 
                        field.type === 'number' ? (e.target.value ? Number(e.target.value) : null) : e.target.value
                      )}
                      required={field.required}
                      placeholder={field.placeholder}
                    />
                  )}
                </>
              )}
            </div>
          ))}

          <div className="admin-form-actions">
            <button type="submit" className="admin-btn admin-btn-primary" disabled={loading}>
              {loading ? 'Saving...' : (isEdit ? 'Update' : 'Create')}
            </button>
            <Link href={backUrl} className="admin-btn admin-btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

function formatDateForInput(value: string | null | undefined, type: string): string {
  if (!value) return '';
  try {
    const date = new Date(value);
    if (isNaN(date.getTime())) return '';
    if (type === 'date') {
      return date.toISOString().split('T')[0];
    }
    return date.toISOString().slice(0, 16);
  } catch {
    return '';
  }
}

interface DeleteButtonProps {
  apiEndpoint: string;
  itemName?: string;
  onSuccess?: () => void;
}

export function DeleteButton({ apiEndpoint, itemName = 'item', onSuccess }: DeleteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete this ${itemName}? This action cannot be undone.`)) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(apiEndpoint, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error('Failed to delete');
      }
      if (onSuccess) {
        onSuccess();
      } else {
        router.refresh();
      }
    } catch (error) {
      alert('Failed to delete. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="admin-btn admin-btn-danger admin-btn-sm"
      disabled={loading}
    >
      {loading ? '...' : 'Delete'}
    </button>
  );
}
