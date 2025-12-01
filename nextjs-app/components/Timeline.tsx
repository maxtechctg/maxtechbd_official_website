'use client';

interface TimelineItem {
  id: number;
  year: string;
  title: string;
  description: string;
  images: string[];
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <section className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div className="site-timeline-content">
              {items.map((item, index) => (
                <div key={item.id} className={`de-timeline-article ${index % 2 === 0 ? 'odd' : 'even'}`}>
                  <div className="site-center-line"></div>
                  
                  {index % 2 === 0 ? (
                    <>
                      <div className="content-left-container">
                        <div className="owl-single-dots owl-carousel owl-theme">
                          {item.images.map((img, imgIndex) => (
                            <div key={imgIndex} className="item">
                              <img src={img} alt={item.title} />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="content-right-container">
                        <div className="year__">
                          <div className="d-line"></div>
                          <h4 className="de-timeline-year">{item.year}</h4>
                        </div>
                        <div className="content-right">
                          <h3 className="de-timeline-title">{item.title}</h3>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="content-left-container">
                        <div className="year__">
                          <div className="d-line"></div>
                          <h4 className="de-timeline-year">{item.year}</h4>
                        </div>
                        <div className="content-right">
                          <h3 className="de-timeline-title">{item.title}</h3>
                          <p>{item.description}</p>
                        </div>
                      </div>
                      <div className="content-right-container">
                        <div className="owl-single-dots owl-carousel owl-theme">
                          {item.images.map((img, imgIndex) => (
                            <div key={imgIndex} className="item">
                              <img src={img} alt={item.title} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div className="meta-dot"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
