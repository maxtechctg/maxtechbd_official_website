'use client';
import { AdminForm } from '@/components/admin/AdminCrud';
const fields = [
  { name: 'value', label: 'Value', type: 'number' as const, required: true },
  { name: 'suffix', label: 'Suffix (+, %, etc.)', type: 'text' as const },
  { name: 'label', label: 'Label', type: 'text' as const, required: true },
  { name: 'icon', label: 'Icon Class', type: 'text' as const },
  { name: 'order', label: 'Order', type: 'number' as const },
  { name: 'isActive', label: 'Active', type: 'checkbox' as const },
];
export default function NewStatCounterPage() {
  return <AdminForm title="Add Stat Counter" fields={fields} apiEndpoint="/api/admin/stat-counters" backUrl="/admin/stat-counters" initialData={{ isActive: true, order: 0 }} />;
}
