'use client';
import { AdminForm } from '@/components/admin/AdminCrud';

const fields = [
  { name: 'subtitle', label: 'Subtitle', type: 'text' as const, required: true },
  { name: 'title', label: 'Title', type: 'text' as const, required: true },
  { name: 'titleHighlight', label: 'Title Highlight', type: 'text' as const },
  { name: 'description', label: 'Description', type: 'textarea' as const, required: true },
  { name: 'primaryBtnText', label: 'Primary Button Text', type: 'text' as const },
  { name: 'primaryBtnUrl', label: 'Primary Button URL', type: 'text' as const },
  { name: 'secondaryBtnText', label: 'Secondary Button Text', type: 'text' as const },
  { name: 'secondaryBtnUrl', label: 'Secondary Button URL', type: 'text' as const },
  { name: 'backgroundImage', label: 'Background Image', type: 'image' as const, required: true, folder: 'maxtech/hero' },
  { name: 'order', label: 'Order', type: 'number' as const },
  { name: 'isActive', label: 'Active', type: 'checkbox' as const },
];

export default function EditForm({ item }: { item: Record<string, unknown> }) {
  return (
    <AdminForm title="Edit Hero Slide" fields={fields} apiEndpoint={`/api/admin/hero-slides/${item.id}`} backUrl="/admin/hero-slides" initialData={item} isEdit />
  );
}
