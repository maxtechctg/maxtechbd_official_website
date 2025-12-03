import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findFirst();
    return NextResponse.json({ 
      portfolioBannerImage: settings?.portfolioBannerImage || null 
    });
  } catch (error) {
    console.error('Error fetching portfolio banner:', error);
    return NextResponse.json({ error: 'Failed to fetch banner' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const imageUrl = formData.get('imageUrl') as string | null;

    let finalImageUrl: string | null = null;

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString('base64');
      const dataUri = `data:${file.type};base64,${base64}`;

      const uploadResult = await cloudinary.uploader.upload(dataUri, {
        folder: 'maxtech/portfolio-banner',
        resource_type: 'image',
      });
      finalImageUrl = uploadResult.secure_url;
    } else if (imageUrl) {
      finalImageUrl = imageUrl;
    }

    const existingSettings = await prisma.siteSettings.findFirst();
    
    if (existingSettings) {
      await prisma.siteSettings.update({
        where: { id: existingSettings.id },
        data: { portfolioBannerImage: finalImageUrl },
      });
    } else {
      await prisma.siteSettings.create({
        data: {
          siteName: 'MaxTech',
          siteTitle: 'MaxTech - IT Solutions',
          portfolioBannerImage: finalImageUrl,
        },
      });
    }

    return NextResponse.json({ 
      success: true, 
      portfolioBannerImage: finalImageUrl 
    });
  } catch (error) {
    console.error('Error updating portfolio banner:', error);
    return NextResponse.json({ error: 'Failed to update banner' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const existingSettings = await prisma.siteSettings.findFirst();
    
    if (existingSettings) {
      await prisma.siteSettings.update({
        where: { id: existingSettings.id },
        data: { portfolioBannerImage: null },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing portfolio banner:', error);
    return NextResponse.json({ error: 'Failed to remove banner' }, { status: 500 });
  }
}
