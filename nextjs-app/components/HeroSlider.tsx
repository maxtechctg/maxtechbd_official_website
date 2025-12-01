'use client';

import Link from 'next/link';

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
  const formatTitle = (title: string, highlight: string | null) => {
    if (!highlight) return title;
    const parts = title.split(highlight);
    if (parts.length === 1) return title;
    return (
      <>
        {parts[0]}<span className="underline">{highlight}</span>{parts[1]}
      </>
    );
  };

  return (
    <section className="text-light no-top no-bottom position-relative z-1000">
      <div className="v-center">
        <div className="swiper">
          <div className="swiper-wrapper">
            {slides.map((slide) => (
              <div key={slide.id} className="swiper-slide" data-jarallax-element="150">
                <div 
                  className="swiper-inner" 
                  data-bgimage={`url(${slide.backgroundImage})`}
                >
                  <div className="sw-caption">
                    <div className="container">
                      <div className="row gx-5 align-items-center">
                        <div className="col-lg-8 mb-sm-20">
                          <div className="subtitle s2 mb-4">{slide.subtitle}</div>
                          <h1 className="slider-title">
                            {formatTitle(slide.title, slide.titleHighlight)}
                          </h1>
                        </div>
                        <div className="col-lg-6">
                          <p className="slider-teaser">{slide.description}</p>
                          <hr className="s2" />
                          <div className="spacer-10"></div>
                          {slide.primaryBtnText && slide.primaryBtnUrl && (
                            <Link className="btn-main mb10" href={slide.primaryBtnUrl}>
                              {slide.primaryBtnText}
                            </Link>
                          )}
                          &nbsp;
                          {slide.secondaryBtnText && slide.secondaryBtnUrl && (
                            <Link className="btn-line mb10" href={slide.secondaryBtnUrl}>
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
