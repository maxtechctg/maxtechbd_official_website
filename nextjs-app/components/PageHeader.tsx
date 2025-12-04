interface PageHeaderProps {
  subtitle: string;
  title: string;
  breadcrumb: { label: string; href?: string }[];
  backgroundImage?: string;
  hasParallax?: boolean;
  /** CSS height value (e.g. "620px", "60vh") */
  height?: string;
  /** jarallax speed (0 = no movement, 1 = same speed as scroll). Smaller = stronger parallax effect. */
  parallaxSpeed?: number;
}

export default function PageHeader({
  subtitle,
  title,
  breadcrumb,
  backgroundImage,
  hasParallax = false,
  height = "620px",
  parallaxSpeed = 0.3,
}: PageHeaderProps) {
  const sectionBaseStyle: React.CSSProperties = {
    position: "relative",
    minHeight: height,
    display: "flex",
    alignItems: "center",
    // ensure content sits above the image
    zIndex: 1,
  };

  const containerStyle: React.CSSProperties = {
    width: "100%",
  };

  // overlay to darken background for readable white text
  const overlay = (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );

  if (hasParallax && backgroundImage) {
    return (
      <section
        id="subheader"
        className="text-light jarallax"
        data-header-theme="dark"
        // jarallax accepts JSON string in data-jarallax or data-jarallax='{"speed":0.3}'
        // we set it here so library picks up the speed
        {...{ "data-jarallax": JSON.stringify({ speed: parallaxSpeed }) }}
        style={sectionBaseStyle}
      >
        {/* This img will be used by jarallax. Make it cover the section area. */}
        <img
          src={backgroundImage}
          className="jarallax-img"
          alt=""
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
          }}
        />

        {overlay}

        <div className="container" style={containerStyle}>
          <div className="row text-center">
            <div className="col-lg-8 offset-lg-2" style={{ zIndex: 2 }}>
              <div
                className="subtitle s2 wow fadeInUp mb-3"
                style={{ color: "#ffffff" }}
              >
                {subtitle}
              </div>
              <h2
                className="wow fadeInUp mb20"
                data-wow-delay=".2s"
                style={{ color: "#ffffff" }}
              >
                {title}
              </h2>
              <ul className="crumb" style={{ color: "#ffffff" }}>
                {breadcrumb.map((item, index) => (
                  <li
                    key={index}
                    className={index === breadcrumb.length - 1 ? "active" : ""}
                    style={{ color: "#ffffff" }}
                  >
                    {item.href ? (
                      <a href={item.href} style={{ color: "#ffffff" }}>
                        {item.label}
                      </a>
                    ) : (
                      item.label
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // non-parallax: use a CSS background cover so it still fills the height
  return (
    <section
      id="subheader"
      style={{
        ...sectionBaseStyle,
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {backgroundImage && overlay}

      <div className="container" style={containerStyle}>
        <div className="row text-center">
          <div className="col-lg-8 offset-lg-2" style={{ zIndex: 2 }}>
            <div className="subtitle s2 wow fadeInUp mb-3">{subtitle}</div>
            <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
              {title}
            </h2>
            <ul className="crumb">
              {breadcrumb.map((item, index) => (
                <li
                  key={index}
                  className={index === breadcrumb.length - 1 ? "active" : ""}
                >
                  {item.href ? (
                    <a href={item.href}>{item.label}</a>
                  ) : (
                    item.label
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
