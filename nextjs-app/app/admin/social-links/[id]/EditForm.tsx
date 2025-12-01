'use client';
import { AdminForm } from '@/components/admin/AdminCrud';
const fields = [
  { name: 'platform', label: 'Platform', type: 'text' as const, required: true },
  { name: 'url', label: 'URL', type: 'text' as const, required: true },
  { name: 'icon', label: 'Icon Class', type: 'text' as const, required: true },
  { name: 'order', label: 'Order', type: 'number' as const },
  { name: 'isActive', label: 'Active', type: 'checkbox' as const },
];
export default function EditForm({ item }: { item: Record<string, unknown> }) {
  return <AdminForm title="Edit Social Link" fields={fields} apiEndpoint={`/api/admin/social-links/${item.id}`} backUrl="/admin/social-links" initialData={item} isEdit />;
}
