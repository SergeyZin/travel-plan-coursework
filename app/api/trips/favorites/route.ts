import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { ids } = body

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json([])
    }

    const trips = await prisma.trip.findMany({
      where: {
        id: { in: ids },
        status: 'PUBLISHED',
      },
      include: {
        category: true,
        images: { orderBy: { sortOrder: 'asc' } },
      },
    })

    return NextResponse.json(trips)
  } catch (error) {
    console.error('Failed to fetch favorite trips:', error)
    return NextResponse.json({ error: 'Failed to fetch favorites' }, { status: 500 })
  }
}
