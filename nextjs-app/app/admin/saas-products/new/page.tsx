'use client';
import { AdminForm } from '@/components/admin/AdminCrud';

const fields = [
  { name: 'title', label: 'Title', type: 'text' as const, required: true },
  { name: 'slug', label: 'Slug (URL)', type: 'text' as const, required: true, placeholder: 'my-saas-product' },
  { name: 'tagline', label: 'Tagline', type: 'text' as const, placeholder: 'A short catchy phrase' },
  { name: 'shortDescription', label: 'Short Description', type: 'textarea' as const, required: true },
  { name: 'longDescription', label: 'Long Description', type: 'textarea' as const },
  { name: 'mainImage', label: 'Main Image', type: 'image' as const, folder: 'maxtech/saas-products' },
  { name: 'features', label: 'Features (separate with |)', type: 'textarea' as const, placeholder: 'Feature 1|Feature 2|Feature 3' },
  { name: 'techStack', label: 'Tech Stack (comma separated)', type: 'text' as const, placeholder: 'React, Node.js, PostgreSQL' },
  { name: 'liveDemoUrl', label: 'Live Demo URL', type: 'url' as const },
  { name: 'githubUrl', label: 'GitHub URL', type: 'url' as const },
  { name: 'documentationUrl', label: 'Documentation URL', type: 'url' as const },
  { name: 'order', label: 'Order', type: 'number' as const },
  { name: 'isActive', label: 'Active', type: 'checkbox' as const },
];

export default function NewSaaSProductPage() {
  return (
    <AdminForm
      title="Add SaaS Product"
      fields={fields}
      apiEndpoint="/api/admin/saas-products"
      backUrl="/admin/saas-products"
      initialData={{ isActive: true, order: 0 }}
    />
  );
}
