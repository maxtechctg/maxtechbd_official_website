'use client';
import { AdminForm } from '@/components/admin/AdminCrud';
const fields = [
  { name: 'subtitle', label: 'Subtitle', type: 'text' as const, required: true },
  { name: 'heading', label: 'Heading', type: 'text' as const, required: true },
  { name: 'buttonText', label: 'Button Text', type: 'text' as const },
  { name: 'buttonUrl', label: 'Button URL', type: 'text' as const },
  { name: 'backgroundImage', label: 'Background Image', type: 'image' as const, folder: 'maxtech/vision' },
];
export default function EditForm({ item }: { item: Record<string, unknown> }) {
  return <AdminForm title="Vision Section" fields={fields} apiEndpoint="/api/admin/vision-section" backUrl="/admin" initialData={item} isEdit />;
}
