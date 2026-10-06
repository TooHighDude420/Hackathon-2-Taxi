import { useState } from 'react'

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
    <main className="flex min-h-[calc(100dvh-60px)] justify-center bg-neutral-800 font-sans text-neutral-950 sm:py-6">
      <section className="flex min-h-[calc(100dvh-60px)] w-full flex-col border-x-[5px] border-neutral-950 bg-white sm:min-h-[min(780px,calc(100dvh-6rem-60px))] sm:w-full sm:max-w-[430px] sm:border sm:shadow-xl" aria-labelledby="route-title">
        <header className="flex min-h-[42px] items-center gap-3 border-b border-neutral-800 px-[13px]">
          <span aria-hidden="true" className="text-lg leading-none">←</span>
          <h1 id="route-title" className="text-sm font-bold">Route &amp; prijs</h1>
        </header>

        <div className="flex-1 px-[13px] pb-5 pt-[26px]">
          <div className="relative mb-[26px] h-[165px] overflow-hidden rounded-[4px] border border-neutral-950 bg-neutral-200" role="img" aria-label="Kaartlocatie Nijmegen">
          </div>

          <div className="mb-[26px] flex min-h-[72px] items-center gap-3 rounded-[4px] border border-neutral-950 px-3 py-2">
            <span className="size-[42px] shrink-0 rounded-full border border-neutral-950" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold">Jan Meeuwissen</p>
              <p className="text-[10px] text-neutral-500">★ 4,8 · XX-99-XX</p>
            </div>
            <span className="rounded-[3px] border border-neutral-950 px-3 py-1.5 text-[10px] font-semibold">Standaard</span>
          </div>

          <div className="mb-[26px] py-2">
            <h2 className="mb-2 text-[10px] font-bold tracking-wide text-neutral-500">ROUTE</h2>
            <p className="text-xs">{trip.origin} → {trip.destination}</p>
            <p className="mt-1 text-[10px] text-neutral-500">{trip.distanceKm.toLocaleString('nl-NL')} km · ca. {trip.durationMinutes} min</p>
          </div>

          <div className="flex min-h-[64px] items-center justify-between rounded-[4px] border border-neutral-950 px-3 py-3">
            <span className="text-[10px] font-bold">GESCHATTE PRIJS</span>
            <span className="text-[17px] font-bold">{formattedPrice}</span>
          </div>

          <div className="relative mt-2 h-4 text-center text-[11px] text-neutral-500" aria-live="polite">
            <p className="absolute inset-x-0 top-0 m-0 whitespace-nowrap">
              {response === 'confirmed' && <span className="font-semibold text-neutral-950">Rit bevestigd.</span>}
              {response === 'changed' && <span className="font-semibold text-neutral-950">Je kunt vertrek of bestemming aanpassen.</span>}
              {response === 'cancelled' && <span className="font-semibold text-neutral-950">Ritaanvraag geannuleerd.</span>}
            </p>
          </div>
        </div>

        <footer className="flex flex-col gap-1.5 px-3 pb-[9px] pt-[10px]">
          <button type="button" aria-pressed={response === 'confirmed'} className="min-h-[42px] w-full cursor-pointer rounded-[4px] border border-neutral-950 bg-black text-xs font-bold text-white hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600" style={{ backgroundColor: '#000000', color: '#ffffff' }} onClick={() => handleResponse('confirmed')}>
            Bevestig rit
          </button>
          <button type="button" aria-pressed={response === 'changed'} className="min-h-[42px] w-full cursor-pointer rounded-[4px] border border-neutral-950 bg-white text-xs font-bold text-neutral-950 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600" onClick={() => handleResponse('changed')}>
            Pas vertrek/bestemming aan
          </button>
          <button type="button" className="min-h-6 cursor-pointer text-center text-[11px] text-neutral-700 underline hover:text-neutral-950" onClick={() => handleResponse('cancelled')}>
            Rit annuleren
          </button>
        </footer>
      </section>
    </main> 
  )
}

export default DistancePricing
