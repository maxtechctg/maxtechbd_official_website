"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

interface PricingPlan {
  name: string;
  price1Month: string;
  price6Month: string;
  price12Month: string;
  features?: string[];
  isPopular?: boolean;
}

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

interface ClientReview {
  authorName: string;
  authorRole: string;
  authorImage: string;
  quote: string;
  rating: number;
  companyUrl?: string;
}

interface KeyFeature {
  icon: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonUrl?: string;
}

interface SaaSProduct {
  id: number;
  title: string;
  slug: string;
  tagline?: string | null;
  shortDescription: string;
  longDescription?: string | null;
  mainImage?: string | null;
  bannerImage?: string | null;
  features?: string | null;
  rating?: number | null;
  totalUsers?: string | null;
  keyFeatures?: string | null;
  pricingPlans?: string | null;
  parallaxTitle?: string | null;
  parallaxDescription?: string | null;
  parallaxImage?: string | null;
  demoVideoUrl?: string | null;
  featureCards?: string | null;
  clientReviews?: string | null;
  liveDemoUrl?: string | null;
  requestDemoText?: string | null;
  requestDemoUrl?: string | null;
}

interface TabbedSaaSProductsProps {
  products: SaaSProduct[];
}

function safeJsonParse<T>(
  json: string | null | undefined,
  fallback: T[] = [],
): T[] {
  if (!json) return fallback;
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

const PaymentIcons = () => (
  <div className="d-flex justify-content-center gap-3 mt-3">
    <div
      className="payment-icon"
      title="bKash"
      style={{
        width: "40px",
        height: "40px",
        background: "#e2146c",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{ color: "#fff", fontWeight: "bold", fontSize: "12px" }}>
        bK
      </span>
    </div>
    <div
      className="payment-icon"
      title="PayPal"
      style={{
        width: "40px",
        height: "40px",
        background: "#003087",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <i className="fab fa-paypal text-white"></i>
    </div>
    <div
      className="payment-icon"
      title="Payoneer"
      style={{
        width: "40px",
        height: "40px",
        background: "#FF4800",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{ color: "#fff", fontWeight: "bold", fontSize: "14px" }}>
        P
      </span>
    </div>
    <div
      className="payment-icon"
      title="Bitcoin"
      style={{
        width: "40px",
        height: "40px",
        background: "#F7931A",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <i className="fab fa-bitcoin text-white"></i>
    </div>
  </div>
);

export default function TabbedSaaSProducts({
  products,
}: TabbedSaaSProductsProps) {
  const [activeId, setActiveId] = useState<number>(products[0]?.id || 0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const active = products.find((p) => p.id === activeId) || products[0];
  const stripRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [reviewPage, setReviewPage] = useState(0);

  const parsedKeyFeatures = safeJsonParse<KeyFeature>(active?.keyFeatures);
  const parsedPricingPlans = safeJsonParse<PricingPlan>(active?.pricingPlans);
  const parsedFeatureCards = safeJsonParse<FeatureCard>(active?.featureCards);
  const parsedClientReviews = safeJsonParse<ClientReview>(
    active?.clientReviews,
  );

  const reviewsPerPage = 3;
  const totalReviewPages = Math.ceil(
    parsedClientReviews.length / reviewsPerPage,
  );

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

  useEffect(() => {
    setReviewPage(0);
    setSelectedPlanIndex(0);
  }, [activeId]);

  useEffect(() => {
    if (totalReviewPages > 1) {
      const interval = setInterval(() => {
        setReviewPage((prev) => (prev + 1) % totalReviewPages);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [totalReviewPages]);

  const handleTabClick = useCallback(
    (id: number) => {
      if (id === activeId || isTransitioning) return;
      setIsTransitioning(true);
      if (contentRef.current) {
        contentRef.current.style.opacity = "0";
        contentRef.current.style.transform = "translateY(20px)";
      }
      setTimeout(() => {
        setActiveId(id);
        if (contentRef.current) {
          contentRef.current.style.opacity = "1";
          contentRef.current.style.transform = "translateY(0)";
        }
        setIsTransitioning(false);
      }, 300);
    },
    [activeId, isTransitioning],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, currentIndex: number) => {
      let newIndex = currentIndex;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        newIndex = (currentIndex + 1) % products.length;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        newIndex = (currentIndex - 1 + products.length) % products.length;
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleTabClick(products[currentIndex].id);
        return;
      } else {
        return;
      }
      const newTab = document.getElementById(`tab-${products[newIndex].id}`);
      if (newTab) newTab.focus();
      handleTabClick(products[newIndex].id);
    },
    [products, handleTabClick],
  );

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <i key={i} className="fa fa-star" style={{ color: "#ffc107" }}></i>,
        );
      } else if (i === fullStars && hasHalf) {
        stars.push(
          <i
            key={i}
            className="fa fa-star-half-o"
            style={{ color: "#ffc107" }}
          ></i>,
        );
      } else {
        stars.push(
          <i key={i} className="fa fa-star-o" style={{ color: "#6c757d" }}></i>,
        );
      }
    }
    return stars;
  };

  if (!products.length) {
    return (
      <section className="py-5" style={{ background: "#ffffff" }}>
        <div className="container text-center">
          <h3 style={{ color: "#1a1a2e" }}>No products available</h3>
          <p style={{ color: "#666" }}>Check back later for our SaaS solutions.</p>
        </div>
      </section>
    );
  }

  const currentPlan = parsedPricingPlans[selectedPlanIndex];
  const currentReviews = parsedClientReviews.slice(
    reviewPage * reviewsPerPage,
    (reviewPage + 1) * reviewsPerPage,
  );

  return (
    <>
      <style jsx>{`
        .saas-tab-btn {
          padding: 12px 24px;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          background: #f8f9fa;
          color: #333;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
          font-weight: 500;
        }
        .saas-tab-btn:hover {
          transform: scale(1.05);
          background: #e9ecef;
        }
        .saas-tab-btn.active {
          background: #f5a623;
          color: #000;
          border-color: #f5a623;
        }
        .stats-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
        }
        .users-badge {
          background: #1a1a2e;
          color: #fff;
        }
        .rating-badge {
          background: rgba(245, 166, 35, 0.15);
          color: #f5a623;
        }
        .feature-card-light {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 24px;
          height: 100%;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }
        .feature-card-light:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          border-color: rgba(245, 166, 35, 0.5);
        }
        .feature-card-dark {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 24px;
          height: 100%;
          transition: all 0.3s ease;
        }
        .feature-card-dark:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          border-color: rgba(245, 166, 35, 0.5);
        }
        .pricing-tab-light {
          flex: 1;
          padding: 12px 16px;
          border: none;
          border-bottom: 2px solid transparent;
          background: transparent;
          color: #6c757d;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .pricing-tab-light.active {
          color: #333;
          border-bottom-color: #f5a623;
        }
        .pricing-tab-light:hover {
          color: #333;
        }
        .review-card {
          background: #ffffff !important;
          border: 1px solid #e5e7eb !important;
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          transition: all 0.3s ease;
          color: #111 !important;
        }
        .review-card h6,
        .review-card .author-role,
        .review-card p,
        .review-card .fst-italic,
        .review-card .text-muted {
          color: #222 !important;
        }
        .review-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }
        .review-card p {
          color: #444;
        }
        .review-card i {
          color: #f5a623 !important;
        }
        .review-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 16px;
        }
        .review-avatar-placeholder {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #f5a623;
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: bold;
          margin: 0 auto 16px;
        }

        .dot-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .dot-indicator.active {
          width: 24px;
          border-radius: 4px;
          background: #f5a623;
        }
        .demo-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 16px 48px;
          font-size: 18px;
          font-weight: 600;
          background: linear-gradient(
            135deg,
            #667eea 0%,
            #764ba2 50%,
            #f5a623 100%
          );
          border: none;
          border-radius: 50px;
          color: #fff;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .demo-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
          color: #fff;
        }
        .payment-icon {
          transition: transform 0.3s ease;
        }
        .payment-icon:hover {
          transform: scale(1.1);
        }
      `}</style>

      <section style={{ background: "#ffffff", padding: "16px 0", borderBottom: "1px solid #e5e7eb" }}>
        <div className="container">
          <div
            ref={stripRef}
            className="d-flex gap-3 overflow-auto py-2"
            role="tablist"
            aria-label="SaaS Products"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((p, index) => {
              const isActive = p.id === activeId;
              return (
                <button
                  id={`tab-${p.id}`}
                  key={p.id}
                  role="tab"
                  tabIndex={isActive ? 0 : -1}
                  aria-selected={isActive}
                  aria-controls={`tabpanel-${p.id}`}
                  onClick={() => handleTabClick(p.id)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`saas-tab-btn ${isActive ? "active" : ""}`}
                >
                  {p.title}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div
        ref={contentRef}
        role="tabpanel"
        id={`tabpanel-${active?.id}`}
        aria-labelledby={`tab-${active?.id}`}
        style={{
          transition: "opacity 0.3s ease, transform 0.3s ease",
          background: "#ffffff",
        }}
      >
        <section style={{ padding: "32px 0", background: "#ffffff" }}>
          <div className="container">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-4">
              <div>
                <h2
                  className="mb-1"
                  style={{ fontSize: "2rem", fontWeight: "bold", color: "#1a1a2e" }}
                >
                  {active.title}
                </h2>
                {active.tagline && (
                  <p
                    style={{ color: "#f5a623", fontSize: "1.1rem", margin: 0 }}
                  >
                    {active.tagline}
                  </p>
                )}
                <p className="mt-3" style={{ maxWidth: "800px", color: "#666" }}>
                  {active.shortDescription}
                </p>
              </div>
              <div className="d-flex gap-3">
                <span className="stats-badge users-badge">
                  <i className="fa fa-users"></i>
                  {active.totalUsers || "0"}
                </span>
                <span className="stats-badge rating-badge">
                  <i className="fa fa-star"></i>
                  {(active.rating || 0).toFixed(1)}
                </span>
              </div>
            </div>

            {active.bannerImage && (
              <div
                className="mb-4"
                style={{ borderRadius: "16px", overflow: "hidden" }}
              >
                <img
                  src={active.bannerImage}
                  alt={active.title}
                  style={{
                    width: "100%",
                    maxHeight: "400px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}

            <div className="row g-4">
              <div className="col-lg-6">
                <div className="feature-card-light">
                  <h4 className="mb-4" style={{ color: "#1a1a2e" }}>Key Features</h4>
                  {parsedKeyFeatures.length > 0 ? (
                    <ul className="list-unstyled mb-0">
                      {parsedKeyFeatures.map((feature, index) => (
                        <li
                          key={index}
                          className="d-flex align-items-start gap-3 mb-3"
                          style={{ transition: "transform 0.3s ease" }}
                        >
                          <i className="fa fa-check-circle text-success mt-1"></i>
                          <div>
                            <strong style={{ color: "#1a1a2e" }}>
                              {feature.title}
                            </strong>
                            <p className="mb-0 small" style={{ color: "#666" }}>
                              {feature.description}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ color: "#666" }} className="mb-0">No features listed.</p>
                  )}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="feature-card-light">
                  <h4 className="mb-4" style={{ color: "#1a1a2e" }}>Project Price</h4>
                  {parsedPricingPlans.length > 0 ? (
                    <>
                      <div
                        className="d-flex"
                        style={{
                          borderBottom: "1px solid #e5e7eb",
                        }}
                      >
                        {parsedPricingPlans.map((plan, index) => (
                          <button
                            key={plan.name}
                            onClick={() => setSelectedPlanIndex(index)}
                            className={`pricing-tab-light ${selectedPlanIndex === index ? "active" : ""}`}
                          >
                            {plan.name}
                          </button>
                        ))}
                      </div>
                      <div className="text-center py-4">
                        <span
                          style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#1a1a2e" }}
                        >
                          {currentPlan?.price1Month || "$0"}
                        </span>
                        <span style={{ color: "#666" }}>/month</span>
                      </div>
                      <div
                        style={{
                          borderTop: "1px solid #e5e7eb",
                          paddingTop: "16px",
                        }}
                      >
                        <p className="text-center small mb-2" style={{ color: "#666" }}>
                          You can pay by
                        </p>
                        <PaymentIcons />
                      </div>
                    </>
                  ) : (
                    <p style={{ color: "#666" }} className="mb-0">Contact for pricing</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {(active.parallaxImage || active.parallaxTitle) && (
          <section
            style={{
              backgroundImage: active.parallaxImage
                ? `url(${active.parallaxImage})`
                : "linear-gradient(135deg, #1e3a5f 0%, #2d5a87 50%, #1e3a5f 100%)",
              backgroundAttachment: "fixed",
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
              minHeight: "350px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
              }}
            ></div>
            <div
              className="container position-relative text-center text-white py-5"
              style={{ zIndex: 2 }}
            >
              <h3 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
                {active.parallaxTitle || "Discover More"}
              </h3>
              {active.parallaxDescription && (
                <p
                  className="mx-auto mt-3"
                  style={{
                    maxWidth: "700px",
                    fontSize: "1.1rem",
                    opacity: 0.9,
                  }}
                >
                  {active.parallaxDescription}
                </p>
              )}
              {active.demoVideoUrl && (
                <div
                  className="mt-4 mx-auto"
                  style={{
                    maxWidth: "700px",
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}
                >
                  {active.demoVideoUrl.includes("youtube") ||
                  active.demoVideoUrl.includes("youtu.be") ? (
                    <iframe
                      width="100%"
                      height="400"
                      src={active.demoVideoUrl
                        .replace("watch?v=", "embed/")
                        .replace("youtu.be/", "www.youtube.com/embed/")}
                      title="Demo Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video
                      controls
                      className="w-100"
                      style={{ maxHeight: 400 }}
                    >
                      <source src={active.demoVideoUrl} type="video/mp4" />
                    </video>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {parsedFeatureCards.length > 0 && (
          <section style={{ background: "#f8f9fa", padding: "64px 0" }}>
            <div className="container">
              <div className="row g-4">
                {parsedFeatureCards.map((card, index) => (
                  <div key={index} className="col-md-4">
                    <div className="feature-card-light text-center">
                      <div
                        className="mb-3"
                        style={{
                          display: "inline-flex",
                          padding: "12px",
                          background: "rgba(245,166,35,0.15)",
                          borderRadius: "12px",
                        }}
                      >
                        <i
                          className={`fa ${card.icon}`}
                          style={{ fontSize: "2rem", color: "#f5a623" }}
                        ></i>
                      </div>
                      <h5 className="mb-2" style={{ color: "#1a1a2e" }}>{card.title}</h5>
                      <p className="mb-0" style={{ color: "#666" }}>{card.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {parsedClientReviews.length > 0 && (
          <section style={{ background: "#000000", padding: "64px 0" }}>
            <div className="container">
              <h3
                className="text-white text-center mb-5"
                style={{ fontSize: "1.75rem", fontWeight: "bold" }}
              >
                Client Reviews
              </h3>
              <div className="position-relative">
                {totalReviewPages > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setReviewPage(
                          (prev) =>
                            (prev - 1 + totalReviewPages) % totalReviewPages,
                        )
                      }
                      className="btn btn-dark rounded-circle position-absolute"
                      style={{
                        left: "-20px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 10,
                        width: "40px",
                        height: "40px",
                      }}
                    >
                      <i className="fa fa-chevron-left"></i>
                    </button>
                    <button
                      onClick={() =>
                        setReviewPage((prev) => (prev + 1) % totalReviewPages)
                      }
                      className="btn btn-dark rounded-circle position-absolute"
                      style={{
                        right: "-20px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 10,
                        width: "40px",
                        height: "40px",
                      }}
                    >
                      <i className="fa fa-chevron-right"></i>
                    </button>
                  </>
                )}
                <div className="row g-4">
                  {currentReviews.map((review, index) => (
                    <div key={index} className="col-md-4">
                      <div className="review-card">
                        {review.authorImage ? (
                          <img
                            src={review.authorImage}
                            alt={review.authorName}
                            className="review-avatar"
                          />
                        ) : (
                          <div className="review-avatar-placeholder">
                            {review.authorName.charAt(0)}
                          </div>
                        )}
                        <h6 className="mb-1">{review.authorName}</h6>
                        {review.authorRole && (
                          <p className="small mb-2">{review.authorRole}</p>
                        )}
                        <div className="mb-3">{renderStars(review.rating)}</div>
                        <p className="text-muted fst-italic">
                          &ldquo;{review.quote}&rdquo;
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {totalReviewPages > 1 && (
                  <div className="d-flex justify-content-center gap-2 mt-4">
                    {Array.from({ length: totalReviewPages }).map(
                      (_, index) => (
                        <button
                          key={index}
                          onClick={() => setReviewPage(index)}
                          className={`dot-indicator ${index === reviewPage ? "active" : ""}`}
                          style={{ border: "none" }}
                          aria-label={`Go to page ${index + 1}`}
                        />
                      ),
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        <section style={{ background: "#0d0d1a", padding: "48px 0" }}>
          <div className="container text-center">
            <Link
              href={
                active.requestDemoUrl ||
                active.liveDemoUrl ||
                `/saas-products/${active.slug}`
              }
              className="demo-btn"
            >
              {active.requestDemoText || "Request For Demo"}
              <i className="fa fa-rocket"></i>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
