import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

async function getCurrentUser(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))
    return payload as { userId: string; email: string; role: string }
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  const user = await getCurrentUser(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: user.userId },
      include: {
        trip: {
          select: {
            id: true,
            title: true,
            slug: true,
            country: true,
            city: true,
            images: { where: { isMain: true }, take: 1 },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Failed to fetch bookings:', error)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { items, notes, contactName, contactEmail, contactPhone } = body

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 })
    }

    const results = []

    for (const item of items) {
      const trip = await prisma.trip.findUnique({ where: { id: item.tripId } })
      if (!trip) continue

      const bookingCode = 'TP-' + Math.random().toString(36).substring(2, 8).toUpperCase()

      const booking = await prisma.booking.create({
        data: {
          userId: user.userId,
          tripId: item.tripId,
          travelers: item.travelers,
          startDate: new Date(item.startDate),
          totalAmount: item.price * item.travelers,
          status: 'CONFIRMED',
          paymentStatus: 'PENDING',
          bookingCode,
          notes: notes || null,
          contactName: contactName || null,
          contactEmail: contactEmail || null,
          contactPhone: contactPhone || null,
        },
      })

      await prisma.trip.update({
        where: { id: item.tripId },
        data: { bookingsCount: { increment: 1 } },
      })

      results.push(booking)
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error('Failed to create booking:', error)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}
