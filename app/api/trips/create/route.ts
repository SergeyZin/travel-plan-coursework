import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      title,
      shortDescription,
      description,
      categoryId,
      country,
      city,
      durationDays,
      price,
      oldPrice,
      groupSize,
      difficulty,
      includes,
      excludes,
      startDate,
      slug,
    } = body

    if (!title || !description || !categoryId || !country || !startDate || !slug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const start = new Date(startDate)
    const end = new Date(start)
    end.setDate(start.getDate() + (parseInt(durationDays, 10) || 1))

    const existing = await prisma.trip.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json({ error: 'Trip with this slug already exists' }, { status: 409 })
    }

    const organizer = await prisma.user.findFirst({ where: { role: 'ORGANIZER' } })
    if (!organizer) {
      return NextResponse.json({ error: 'No organizer found' }, { status: 500 })
    }

    const trip = await prisma.trip.create({
      data: {
        title,
        shortDescription,
        description,
        slug,
        categoryId,
        organizerId: organizer.id,
        country,
        city: city || '',
        startDate: start,
        endDate: end,
        durationDays: parseInt(durationDays, 10) || 1,
        price: parseInt(price, 10) || 0,
        oldPrice: oldPrice ? parseInt(oldPrice, 10) : null,
        groupSize: parseInt(groupSize, 10) || 10,
        difficulty: difficulty || 'easy',
        includes: includes || '',
        excludes: excludes || '',
        season: determineSeason(start.getMonth()),
        images: {
          create: [
            {
              url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80',
              altText: title,
              isMain: true,
              sortOrder: 0,
            },
          ],
        },
      },
    })

    return NextResponse.json(trip)
  } catch (error) {
    console.error('Failed to create trip:', error)
    return NextResponse.json({ error: 'Failed to create trip' }, { status: 500 })
  }
}

function determineSeason(month: number): string {
  if (month >= 2 && month <= 4) return 'spring'
  if (month >= 5 && month <= 7) return 'summer'
  if (month >= 8 && month <= 10) return 'autumn'
  return 'winter'
}
