"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

declare global {
  interface Window {
    Swiper: any;
  }
}

interface HeroSlide {
  id: number;
  subtitle: string;
  title: string;
  titleHighlight: string | null;
  description: string;
  primaryBtnText: string | null;
  primaryBtnUrl: string | null;
  secondaryBtnText: string | null;
  secondaryBtnUrl: string | null;
  backgroundImage: string;
}

interface HeroSliderProps {
  slides: HeroSlide[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const swiperRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initSwiper = () => {
      if (typeof window === "undefined" || !window.Swiper) return;

      if (swiperRef.current) {
        swiperRef.current.destroy(true, true);
        swiperRef.current = null;
      }

      const container = containerRef.current;
      if (!container) return;

      container.querySelectorAll("[data-bgimage]").forEach((el) => {
        const bgImage = el.getAttribute("data-bgimage");
        if (bgImage) {
          (el as HTMLElement).style.backgroundImage = bgImage;
        }
      });

      const swiperEl = container.querySelector(".swiper");
      if (!swiperEl) return;

      swiperRef.current = new window.Swiper(swiperEl, {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        direction: "horizontal",
        loop: true,
        speed: 1200,
        watchSlidesProgress: true,
        parallax: true,
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    };

    const checkAndInit = () => {
      if (window.Swiper) initSwiper();
      else setTimeout(checkAndInit, 100);
    };

    const timer = setTimeout(checkAndInit, 50);

    return () => {
      clearTimeout(timer);
      if (swiperRef.current) {
        swiperRef.current.destroy(true, true);
        swiperRef.current = null;
      }
    };
  }, [slides]);

  const formatTitle = (title: string, highlight: string | null) => {
    if (!highlight) return title;

    const parts = title.split(highlight);
    if (parts.length === 1) return title;

    return (
      <>
        {parts[0]}
        <span
          className="underline"
          style={{
            backgroundColor: "#CC181F",
            height: "6px",
            display: "inline-block",
          }}
        >
          {highlight}
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <section
      ref={containerRef}
      className="text-light no-top no-bottom position-relative z-1000"
      data-header-theme="dark"
    >
      <div className="v-center">
        <div className="swiper">
          <div className="swiper-wrapper">
            {slides.map((slide) => (
              <div key={slide.id} className="swiper-slide">
                <div
                  className="swiper-inner"
                  data-bgimage={`url(${slide.backgroundImage})`}
                  style={{ backgroundImage: `url(${slide.backgroundImage})` }}
                >
                  <div className="sw-caption">
                    <div className="container">
                      <div className="row gx-5 align-items-center">
                        <div className="col-lg-8 mb-sm-20">
                          {/* 🔥 SUBTITLE MORE WHITE */}
                          <div
                            className="subtitle s2 mb-4"
                            style={{ color: "#FFFFFF" }}
                          >
                            {slide.subtitle}
                          </div>

                          {/* 🔥 TITLE WITH RED UNDERLINE */}
                          <h1
                            className="slider-title"
                            style={{ textTransform: "lowercase" }}
                          >
                            {formatTitle(slide.title, slide.titleHighlight)}
                          </h1>
                        </div>

                        <div className="col-lg-6">
                          {/* 🔥 DESCRIPTION MORE WHITE */}
                          <p
                            className="slider-teaser"
                            style={{ color: "#FFFFFF" }}
                          >
                            {slide.description}
                          </p>
                          <hr className="s2" />
                          <div className="spacer-10"></div>
                          {/* 🔴 PRIMARY BUTTON (solid red + red hover shadow) */}
                          {slide.primaryBtnText && slide.primaryBtnUrl && (
                            <Link
                              className="btn-main mb10"
                              href={slide.primaryBtnUrl}
                              style={{
                                backgroundColor: "#CC181F",
                                borderColor: "#CC181F",
                                color: "#fff",
                                transition: "all 0.3s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow =
                                  "0 8px 20px rgba(204, 24, 31, 0.45)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = "none";
                              }}
                            >
                              {slide.primaryBtnText}
                            </Link>
                          )}
                          &nbsp;
                          {/* ⚪ SECONDARY BUTTON (white text + white border + red hover) */}
                          {slide.secondaryBtnText && slide.secondaryBtnUrl && (
                            <Link
                              className="btn-line mb10"
                              href={slide.secondaryBtnUrl}
                              style={{
                                borderColor: "#FFFFFF",
                                color: "#FFFFFF",
                                transition: "all 0.3s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  "#CC181F";
                                e.currentTarget.style.color = "#fff";
                                e.currentTarget.style.borderColor = "#CC181F";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  "transparent";
                                e.currentTarget.style.color = "#fff";
                                e.currentTarget.style.borderColor = "#FFFFFF";
                              }}
                            >
                              {slide.secondaryBtnText}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sw-overlay s2"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="swiper-pagination"></div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
          <div className="swiper-scrollbar"></div>
        </div>
      </div>
    </section>
  );
}
