"use client";

import { useState, useEffect, useRef } from "react";

export default function PortfolioBannerUpload() {
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    try {
      const res = await fetch("/api/admin/portfolio-banner");
      const data = await res.json();
      if (data.portfolioBannerImage) {
        setBannerUrl(data.portfolioBannerImage);
      }
    } catch (error) {
      console.error("Error fetching banner:", error);
    }
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/portfolio-banner", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setBannerUrl(data.portfolioBannerImage);
        setMessage({ type: "success", text: "Banner uploaded successfully!" });
      } else {
        setMessage({
          type: "error",
          text: data.error || "Failed to upload banner",
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      setMessage({ type: "error", text: "Failed to upload banner" });
    } finally {
      setUploading(false);
    }
  };

  const handleUrlSubmit = async () => {
    if (!imageUrlInput.trim()) return;

    setUploading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("imageUrl", imageUrlInput);

      const res = await fetch("/api/admin/portfolio-banner", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setBannerUrl(data.portfolioBannerImage);
        setImageUrlInput("");
        setShowUrlInput(false);
        setMessage({ type: "success", text: "Banner updated successfully!" });
      } else {
        setMessage({
          type: "error",
          text: data.error || "Failed to update banner",
        });
      }
    } catch (error) {
      console.error("URL update error:", error);
      setMessage({ type: "error", text: "Failed to update banner" });
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    if (!confirm("Are you sure you want to remove the banner image?")) return;

    setUploading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/portfolio-banner", {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setBannerUrl(null);
        setMessage({ type: "success", text: "Banner removed successfully!" });
      } else {
        setMessage({
          type: "error",
          text: data.error || "Failed to remove banner",
        });
      }
    } catch (error) {
      console.error("Remove error:", error);
      setMessage({ type: "error", text: "Failed to remove banner" });
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith("image/")) {
      handleUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleUpload(files[0]);
    }
  };

  return (
    <div className="admin-card" style={{ marginBottom: "24px" }}>
      <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: 600 }}>
        Portfolio Page Banner
      </h3>
      <p style={{ color: "#6b7280", marginBottom: "16px", fontSize: "14px" }}>
        Upload a banner image that will appear in the header section of the
        Portfolio / Case Studies page.
      </p>

      {message && (
        <div
          style={{
            padding: "12px 16px",
            marginBottom: "16px",
            borderRadius: "6px",
            backgroundColor: message.type === "success" ? "#d1fae5" : "#fee2e2",
            color: message.type === "success" ? "#065f46" : "#991b1b",
          }}
        >
          {message.text}
        </div>
      )}

      {bannerUrl ? (
        <div>
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "600px",
              borderRadius: "8px",
              overflow: "hidden",
              marginBottom: "16px",
            }}
          >
            <img
              src={bannerUrl}
              alt="Portfolio Banner"
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="admin-btn admin-btn-secondary"
            >
              Change Image
            </button>
            <button
              onClick={() => setShowUrlInput(!showUrlInput)}
              disabled={uploading}
              className="admin-btn admin-btn-secondary"
            >
              Use URL
            </button>
            <button
              onClick={handleRemove}
              disabled={uploading}
              className="admin-btn"
              style={{ backgroundColor: "#ef4444", color: "white" }}
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: `2px dashed ${isDragging ? "#10b981" : "#d1d5db"}`,
            borderRadius: "8px",
            padding: "40px 20px",
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: isDragging ? "#ecfdf5" : "#f9fafb",
            transition: "all 0.2s ease",
          }}
        >
          {uploading ? (
            <div>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  border: "3px solid #e5e7eb",
                  borderTop: "3px solid #10b981",
                  borderRadius: "50%",
                  margin: "0 auto 12px",
                  animation: "spin 1s linear infinite",
                }}
              />
              <p style={{ color: "#6b7280" }}>Uploading...</p>
            </div>
          ) : (
            <>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>📷</div>
              <p
                style={{
                  color: "#374151",
                  marginBottom: "8px",
                  fontWeight: 500,
                }}
              >
                Drop an image here or click to upload
              </p>
              <p style={{ color: "#9ca3af", fontSize: "14px" }}>
                Recommended size: 1920x400 pixels
              </p>
            </>
          )}
        </div>
      )}

      {showUrlInput && (
        <div style={{ marginTop: "16px", display: "flex", gap: "12px" }}>
          <input
            type="url"
            value={imageUrlInput}
            onChange={(e) => setImageUrlInput(e.target.value)}
            placeholder="Enter image URL..."
            className="admin-input"
            style={{ flex: 1 }}
          />
          <button
            onClick={handleUrlSubmit}
            disabled={uploading || !imageUrlInput.trim()}
            className="admin-btn admin-btn-primary"
          >
            Apply
          </button>
          <button
            onClick={() => {
              setShowUrlInput(false);
              setImageUrlInput("");
            }}
            className="admin-btn admin-btn-secondary"
          >
            Cancel
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
