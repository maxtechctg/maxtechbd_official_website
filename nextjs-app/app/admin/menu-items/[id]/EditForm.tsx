'use client';
import { AdminForm } from '@/components/admin/AdminCrud';
const fields = [
  { name: 'label', label: 'Label', type: 'text' as const, required: true },
  { name: 'href', label: 'URL/Href', type: 'text' as const, required: true },
  { name: 'parentId', label: 'Parent ID (leave empty for top level)', type: 'number' as const },
  { name: 'order', label: 'Order', type: 'number' as const },
];
export default function EditForm({ item }: { item: Record<string, unknown> }) {
  return <AdminForm title="Edit Menu Item" fields={fields} apiEndpoint={`/api/admin/menu-items/${item.id}`} backUrl="/admin/menu-items" initialData={item} isEdit />;
}
