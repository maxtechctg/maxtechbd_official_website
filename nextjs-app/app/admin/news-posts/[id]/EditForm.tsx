'use client';
import { AdminForm } from '@/components/admin/AdminCrud';
const fields = [
  { name: 'title', label: 'Title', type: 'text' as const, required: true },
  { name: 'slug', label: 'Slug (URL)', type: 'text' as const, required: true },
  { name: 'excerpt', label: 'Excerpt', type: 'textarea' as const },
  { name: 'content', label: 'Content', type: 'textarea' as const },
  { name: 'image', label: 'Image URL', type: 'text' as const },
  { name: 'thumbnail', label: 'Thumbnail URL', type: 'text' as const },
  { name: 'author', label: 'Author', type: 'text' as const },
  { name: 'tags', label: 'Tags (comma separated)', type: 'text' as const },
  { name: 'publishedAt', label: 'Published Date', type: 'datetime-local' as const },
  { name: 'isActive', label: 'Active', type: 'checkbox' as const },
];
export default function EditForm({ item }: { item: Record<string, unknown> }) {
  return <AdminForm title="Edit News Post" fields={fields} apiEndpoint={`/api/admin/news-posts/${item.id}`} backUrl="/admin/news-posts" initialData={item} isEdit />;
}
