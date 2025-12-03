import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditBlogForm from './EditForm';

export const dynamic = 'force-dynamic';

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  const post = await prisma.blogPost.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!post) {
    notFound();
  }

  return <EditBlogForm post={post} />;
}
