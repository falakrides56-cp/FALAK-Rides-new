import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const booking = await prisma.booking.findFirst({
      where: {
        OR: [{ id }, { bookingRef: id.toUpperCase() }],
      },
      include: {
        driver: true,
      },
    });

    if (!booking) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
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
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await req.json();

    const booking = await prisma.booking.findFirst({
      where: {
        OR: [{ id }, { bookingRef: id.toUpperCase() }],
      },
    });

    if (!booking) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
    }

    const updated = await prisma.booking.update({
      where: { id: booking.id },
      data: {
        ...(body.status && { status: body.status }),
        ...(body.notes !== undefined && { notes: body.notes }),
        ...(body.amount !== undefined && { amount: parseFloat(body.amount) }),
        ...(body.driverId !== undefined && { driverId: body.driverId }),
      },
      include: {
        driver: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Booking updated successfully',
      data: {
        id: updated.bookingRef,
        status: updated.status,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const booking = await prisma.booking.findFirst({
      where: {
        OR: [{ id }, { bookingRef: id.toUpperCase() }],
      },
    });

    if (!booking) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
    }

    await prisma.booking.delete({
      where: { id: booking.id },
    });

    return NextResponse.json({ success: true, message: 'Booking deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
