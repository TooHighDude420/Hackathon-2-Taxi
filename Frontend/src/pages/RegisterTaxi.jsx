import { useEffect, useState } from 'react'
import TextField from '../components/TextField.jsx'
import ToggleGroup from '../components/ToggleGroup.jsx'
import { apiFetch } from '../utils/api.js'
import { CHARGE_TYPES, formatRate } from '../utils/taxi.js'

const CHARGE_TYPE_OPTIONS = [
  { value: CHARGE_TYPES.DISTANCE, label: 'Per kilometer' },
  { value: CHARGE_TYPES.TIME, label: 'Per minuut' },
]

function RegisterTaxi() {
  const [loading, setLoading] = useState(true)
  const [taxi, setTaxi] = useState(null)
  const [name, setName] = useState('')
  const [chargeType, setChargeType] = useState(CHARGE_TYPES.DISTANCE)
  const [rate, setRate] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    apiFetch('/taxi/mine/')
      .then(setTaxi)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      setTaxi(await apiFetch('/taxi/', { method: 'POST', body: { name, charge_type: chargeType, rate } }))
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return null

  if (taxi) {
    return (
      <div className="px-4 py-6">
        <div className="mx-auto w-full max-w-md">

          {/* Header */}
          <div className="mb-4 text-left">
            <h1 className="font-bold text-gray-900">Mijn taxi</h1>
            <p className="text-sm text-gray-500">Je taxi is geregistreerd.</p>
          </div>

          <div className="mb-3 rounded-lg border border-gray-300 px-4 py-3">
            <p className="text-xs font-medium uppercase text-gray-500">Geregistreerde taxi</p>
            <p className="text-lg font-bold text-gray-900">{taxi.name}</p>
            <p className="text-sm text-gray-500">{formatRate(taxi)}</p>
          </div>

          <p className="text-center text-sm text-gray-500">Reizigers kunnen je nu kiezen in hun overzicht.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6">
      <div className="mx-auto w-full max-w-md">

        {/* Header */}
        <div className="mb-4 text-left">
          <h1 className="font-bold text-gray-900">Taxi registreren</h1>
          <p className="text-sm text-gray-500">Registreer je taxi zodat reizigers je kunnen kiezen.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Naam van je taxi"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={30}
            required
          />
          <ToggleGroup
            legend="Tariefsoort"
            name="charge_type"
            options={CHARGE_TYPE_OPTIONS}
            value={chargeType}
            onChange={setChargeType}
          />
          <TextField
            label={chargeType === CHARGE_TYPES.DISTANCE ? 'Tarief per kilometer (€)' : 'Tarief per minuut (€)'}
            type="number"
            inputMode="decimal"
            min="0.01"
            step="0.01"
            value={rate}
            onChange={(event) => setRate(event.target.value)}
            required
          />

          {error && <p className="mb-3 text-sm text-red-600" role="alert">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full cursor-pointer rounded-md bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            Taxi registreren
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterTaxi
