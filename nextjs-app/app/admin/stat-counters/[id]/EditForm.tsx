'use client';
import { AdminForm } from '@/components/admin/AdminCrud';
const fields = [
  { name: 'value', label: 'Value', type: 'number' as const, required: true },
  { name: 'suffix', label: 'Suffix', type: 'text' as const },
  { name: 'label', label: 'Label', type: 'text' as const, required: true },
  { name: 'icon', label: 'Icon Class', type: 'text' as const },
  { name: 'order', label: 'Order', type: 'number' as const },
  { name: 'isActive', label: 'Active', type: 'checkbox' as const },
];
export default function EditForm({ item }: { item: Record<string, unknown> }) {
  return <AdminForm title="Edit Stat Counter" fields={fields} apiEndpoint={`/api/admin/stat-counters/${item.id}`} backUrl="/admin/stat-counters" initialData={item} isEdit />;
}
