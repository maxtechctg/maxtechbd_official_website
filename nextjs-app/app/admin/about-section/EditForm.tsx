'use client';
import { AdminForm } from '@/components/admin/AdminCrud';
const fields = [
  { name: 'subtitle', label: 'Subtitle', type: 'text' as const, required: true },
  { name: 'heading', label: 'Heading', type: 'text' as const, required: true },
  { name: 'description', label: 'Description', type: 'textarea' as const, required: true },
  { name: 'buttonText', label: 'Button Text', type: 'text' as const },
  { name: 'buttonUrl', label: 'Button URL', type: 'text' as const },
  { name: 'image1', label: 'Image 1', type: 'image' as const, folder: 'maxtech/about' },
  { name: 'image2', label: 'Image 2', type: 'image' as const, folder: 'maxtech/about' },
];
export default function EditForm({ item }: { item: Record<string, unknown> }) {
  return <AdminForm title="About Section" fields={fields} apiEndpoint="/api/admin/about-section" backUrl="/admin" initialData={item} isEdit />;
}
