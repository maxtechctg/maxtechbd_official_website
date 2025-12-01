'use client';
import { AdminForm } from '@/components/admin/AdminCrud';
const fields = [
  { name: 'name', label: 'Name', type: 'text' as const },
  { name: 'image', label: 'Image URL', type: 'text' as const, required: true },
  { name: 'url', label: 'Link URL', type: 'text' as const },
  { name: 'order', label: 'Order', type: 'number' as const },
  { name: 'isActive', label: 'Active', type: 'checkbox' as const },
];
export default function EditForm({ item }: { item: Record<string, unknown> }) {
  return <AdminForm title="Edit Client Logo" fields={fields} apiEndpoint={`/api/admin/client-logos/${item.id}`} backUrl="/admin/client-logos" initialData={item} isEdit />;
}
