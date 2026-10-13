import { createContext, useContext } from 'react'

export const AuthContext = createContext(null)

export const ROLE_OPTIONS = [
  { value: 'passenger', label: 'Reiziger' },
  { value: 'driver', label: 'Chauffeur' },
]

export function useAuth() {
  return useContext(AuthContext)
}

export function dashboardPath(role) {
  return role === 'driver' ? '/mijn-taxi' : '/chauffeurs'
}
