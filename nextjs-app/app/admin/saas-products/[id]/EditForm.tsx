'use client';
import { AdminForm } from '@/components/admin/AdminCrud';

const fields = [
  { name: 'title', label: 'Title', type: 'text' as const, required: true },
  { name: 'slug', label: 'Slug (URL)', type: 'text' as const, required: true },
  { name: 'tagline', label: 'Tagline', type: 'text' as const },
  { name: 'shortDescription', label: 'Short Description', type: 'textarea' as const, required: true },
  { name: 'longDescription', label: 'Long Description', type: 'textarea' as const },
  { name: 'mainImage', label: 'Main Image', type: 'image' as const, folder: 'maxtech/saas-products' },
  { name: 'features', label: 'Features (separate with |)', type: 'textarea' as const },
  { name: 'techStack', label: 'Tech Stack (comma separated)', type: 'text' as const },
  { name: 'liveDemoUrl', label: 'Live Demo URL', type: 'url' as const },
  { name: 'githubUrl', label: 'GitHub URL', type: 'url' as const },
  { name: 'documentationUrl', label: 'Documentation URL', type: 'url' as const },
  { name: 'order', label: 'Order', type: 'number' as const },
  { name: 'isActive', label: 'Active', type: 'checkbox' as const },
];

export default function EditForm({ item }: { item: Record<string, unknown> }) {
  return (
    <AdminForm
      title="Edit SaaS Product"
      fields={fields}
      apiEndpoint={`/api/admin/saas-products/${item.id}`}
      backUrl="/admin/saas-products"
      initialData={item}
      isEdit
    />
  );
}
