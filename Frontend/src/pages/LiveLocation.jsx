import { useState } from 'react'
import { Link } from 'react-router-dom'
import Maps from '../components/Maps.jsx'
import { getSpeedStatus } from '../utils/speedStatus.js'

const CURRENT_SPEED_KMH = 54
const SPEED_LIMIT_KMH = 50

const LiveLocation = () => {
    const speedStatus = getSpeedStatus(CURRENT_SPEED_KMH, SPEED_LIMIT_KMH)
    const [speedInteraction, setSpeedInteraction] = useState(null)

    return (
        <div className="px-4 py-6">
            <div className="mx-auto w-full max-w-md">

                {/* Header */}
                <div className="mb-4 text-left">
                    <h1 className="font-bold text-gray-900">
                        Onderweg naar bestemming
                    </h1>
                    <p className="text-sm text-gray-500">
                        Chauffeur: J. de Vries · XX-99-XX
                    </p>
                </div>

                {/* Kaart */}
                <div className="mb-3 h-64 overflow-hidden rounded-lg border border-gray-300">
                    <Maps />
                </div>

                {/* Afstand + prijs */}
                <div className="mb-3 grid grid-cols-2 gap-2">
                    <div className="rounded-lg border border-gray-300 px-4 py-3 text-center">
                        <p className="text-xs font-medium uppercase text-gray-500">
                            Afstand
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                            3,2 km
                        </p>
                    </div>

                    <div className="rounded-lg border border-gray-300 px-4 py-3 text-center">
                        <p className="text-xs font-medium uppercase text-gray-500">
                            Actuele prijs
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                            €7,10
                        </p>
                    </div>
                </div>

                {/* Snelheid + limiet */}
                <div className="mb-3 grid grid-cols-2 gap-2">
                    <div className="rounded-lg border border-gray-300 px-4 py-3 text-center">
                        <p className="text-xs font-medium uppercase text-gray-500">
                            Snelheid
                        </p>
                        <p className={`text-lg font-bold ${speedStatus.textClass}`}>
                            {CURRENT_SPEED_KMH} km/u
                        </p>
                    </div>

                    <div className="rounded-lg border border-gray-300 px-4 py-3 text-center">
                        <p className="text-xs font-medium uppercase text-gray-500">
                            Limiet
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                            {SPEED_LIMIT_KMH} km/u
                        </p>
                    </div>
                </div>

                {/* Snelheidswaarschuwing */}
                {speedStatus.level !== 'ok' && speedInteraction !== 'dismissed' && (
                    <div className="mb-4 rounded-lg border border-gray-300 p-4">
                        <p className="mb-3 text-sm font-bold text-gray-900">
                            {speedStatus.label}
                        </p>
                        <div className="flex flex-col gap-6">
                            {speedInteraction === 'reported' ? (
                                <p className="text-xs text-gray-600">
                                    Melding verstuurd, we hebben 'm opgeslagen.
                                </p>
                            ) : (
                                <>
                                    <p className="text-xs text-gray-600">
                                        {speedStatus.description}
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            className="cursor-pointer rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                                            onClick={() => setSpeedInteraction('reported')}
                                        >
                                            Meld te hard rijden
                                        </button>

                                        <button
                                            type="button"
                                            className="cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
                                            onClick={() => setSpeedInteraction('dismissed')}
                                        >
                                            Negeren
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Route afwijking */}
                <div className="mb-4 rounded-lg border border-gray-300 p-4">
                    <div className="mb-3 flex items-center gap-2">
                        <span className="text-lg"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-triangle-alert preview-icon"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg></span>

                        <p className="text-sm font-bold text-gray-900">
                            Routeafwijking gedetecteerd
                        </p>
                    </div>
                    <div className="flex flex-col gap-6">
                        <p className="text-xs text-gray-600">
                            De chauffeur wijkt af van de verwachte route.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 cursor-pointer" >
                                Meld probleem
                            </button>

                            <button className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200 cursor-pointer">
                                Negeren
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bestemming bereikt */}
                <Link
                    to="/rit-voltooid"
                    className="mb-3 block w-full rounded-md bg-blue-600 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-blue-700"
                >
                    Bestemming bereikt
                </Link>

                {/* Route beëindigen */}
                <button className="w-full text-sm text-gray-500 underline transition hover:text-gray-700 cursor-pointer">
                    Rit beëindigen (noodgeval)
                </button>
            </div>
        </div>
    )
}

export default LiveLocation
