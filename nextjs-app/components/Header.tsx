"use client";

import Link from "next/link";

interface MenuItem {
  id: number;
  label: string;
  href: string;
  children?: MenuItem[];
}

interface SiteSettings {
  logoUrl: string | null;
  logoMobileUrl: string | null;
  navbarLogo: string | null;
  navbarLogoWidth: number | null;
  navbarLogoHeight: number | null;
  phone: string | null;
}

interface HeaderProps {
  menuItems: MenuItem[];
  settings: SiteSettings;
  transparent?: boolean;
}

export default function Header({
  menuItems,
  settings,
  transparent = false,
}: HeaderProps) {
  const renderMenuItem = (item: MenuItem) => {
    const hasChildren = item.children && item.children.length > 0;

    return (
      <li key={item.id}>
        <Link className="menu-item" href={item.href}>
          {item.label}
        </Link>
        {hasChildren && (
          <ul>
            {item.children!.map((child) => (
              <li key={child.id}>
                <Link className="menu-item" href={child.href}>
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <header className={`header-full ${transparent ? "transparent" : ""}`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="de-flex sm-pt10">
              <div className="de-flex-col">
                <div className="de-flex-col">
                  <div id="logo">
                    <Link href="/">
                      <img
                        className="logo-main"
                        src={
                          settings.navbarLogo ||
                          settings.logoUrl ||
                          "/images/logo.png"
                        }
                        alt="MaxTech Logo"
                        style={{
                          width: settings.navbarLogoWidth
                            ? `${settings.navbarLogoWidth}px`
                            : "auto",
                          height: settings.navbarLogoHeight
                            ? `${settings.navbarLogoHeight}px`
                            : "auto",
                          maxWidth: "100%",
                          objectFit: "contain",
                        }}
                      />
                      <img
                        className="logo-mobile"
                        src={
                          settings.logoMobileUrl ||
                          settings.navbarLogo ||
                          "/images/logo-mobile.png"
                        }
                        alt="MaxTech Logo"
                      />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="de-flex-col header-col-mid">
                <ul id="mainmenu">{menuItems.map(renderMenuItem)}</ul>
              </div>
              <div className="de-flex-col">
                <div className="menu_side_area">
                  <div className="h-phone md-hide">
                    <span>Need Help?</span>
                    {settings.phone}
                  </div>
                  <Link href="/contact" className="btn-line">
                    Contact us
                  </Link>
                  <span id="menu-btn"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
