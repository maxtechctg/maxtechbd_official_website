import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditNewsForm from './EditForm';

export const dynamic = 'force-dynamic';

interface Props {
  params: { id: string };
}

export default async function EditNewsPage({ params }: Props) {
  const post = await prisma.blogPost.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!post) {
    notFound();
  }

  const serializedPost = {
    ...post,
    publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  };

  return <EditNewsForm post={serializedPost} />;
}
