import Link from "next/link";

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
  image2,
}: AboutSectionProps) {
  return (
    <section className="text-light" style={{ backgroundColor: "#404135" }}>
      {/* 🔥 INLINE HOVER STYLE (NO styled-jsx, NO CSS file changes, WORKS in server component) */}
      <style>
        {`
          .about-btn {
            border: 1px solid #ffffff;
            padding: 10px 22px;
            border-radius: 5px;
            color: #ffffff;
            background: transparent;
            display: inline-block;
            transition: all 0.3s ease;
            text-decoration: none;
          }
          .about-btn:hover {
            background-color: #CC181F;
            border-color: #CC181F;
            color: #ffffff;
          }
        `}
      </style>

      <div className="container">
        <div className="row align-items-center gx-5">
          {/* LEFT CONTENT */}
          <div className="col-lg-6 mb-sm-20">
            <div className="subtitle wow fadeInUp mb-3">{subtitle}</div>

            <h2 className="wow fadeInUp" data-wow-delay=".2s">
              {heading}
            </h2>

            <p className="wow fadeInUp">{description}</p>

            <hr className="s2" />
            <div className="spacer-10"></div>

            {/* 🔥 BUTTON USING INLINE STYLE CLASS */}
            {buttonText && buttonUrl && (
              <Link href={buttonUrl} className="about-btn mb10">
                {buttonText}
              </Link>
            )}
          </div>

          {/* RIGHT IMAGES */}
          <div className="col-lg-6 position-relative">
            <div className="images-deco-1">
              {image1 && (
                <img
                  src={image1}
                  className="d-img-1 wow zoomIn"
                  data-wow-delay="0s"
                  alt=""
                />
              )}

              {image2 && (
                <img
                  src={image2}
                  className="d-img-2 wow zoomIn"
                  data-wow-delay=".5s"
                  alt=""
                />
              )}

              <div
                className="d-img-3 bg-color wow zoomIn"
                data-wow-delay=".6s"
                style={{ backgroundColor: "#CC181F" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
