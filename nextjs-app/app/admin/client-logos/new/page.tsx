'use client';
import { AdminForm } from '@/components/admin/AdminCrud';
const fields = [
  { name: 'name', label: 'Name', type: 'text' as const },
  { name: 'image', label: 'Logo Image', type: 'image' as const, required: true, folder: 'maxtech/clients' },
  { name: 'url', label: 'Link URL', type: 'text' as const },
  { name: 'order', label: 'Order', type: 'number' as const },
  { name: 'isActive', label: 'Active', type: 'checkbox' as const },
];
export default function NewClientLogoPage() {
  return <AdminForm title="Add Client Logo" fields={fields} apiEndpoint="/api/admin/client-logos" backUrl="/admin/client-logos" initialData={{ isActive: true, order: 0 }} />;
}
