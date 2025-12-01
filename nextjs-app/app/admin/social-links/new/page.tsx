'use client';
import { AdminForm } from '@/components/admin/AdminCrud';
const fields = [
  { name: 'platform', label: 'Platform', type: 'text' as const, required: true },
  { name: 'url', label: 'URL', type: 'text' as const, required: true },
  { name: 'icon', label: 'Icon Class', type: 'text' as const, required: true, placeholder: 'fab fa-facebook-f' },
  { name: 'order', label: 'Order', type: 'number' as const },
  { name: 'isActive', label: 'Active', type: 'checkbox' as const },
];
export default function NewSocialLinkPage() {
  return <AdminForm title="Add Social Link" fields={fields} apiEndpoint="/api/admin/social-links" backUrl="/admin/social-links" initialData={{ isActive: true, order: 0 }} />;
}
