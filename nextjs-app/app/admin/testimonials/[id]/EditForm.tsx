'use client';
import { AdminForm } from '@/components/admin/AdminCrud';
const fields = [
  { name: 'authorName', label: 'Author Name', type: 'text' as const, required: true },
  { name: 'authorRole', label: 'Author Role', type: 'text' as const, required: true },
  { name: 'authorImage', label: 'Author Photo', type: 'image' as const, folder: 'maxtech/testimonials' },
  { name: 'quote', label: 'Quote', type: 'textarea' as const, required: true },
  { name: 'rating', label: 'Rating (1-5)', type: 'number' as const },
  { name: 'order', label: 'Order', type: 'number' as const },
  { name: 'isActive', label: 'Active', type: 'checkbox' as const },
];
export default function EditForm({ item }: { item: Record<string, unknown> }) {
  return <AdminForm title="Edit Testimonial" fields={fields} apiEndpoint={`/api/admin/testimonials/${item.id}`} backUrl="/admin/testimonials" initialData={item} isEdit />;
}
