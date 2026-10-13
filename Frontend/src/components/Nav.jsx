import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext.js'

function Nav() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/inloggen')
  }

  return (
    <nav className="w-full bg-gray-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link
          to="/"
          className="text-2xl font-bold text-white"
        >
          Hitch Hike
        </Link>

        <div className="flex items-center gap-3">
          <Link to="/route-en-prijs" className="rounded-lg px-4 py-2 font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white">
            Rit
          </Link>

          {user?.role === 'passenger' && (
            <Link to="/chauffeurs" className="rounded-lg px-4 py-2 font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white">
              Chauffeurs
            </Link>
          )}

          {user?.role === 'driver' && (
            <Link to="/mijn-taxi" className="rounded-lg px-4 py-2 font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white">
              Mijn taxi
            </Link>
          )}

          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="cursor-pointer rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
            >
              Uitloggen
            </button>
          ) : (
            <Link
              to="/inloggen"
              className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
            >
              Inloggen
            </Link>
          )}
        </div>

      </div>
    </nav>
  )
}

export default Nav
