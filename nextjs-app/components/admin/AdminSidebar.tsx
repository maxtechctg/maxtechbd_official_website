'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface AdminSidebarProps {
  userName: string;
}

const menuItems = [
  { section: 'Content', items: [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Site Settings', href: '/admin/site-settings' },
    { label: 'Hero Slides', href: '/admin/hero-slides' },
    { label: 'Page Content', href: '/admin/page-content' },
  ]},
  { section: 'Sections', items: [
    { label: 'About Section', href: '/admin/about-section' },
    { label: 'Vision Section', href: '/admin/vision-section' },
    { label: 'Services', href: '/admin/services' },
    { label: 'Team Members', href: '/admin/team-members' },
    { label: 'Testimonials', href: '/admin/testimonials' },
  ]},
  { section: 'Portfolio & News', items: [
    { label: 'Projects', href: '/admin/projects' },
    { label: 'News Posts', href: '/admin/news-posts' },
  ]},
  { section: 'Navigation', items: [
    { label: 'Menu Items', href: '/admin/menu-items' },
    { label: 'Footer Links', href: '/admin/footer-links' },
    { label: 'Social Links', href: '/admin/social-links' },
    { label: 'Client Logos', href: '/admin/client-logos' },
  ]},
  { section: 'About Page', items: [
    { label: 'Timeline', href: '/admin/timeline-milestones' },
    { label: 'Stat Counters', href: '/admin/stat-counters' },
  ]},
  { section: 'Submissions', items: [
    { label: 'Contact Messages', href: '/admin/contact-submissions' },
  ]},
];

export default function AdminSidebar({ userName }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <div className="admin-sidebar-logo">MaxTech Admin</div>
        <div className="admin-sidebar-user">Welcome, {userName}</div>
      </div>
      
      <nav>
        {menuItems.map((group) => (
          <div key={group.section}>
            <div className="admin-nav-section">{group.section}</div>
            <ul className="admin-nav">
              {group.items.map((item) => (
                <li key={item.href} className="admin-nav-item">
                  <Link
                    href={item.href}
                    className={`admin-nav-link ${pathname === item.href ? 'active' : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="admin-logout">
        <button onClick={handleLogout} className="admin-logout-btn">
          Logout
        </button>
      </div>
    </aside>
  );
}
