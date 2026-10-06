import { useState } from 'react'
import { Link } from 'react-router-dom'
import Maps from '../components/Maps.jsx'

function DistancePricing() {
  const trip = {
    origin: 'Huidige locatie',
    destination: 'Bestemming',
    distanceKm: 6.4,
    durationMinutes: 18,
    estimatedPrice: 14.5,
  }
  const [response, setResponse] = useState(null)
  const formattedPrice = new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(trip.estimatedPrice)

  function handleResponse(nextResponse) {
    console.log('[DistancePricing] Ritactie:', {
      actie: nextResponse,
      vertrek: trip.origin,
      bestemming: trip.destination,
      afstandKm: trip.distanceKm,
      duurMinuten: trip.durationMinutes,
      geschattePrijs: trip.estimatedPrice,
    })
    setResponse(nextResponse)
  }

  return (
    <div className="px-4 py-6">
      <div className="mx-auto w-full max-w-md">

        {/* Header */}
        <div className="mb-4 flex items-center gap-3">
          <span aria-hidden="true" className="text-lg text-gray-900">←</span>
          <h1 className="font-bold text-gray-900">Route &amp; prijs</h1>
        </div>

        {/* Kaart */}
        <div className="mb-3 h-64 overflow-hidden rounded-lg border border-gray-300">
          <Maps />
        </div>

        {/* Chauffeur */}
        <div className="mb-3 flex items-center gap-3 rounded-lg border border-gray-300 px-4 py-3">
          <span className="size-10 shrink-0 rounded-full border border-gray-300" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-gray-900">Jan Meeuwissen</p>
            <p className="text-xs text-gray-500">★ 4,8 · XX-99-XX</p>
          </div>
          <span className="rounded-md border border-gray-300 px-2 py-1 text-xs font-semibold text-gray-700">Standaard</span>
        </div>

        {/* Route */}
        <div className="mb-3">
          <p className="text-xs font-medium uppercase text-gray-500">Route</p>
          <p className="text-sm text-gray-900">{trip.origin} → {trip.destination}</p>
          <p className="text-xs text-gray-500">{trip.distanceKm.toLocaleString('nl-NL')} km · ca. {trip.durationMinutes} min</p>
        </div>

        {/* Geschatte prijs */}
        <div className="mb-3 flex items-center justify-between rounded-lg border border-gray-300 px-4 py-3">
          <p className="text-xs font-medium uppercase text-gray-500">Geschatte prijs</p>
          <p className="text-lg font-bold text-gray-900">{formattedPrice}</p>
        </div>

        <p className="mb-4 text-center text-sm text-gray-500" aria-live="polite">
          {response === 'changed' && 'Je kunt vertrek of bestemming aanpassen.'}
          {response === 'cancelled' && 'Ritaanvraag geannuleerd.'}
        </p>

        {/* Bevestig rit */}
        <Link
          to="/onderweg"
          className="mb-3 block w-full rounded-md bg-blue-600 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-blue-700"
        >
          Bevestig rit
        </Link>

        <button
          type="button"
          className="mb-3 w-full cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
          onClick={() => handleResponse('changed')}
        >
          Pas vertrek/bestemming aan
        </button>

        <button
          type="button"
          className="w-full cursor-pointer text-sm text-gray-500 underline transition hover:text-gray-700"
          onClick={() => handleResponse('cancelled')}
        >
          Rit annuleren
        </button>
      </div>
    </div>
  )
}

export default DistancePricing
