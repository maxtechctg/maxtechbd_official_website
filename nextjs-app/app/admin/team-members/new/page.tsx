'use client';
import { AdminForm } from '@/components/admin/AdminCrud';
const fields = [
  { name: 'name', label: 'Name', type: 'text' as const, required: true },
  { name: 'role', label: 'Role', type: 'text' as const, required: true },
  { name: 'image', label: 'Profile Photo', type: 'image' as const, required: true, folder: 'maxtech/team' },
  { name: 'facebook', label: 'Facebook URL', type: 'text' as const },
  { name: 'twitter', label: 'Twitter URL', type: 'text' as const },
  { name: 'instagram', label: 'Instagram URL', type: 'text' as const },
  { name: 'discord', label: 'Discord URL', type: 'text' as const },
  { name: 'linkedin', label: 'LinkedIn URL', type: 'text' as const },
  { name: 'order', label: 'Order', type: 'number' as const },
  { name: 'isActive', label: 'Active', type: 'checkbox' as const },
];
export default function NewTeamMemberPage() {
  return <AdminForm title="Add Team Member" fields={fields} apiEndpoint="/api/admin/team-members" backUrl="/admin/team-members" initialData={{ isActive: true, order: 0 }} />;
}
