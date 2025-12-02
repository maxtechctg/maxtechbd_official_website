'use client';

import { useState, useRef, ChangeEvent } from 'react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  required?: boolean;
}

export default function ImageUpload({
  value,
  onChange,
  folder = 'maxtech',
  label = 'Image',
  required = false,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    const isSvg = file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg');
    
    if (!file.type.startsWith('image/') && !isSvg) {
      setError('Please select an image file (JPG, PNG, GIF, WebP, or SVG)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleRemove = () => {
    onChange('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="image-upload-wrapper">
      {value && (
        <div className="image-upload-preview">
          {value.toLowerCase().endsWith('.svg') ? (
            <object 
              data={value} 
              type="image/svg+xml" 
              style={{ maxWidth: '100%', maxHeight: '150px' }}
            >
              <img src={value} alt="Preview" />
            </object>
          ) : (
            <img src={value} alt="Preview" />
          )}
          <button
            type="button"
            className="image-upload-remove"
            onClick={handleRemove}
            title="Remove image"
          >
            &times;
          </button>
        </div>
      )}

      <div
        className={`image-upload-dropzone ${dragActive ? 'active' : ''} ${uploading ? 'uploading' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*,.svg"
          onChange={handleFileChange}
          className="image-upload-input"
          required={required && !value}
        />
        
        {uploading ? (
          <div className="image-upload-loading">
            <div className="image-upload-spinner"></div>
            <span>Uploading...</span>
          </div>
        ) : (
          <div className="image-upload-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span>{value ? 'Change image' : 'Click or drag image to upload'}</span>
            <small>Max file size: 10MB</small>
          </div>
        )}
      </div>

      {error && <div className="image-upload-error">{error}</div>}

      <input
        type="text"
        className="admin-form-input image-upload-url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste image URL directly"
      />
    </div>
  );
}
