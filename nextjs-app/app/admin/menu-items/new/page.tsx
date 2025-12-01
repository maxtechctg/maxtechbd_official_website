'use client';
import { AdminForm } from '@/components/admin/AdminCrud';
const fields = [
  { name: 'label', label: 'Label', type: 'text' as const, required: true },
  { name: 'href', label: 'URL/Href', type: 'text' as const, required: true },
  { name: 'parentId', label: 'Parent ID (leave empty for top level)', type: 'number' as const },
  { name: 'order', label: 'Order', type: 'number' as const },
];
export default function NewMenuItemPage() {
  return <AdminForm title="Add Menu Item" fields={fields} apiEndpoint="/api/admin/menu-items" backUrl="/admin/menu-items" initialData={{ order: 0 }} />;
}
