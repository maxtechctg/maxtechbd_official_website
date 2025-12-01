'use client';
import { AdminForm } from '@/components/admin/AdminCrud';
const fields = [
  { name: 'authorName', label: 'Author Name', type: 'text' as const, required: true },
  { name: 'authorRole', label: 'Author Role', type: 'text' as const, required: true },
  { name: 'authorImage', label: 'Author Image URL', type: 'text' as const },
  { name: 'quote', label: 'Quote', type: 'textarea' as const, required: true },
  { name: 'rating', label: 'Rating (1-5)', type: 'number' as const },
  { name: 'order', label: 'Order', type: 'number' as const },
  { name: 'isActive', label: 'Active', type: 'checkbox' as const },
];
export default function NewTestimonialPage() {
  return <AdminForm title="Add Testimonial" fields={fields} apiEndpoint="/api/admin/testimonials" backUrl="/admin/testimonials" initialData={{ isActive: true, order: 0, rating: 5 }} />;
}
