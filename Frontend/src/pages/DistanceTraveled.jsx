import { useState } from 'react'

function DistanceTraveled() {
  const trip = {
    distanceKm: 6.4,
    durationMinutes: 19,
    finalPrice: 14.5,
  }
  const [response, setResponse] = useState(null)
  const formattedPrice = new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(trip.finalPrice)

  function handleResponse(nextResponse) {
    console.log('[DistanceTraveled] Ritprijs bevestigd/betwist:', {
      actie: nextResponse,
      afstandKm: trip.distanceKm,
      duurMinuten: trip.durationMinutes,
      eindprijs: trip.finalPrice,
    })
    setResponse(nextResponse)
  }

  return (
    <div className="px-4 py-6">
      <div className="mx-auto w-full max-w-md">

        {/* Header */}
        <div className="mb-4 text-left">
          <h1 className="font-bold text-gray-900">Rit voltooid</h1>
        </div>

        <div className="mb-4 flex flex-col items-center gap-2">
          <span className="grid size-12 place-items-center rounded-full border border-gray-300 text-xl text-gray-900" aria-hidden="true">✓</span>
          <h2 className="font-bold text-gray-900">Je bent aangekomen</h2>
        </div>

        {/* Afstand, duur en eindprijs */}
        <dl className="mb-3">
          <div className="flex items-center justify-between border-b border-gray-300 py-3 text-sm">
            <dt className="text-gray-500">Afstand</dt>
            <dd className="font-bold text-gray-900">{trip.distanceKm.toLocaleString('nl-NL')} km</dd>
          </div>
          <div className="flex items-center justify-between border-b border-gray-300 py-3 text-sm">
            <dt className="text-gray-500">Duur</dt>
            <dd className="font-bold text-gray-900">{trip.durationMinutes} min</dd>
          </div>
          <div className="flex items-center justify-between py-3">
            <dt className="text-sm font-bold text-gray-900">Eindprijs</dt>
            <dd className="text-lg font-bold text-gray-900">{formattedPrice}</dd>
          </div>
        </dl>

        <p className="mb-4 text-center text-sm text-gray-500" aria-live="polite">
          {response === 'accepted' && (
            <>
              <span className="block font-semibold text-gray-900">Bedankt voor je bevestiging!</span>
              <span className="block">Je keuze is opgeslagen.</span>
            </>
          )}
          {response === 'disputed' && (
            <>
              <span className="block font-semibold text-gray-900">Je prijs is betwist.</span>
              <span className="block">Je melding is opgeslagen en wordt nagekeken.</span>
            </>
          )}
          {!response && 'Klopt de prijs?'}
        </p>

        <button
          type="button"
          className="mb-3 w-full cursor-pointer rounded-md bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          onClick={() => handleResponse('accepted')}
        >
          Ja, klopt — verder
        </button>

        <button
          type="button"
          className="w-full cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
          onClick={() => handleResponse('disputed')}
        >
          Nee, prijs betwisten
        </button>
      </div>
    </div>
  )
}

export default DistanceTraveled
