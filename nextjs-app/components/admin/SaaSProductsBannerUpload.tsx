// "use client";

// import { useState, useEffect, useRef } from "react";

// export default function SaaSProductsBannerUpload() {
//   const [bannerImage, setBannerImage] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     fetchBanner();
//   }, []);

//   const fetchBanner = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/admin/saas-products-banner");
//       if (res.ok) {
//         const data = await res.json();
//         setBannerImage(data.saasProductsBannerImage);
//       }
//     } catch (err) {
//       console.error("Failed to fetch banner:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpload = async (file: File) => {
//     setUploading(true);
//     setError("");
//     setSuccess("");

//     try {
//       const formData = new FormData();
//       formData.append("file", file);

//       const res = await fetch("/api/admin/saas-products-banner", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) {
//         throw new Error("Failed to upload banner");
//       }

//       const data = await res.json();
//       setBannerImage(data.saasProductsBannerImage);
//       setSuccess("Banner uploaded successfully!");
//       setTimeout(() => setSuccess(""), 3000);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!confirm("Are you sure you want to remove the banner image?")) return;

//     setLoading(true);
//     setError("");

//     try {
//       const res = await fetch("/api/admin/saas-products-banner", {
//         method: "DELETE",
//       });

//       if (!res.ok) {
//         throw new Error("Failed to remove banner");
//       }

//       setBannerImage(null);
//       setSuccess("Banner removed successfully!");
//       setTimeout(() => setSuccess(""), 3000);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Delete failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const file = e.dataTransfer.files[0];
//     if (file && file.type.startsWith("image/")) {
//       handleUpload(file);
//     }
//   };

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       handleUpload(file);
//     }
//   };

//   return (
//     <div className="admin-card" style={{ marginBottom: "1.5rem" }}>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "1rem",
//         }}
//       >
//         <div>
//           <h3 style={{ margin: 0, color: "#f5a623" }}>Page Header Banner</h3>
//           <p
//             style={{
//               margin: "0.5rem 0 0",
//               color: "#6c757d",
//               fontSize: "0.9rem",
//             }}
//           >
//             Upload a banner image for the SaaS Products page header
//             (recommended: 1920x400px)
//           </p>
//         </div>
//       </div>

//       {error && (
//         <div
//           className="admin-alert admin-alert-error"
//           style={{ marginBottom: "1rem" }}
//         >
//           {error}
//         </div>
//       )}
//       {success && (
//         <div
//           className="admin-alert admin-alert-success"
//           style={{ marginBottom: "1rem" }}
//         >
//           {success}
//         </div>
//       )}

//       {loading ? (
//         <div style={{ padding: "2rem", textAlign: "center", color: "#6c757d" }}>
//           Loading...
//         </div>
//       ) : bannerImage ? (
//         <div style={{ position: "relative" }}>
//           <div
//             style={{
//               width: "100%",
//               height: "200px",
//               borderRadius: "8px",
//               overflow: "hidden",
//               border: "1px solid #dee2e6",
//             }}
//           >
//             <img
//               src={bannerImage}
//               alt="SaaS Products Banner"
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//               }}
//             />
//           </div>
//           <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
//             <button
//               onClick={() => fileInputRef.current?.click()}
//               className="admin-btn admin-btn-secondary admin-btn-sm"
//               disabled={uploading}
//             >
//               {uploading ? "Uploading..." : "Change Banner"}
//             </button>
//             <button
//               onClick={handleDelete}
//               className="admin-btn admin-btn-danger admin-btn-sm"
//               disabled={loading}
//             >
//               Remove
//             </button>
//           </div>
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             style={{ display: "none" }}
//           />
//         </div>
//       ) : (
//         <div
//           onDrop={handleDrop}
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onClick={() => fileInputRef.current?.click()}
//           style={{
//             border: `2px dashed ${isDragging ? "#f5a623" : "#dee2e6"}`,
//             borderRadius: "8px",
//             padding: "2rem",
//             textAlign: "center",
//             cursor: "pointer",
//             backgroundColor: isDragging ? "rgba(245, 166, 35, 0.1)" : "#ffffff",
//             transition: "all 0.2s ease",
//           }}
//         >
//           <div style={{ marginBottom: "0.5rem" }}>
//             <i
//               className="fa fa-cloud-upload"
//               style={{ fontSize: "2rem", color: "#6c757d" }}
//             ></i>
//           </div>
//           <p style={{ margin: 0, color: "#495057", fontWeight: 500 }}>
//             {uploading
//               ? "Uploading..."
//               : "Drop an image here or click to upload"}
//           </p>
//           <p
//             style={{
//               margin: "0.5rem 0 0",
//               color: "#6c757d",
//               fontSize: "0.85rem",
//             }}
//           >
//             Recommended size: 1920 x 400 pixels
//           </p>
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             style={{ display: "none" }}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";

export default function SaaSProductsBannerUpload() {
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/saas-products-banner");
      if (res.ok) {
        const data = await res.json();
        setBannerImage(data.saasProductsBannerImage);
      }
    } catch (err) {
      console.error("Failed to fetch banner:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/saas-products-banner", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to upload banner");
      }

      const data = await res.json();
      setBannerImage(data.saasProductsBannerImage);
      setSuccess("Banner uploaded successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to remove the banner image?")) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/saas-products-banner", {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to remove banner");
      }

      setBannerImage(null);
      setSuccess("Banner removed successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  return (
    <div className="admin-card" style={{ marginBottom: "1.5rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div>
          <h3 style={{ margin: 0, color: "#f5a623" }}>Page Header Banner</h3>
          <p
            style={{
              margin: "0.5rem 0 0",
              color: "#6c757d",
              fontSize: "0.9rem",
            }}
          >
            Upload a banner image for the SaaS Products page header
          </p>
        </div>
      </div>

      {error && (
        <div
          className="admin-alert admin-alert-error"
          style={{ marginBottom: "1rem" }}
        >
          {error}
        </div>
      )}
      {success && (
        <div
          className="admin-alert admin-alert-success"
          style={{ marginBottom: "1rem" }}
        >
          {success}
        </div>
      )}

      {loading ? (
        <div style={{ padding: "2rem", textAlign: "center", color: "#6c757d" }}>
          Loading...
        </div>
      ) : bannerImage ? (
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "600px", // match portfolio max width
              height: "200px", // match portfolio banner height
              borderRadius: "8px",
              overflow: "hidden",
              border: "1px solid #dee2e6",
            }}
          >
            <img
              src={bannerImage}
              alt="SaaS Products Banner"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="admin-btn admin-btn-secondary admin-btn-sm"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Change Banner"}
            </button>
            <button
              onClick={handleDelete}
              className="admin-btn admin-btn-danger admin-btn-sm"
              disabled={loading}
            >
              Remove
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: `2px dashed ${isDragging ? "#10b981" : "#d1d5db"}`, // portfolio-like green drag
            borderRadius: "8px",
            padding: "40px 20px", // same padding as portfolio empty state
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: isDragging ? "#ecfdf5" : "#f9fafb", // portfolio-like bg
            transition: "all 0.2s ease",
          }}
        >
          <div style={{ marginBottom: "0.5rem" }}>
            {/* use a camera emoji like portfolio for visual consistency */}
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>📷</div>
          </div>

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
              <p style={{ margin: 0, color: "#374151", fontWeight: 500 }}>
                Drop an image here or click to upload
              </p>
              <p
                style={{
                  margin: "0.5rem 0 0",
                  color: "#9ca3af",
                  fontSize: "0.85rem",
                }}
              >
                Recommended size: 1920 x 400 pixels
              </p>
            </>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
      )}

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
