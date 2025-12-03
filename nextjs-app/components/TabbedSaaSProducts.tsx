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
  price: string;
  period: string;
  features: string[];
  isPopular: boolean;
  buttonText: string;
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
}

interface TabbedSaaSProductsProps {
  products: SaaSProduct[];
}

export default function TabbedSaaSProducts({ products }: TabbedSaaSProductsProps) {
  const [activeId, setActiveId] = useState<number>(products[0]?.id || 0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const active = products.find((p) => p.id === activeId) || products[0];
  const stripRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [reviewSlide, setReviewSlide] = useState(0);

  const parsedKeyFeatures: KeyFeature[] = active?.keyFeatures ? JSON.parse(active.keyFeatures) : [];
  const parsedPricingPlans: PricingPlan[] = active?.pricingPlans ? JSON.parse(active.pricingPlans) : [];
  const parsedFeatureCards: FeatureCard[] = active?.featureCards ? JSON.parse(active.featureCards) : [];
  const parsedClientReviews: ClientReview[] = active?.clientReviews ? JSON.parse(active.clientReviews) : [];
  const parsedFeatures = active?.features?.split('|').filter(Boolean) || [];

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
      <section className="tabbed-saas compact bg-light py-5">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
            <div>
              <small className="text-uppercase text-primary fw-bold">Products</small>
              <h2 className="mt-1 mb-1">Our SaaS Products</h2>
              <p className="text-muted mb-0 small">
                Switch between modules to see details at a glance.
              </p>
            </div>
            <div className="mt-2 mt-md-0">
              <button className="btn btn-outline-primary btn-sm">Talk to our team</button>
            </div>
          </div>

          <div className="position-relative mb-4">
            <div className="fade-edge-left d-none d-md-block" />
            <div className="fade-edge-right d-none d-md-block" />
            <div ref={stripRef} className="d-flex gap-3 overflow-auto px-1 py-2 tab-strip">
              {products.map((p) => {
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
                          <strong>{p.title.charAt(0)}</strong>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mb-0 mt-1">{p.title}</h6>
                          <small className="text-muted d-block">{p.shortDescription.slice(0, 50)}...</small>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div ref={contentRef} className="saas-product-content">
        {/* 1. Hero Banner with Title & Description */}
        <section
          className="saas-hero py-5"
          style={{
            backgroundImage: active.bannerImage ? `url(${active.bannerImage})` : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h1 className="text-white mb-3">{active.title}</h1>
                {active.tagline && <p className="text-warning fs-5 mb-3">{active.tagline}</p>}
                <p className="text-white-50 mb-4">{active.shortDescription}</p>
                {active.liveDemoUrl && (
                  <a href={active.liveDemoUrl} className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">
                    View Live Demo
                  </a>
                )}
              </div>
              <div className="col-lg-6 text-center">
                {active.mainImage && (
                  <img src={active.mainImage} alt={active.title} className="img-fluid rounded shadow-lg" style={{ maxHeight: 400 }} />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 2. Rating & Stats */}
        {(active.rating || active.totalUsers) && (
          <section className="py-4 bg-white">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-auto">
                  <div className="d-flex align-items-center gap-4 flex-wrap justify-content-center">
                    {active.rating !== null && active.rating !== undefined && active.rating > 0 && (
                      <div className="d-flex align-items-center gap-2">
                        <div className="fs-4">{renderStars(active.rating)}</div>
                        <span className="fs-5 fw-bold">{active.rating.toFixed(1)}</span>
                      </div>
                    )}
                    {active.totalUsers && (
                      <div className="d-flex align-items-center gap-2">
                        <i className="fa fa-users fs-4 text-primary"></i>
                        <span className="fs-5 fw-bold">{active.totalUsers}</span>
                        <span className="text-muted">Users</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. Key Features Grid (Numbered Cards with Icons) */}
        {parsedKeyFeatures.length > 0 && (
          <section className="py-5 bg-light">
            <div className="container">
              <div className="text-center mb-5">
                <h2>Key Features</h2>
                <p className="text-muted">What makes {active.title} stand out</p>
              </div>
              <div className="row g-4">
                {parsedKeyFeatures.map((feature, index) => (
                  <div key={index} className="col-md-6 col-lg-3">
                    <div className="card h-100 border-0 shadow-sm key-feature-card">
                      <div className="card-body p-4 position-relative">
                        <span className="feature-number">{String(index + 1).padStart(2, '0')}</span>
                        <div className="feature-icon mb-3">
                          <i className={`fa ${feature.icon}`}></i>
                        </div>
                        <h5 className="card-title">{feature.title}</h5>
                        <p className="card-text text-muted small">{feature.description}</p>
                        {feature.buttonText && feature.buttonUrl && (
                          <a href={feature.buttonUrl} className="btn btn-sm btn-outline-primary mt-2">
                            {feature.buttonText}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 4. Pricing Plans */}
        {parsedPricingPlans.length > 0 && (
          <section className="py-5 bg-white">
            <div className="container">
              <div className="text-center mb-5">
                <h2>Pricing Plans</h2>
                <p className="text-muted">Choose the plan that fits your needs</p>
              </div>
              <div className="row g-4 justify-content-center">
                {parsedPricingPlans.map((plan, index) => (
                  <div key={index} className="col-md-6 col-lg-4">
                    <div className={`card h-100 ${plan.isPopular ? 'border-primary shadow-lg' : 'border-light'}`}>
                      {plan.isPopular && (
                        <div className="card-header bg-primary text-white text-center py-2">
                          <small className="fw-bold">MOST POPULAR</small>
                        </div>
                      )}
                      <div className="card-body p-4 text-center">
                        <h4 className="card-title">{plan.name}</h4>
                        <div className="my-4">
                          <span className="display-4 fw-bold">{plan.price}</span>
                          <span className="text-muted">/{plan.period}</span>
                        </div>
                        <ul className="list-unstyled text-start mb-4">
                          {plan.features.map((f, i) => (
                            <li key={i} className="py-2 border-bottom">
                              <i className="fa fa-check text-success me-2"></i>
                              {f}
                            </li>
                          ))}
                        </ul>
                        <button className={`btn w-100 ${plan.isPopular ? 'btn-primary' : 'btn-outline-primary'}`}>
                          {plan.buttonText}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 5. Parallax Video Section */}
        {(active.parallaxTitle || active.demoVideoUrl) && (
          <section
            className="py-5 parallax-section"
            style={{
              backgroundImage: active.parallaxImage ? `url(${active.parallaxImage})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundAttachment: 'fixed',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="parallax-overlay"></div>
            <div className="container position-relative" style={{ zIndex: 2 }}>
              <div className="row align-items-center">
                <div className="col-lg-6 text-white mb-4 mb-lg-0">
                  {active.parallaxTitle && <h2 className="mb-3">{active.parallaxTitle}</h2>}
                  {active.parallaxDescription && <p className="lead mb-4">{active.parallaxDescription}</p>}
                  {active.liveDemoUrl && (
                    <a href={active.liveDemoUrl} className="btn btn-light btn-lg" target="_blank" rel="noopener noreferrer">
                      Try Demo
                    </a>
                  )}
                </div>
                <div className="col-lg-6">
                  {active.demoVideoUrl && (
                    <div className="video-wrapper rounded shadow-lg overflow-hidden">
                      {active.demoVideoUrl.includes('youtube') || active.demoVideoUrl.includes('youtu.be') ? (
                        <iframe
                          width="100%"
                          height="315"
                          src={active.demoVideoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'www.youtube.com/embed/')}
                          title="Demo Video"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <video controls className="w-100" style={{ maxHeight: 315 }}>
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

        {/* 6. Feature Detail Cards */}
        {parsedFeatureCards.length > 0 && (
          <section className="py-5 bg-light">
            <div className="container">
              <div className="text-center mb-5">
                <h2>Features & Details</h2>
                <p className="text-muted">Everything you need to know</p>
              </div>
              <div className="row g-4">
                {parsedFeatureCards.map((card, index) => (
                  <div key={index} className="col-md-6 col-lg-4">
                    <div className="card h-100 border-0 shadow-sm feature-detail-card">
                      <div className="card-body p-4 text-center">
                        <div className="feature-detail-icon mb-3">
                          <i className={`fa ${card.icon}`}></i>
                        </div>
                        <h5 className="card-title">{card.title}</h5>
                        <p className="card-text text-muted">{card.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Basic Features (from pipe-separated list) */}
        {parsedFeatures.length > 0 && (
          <section className="py-5 bg-white">
            <div className="container">
              <div className="text-center mb-5">
                <h2>Core Features</h2>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <ul className="list-unstyled row">
                    {parsedFeatures.map((feature, index) => (
                      <li key={index} className="col-md-6 mb-3">
                        <div className="d-flex align-items-start">
                          <i className="fa fa-check-circle text-primary me-2 mt-1"></i>
                          <span>{feature.trim()}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 7. Client Reviews Carousel */}
        {parsedClientReviews.length > 0 && (
          <section className="py-5 bg-dark text-white">
            <div className="container">
              <div className="text-center mb-5">
                <h2>What Our Clients Say</h2>
                <p className="text-white-50">Real feedback from real users</p>
              </div>
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
                            <small className="text-white-50">{review.authorRole}</small>
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
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Long Description */}
        {active.longDescription && (
          <section className="py-5 bg-white">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="prose" dangerouslySetInnerHTML={{ __html: active.longDescription.replace(/\n/g, '<br />') }} />
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
