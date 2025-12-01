'use client';

interface Testimonial {
  id: number;
  authorName: string;
  authorRole: string;
  authorImage: string | null;
  quote: string;
  rating: number;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  subtitle?: string;
  rating?: string;
}

export default function TestimonialsCarousel({ 
  testimonials,
  subtitle = 'Customer reviews',
  rating = '4.85 out of 5'
}: TestimonialsCarouselProps) {
  const renderStars = (ratingValue: number) => {
    return Array.from({ length: ratingValue }, (_, i) => (
      <i key={i} className="fa fa-star"></i>
    ));
  };

  return (
    <section className="bg-color">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-light">
            <div className="subtitle s2 mb20">{subtitle}</div>
            <h2 className="wow fadeInUp">{rating}</h2>
            <div className="spacer-20"></div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="owl-carousel owl-theme wow fadeInUp" id="testimonial-carousel">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="item">
                <div className="de_testi s2">
                  <blockquote>
                    <div className="de_testi_by">
                      {testimonial.authorImage && (
                        <img alt={testimonial.authorName} src={testimonial.authorImage} />
                      )}
                      <div>
                        {testimonial.authorName}
                        <span>{testimonial.authorRole}</span>
                      </div>
                    </div>
                    <p>&quot;{testimonial.quote}&quot;</p>
                    <div className="de-rating-ext">
                      <span className="d-stars">
                        {renderStars(testimonial.rating)}
                      </span>
                    </div>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
