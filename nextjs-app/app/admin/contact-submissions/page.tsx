'use client';

import { useState, useEffect } from 'react';
import { DeleteButton } from '@/components/admin/AdminCrud';

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function ContactSubmissionsPage() {
  const [items, setItems] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/contact-submissions')
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  const markAsRead = async (id: number, isRead: boolean) => {
    await fetch(`/api/admin/contact-submissions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isRead }),
    });
    setItems(items.map(item => item.id === id ? { ...item, isRead } : item));
  };

  if (loading) return <div className="admin-card">Loading...</div>;

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-title">Contact Submissions</h1>
      </div>
      <div className="admin-card">
        {items.length === 0 ? (
          <p className="admin-empty">No contact submissions yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} style={{ background: item.isRead ? undefined : '#fff9e6' }}>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.subject || 'N/A'}</td>
                  <td className="truncate" style={{ maxWidth: '200px' }}>{item.message}</td>
                  <td>
                    <span className={`badge ${item.isRead ? 'badge-success' : 'badge-danger'}`}>
                      {item.isRead ? 'Read' : 'Unread'}
                    </span>
                  </td>
                  <td>
                    <div className="admin-actions">
                      <button
                        onClick={() => markAsRead(item.id, !item.isRead)}
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                      >
                        {item.isRead ? 'Mark Unread' : 'Mark Read'}
                      </button>
                      <DeleteButton
                        apiEndpoint={`/api/admin/contact-submissions/${item.id}`}
                        itemName="submission"
                        onSuccess={() => setItems(items.filter(i => i.id !== item.id))}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
