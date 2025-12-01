'use client';
import { AdminForm } from '@/components/admin/AdminCrud';
const fields = [
  { name: 'siteName', label: 'Site Name', type: 'text' as const, required: true },
  { name: 'siteTitle', label: 'Site Title', type: 'text' as const, required: true },
  { name: 'description', label: 'Description', type: 'textarea' as const },
  { name: 'phone', label: 'Phone', type: 'text' as const },
  { name: 'email', label: 'Email', type: 'email' as const },
  { name: 'address', label: 'Address', type: 'textarea' as const },
  { name: 'logoUrl', label: 'Logo URL', type: 'text' as const },
  { name: 'logoMobileUrl', label: 'Mobile Logo URL', type: 'text' as const },
  { name: 'favicon', label: 'Favicon URL', type: 'text' as const },
  { name: 'copyright', label: 'Copyright Text', type: 'text' as const },
];
export default function EditForm({ item }: { item: Record<string, unknown> }) {
  return <AdminForm title="Site Settings" fields={fields} apiEndpoint="/api/admin/site-settings" backUrl="/admin" initialData={item} isEdit />;
}
