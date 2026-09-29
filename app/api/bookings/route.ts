import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search')?.trim();
    const status = searchParams.get('status')?.trim();

    const where: any = {};

    if (status && status !== 'all') {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { bookingRef: { contains: search, mode: 'insensitive' } },
        { customerName: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
        { pickupCity: { contains: search, mode: 'insensitive' } },
        { dropoffCity: { contains: search, mode: 'insensitive' } },
      ];
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        driver: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Format to match frontend standard structure
    const formatted = bookings.map((b) => ({
      id: b.bookingRef,
      dbId: b.id,
      name: b.customerName,
      phone: b.phone,
      pickup: b.pickupCity,
      dropoff: b.dropoffCity,
      pickupLocation: b.pickupLocation || '',
      date: b.date,
      time: b.time,
      returnDate: b.returnDate || '',
      returnTime: b.returnTime || '',
      carType: b.carType,
      passengers: b.passengers,
      serviceType: b.serviceType,
      payment: b.paymentMethod,
      status: b.status,
      amount: b.amount,
      notes: b.notes || '',
      createdAt: b.createdAt.toISOString(),
      driver: b.driver
        ? {
            name: b.driver.name,
            phone: b.driver.phone,
            rating: b.driver.rating,
            vehicle: b.driver.vehicle,
            plate: b.driver.plate,
            avatar: b.driver.avatar || 'DR',
          }
        : undefined,
    }));

    return NextResponse.json({ success: true, count: formatted.length, data: formatted });
  } catch (error: any) {
    console.error('Error fetching bookings from Neon PostgreSQL:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      customerName,
      phone,
      pickup,
      pickupCity,
      dropoff,
      dropoffCity,
      pickupLocation,
      date,
      time,
      returnDate,
      returnTime,
      carType,
      passengers,
      serviceType,
      payment,
      paymentMethod,
      amount,
      notes,
    } = body;

    const finalName = (name || customerName || '').trim();
    const finalPhone = (phone || '').trim();
    const finalPickup = (pickup || pickupCity || '').trim();
    const finalDropoff = (dropoff || dropoffCity || '').trim();

    if (!finalName || !finalPhone || !finalPickup || !finalDropoff || !date) {
      return NextResponse.json(
        { success: false, error: 'Missing required booking fields (name, phone, pickup, dropoff, date)' },
        { status: 400 }
      );
    }

    // Generate unique booking reference (e.g. BK-4921)
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingRef = `BK-${randomSuffix}`;

    // Pick a driver randomly from active drivers
    const drivers = await prisma.driver.findMany({ where: { status: 'active' } });
    const assignedDriver =
      drivers.length > 0 ? drivers[Math.floor(Math.random() * drivers.length)] : null;

    const newBooking = await prisma.booking.create({
      data: {
        bookingRef,
        customerName: finalName,
        phone: finalPhone,
        pickupCity: finalPickup,
        dropoffCity: finalDropoff,
        pickupLocation: pickupLocation || null,
        date,
        time: time || '10:00',
        returnDate: returnDate || null,
        returnTime: returnTime || null,
        carType: carType || 'Sedan',
        passengers: parseInt(passengers) || 1,
        serviceType: serviceType || 'Airport Transfer',
        paymentMethod: payment || paymentMethod || 'Cash',
        status: 'confirmed',
        amount: parseFloat(amount) || 180,
        notes: notes || null,
        driverId: assignedDriver?.id || null,
      },
      include: {
        driver: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Booking created successfully in database',
      data: {
        id: newBooking.bookingRef,
        dbId: newBooking.id,
        name: newBooking.customerName,
        phone: newBooking.phone,
        pickup: newBooking.pickupCity,
        dropoff: newBooking.dropoffCity,
        pickupLocation: newBooking.pickupLocation || '',
        date: newBooking.date,
        time: newBooking.time,
        returnDate: newBooking.returnDate || '',
        returnTime: newBooking.returnTime || '',
        carType: newBooking.carType,
        passengers: newBooking.passengers,
        serviceType: newBooking.serviceType,
        payment: newBooking.paymentMethod,
        status: newBooking.status,
        amount: newBooking.amount,
        notes: newBooking.notes || '',
        createdAt: newBooking.createdAt.toISOString(),
        driver: newBooking.driver
          ? {
              name: newBooking.driver.name,
              phone: newBooking.driver.phone,
              rating: newBooking.driver.rating,
              vehicle: newBooking.driver.vehicle,
              plate: newBooking.driver.plate,
              avatar: newBooking.driver.avatar || 'DR',
            }
          : undefined,
      },
    });
  } catch (error: any) {
    console.error('Error creating booking in Neon PostgreSQL:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create booking' },
      { status: 500 }
    );
  }
}
