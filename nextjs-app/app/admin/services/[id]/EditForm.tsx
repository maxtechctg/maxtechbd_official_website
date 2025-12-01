'use client';

import { AdminForm } from '@/components/admin/AdminCrud';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string | null;
  image: string | null;
  order: number;
  isActive: boolean;
}

const fields = [
  { name: 'title', label: 'Title', type: 'text' as const, required: true },
  { name: 'description', label: 'Description', type: 'textarea' as const, required: true },
  { name: 'icon', label: 'Icon', type: 'image' as const, folder: 'maxtech/icons' },
  { name: 'image', label: 'Service Image', type: 'image' as const, folder: 'maxtech/services' },
  { name: 'order', label: 'Order', type: 'number' as const },
  { name: 'isActive', label: 'Active', type: 'checkbox' as const },
];

export default function EditServiceForm({ service }: { service: Service }) {
  return (
    <AdminForm
      title="Edit Service"
      fields={fields}
      apiEndpoint={`/api/admin/services/${service.id}`}
      backUrl="/admin/services"
      initialData={service}
      isEdit
    />
  );
}
