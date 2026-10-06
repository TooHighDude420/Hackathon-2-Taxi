import { useState } from 'react'
import { Link } from 'react-router-dom'

const SPEED_LIMIT_KMH = 50
const CURRENT_SPEED_KMH = 54

function getSpeedStatus(currentSpeedKmh, speedLimitKmh) {
  const overBy = currentSpeedKmh - speedLimitKmh

  if (overBy <= 0) {
    return { level: 'ok', textClass: 'text-green-600' }
  }

  if (overBy < 5) {
    return {
      level: 'warning',
      textClass: 'text-red-600',
      label: 'Je chauffeur rijdt licht te hard',
      description: 'De snelheid ligt boven de limiet, maar nog geen 5 km/u te hard.',
    }
  }

  return {
    level: 'danger',
    textClass: 'text-red-600',
    label: 'Je chauffeur rijdt veel te hard',
    description: 'De snelheid ligt meer dan 5 km/u boven de limiet.',
  }
}

function SpeedIndicator() {
  const trip = {
    currentSpeedKmh: CURRENT_SPEED_KMH,
    speedLimitKmh: SPEED_LIMIT_KMH,
  }
  const status = getSpeedStatus(trip.currentSpeedKmh, trip.speedLimitKmh)
  const [interaction, setInteraction] = useState(null)

  function handleReport() {
    console.log('[SpeedIndicator] Te hard rijden gemeld:', {
      huidigeSnelheid: trip.currentSpeedKmh,
      limiet: trip.speedLimitKmh,
    })
    setInteraction('reported')
  }

  return (
    <main className="flex flex-1 justify-center bg-white font-sans text-neutral-950 sm:py-6">
      <section className="flex w-full flex-col bg-white sm:max-w-md sm:border sm:border-neutral-950 sm:shadow-xl" aria-labelledby="speed-title">
        <header className="flex h-10 items-center border-b border-neutral-800 px-3">
          <h1 id="speed-title" className="text-sm font-bold">Snelheid</h1>
        </header>

        <div className="flex-1 p-3">
          <div className="flex gap-3">
            <div className="flex-1 rounded border-2 border-neutral-950 p-3 text-center">
              <div className="text-xs font-bold uppercase tracking-wide text-neutral-600">Snelheid</div>
              <div className={`text-xl font-bold ${status.textClass}`} aria-live="polite">{trip.currentSpeedKmh} km/u</div>
            </div>
            <div className="flex-1 rounded border-2 border-neutral-950 p-3 text-center">
              <div className="text-xs font-bold uppercase tracking-wide text-neutral-600">Limiet</div>
              <div className="text-xl font-bold">{trip.speedLimitKmh} km/u</div>
            </div>
          </div>

          {status.level === 'ok' && (
            <p className="mt-4 text-center text-xs text-neutral-500">
              Je chauffeur rijdt netjes binnen de snelheidslimiet.
            </p>
          )}
  
          {status.level !== 'ok' && interaction !== 'dismissed' && (
            <div className="mt-4 flex flex-col gap-2 rounded border-2 border-neutral-950 p-3">
              <div className="text-sm font-extrabold">{status.label}</div>

              {interaction === 'reported' ? (
                <div className="text-xs text-neutral-600" aria-live="polite">
                  Melding verstuurd, we hebben 'm opgeslagen.
                </div>
              ) : (
                <>
                  <div className="text-xs text-neutral-600">{status.description}</div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="h-8 flex-1 rounded border border-neutral-950 bg-neutral-950 text-xs font-bold text-white hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600"
                      onClick={handleReport}
                    >
                      Meld te hard rijden
                    </button>
                    <button
                      type="button"
                      className="h-8 flex-1 rounded border border-neutral-950 bg-white text-xs font-bold text-neutral-950 hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600"
                      onClick={() => setInteraction('dismissed')}
                    >
                      Negeren
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <footer className="border-t border-neutral-800 p-3">
          <Link
            to="/rit-voltooid"
            className="block h-8 rounded border border-neutral-950 bg-neutral-950 text-center text-xs font-bold leading-8 text-white hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600"
          >
            Bestemming bereikt
          </Link>
        </footer>
      </section>
    </main>
  )
}

export default SpeedIndicator
