import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const ref = searchParams.get('ref')?.trim().toUpperCase();
    const phone = searchParams.get('phone')?.trim();

    if (!ref && !phone) {
      return NextResponse.json(
        { success: false, error: 'Please provide a booking reference (ref) or phone number' },
        { status: 400 }
      );
    }

    const where: any = {};
    if (ref) {
      where.OR = [
        { bookingRef: ref },
        { phone: { contains: ref } },
        { customerName: { contains: ref, mode: 'insensitive' } },
      ];
    } else if (phone) {
      where.phone = { contains: phone };
    }

    const booking = await prisma.booking.findFirst({
      where,
      include: {
        driver: true,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'No booking found matching your search reference.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: booking.bookingRef,
        dbId: booking.id,
        name: booking.customerName,
        phone: booking.phone,
        pickup: booking.pickupCity,
        dropoff: booking.dropoffCity,
        pickupLocation: booking.pickupLocation || '',
        date: booking.date,
        time: booking.time,
        returnDate: booking.returnDate || '',
        returnTime: booking.returnTime || '',
        carType: booking.carType,
        passengers: booking.passengers,
        serviceType: booking.serviceType,
        payment: booking.paymentMethod,
        status: booking.status,
        amount: booking.amount,
        notes: booking.notes || '',
        createdAt: booking.createdAt.toISOString(),
        driver: booking.driver
          ? {
              name: booking.driver.name,
              phone: booking.driver.phone,
              rating: booking.driver.rating,
              vehicle: booking.driver.vehicle,
              plate: booking.driver.plate,
              avatar: booking.driver.avatar || 'DR',
            }
          : undefined,
      },
    });
  } catch (error: any) {
    console.error('Error tracking booking:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
