import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import TextField from '../components/TextField.jsx'
import ToggleGroup from '../components/ToggleGroup.jsx'
import { ROLE_OPTIONS, dashboardPath, useAuth } from '../context/authContext.js'

function Register() {
  const { user, loading, register } = useAuth()
  const [role, setRole] = useState('passenger')
  const [form, setForm] = useState({ username: '', password: '', country: '', city: '' })
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  if (loading) return null
  if (user) return <Navigate to={dashboardPath(user.role)} replace />

  function updateField(field) {
    return (event) => setForm({ ...form, [field]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await register({ ...form, role })
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <div className="px-4 py-6">
      <div className="mx-auto w-full max-w-md">

        {/* Header */}
        <div className="mb-4 text-left">
          <h1 className="font-bold text-gray-900">Account aanmaken</h1>
          <p className="text-sm text-gray-500">Maak een account aan als reiziger of als chauffeur.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <ToggleGroup legend="Ik ben" name="role" options={ROLE_OPTIONS} value={role} onChange={setRole} />
          <TextField
            label="Gebruikersnaam"
            value={form.username}
            onChange={updateField('username')}
            autoComplete="username"
            maxLength={150}
            required
          />
          <TextField
            label="Wachtwoord"
            type="password"
            value={form.password}
            onChange={updateField('password')}
            autoComplete="new-password"
            minLength={8}
            required
          />
          <TextField
            label="Land"
            value={form.country}
            onChange={updateField('country')}
            autoComplete="country-name"
            maxLength={30}
            required
          />
          <TextField
            label="Stad"
            value={form.city}
            onChange={updateField('city')}
            autoComplete="address-level2"
            maxLength={30}
            required
          />

          {error && <p className="mb-3 text-sm text-red-600" role="alert">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mb-3 w-full cursor-pointer rounded-md bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            Account aanmaken
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Al een account?{' '}
          <Link to="/inloggen" className="text-blue-600 underline hover:text-blue-700">
            Inloggen
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
