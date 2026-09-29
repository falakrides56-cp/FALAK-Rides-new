import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get('all') === 'true';
    const rating = searchParams.get('rating');

    const where: any = {};
    if (!all) {
      where.status = 'approved';
    }
    if (rating) {
      where.rating = parseInt(rating);
    }

    const reviews = await prisma.review.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const formatted = reviews.map((r) => ({
      id: r.id,
      name: r.name,
      rating: r.rating,
      date: r.date,
      comment: r.comment,
      route: r.route,
      country: r.country || 'Pilgrim',
      status: r.status,
      avatar: r.name.slice(0, 2).toUpperCase(),
    }));

    return NextResponse.json({ success: true, count: formatted.length, data: formatted });
  } catch (error: any) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, rating, comment, route, country } = body;

    if (!name?.trim() || !comment?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Name and comment are required.' },
        { status: 400 }
      );
    }

    const created = await prisma.review.create({
      data: {
        name: name.trim(),
        rating: parseInt(rating) || 5,
        date: new Date().toISOString().split('T')[0],
        comment: comment.trim(),
        route: route?.trim() || 'Jeddah Airport → Makkah Hotel',
        country: country?.trim() || 'Pilgrim',
        status: 'approved',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Review submitted successfully',
      data: {
        id: created.id,
        name: created.name,
        rating: created.rating,
        date: created.date,
        comment: created.comment,
        route: created.route,
        country: created.country,
        status: created.status,
        avatar: created.name.slice(0, 2).toUpperCase(),
      },
    });
  } catch (error: any) {
    console.error('Error submitting review:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
