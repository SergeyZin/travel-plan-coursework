export interface Trip {
  id: string
  title: string
  slug: string
  shortDescription: string
  description: string
  country: string
  city: string | null
  durationDays: number
  price: number
  oldPrice: number | null
  groupSize: number
  difficulty: string
  includes: string
  excludes: string
  isFeatured: boolean
  rating: number
  reviewsCount: number
  images: TripImage[]
  category: Category
  itinerary: ItineraryDay[]
}

export interface TripImage {
  id: string
  url: string
  altText: string
  isMain: boolean
}

export interface ItineraryDay {
  id: string
  dayNumber: number
  title: string
  description: string
  meals: string | null
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  description: string | null
}

export interface Booking {
  id: string
  travelers: number
  startDate: string
  totalAmount: number
  status: string
  bookingCode: string
  trip: Trip
}

export interface Review {
  id: string
  rating: number
  comment: string | null
  user: { name: string }
  createdAt: string
}
