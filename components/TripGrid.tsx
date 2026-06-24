import { TripCard } from './TripCard'

interface TripGridProps {
  trips: any[]
  emptyText?: string
}

export function TripGrid({ trips, emptyText = 'Туров не найдено' }: TripGridProps) {
  if (!trips.length) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400 text-lg">{emptyText}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  )
}
