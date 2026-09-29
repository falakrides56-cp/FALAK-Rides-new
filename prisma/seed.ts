import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding on Neon PostgreSQL...');

  // 1. Seed Drivers
  const driversData = [
    {
      name: 'Ali Al-Harbi',
      phone: '+966 55 111 2233',
      rating: 4.9,
      vehicle: 'Toyota Camry Hybrid (Sedan)',
      plate: 'ح ر ب 8421',
      avatar: 'AH',
      status: 'active',
    },
    {
      name: 'Nasser Al-Ghamdi',
      phone: '+966 57 333 4455',
      rating: 5.0,
      vehicle: 'Hyundai Staria VIP 7-Seater',
      plate: 'ق م د 3912',
      avatar: 'NG',
      status: 'active',
    },
    {
      name: 'Hassan Al-Otaibi',
      phone: '+966 56 222 3344',
      rating: 4.8,
      vehicle: 'GMC Yukon XL (Family SUV)',
      plate: 'ط ي ب 1054',
      avatar: 'HO',
      status: 'active',
    },
    {
      name: 'Fahd Al-Dossari',
      phone: '+966 59 555 6677',
      rating: 4.9,
      vehicle: 'Mercedes-Benz E-Class VIP',
      plate: 'د س ر 7733',
      avatar: 'FD',
      status: 'active',
    },
    {
      name: 'Majed Al-Subaie',
      phone: '+966 50 666 7788',
      rating: 4.7,
      vehicle: 'Chevrolet Tahoe SUV',
      plate: 'س ب ع 9210',
      avatar: 'MS',
      status: 'active',
    },
  ];

  const createdDrivers = [];
  for (const d of driversData) {
    const existing = await prisma.driver.findFirst({
      where: { name: d.name },
    });
    if (!existing) {
      const driver = await prisma.driver.create({ data: d });
      createdDrivers.push(driver);
    } else {
      createdDrivers.push(existing);
    }
  }
  console.log(`✅ Seeded ${createdDrivers.length} drivers.`);

  // 2. Seed Bookings from data/bookings.json
  try {
    const bookingsFilePath = path.join(process.cwd(), 'data', 'bookings.json');
    if (fs.existsSync(bookingsFilePath)) {
      const raw = fs.readFileSync(bookingsFilePath, 'utf-8');
      const seedBookings = JSON.parse(raw);

      for (let i = 0; i < seedBookings.length; i++) {
        const b = seedBookings[i];
        const assignedDriver = createdDrivers[i % createdDrivers.length];

        const existing = await prisma.booking.findUnique({
          where: { bookingRef: b.id },
        });

        if (!existing) {
          await prisma.booking.create({
            data: {
              bookingRef: b.id,
              customerName: b.name,
              phone: b.phone,
              pickupCity: b.pickup,
              dropoffCity: b.dropoff,
              date: b.date,
              time: b.time || '10:00',
              returnDate: b.returnDate || null,
              returnTime: b.returnTime || null,
              carType: b.carType,
              passengers: b.passengers || 2,
              serviceType: b.serviceType || 'Airport Transfer',
              paymentMethod: b.payment || 'Cash',
              status: b.status || 'confirmed',
              amount: parseFloat(b.amount) || 150,
              notes: b.notes || null,
              driverId: assignedDriver?.id || null,
            },
          });
        }
      }
      console.log(`✅ Seeded bookings from bookings.json.`);
    }
  } catch (err) {
    console.warn('Could not read bookings.json:', err);
  }

  // 3. Seed Reviews from data/reviews.json
  try {
    const reviewsFilePath = path.join(process.cwd(), 'data', 'reviews.json');
    if (fs.existsSync(reviewsFilePath)) {
      const raw = fs.readFileSync(reviewsFilePath, 'utf-8');
      const seedReviews = JSON.parse(raw);

      for (const r of seedReviews) {
        const existing = await prisma.review.findFirst({
          where: { name: r.name, comment: r.comment },
        });

        if (!existing) {
          await prisma.review.create({
            data: {
              name: r.name,
              rating: r.rating || 5,
              date: r.date || '2025-09-15',
              comment: r.comment,
              route: r.route || r.service || 'Jeddah Airport → Makkah Hotel',
              country: r.location || 'Pilgrim',
              status: 'approved',
            },
          });
        }
      }
      console.log(`✅ Seeded reviews from reviews.json.`);
    }
  } catch (err) {
    console.warn('Could not read reviews.json:', err);
  }

  // 4. Seed Contact Inquiries
  const sampleInquiries = [
    {
      inquiryRef: 'INQ-1001',
      fullName: 'Tariq Mansour',
      email: 'tariq.mansour@example.com',
      phone: '+966 55 987 6543',
      subject: 'Family Group Transfer for 12 Pax',
      message: 'Arriving at King Abdulaziz Airport Terminal 1 with elderly parents. Need two GMC Yukons or one large HiAce van.',
      status: 'unread',
    },
    {
      inquiryRef: 'INQ-1002',
      fullName: 'Dr. Faisal Al-Sabah',
      email: 'faisal.sabah@example.com',
      phone: '+966 50 123 4567',
      subject: 'VIP Ziyarat Tour in Madinah',
      message: 'Looking for private historical Ziyarat tour including Mount Uhud and Masjid Quba with English speaking guide.',
      status: 'read',
    },
  ];

  for (const inq of sampleInquiries) {
    const existing = await prisma.contactInquiry.findUnique({
      where: { inquiryRef: inq.inquiryRef },
    });
    if (!existing) {
      await prisma.contactInquiry.create({ data: inq });
    }
  }
  console.log(`✅ Seeded contact inquiries.`);

  // 5. Seed Admin User
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { username: 'admin' },
  });

  if (!existingAdmin) {
    await prisma.adminUser.create({
      data: {
        username: 'admin',
        email: 'falakrides56@gmail.com',
        passwordHash: 'admin123', // In a production app, use bcrypt hash
        name: 'Falak Ride Operations Admin',
        role: 'admin',
      },
    });
    console.log(`✅ Seeded initial admin account (username: admin, email: falakrides56@gmail.com).`);
  }

  console.log('🎉 Database seeding complete!');
}

main()
  .catch((e) => {
    console.error('Error during database seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
