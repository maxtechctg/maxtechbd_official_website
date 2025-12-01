'use client';
import { AdminForm } from '@/components/admin/AdminCrud';
const fields = [
  { name: 'category', label: 'Category', type: 'text' as const, required: true },
  { name: 'label', label: 'Label', type: 'text' as const, required: true },
  { name: 'url', label: 'URL', type: 'text' as const, required: true },
  { name: 'order', label: 'Order', type: 'number' as const },
  { name: 'isActive', label: 'Active', type: 'checkbox' as const },
];
export default function EditForm({ item }: { item: Record<string, unknown> }) {
  return <AdminForm title="Edit Footer Link" fields={fields} apiEndpoint={`/api/admin/footer-links/${item.id}`} backUrl="/admin/footer-links" initialData={item} isEdit />;
}
