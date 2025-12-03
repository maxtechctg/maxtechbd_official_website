import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { marked } from 'marked';
import { getAuthUser } from '@/lib/auth';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

const SEO_PROMPT = `You are an expert SEO content writer. Produce one complete blog post in MARKDOWN only.
Include:
- Title (≤ 70 characters)
- Meta description (≤ 160 characters)
- 800–1200 word article with H1, H2, lists, links
- 5 tags
- CTA at the end

Format your response EXACTLY like this:
---
title: Your Title Here
metaDescription: Your meta description here
tags: tag1, tag2, tag3, tag4, tag5
category: Technology
---

# Your H1 Title

Your article content here in markdown format...

## Subheading

More content...

Deliver valid markdown only. Focus on technology, IT solutions, cloud computing, cybersecurity, or digital transformation topics relevant to a modern IT company.`;

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .substring(0, 50);
}

function parseGeneratedContent(content: string) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  
  if (!frontmatterMatch) {
    const titleMatch = content.match(/^#\s+(.+)$/m);
    return {
      title: titleMatch ? titleMatch[1] : 'AI Generated Post',
      metaDescription: '',
      tags: '',
      category: 'Technology',
      markdownContent: content,
    };
  }

  const frontmatter = frontmatterMatch[1];
  const markdownContent = frontmatterMatch[2].trim();

  const titleMatch = frontmatter.match(/title:\s*(.+)/);
  const metaMatch = frontmatter.match(/metaDescription:\s*(.+)/);
  const tagsMatch = frontmatter.match(/tags:\s*(.+)/);
  const categoryMatch = frontmatter.match(/category:\s*(.+)/);

  return {
    title: titleMatch ? titleMatch[1].trim() : 'AI Generated Post',
    metaDescription: metaMatch ? metaMatch[1].trim() : '',
    tags: tagsMatch ? tagsMatch[1].trim() : '',
    category: categoryMatch ? categoryMatch[1].trim() : 'Technology',
    markdownContent,
  };
}

export async function POST() {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!OPENAI_API_KEY) {
    await prisma.blogGenerationLog.create({
      data: {
        status: 'failed',
        errorMessage: 'OPENAI_API_KEY not configured',
      },
    });
    return NextResponse.json({ error: 'OPENAI_API_KEY not configured' }, { status: 500 });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: SEO_PROMPT },
          { role: 'user', content: 'Generate a new SEO-optimized blog post for an IT solutions company website.' },
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'OpenAI API error');
    }

    const data = await response.json();
    const generatedContent = data.choices[0]?.message?.content || '';

    const parsed = parseGeneratedContent(generatedContent);
    const slug = generateSlug(parsed.title) + '-' + Date.now();
    const htmlContent = await marked(parsed.markdownContent);

    const post = await prisma.blogPost.create({
      data: {
        title: parsed.title,
        slug,
        category: parsed.category,
        markdownContent: parsed.markdownContent,
        htmlContent,
        metaDescription: parsed.metaDescription,
        tags: parsed.tags,
        active: true,
        publishedAt: new Date(),
        source: 'auto',
      },
    });

    await prisma.blogGenerationLog.create({
      data: {
        status: 'success',
        generatedTitle: parsed.title,
        blogPostId: post.id,
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error('Error generating blog post:', error);
    
    await prisma.blogGenerationLog.create({
      data: {
        status: 'failed',
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
      },
    });

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate blog post' },
      { status: 500 }
    );
  }
}

