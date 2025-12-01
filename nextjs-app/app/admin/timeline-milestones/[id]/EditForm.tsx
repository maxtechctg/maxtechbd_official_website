'use client';
import { AdminForm } from '@/components/admin/AdminCrud';
const fields = [
  { name: 'year', label: 'Year', type: 'text' as const, required: true },
  { name: 'title', label: 'Title', type: 'text' as const, required: true },
  { name: 'description', label: 'Description', type: 'textarea' as const, required: true },
  { name: 'images', label: 'Images (pipe-separated URLs)', type: 'textarea' as const },
  { name: 'order', label: 'Order', type: 'number' as const },
  { name: 'isActive', label: 'Active', type: 'checkbox' as const },
];
export default function EditForm({ item }: { item: Record<string, unknown> }) {
  return <AdminForm title="Edit Timeline Milestone" fields={fields} apiEndpoint={`/api/admin/timeline-milestones/${item.id}`} backUrl="/admin/timeline-milestones" initialData={item} isEdit />;
}
