import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const drivers = await prisma.driver.findMany({
      where: { status: 'active' },
      orderBy: { rating: 'desc' },
    });
    return NextResponse.json({ success: true, count: drivers.length, data: drivers });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
