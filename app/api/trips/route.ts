import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    const country = searchParams.get('country') || ''
    const season = searchParams.get('season') || ''
    const duration = searchParams.get('duration') || ''
    const difficulty = searchParams.get('difficulty') || ''
    const priceMax = searchParams.get('priceMax') || ''
    const sort = searchParams.get('sort') || 'rating'

    const where: any = { status: 'PUBLISHED' }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { country: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (category) {
      where.category = { slug: category }
    }

    if (country) {
      where.country = country
    }

    if (season) {
      where.season = season
    }

    if (difficulty) {
      where.difficulty = difficulty
    }

    if (priceMax) {
      where.price = { lte: parseInt(priceMax, 10) }
    }

    if (duration) {
      switch (duration) {
        case '1-3':
          where.durationDays = { gte: 1, lte: 3 }
          break
        case '4-7':
          where.durationDays = { gte: 4, lte: 7 }
          break
        case '8-14':
          where.durationDays = { gte: 8, lte: 14 }
          break
        case '15+':
          where.durationDays = { gte: 15 }
          break
      }
    }

    let orderBy: any = { rating: 'desc' }
    switch (sort) {
      case 'price-asc':
        orderBy = { price: 'asc' }
        break
      case 'price-desc':
        orderBy = { price: 'desc' }
        break
      case 'duration':
        orderBy = { durationDays: 'asc' }
        break
      case 'popular':
        orderBy = { bookingsCount: 'desc' }
        break
    }

    const trips = await prisma.trip.findMany({
      where,
      include: {
        category: true,
        images: { orderBy: { sortOrder: 'asc' } },
      },
      orderBy,
    })

    return NextResponse.json(trips)
  } catch (error) {
    console.error('Failed to fetch trips:', error)
    return NextResponse.json({ error: 'Failed to fetch trips' }, { status: 500 })
  }
}
