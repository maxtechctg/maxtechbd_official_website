'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    jQuery: any;
    $: any;
    Swiper: any;
    WOW: any;
    jarallax: any;
  }
}

export default function ScriptInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    const initializeScripts = () => {
      if (typeof window === 'undefined') return;
      
      const $ = window.jQuery || window.$;
      if (!$) return;

      $('[data-bgimage]').each(function(this: HTMLElement) {
        const $this = $(this);
        const bgImage = $this.attr('data-bgimage');
        if (bgImage) {
          $this.css('background-image', bgImage);
        }
      });

      if (window.WOW) {
        try {
          new window.WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
            mobile: true,
            live: true
          }).init();
        } catch (e) {
        }
      }

      if (window.jarallax) {
        try {
          $(".jarallax").jarallax({
            speed: 0.2
          });
        } catch (e) {
        }
      }

      if ($.fn && $.fn.owlCarousel) {
        try {
          const $testimonialCarousel = $('#testimonial-carousel');
          if ($testimonialCarousel.length && !$testimonialCarousel.hasClass('owl-loaded')) {
            $testimonialCarousel.owlCarousel({
              loop: true,
              margin: 30,
              nav: false,
              dots: true,
              autoplay: true,
              autoplayTimeout: 4000,
              responsive: {
                0: { items: 1 },
                600: { items: 2 },
                1000: { items: 3 },
                1400: { items: 4 }
              }
            });
          }

          const $clientCarousel = $('#client-carousel, .client-carousel');
          $clientCarousel.each(function(this: HTMLElement) {
            const $this = $(this);
            if (!$this.hasClass('owl-loaded')) {
              $this.owlCarousel({
                loop: true,
                margin: 30,
                nav: false,
                dots: false,
                autoplay: true,
                autoplayTimeout: 2000,
                responsive: {
                  0: { items: 2 },
                  600: { items: 3 },
                  1000: { items: 5 },
                  1400: { items: 6 }
                }
              });
            }
          });
        } catch (e) {
        }
      }

      $('.de-counter').each(function(this: HTMLElement) {
        const $this = $(this);
        if (!$this.hasClass('counted')) {
          $this.addClass('counted');
        }
      });

      if ($.fn && $.fn.isotope) {
        try {
          const $gallery = $('[data-filters]');
          if ($gallery.length) {
            $gallery.isotope({
              itemSelector: '.gallery-item',
              layoutMode: 'fitRows'
            });
          }
        } catch (e) {
        }
      }
    };

    const timer = setTimeout(initializeScripts, 150);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
