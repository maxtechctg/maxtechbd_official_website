import Link from 'next/link';

interface SiteSettings {
  logoUrl: string | null;
  footerLogo: string | null;
  footerLogoWidth: number | null;
  footerLogoHeight: number | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  copyright: string | null;
  description: string | null;
}

interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon: string;
}

interface FooterLink {
  id: number;
  category: string;
  label: string;
  url: string;
}

interface FooterProps {
  settings: SiteSettings;
  socialLinks: SocialLink[];
  footerLinks: FooterLink[];
}

export default function Footer({ settings, socialLinks, footerLinks }: FooterProps) {
  const companyLinks = footerLinks.filter(link => link.category === 'Company');
  const serviceLinks = footerLinks.filter(link => link.category === 'Services');

  return (
    <footer>
      <div className="container">
        <div className="row gx-5">
          <div className="col-lg-4 col-sm-6">
            <img 
              src={settings.footerLogo || settings.logoUrl || '/images/logo.png'} 
              alt="MaxTech Logo"
              style={{
                width: settings.footerLogoWidth ? `${settings.footerLogoWidth}px` : 'auto',
                height: settings.footerLogoHeight ? `${settings.footerLogoHeight}px` : 'auto',
                maxWidth: '100%',
                objectFit: 'contain'
              }}
            />
            <div className="spacer-20"></div>
            <p>{settings.description}</p>

            <div className="widget">
              <h5>Follow Us on</h5>
              <div className="social-icons">
                {socialLinks.map(social => (
                  <a key={social.id} href={social.url}>
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-12 order-lg-1 order-sm-2">
            <div className="row">
              <div className="col-lg-6 col-sm-6">
                <div className="widget">
                  <h5>Company</h5>
                  <ul>
                    {companyLinks.map(link => (
                      <li key={link.id}>
                        <Link href={link.url}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-sm-6">
                <div className="widget">
                  <h5>Our Services</h5>
                  <ul>
                    {serviceLinks.map(link => (
                      <li key={link.id}>
                        <Link href={link.url}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 order-lg-2 order-sm-1">
            <div className="widget">
              <h5>Get In Touch</h5>
              <div className="de-icon-text mb20">
                <img src="/images/svg/phone-svgrepo-com-white.svg" alt="Phone" />
                <div className="d-text">
                  <h4>Phone</h4>
                  {settings.phone}
                </div>
              </div>

              <div className="de-icon-text mb20">
                <img src="/images/svg/email-address-svgrepo-com-white.svg" alt="Email" />
                <div className="d-text">
                  <h4>Email</h4>
                  {settings.email}
                </div>
              </div>

              <div className="de-icon-text">
                <img src="/images/svg/map-pin-svgrepo-com-white.svg" alt="Address" />
                <div className="d-text">
                  <h4>Address</h4>
                  {settings.address}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="subfooter">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="de-flex">
                <div className="de-flex-col">
                  {settings.copyright}
                </div>
                <ul className="menu-simple">
                  <li><a href="#">Terms &amp; Conditions</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
