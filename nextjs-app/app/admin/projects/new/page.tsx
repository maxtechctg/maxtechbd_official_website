'use client';
import { AdminForm } from '@/components/admin/AdminCrud';
const fields = [
  { name: 'title', label: 'Title', type: 'text' as const, required: true },
  { name: 'slug', label: 'Slug (URL)', type: 'text' as const, required: true },
  { name: 'description', label: 'Short Description', type: 'textarea' as const },
  { name: 'overview', label: 'Overview', type: 'textarea' as const },
  { name: 'challenges', label: 'Challenges (separate with |)', type: 'textarea' as const },
  { name: 'solutions', label: 'Solutions (separate with |)', type: 'textarea' as const },
  { name: 'testimonialQuote', label: 'Testimonial Quote', type: 'textarea' as const },
  { name: 'image', label: 'Image URL', type: 'text' as const },
  { name: 'category', label: 'Category', type: 'text' as const },
  { name: 'client', label: 'Client', type: 'text' as const },
  { name: 'positiveFeedbacks', label: 'Positive Feedbacks Count', type: 'number' as const },
  { name: 'turnoverIncrease', label: 'Turnover Increase %', type: 'number' as const },
  { name: 'order', label: 'Order', type: 'number' as const },
  { name: 'isActive', label: 'Active', type: 'checkbox' as const },
];
export default function NewProjectPage() {
  return <AdminForm title="Add Project" fields={fields} apiEndpoint="/api/admin/projects" backUrl="/admin/projects" initialData={{ isActive: true, order: 0 }} />;
}
