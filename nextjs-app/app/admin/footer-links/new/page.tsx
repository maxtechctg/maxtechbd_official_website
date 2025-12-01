'use client';
import { AdminForm } from '@/components/admin/AdminCrud';
const fields = [
  { name: 'category', label: 'Category', type: 'text' as const, required: true, placeholder: 'Quick Links, Resources, etc.' },
  { name: 'label', label: 'Label', type: 'text' as const, required: true },
  { name: 'url', label: 'URL', type: 'text' as const, required: true },
  { name: 'order', label: 'Order', type: 'number' as const },
  { name: 'isActive', label: 'Active', type: 'checkbox' as const },
];
export default function NewFooterLinkPage() {
  return <AdminForm title="Add Footer Link" fields={fields} apiEndpoint="/api/admin/footer-links" backUrl="/admin/footer-links" initialData={{ isActive: true, order: 0 }} />;
}
