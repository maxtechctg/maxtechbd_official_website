import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, phone, subject } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        message,
        phone: phone || null,
        subject: subject || null,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!',
      id: submission.id,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Contact API is running' });
}
