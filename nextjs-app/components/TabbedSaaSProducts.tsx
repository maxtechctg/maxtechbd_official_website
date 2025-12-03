"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

interface KeyFeature {
  icon: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonUrl?: string;
}

interface PricingPlan {
  name: string;
  price1Month: string;
  price6Month: string;
  price12Month: string;
  features: string[];
  isPopular: boolean;
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

function safeJsonParse<T>(json: string | null | undefined, fallback: T[] = []): T[] {
  if (!json) return fallback;
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    console.error('Failed to parse JSON:', json);
    return fallback;
  }
}

export default function TabbedSaaSProducts({ products }: TabbedSaaSProductsProps) {
  const [activeId, setActiveId] = useState<number>(products[0]?.id || 0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const active = products.find((p) => p.id === activeId) || products[0];
  const stripRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [reviewSlide, setReviewSlide] = useState(0);

  const parsedKeyFeatures = safeJsonParse<KeyFeature>(active?.keyFeatures);
  const parsedPricingPlans = safeJsonParse<PricingPlan>(active?.pricingPlans);
  const parsedFeatureCards = safeJsonParse<FeatureCard>(active?.featureCards);
  const parsedClientReviews = safeJsonParse<ClientReview>(active?.clientReviews);

  useEffect(() => {
    const el = document.getElementById(`tab-${activeId}`);
    const container = stripRef.current;
    if (!el || !container) return;
    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    if (elRect.left < containerRect.left || elRect.right > containerRect.right) {
      const scrollLeft = el.offsetLeft - container.clientWidth / 2 + el.clientWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeId]);

  useEffect(() => {
    setReviewSlide(0);
  }, [activeId]);

  useEffect(() => {
    if (parsedClientReviews.length > 1) {
      const interval = setInterval(() => {
        setReviewSlide((prev) => (prev + 1) % parsedClientReviews.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [parsedClientReviews.length]);

  const handleTabClick = useCallback(
    (id: number) => {
      if (id === activeId || isTransitioning) return;
      setIsTransitioning(true);
      if (contentRef.current) {
        contentRef.current.classList.add("content-fade-out");
      }
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
    [activeId, isTransitioning]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, currentIndex: number) => {
      let newIndex = currentIndex;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        newIndex = (currentIndex + 1) % products.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        newIndex = (currentIndex - 1 + products.length) % products.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        newIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        newIndex = products.length - 1;
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleTabClick(products[currentIndex].id);
        return;
      } else {
        return;
      }
      const newTab = document.getElementById(`tab-${products[newIndex].id}`);
      if (newTab) {
        newTab.focus();
      }
      handleTabClick(products[newIndex].id);
    },
    [products, handleTabClick]
  );

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<i key={i} className="fa fa-star text-warning"></i>);
      } else if (i === fullStars && hasHalf) {
        stars.push(<i key={i} className="fa fa-star-half-o text-warning"></i>);
      } else {
        stars.push(<i key={i} className="fa fa-star-o text-muted"></i>);
      }
    }
    return stars;
  };

  if (!products.length) {
    return (
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h3>No products available</h3>
          <p className="text-muted">Check back later for our SaaS solutions.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Section 1: Product Tabs */}
      <section className="saas-tabs-section bg-dark py-4">
        <div className="container">
          <div className="position-relative">
            <div 
              ref={stripRef} 
              className="d-flex gap-3 overflow-auto py-2 tab-strip-dark"
              role="tablist"
              aria-label="SaaS Products"
            >
              {products.map((p, index) => {
                const isActive = p.id === activeId;
                return (
                  <div
                    id={`tab-${p.id}`}
                    key={p.id}
                    role="tab"
                    tabIndex={isActive ? 0 : -1}
                    aria-selected={isActive}
                    aria-controls={`tabpanel-${p.id}`}
                    onClick={() => handleTabClick(p.id)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={`saas-tab-item flex-shrink-0 ${isActive ? "active" : ""}`}
                    style={{ cursor: 'pointer' }}
                  >
                    {p.title}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div 
        ref={contentRef} 
        className="saas-product-content"
        role="tabpanel"
        id={`tabpanel-${active?.id}`}
        aria-labelledby={`tab-${active?.id}`}
      >
        {/* Section 2: Title + Total User (side by side) */}
        <section className="saas-title-section bg-dark text-white py-4">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="title-box p-3 border border-secondary rounded">
                  <h1 className="mb-0 h3">{active.title}</h1>
                  {active.tagline && <p className="text-warning mb-0 mt-2">{active.tagline}</p>}
                </div>
              </div>
              <div className="col-md-6">
                <div className="total-user-box p-3 border border-secondary rounded text-center">
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <i className="fa fa-users fs-3 text-primary"></i>
                    <div>
                      <h4 className="mb-0">{active.totalUsers || '0'}</h4>
                      <small className="text-muted">Total Users</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Short Description + Ratings (side by side) */}
        <section className="saas-desc-section bg-dark text-white py-4">
          <div className="container">
            <div className="row align-items-stretch">
              <div className="col-md-6 mb-3 mb-md-0">
                <div className="desc-box p-3 border border-secondary rounded h-100">
                  <h6 className="text-uppercase text-muted mb-2">Short Description</h6>
                  <p className="mb-0">{active.shortDescription}</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="ratings-box p-3 border border-secondary rounded h-100 text-center">
                  <h6 className="text-uppercase text-muted mb-2">Ratings</h6>
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <div className="fs-4">{renderStars(active.rating || 0)}</div>
                    <span className="fs-4 fw-bold">{(active.rating || 0).toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Banner (full width) */}
        {active.bannerImage && (
          <section className="saas-banner-section">
            <div className="container-fluid p-0">
              <div className="banner-wrapper position-relative" style={{ minHeight: '300px' }}>
                <img 
                  src={active.bannerImage} 
                  alt={active.title}
                  className="w-100"
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                />
              </div>
            </div>
          </section>
        )}

        {/* Section 5: Key Features + Project Price (side by side) */}
        {(parsedKeyFeatures.length > 0 || parsedPricingPlans.length > 0) && (
          <section className="saas-features-pricing bg-dark text-white py-5">
            <div className="container">
              <div className="row">
                {/* Key Features - Left Side */}
                <div className="col-lg-6 mb-4 mb-lg-0">
                  <div className="key-feature-section p-4 border border-secondary rounded h-100">
                    <h3 className="mb-4 text-center">Key Features</h3>
                    {parsedKeyFeatures.length > 0 ? (
                      <div className="key-features-list">
                        {parsedKeyFeatures.map((feature, index) => (
                          <div key={index} className="feature-item d-flex align-items-start mb-3 p-3 bg-dark border border-secondary rounded">
                            <div className="feature-icon me-3">
                              <i className={`fa ${feature.icon} fs-4 text-primary`}></i>
                            </div>
                            <div>
                              <h6 className="mb-1">{feature.title}</h6>
                              <p className="mb-0 small text-muted">{feature.description}</p>
                              {feature.buttonText && feature.buttonUrl && (
                                <a href={feature.buttonUrl} className="btn btn-sm btn-outline-primary mt-2" target="_blank" rel="noopener noreferrer">
                                  {feature.buttonText}
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted text-center">No features available</p>
                    )}
                  </div>
                </div>

                {/* Project Price - Right Side */}
                <div className="col-lg-6">
                  <div className="pricing-section p-4 border border-secondary rounded h-100">
                    <h3 className="mb-4 text-center">Project Price</h3>
                    {parsedPricingPlans.length > 0 ? (
                      <div className="pricing-table">
                        <table className="table table-dark table-bordered">
                          <thead>
                            <tr>
                              <th>Plan</th>
                              <th className="text-center">1 Month</th>
                              <th className="text-center">6 Month</th>
                              <th className="text-center">12 Month</th>
                            </tr>
                          </thead>
                          <tbody>
                            {parsedPricingPlans.map((plan, index) => (
                              <tr key={index} className={plan.isPopular ? 'table-primary' : ''}>
                                <td>
                                  <strong>{plan.name}</strong>
                                  {plan.isPopular && <span className="badge bg-warning text-dark ms-2">Popular</span>}
                                </td>
                                <td className="text-center">{plan.price1Month || '-'}</td>
                                <td className="text-center">{plan.price6Month || '-'}</td>
                                <td className="text-center">{plan.price12Month || '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {parsedPricingPlans[0]?.features && parsedPricingPlans[0].features.length > 0 && (
                          <div className="mt-3">
                            <h6 className="text-muted">All plans include:</h6>
                            <ul className="list-unstyled">
                              {parsedPricingPlans[0].features.map((feature, i) => (
                                <li key={i} className="mb-1">
                                  <i className="fa fa-check text-success me-2"></i>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-muted text-center">Contact for pricing</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section 6: Parallax */}
        {(active.parallaxTitle || active.demoVideoUrl || active.parallaxImage) && (
          <section
            className="saas-parallax-section py-5"
            style={{
              backgroundImage: active.parallaxImage ? `url(${active.parallaxImage})` : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              backgroundAttachment: 'fixed',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
            }}
          >
            <div className="parallax-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)' }}></div>
            <div className="container position-relative" style={{ zIndex: 2 }}>
              <div className="row align-items-center justify-content-center">
                <div className="col-lg-10 text-center text-white">
                  {active.parallaxTitle && <h2 className="mb-3 display-5">{active.parallaxTitle}</h2>}
                  {active.parallaxDescription && <p className="lead mb-4">{active.parallaxDescription}</p>}
                  {active.demoVideoUrl && (
                    <div className="video-wrapper rounded shadow-lg overflow-hidden mx-auto" style={{ maxWidth: '700px' }}>
                      {active.demoVideoUrl.includes('youtube') || active.demoVideoUrl.includes('youtu.be') ? (
                        <iframe
                          width="100%"
                          height="400"
                          src={active.demoVideoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'www.youtube.com/embed/')}
                          title="Demo Video"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <video controls className="w-100" style={{ maxHeight: 400 }}>
                          <source src={active.demoVideoUrl} type="video/mp4" />
                        </video>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section 7: Feature Cards (3 columns) */}
        {parsedFeatureCards.length > 0 && (
          <section className="saas-feature-cards bg-dark text-white py-5">
            <div className="container">
              <div className="row g-4">
                {parsedFeatureCards.map((card, index) => (
                  <div key={index} className="col-md-4">
                    <div className="feature-card-item p-4 border border-secondary rounded h-100 text-center">
                      <div className="feature-card-icon mb-3">
                        <i className={`fa ${card.icon} fs-1 text-primary`}></i>
                      </div>
                      <h5 className="mb-2">{card.title}</h5>
                      <p className="text-muted mb-0 small">{card.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Section 8: Client Review */}
        {parsedClientReviews.length > 0 && (
          <section className="saas-client-review bg-dark text-white py-5">
            <div className="container">
              <div className="client-review-wrapper p-4 border border-secondary rounded">
                <h3 className="text-center mb-4">Client Reviews</h3>
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    <div className="client-review-carousel position-relative">
                      {parsedClientReviews.map((review, index) => (
                        <div
                          key={index}
                          className={`review-slide ${index === reviewSlide ? 'active' : ''}`}
                          style={{
                            opacity: index === reviewSlide ? 1 : 0,
                            position: index === reviewSlide ? 'relative' : 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            transition: 'opacity 0.5s ease-in-out',
                          }}
                        >
                          <div className="text-center">
                            {review.authorImage && (
                              <img
                                src={review.authorImage}
                                alt={review.authorName}
                                className="rounded-circle mb-3"
                                style={{ width: 80, height: 80, objectFit: 'cover' }}
                              />
                            )}
                            <div className="mb-3">{renderStars(review.rating)}</div>
                            <blockquote className="blockquote">
                              <p className="mb-3 fst-italic">&ldquo;{review.quote}&rdquo;</p>
                            </blockquote>
                            <div className="mt-3">
                              <strong>{review.authorName}</strong>
                              <br />
                              <small className="text-muted">{review.authorRole}</small>
                              {review.companyUrl && (
                                <div className="mt-2">
                                  <a href={review.companyUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-light">
                                    Visit Company
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      {parsedClientReviews.length > 1 && (
                        <div className="d-flex justify-content-center gap-2 mt-4">
                          {parsedClientReviews.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setReviewSlide(index)}
                              className={`btn btn-sm rounded-circle ${index === reviewSlide ? 'btn-primary' : 'btn-outline-light'}`}
                              style={{ width: 12, height: 12, padding: 0 }}
                              aria-label={`Go to review ${index + 1}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section 9: Request For Demo */}
        <section className="saas-request-demo bg-dark text-white py-5">
          <div className="container text-center">
            <a 
              href={active.requestDemoUrl || '/contact'} 
              className="btn btn-lg btn-outline-light px-5 py-3"
            >
              {active.requestDemoText || 'Request For Demo'}
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
