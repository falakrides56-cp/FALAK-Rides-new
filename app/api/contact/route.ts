import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const inquiries = await prisma.contactInquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, subject, message } = body;

    if (!fullName?.trim() || !email?.trim() || !phone?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Full name, email, phone, and message are required.' },
        { status: 400 }
      );
    }

    const inquiryRef = `INQ-${Math.floor(1000 + Math.random() * 9000)}`;

    const created = await prisma.contactInquiry.create({
      data: {
        inquiryRef,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        subject: subject?.trim() || 'General Inquiry',
        message: message.trim(),
        status: 'unread',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully',
      data: {
        id: created.inquiryRef,
        dbId: created.id,
        fullName: created.fullName,
        email: created.email,
        phone: created.phone,
        subject: created.subject,
        message: created.message,
        createdAt: created.createdAt.toISOString(),
      },
    });
  } catch (error: any) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
