import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { marked } from 'marked';
import { getAuthUser } from '@/lib/auth';
import { v2 as cloudinary } from 'cloudinary';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const SEO_PROMPT = `You are an expert SEO content writer. Produce one complete blog post in MARKDOWN only.
Include:
- Title (≤ 70 characters)
- Meta description (≤ 160 characters)
- 800–1200 word article with H1, H2, lists, links
- 5 tags
- CTA at the end
- imagePrompt: A detailed description for DALL-E to generate a featured image (include style like "professional", "modern", "technology themed", colors, and composition)

Format your response EXACTLY like this:
---
title: Your Title Here
metaDescription: Your meta description here
tags: tag1, tag2, tag3, tag4, tag5
category: Technology
imagePrompt: A professional technology themed image showing...
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
      imagePrompt: 'A professional technology themed image with modern abstract design, blue and white colors, featuring digital elements and innovation',
      markdownContent: content,
    };
  }

  const frontmatter = frontmatterMatch[1];
  const markdownContent = frontmatterMatch[2].trim();

  const titleMatch = frontmatter.match(/title:\s*(.+)/);
  const metaMatch = frontmatter.match(/metaDescription:\s*(.+)/);
  const tagsMatch = frontmatter.match(/tags:\s*(.+)/);
  const categoryMatch = frontmatter.match(/category:\s*(.+)/);
  const imagePromptMatch = frontmatter.match(/imagePrompt:\s*(.+)/);

  return {
    title: titleMatch ? titleMatch[1].trim() : 'AI Generated Post',
    metaDescription: metaMatch ? metaMatch[1].trim() : '',
    tags: tagsMatch ? tagsMatch[1].trim() : '',
    category: categoryMatch ? categoryMatch[1].trim() : 'Technology',
    imagePrompt: imagePromptMatch ? imagePromptMatch[1].trim() : 'A professional technology themed image with modern abstract design, blue and white colors',
    markdownContent,
  };
}

async function generateImage(prompt: string): Promise<string | null> {
  try {
    const imageResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: `${prompt}. Style: professional, clean, modern corporate, suitable for a technology company blog. No text or words in the image.`,
        n: 1,
        size: '1792x1024',
        quality: 'standard',
      }),
    });

    if (!imageResponse.ok) {
      console.error('DALL-E API error:', await imageResponse.text());
      return null;
    }

    const imageData = await imageResponse.json();
    const imageUrl = imageData.data[0]?.url;

    if (!imageUrl) {
      return null;
    }

    const uploadResult = await cloudinary.uploader.upload(imageUrl, {
      folder: 'maxtech/news',
      transformation: [
        { width: 1200, height: 630, crop: 'fill' },
        { quality: 'auto', fetch_format: 'auto' }
      ],
    });

    return uploadResult.secure_url;
  } catch (error) {
    console.error('Error generating image:', error);
    return null;
  }
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

    const featuredImage = await generateImage(parsed.imagePrompt);

    const post = await prisma.blogPost.create({
      data: {
        title: parsed.title,
        slug,
        category: parsed.category,
        markdownContent: parsed.markdownContent,
        htmlContent,
        featuredImage,
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
