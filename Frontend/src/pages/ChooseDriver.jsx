import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch } from '../utils/api.js'
import { formatRate } from '../utils/taxi.js'

function ChooseDriver() {
  const navigate = useNavigate()
  const [taxis, setTaxis] = useState(null)
  const [error, setError] = useState(null)
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    apiFetch('/taxi/')
      .then(setTaxis)
      .catch((err) => setError(err.message))
  }, [])

  const selectedTaxi = taxis?.find((taxi) => taxi.id === selectedId)

  return (
    <div className="px-4 py-6">
      <div className="mx-auto w-full max-w-md">

        {/* Header */}
        <div className="mb-4 text-left">
          <h1 className="font-bold text-gray-900">Kies je chauffeur</h1>
          <p className="text-sm text-gray-500">Kies een geregistreerde taxi om je rit mee te plannen.</p>
        </div>

        {error && <p className="mb-3 text-sm text-red-600" role="alert">{error}</p>}
        {!taxis && !error && <p className="mb-3 text-sm text-gray-500">Taxi&apos;s laden…</p>}

        {taxis?.length === 0 && (
          <p className="mb-3 rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-500">
            Er zijn nog geen taxi&apos;s geregistreerd.
          </p>
        )}

        {taxis?.length > 0 && (
          <>
            <fieldset className="mb-4">
              <legend className="mb-1 text-xs font-medium uppercase text-gray-500">Beschikbare taxi&apos;s</legend>
              {taxis.map((taxi) => {
                const selected = taxi.id === selectedId
                return (
                  <label
                    key={taxi.id}
                    className={`mb-2 flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-600 has-[:focus-visible]:ring-offset-2 ${
                      selected ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="taxi"
                      className="sr-only"
                      checked={selected}
                      onChange={() => setSelectedId(taxi.id)}
                    />
                    <span className="size-10 shrink-0 rounded-full border border-gray-300" aria-hidden="true" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold text-gray-900">{taxi.name}</span>
                      <span className="block text-xs text-gray-500">Chauffeur: {taxi.driver}</span>
                    </span>
                    <span className="text-sm font-bold text-gray-900">{formatRate(taxi)}</span>
                  </label>
                )
              })}
            </fieldset>

            <button
              type="button"
              disabled={!selectedTaxi}
              onClick={() => navigate('/route-en-prijs', { state: { taxi: selectedTaxi } })}
              className="w-full cursor-pointer rounded-md bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              Kies deze chauffeur
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default ChooseDriver
