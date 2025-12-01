'use client';

import { AdminForm } from '@/components/admin/AdminCrud';

const fields = [
  { name: 'title', label: 'Title', type: 'text' as const, required: true },
  { name: 'description', label: 'Description', type: 'textarea' as const, required: true },
  { name: 'icon', label: 'Icon URL', type: 'text' as const, placeholder: '/images/svg/example.svg' },
  { name: 'image', label: 'Image URL', type: 'text' as const },
  { name: 'order', label: 'Order', type: 'number' as const },
  { name: 'isActive', label: 'Active', type: 'checkbox' as const },
];

export default function NewServicePage() {
  return (
    <AdminForm
      title="Add New Service"
      fields={fields}
      apiEndpoint="/api/admin/services"
      backUrl="/admin/services"
      initialData={{ isActive: true, order: 0 }}
    />
  );
}
