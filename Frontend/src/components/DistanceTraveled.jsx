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
    <main className="flex min-h-[calc(100dvh-60px)] justify-center bg-neutral-800 font-sans text-neutral-950 sm:py-6">
      <section className="flex min-h-[calc(100dvh-60px)] w-full flex-col border-x-[5px] border-neutral-950 bg-white sm:min-h-[min(780px,calc(100dvh-6rem-60px))] sm:w-full sm:max-w-[430px] sm:border sm:shadow-xl" aria-labelledby="trip-title">
        <header className="flex min-h-[42px] items-center border-b border-neutral-800 px-[13px]">
          <h1 id="trip-title" className="text-sm font-bold">Rit voltooid</h1>
        </header>

        <div className="flex-1 px-[13px] pb-5 pt-[26px]">
          <div className="mb-[26px] flex flex-col items-center gap-2">
            <span className="grid size-[43px] place-items-center rounded-full border-[1.5px] border-neutral-950 text-[21px] leading-none" aria-hidden="true">✓</span>
            <h2 className="text-sm font-bold">Je bent aangekomen</h2>
          </div>

          <dl className="m-0">
            <div className="flex min-h-7 items-center justify-between border-b border-neutral-200 text-xs">
              <dt>Afstand</dt><dd className="m-0 font-bold">{trip.distanceKm.toLocaleString('nl-NL')} km</dd>
            </div>
            <div className="flex min-h-7 items-center justify-between border-b border-neutral-200 text-xs">
              <dt>Duur</dt><dd className="m-0 font-bold">{trip.durationMinutes} min</dd>
            </div>
            <div className="flex min-h-7 items-center justify-between text-xs font-bold">
              <dt>Eindprijs</dt><dd className="m-0 text-[17px]">{formattedPrice}</dd>
            </div>
          </dl>

          <p className="mt-3 text-center text-[11px] text-neutral-500" aria-live="polite">
            {response === 'accepted' && (
              <>
                <span className="block font-semibold text-neutral-950">Bedankt voor je bevestiging!</span>
                <span className="mt-1 block">Je keuze is opgeslagen.</span>
              </>
            )}
            {response === 'disputed' && (
              <>
                <span className="block font-semibold text-neutral-950">Je prijs is betwist.</span>
                <span className="mt-1 block">Je melding is opgeslagen en wordt nagekeken.</span>
              </>
            )}
            {!response && 'Klopt de prijs?'}
          </p>
        </div>

        <footer className="flex flex-col gap-1.5 border-t border-neutral-800 px-3 pb-[9px] pt-[10px]">
          <button type="button" aria-pressed={response === 'accepted'} className="min-h-[31px] w-full cursor-pointer rounded-[3px] border border-neutral-950 bg-neutral-950 text-[11px] font-bold text-white hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600" onClick={() => handleResponse('accepted')}>
            Ja, klopt — verder
          </button>
          <button type="button" aria-pressed={response === 'disputed'} className="min-h-[31px] w-full cursor-pointer rounded-[3px] border border-neutral-950 bg-white text-[11px] font-bold text-neutral-950 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600" onClick={() => handleResponse('disputed')}>
            Nee, prijs betwisten
          </button>
        </footer>
      </section>
    </main>
  )
}

export default DistanceTraveled