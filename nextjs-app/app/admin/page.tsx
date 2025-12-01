import prisma from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getStats() {
  const [
    services,
    projects,
    newsPosts,
    teamMembers,
    testimonials,
    contactSubmissions,
    heroSlides,
    clientLogos,
  ] = await Promise.all([
    prisma.service.count(),
    prisma.project.count(),
    prisma.newsPost.count(),
    prisma.teamMember.count(),
    prisma.testimonial.count(),
    prisma.contactSubmission.count({ where: { isRead: false } }),
    prisma.heroSlide.count(),
    prisma.clientLogo.count(),
  ]);

  return {
    services,
    projects,
    newsPosts,
    teamMembers,
    testimonials,
    contactSubmissions,
    heroSlides,
    clientLogos,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();
  const recentContacts = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Dashboard</h1>
      </div>

      <div className="admin-stats">
        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats.services}</div>
          <div className="admin-stat-label">Services</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats.projects}</div>
          <div className="admin-stat-label">Projects</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats.newsPosts}</div>
          <div className="admin-stat-label">News Posts</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats.teamMembers}</div>
          <div className="admin-stat-label">Team Members</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats.testimonials}</div>
          <div className="admin-stat-label">Testimonials</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats.heroSlides}</div>
          <div className="admin-stat-label">Hero Slides</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats.clientLogos}</div>
          <div className="admin-stat-label">Client Logos</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value" style={{ color: stats.contactSubmissions > 0 ? '#dc3545' : undefined }}>
            {stats.contactSubmissions}
          </div>
          <div className="admin-stat-label">Unread Messages</div>
        </div>
      </div>

      <div className="admin-card">
        <h3 style={{ marginBottom: '20px' }}>Recent Contact Submissions</h3>
        {recentContacts.length === 0 ? (
          <p className="admin-empty">No contact submissions yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentContacts.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td className="truncate">{contact.subject || 'N/A'}</td>
                  <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge ${contact.isRead ? 'badge-success' : 'badge-danger'}`}>
                      {contact.isRead ? 'Read' : 'Unread'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div style={{ marginTop: '15px' }}>
          <Link href="/admin/contact-submissions" className="admin-btn admin-btn-secondary admin-btn-sm">
            View All Messages
          </Link>
        </div>
      </div>
    </div>
  );
}
