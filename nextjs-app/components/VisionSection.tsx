import Link from 'next/link';

interface VisionSectionProps {
  subtitle: string;
  heading: string;
  buttonText: string | null;
  buttonUrl: string | null;
  backgroundImage: string | null;
}

export default function VisionSection({ 
  subtitle, 
  heading, 
  buttonText, 
  buttonUrl, 
  backgroundImage 
}: VisionSectionProps) {
  return (
    <section className="jarallax text-light" data-header-theme="dark">
      {backgroundImage && (
        <img src={backgroundImage} className="jarallax-img" alt="" />
      )}
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="subtitle s2 wow fadeInUp mb-3">{subtitle}</div>
            <h2 className="mb20 wow fadeInUp" data-wow-delay=".2s">{heading}</h2>
            {buttonText && buttonUrl && (
              <Link className="btn-main" href={buttonUrl}>{buttonText}</Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
