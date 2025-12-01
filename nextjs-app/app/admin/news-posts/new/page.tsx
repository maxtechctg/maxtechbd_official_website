'use client';
import { AdminForm } from '@/components/admin/AdminCrud';
const fields = [
  { name: 'title', label: 'Title', type: 'text' as const, required: true },
  { name: 'slug', label: 'Slug (URL)', type: 'text' as const, required: true },
  { name: 'excerpt', label: 'Excerpt', type: 'textarea' as const },
  { name: 'content', label: 'Content', type: 'textarea' as const },
  { name: 'image', label: 'Featured Image', type: 'image' as const, folder: 'maxtech/news' },
  { name: 'thumbnail', label: 'Thumbnail', type: 'image' as const, folder: 'maxtech/news' },
  { name: 'author', label: 'Author', type: 'text' as const },
  { name: 'tags', label: 'Tags (comma separated)', type: 'text' as const },
  { name: 'publishedAt', label: 'Published Date', type: 'datetime-local' as const },
  { name: 'isActive', label: 'Active', type: 'checkbox' as const },
];
export default function NewNewsPostPage() {
  return <AdminForm title="Add News Post" fields={fields} apiEndpoint="/api/admin/news-posts" backUrl="/admin/news-posts" initialData={{ isActive: true }} />;
}
