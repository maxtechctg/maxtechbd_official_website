'use client';

import { useState, useRef, ChangeEvent } from 'react';

interface VideoUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  maxSizeMB?: number;
}

export default function VideoUpload({
  value,
  onChange,
  folder = 'maxtech/videos',
  maxSizeMB = 20,
}: VideoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith('video/')) {
      setError('Please select a video file (MP4, WebM, MOV, AVI)');
      return;
    }

    const maxSize = maxSizeMB * 1024 * 1024;
    if (file.size > maxSize) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    setUploading(true);
    setError('');
    setProgress(10);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      setProgress(30);

      const res = await fetch('/api/admin/upload-video', {
        method: 'POST',
        body: formData,
      });

      setProgress(80);

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setProgress(100);
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      setProgress(0);
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

  const isYouTube = value && (value.includes('youtube.com') || value.includes('youtu.be'));

  return (
    <div className="video-upload-wrapper">
      <style jsx>{`
        .video-upload-wrapper {
          width: 100%;
        }
        .video-upload-preview {
          position: relative;
          margin-bottom: 1rem;
          border-radius: 8px;
          overflow: hidden;
          background: #000;
        }
        .video-upload-preview video {
          width: 100%;
          max-height: 250px;
          display: block;
        }
        .video-upload-preview iframe {
          width: 100%;
          height: 250px;
          display: block;
          border: none;
        }
        .video-upload-remove {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(220, 53, 69, 0.9);
          color: white;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }
        .video-upload-remove:hover {
          background: #dc3545;
        }
        .video-upload-dropzone {
          border: 2px dashed #dee2e6;
          border-radius: 8px;
          padding: 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
          background: #f8f9fa;
        }
        .video-upload-dropzone:hover,
        .video-upload-dropzone.active {
          border-color: #f5a623;
          background: rgba(245, 166, 35, 0.05);
        }
        .video-upload-dropzone.uploading {
          pointer-events: none;
          opacity: 0.7;
        }
        .video-upload-input {
          display: none;
        }
        .video-upload-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: #6c757d;
        }
        .video-upload-placeholder svg {
          color: #adb5bd;
        }
        .video-upload-placeholder small {
          color: #adb5bd;
        }
        .video-upload-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          color: #f5a623;
        }
        .video-upload-progress {
          width: 100%;
          max-width: 200px;
          height: 6px;
          background: #e9ecef;
          border-radius: 3px;
          overflow: hidden;
        }
        .video-upload-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #f5a623, #ff8c00);
          transition: width 0.3s ease;
        }
        .video-upload-error {
          color: #dc3545;
          font-size: 0.85rem;
          margin-top: 0.5rem;
        }
        .video-upload-url {
          margin-top: 0.75rem;
        }
        .video-upload-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background: rgba(245, 166, 35, 0.1);
          border-radius: 6px;
          margin-bottom: 1rem;
          font-size: 0.85rem;
          color: #856404;
        }
      `}</style>

      {value && (
        <div className="video-upload-preview">
          {isYouTube ? (
            <iframe
              src={value.replace('watch?v=', 'embed/').replace('youtu.be/', 'www.youtube.com/embed/')}
              title="Video Preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video controls>
              <source src={value} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <button
            type="button"
            className="video-upload-remove"
            onClick={handleRemove}
            title="Remove video"
          >
            &times;
          </button>
        </div>
      )}

      <div className="video-upload-info">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="8" />
        </svg>
        Upload a demo video (max {maxSizeMB}MB) or paste a YouTube URL below
      </div>

      <div
        className={`video-upload-dropzone ${dragActive ? 'active' : ''} ${uploading ? 'uploading' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="video/mp4,video/webm,video/quicktime,video/x-msvideo,.mp4,.webm,.mov,.avi"
          onChange={handleFileChange}
          className="video-upload-input"
        />
        
        {uploading ? (
          <div className="video-upload-loading">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
            <span>Uploading video...</span>
            <div className="video-upload-progress">
              <div className="video-upload-progress-bar" style={{ width: `${progress}%` }} />
            </div>
          </div>
        ) : (
          <div className="video-upload-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
            <span>{value ? 'Change video' : 'Click or drag video to upload'}</span>
            <small>MP4, WebM, MOV, AVI - Max {maxSizeMB}MB</small>
          </div>
        )}
      </div>

      {error && <div className="video-upload-error">{error}</div>}

      <input
        type="text"
        className="admin-form-input video-upload-url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste video/YouTube URL directly"
      />
    </div>
  );
}
