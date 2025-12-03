"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

interface ProductMedia {
  type: "image" | "video" | "gif";
  src: string;
  alt: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  tagline: string;
  shortDescription: string;
  overview: string;
  features: string[];
  media: ProductMedia;
}

const PRODUCTS: Product[] = [
  {
    id: "school-erp",
    name: "SchoolERP",
    category: "Education",
    tagline: "Let us run your campus operations.",
    shortDescription:
      "Admissions, academics, fees, timetable, parent portal and more.",
    overview:
      "SchoolERP centralizes student data, attendance, fees, examinations and communication with parents. Timetables, digital report cards and role-based access keep everyone align ed while reducing paperwork.",
    features: [
      "Admissions management with online applications",
      "Timetables & attendance tracking",
      "Fee collection & automated invoices",
      "Parent portal & real-time messaging",
      "Digital report cards & transcripts",
      "Role-based access control",
    ],
    media: {
      type: "image",
      src: "/images/modules/schoolerp-dashboard.png",
      alt: "SchoolERP Dashboard",
    },
  },
  {
    id: "crm",
    name: "CRM",
    category: "Sales & Marketing",
    tagline: "Never lose a high-value lead again.",
    shortDescription:
      "Visual pipelines, automated follow-ups and customer view.",
    overview:
      "Our CRM gives you visual pipelines, automation, contact activity timeline and sales analytics so your team closes more deals faster.",
    features: [
      "Visual sales pipeline management",
      "Automated follow-up sequences",
      "Customer 360° view & history",
      "Email tracking & templates",
      "Sales analytics & forecasting",
      "Team collaboration tools",
    ],
    media: {
      type: "image",
      src: "/images/modules/crm-pipeline.png",
      alt: "CRM Pipeline View",
    },
  },
  {
    id: "erp",
    name: "ERP",
    category: "Business Ops",
    tagline: "One system for the whole company.",
    shortDescription: "Inventory, purchase, accounting, HR and projects.",
    overview:
      "ERP connects finance, HR, inventory and operations into one real-time system — giving you visibility across departments and clear profitability reports.",
    features: [
      "Inventory & warehouse management",
      "Purchase order automation",
      "Financial accounting & reporting",
      "Multi-branch operations",
      "Project cost tracking",
      "Supplier management portal",
    ],
    media: {
      type: "image",
      src: "/images/modules/erp-inventory.png",
      alt: "ERP Inventory Management",
    },
  },
  {
    id: "hrms",
    name: "HRMS",
    category: "People",
    tagline: "Keep your team engaged & paid on time.",
    shortDescription: "Profiles, attendance, payroll and performance.",
    overview:
      "HRMS automates attendance, payroll runs, leave management and performance reviews so HR can work strategically instead of administratively.",
    features: [
      "Employee profiles & documents",
      "Biometric attendance integration",
      "Automated payroll processing",
      "Leave management system",
      "Performance reviews & goals",
      "Training & development tracking",
    ],
    media: {
      type: "image",
      src: "/images/modules/hrms-payroll.png",
      alt: "HRMS Payroll Dashboard",
    },
  },
  {
    id: "helpdesk",
    name: "Helpdesk",
    category: "Support",
    tagline: "Delight customers with fast support.",
    shortDescription: "Ticketing, SLA, canned replies and portal.",
    overview:
      "Helpdesk turns emails and messages into organized tickets with SLAs, automations, and a self-service portal for your customers.",
    features: [
      "Multi-channel ticket management",
      "SLA tracking & escalations",
      "Canned responses & templates",
      "Customer self-service portal",
      "Knowledge base integration",
      "Agent performance analytics",
    ],
    media: {
      type: "image",
      src: "/images/modules/helpdesk-tickets.png",
      alt: "Helpdesk Ticket Management",
    },
  },
];

export default function TabbedSaaSProducts() {
  const [activeId, setActiveId] = useState<string>(PRODUCTS[0].id);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const active = PRODUCTS.find((p) => p.id === activeId) || PRODUCTS[0];
  const stripRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll tab into view
  useEffect(() => {
    const el = document.getElementById(`tab-${activeId}`);
    const container = stripRef.current;
    if (!el || !container) return;
    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    if (
      elRect.left < containerRect.left ||
      elRect.right > containerRect.right
    ) {
      const scrollLeft =
        el.offsetLeft - container.clientWidth / 2 + el.clientWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeId]);

  // IntersectionObserver for media slide-in animation
  useEffect(() => {
    const mediaElement = mediaRef.current;
    if (!mediaElement) return;

    // Reset animation state
    mediaElement.classList.remove("in-view");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(mediaElement);

    return () => observer.disconnect();
  }, [activeId]);

  // Handle tab switch with transition
  const handleTabClick = useCallback(
    (id: string) => {
      if (id === activeId || isTransitioning) return;

      setIsTransitioning(true);

      // Add fade-out class
      if (contentRef.current) {
        contentRef.current.classList.add("content-fade-out");
      }

      // After fade out, switch content and fade in
      setTimeout(() => {
        setActiveId(id);
        if (contentRef.current) {
          contentRef.current.classList.remove("content-fade-out");
          contentRef.current.classList.add("content-fade-in");
        }

        setTimeout(() => {
          if (contentRef.current) {
            contentRef.current.classList.remove("content-fade-in");
          }
          setIsTransitioning(false);
        }, 300);
      }, 200);
    },
    [activeId, isTransitioning],
  );

  // Generate placeholder URL for fallback
  const getPlaceholderUrl = (name: string) => {
    return `https://via.placeholder.com/600x400/6f42c1/ffffff?text=${encodeURIComponent(name)}`;
  };

  // Render media based on type with fallback handling
  const renderMedia = () => {
    const { media } = active;

    if (media.type === "video") {
      return (
        <video
          className="module-media rounded-20"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={getPlaceholderUrl(active.name)}
          onError={(e) => {
            // Replace video with fallback image on error
            const video = e.target as HTMLVideoElement;
            const img = document.createElement("img");
            img.src = getPlaceholderUrl(active.name);
            img.alt = media.alt;
            img.className = "module-media rounded-20";
            video.parentNode?.replaceChild(img, video);
          }}
        >
          <source src={media.src} type="video/mp4" />
        </video>
      );
    }

    // For image and gif
    return (
      <img
        src={media.src}
        alt={media.alt}
        className="module-media rounded-20"
        onError={(e) => {
          // Fallback placeholder if image doesn't exist
          (e.target as HTMLImageElement).src = getPlaceholderUrl(active.name);
        }}
      />
    );
  };

  return (
    <section className="tabbed-saas compact bg-light py-5">
      <div className="container">
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
          <div>
            <small className="text-uppercase text-primary fw-bold">
              Products
            </small>
            <h2 className="mt-1 mb-1">Our SaaS Products</h2>
            <p className="text-muted mb-0 small">
              Switch between modules like SchoolERP, CRM and ERP to see details
              at a glance.
            </p>
          </div>
          <div className="mt-2 mt-md-0">
            <button className="btn btn-outline-primary btn-sm">
              Talk to our team
            </button>
          </div>
        </div>

        {/* Tab Strip */}
        <div className="position-relative mb-4">
          <div className="fade-edge-left d-none d-md-block" />
          <div className="fade-edge-right d-none d-md-block" />

          <div
            ref={stripRef}
            className="d-flex gap-3 overflow-auto px-1 py-2 tab-strip"
          >
            {PRODUCTS.map((p) => {
              const isActive = p.id === activeId;
              return (
                <div
                  id={`tab-${p.id}`}
                  key={p.id}
                  role="button"
                  onClick={() => handleTabClick(p.id)}
                  className={`card flex-shrink-0 ${isActive ? "border-primary shadow-lg tab-active" : "border-light"} tab-card`}
                >
                  <div className="card-body p-3">
                    <div className="d-flex align-items-center">
                      <div
                        className={`rounded-3 d-flex align-items-center justify-content-center me-3 ${isActive ? "bg-primary text-white" : "bg-primary bg-opacity-10 text-primary"}`}
                        style={{ width: 44, height: 44 }}
                      >
                        <strong>{p.name.charAt(0)}</strong>
                      </div>
                      <div className="flex-grow-1">
                        <small className="text-uppercase text-muted fw-semibold">
                          {p.category}
                        </small>
                        <h6 className="mb-0 mt-1">{p.name}</h6>
                        <small className="text-muted d-block">
                          {p.shortDescription}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Area - Two Column Layout */}
        <div ref={contentRef} className="module-content">
          <div className="row g-4 align-items-center">
            {/* Left Column - Overview and Features */}
            <div className="col-lg-6">
              <div className="pe-lg-4">
                <div className="subtitle-badge mb-2">
                  <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2">
                    {active.category}
                  </span>
                </div>
                <h3 className="module-title mb-3">{active.name}</h3>
                <p className="module-tagline text-primary fw-semibold mb-3">
                  {active.tagline}
                </p>
                <p className="module-overview text-muted mb-4">
                  {active.overview}
                </p>

                {/* Features List */}
                <h6 className="fw-bold mb-3">Key Features</h6>
                <ul className="module-features">
                  {active.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>

                {/* Action Buttons */}
                <div className="d-flex gap-2 flex-wrap mt-4">
                  <button className="btn btn-primary">Get Demo</button>
                  <button className="btn btn-outline-secondary">
                    Request Live Demo
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Media */}
            <div className="col-lg-6">
              <div ref={mediaRef} className="module-media-wrap">
                {renderMedia()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
