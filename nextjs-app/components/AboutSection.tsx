import Link from 'next/link';

interface AboutSectionProps {
  subtitle: string;
  heading: string;
  description: string;
  buttonText: string | null;
  buttonUrl: string | null;
  image1: string | null;
  image2: string | null;
}

export default function AboutSection({ 
  subtitle, 
  heading, 
  description, 
  buttonText, 
  buttonUrl, 
  image1, 
  image2 
}: AboutSectionProps) {
  return (
    <section className="bg-dark-1 text-light">
      <div className="container">
        <div className="row align-items-center gx-5">
          <div className="col-lg-6 mb-sm-20">
            <div className="subtitle wow fadeInUp mb-3">{subtitle}</div>
            <h2 className="wow fadeInUp" data-wow-delay=".2s">{heading}</h2>
            <p className="wow fadeInUp">{description}</p>
            <hr className="s2" />
            <div className="spacer-10"></div>
            {buttonText && buttonUrl && (
              <Link className="btn-line mb10" href={buttonUrl}>{buttonText}</Link>
            )}
          </div>

          <div className="col-lg-6 position-relative">
            <div className="images-deco-1">
              {image1 && (
                <img src={image1} className="d-img-1 wow zoomIn" data-wow-delay="0s" alt="" />
              )}
              {image2 && (
                <img src={image2} className="d-img-2 wow zoomIn" data-wow-delay=".5s" alt="" />
              )}
              <div className="d-img-3 bg-color wow zoomIn" data-wow-delay=".6s"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
