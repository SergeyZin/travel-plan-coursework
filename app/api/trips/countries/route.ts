import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const trips = await prisma.trip.findMany({
      where: { status: 'PUBLISHED' },
      select: { country: true },
      distinct: ['country'],
      orderBy: { country: 'asc' },
    })
    return NextResponse.json(trips.map((t) => t.country))
  } catch (error) {
    console.error('Failed to fetch countries:', error)
    return NextResponse.json({ error: 'Failed to fetch countries' }, { status: 500 })
  }
}
