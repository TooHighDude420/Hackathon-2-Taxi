import { useEffect, useState } from 'react'
import { apiFetch } from '../utils/api.js'
import { AuthContext } from './authContext.js'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiFetch('/auth/me/')
      // Een sessie zonder rol (bv. alleen ingelogd in Django-admin) telt niet als ingelogd in de app.
      .then((data) => setUser(data.user?.role ? data.user : null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  async function login(credentials) {
    const data = await apiFetch('/auth/login/', { method: 'POST', body: credentials })
    setUser(data.user)
    return data.user
  }

  async function register(details) {
    const data = await apiFetch('/auth/register/', { method: 'POST', body: details })
    setUser(data.user)
    return data.user
  }

  async function logout() {
    await apiFetch('/auth/logout/', { method: 'POST' })
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
