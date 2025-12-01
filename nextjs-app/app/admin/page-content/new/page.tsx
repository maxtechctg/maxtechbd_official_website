'use client';
import { AdminForm } from '@/components/admin/AdminCrud';
const fields = [
  { name: 'pageSlug', label: 'Page Slug', type: 'text' as const, required: true, placeholder: 'about, services, etc.' },
  { name: 'title', label: 'Title', type: 'text' as const, required: true },
  { name: 'subtitle', label: 'Subtitle', type: 'text' as const },
  { name: 'description', label: 'Description', type: 'textarea' as const },
  { name: 'metaTitle', label: 'Meta Title', type: 'text' as const },
  { name: 'metaDescription', label: 'Meta Description', type: 'textarea' as const },
];
export default function NewPageContentPage() {
  return <AdminForm title="Add Page Content" fields={fields} apiEndpoint="/api/admin/page-content" backUrl="/admin/page-content" initialData={{}} />;
}
