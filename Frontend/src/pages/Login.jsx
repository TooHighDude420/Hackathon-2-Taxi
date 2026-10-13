import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import TextField from '../components/TextField.jsx'
import { dashboardPath, useAuth } from '../context/authContext.js'

function Login() {
  const { user, loading, login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  if (loading) return null
  if (user) return <Navigate to={dashboardPath(user.role)} replace />

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await login({ username, password })
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
          <h1 className="font-bold text-gray-900">Inloggen</h1>
          <p className="text-sm text-gray-500">Log in met je gebruikersnaam en wachtwoord.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Gebruikersnaam"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            required
          />
          <TextField
            label="Wachtwoord"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />

          {error && <p className="mb-3 text-sm text-red-600" role="alert">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mb-3 w-full cursor-pointer rounded-md bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            Inloggen
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Nog geen account?{' '}
          <Link to="/account-aanmaken" className="text-blue-600 underline hover:text-blue-700">
            Account aanmaken
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
