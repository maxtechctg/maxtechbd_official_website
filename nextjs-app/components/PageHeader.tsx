interface PageHeaderProps {
  subtitle: string;
  title: string;
  breadcrumb: { label: string; href?: string }[];
  backgroundImage?: string;
  hasParallax?: boolean;
}

export default function PageHeader({
  subtitle,
  title,
  breadcrumb,
  backgroundImage,
  hasParallax = false,
}: PageHeaderProps) {
  if (hasParallax && backgroundImage) {
    return (
      <section id="subheader" className="text-light jarallax">
        <img src={backgroundImage} className="jarallax-img" alt="" />
        <div className="container">
          <div className="row text-center">
            <div className="col-lg-8 offset-lg-2">
              <div className="subtitle s2 wow fadeInUp mb-3">{subtitle}</div>
              <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">{title}</h2>
              <ul className="crumb">
                {breadcrumb.map((item, index) => (
                  <li key={index} className={index === breadcrumb.length - 1 ? 'active' : ''}>
                    {item.href ? <a href={item.href}>{item.label}</a> : item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="subheader">
      <div className="container">
        <div className="row text-center">
          <div className="col-lg-8 offset-lg-2">
            <div className="subtitle s2 wow fadeInUp mb-3">{subtitle}</div>
            <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">{title}</h2>
            <ul className="crumb">
              {breadcrumb.map((item, index) => (
                <li key={index} className={index === breadcrumb.length - 1 ? 'active' : ''}>
                  {item.href ? <a href={item.href}>{item.label}</a> : item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
