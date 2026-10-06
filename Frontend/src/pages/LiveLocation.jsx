import Maps from '../components/Maps.jsx'

const LiveLocation = () => {
    return (
        <div className="min-h-screen px-4 py-6">
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
                        <p className="text-lg font-bold text-white-900">
                            3,2 km
                        </p>
                    </div>

                    <div className="rounded-lg border border-gray-300 px-4 py-3 text-center">
                        <p className="text-xs font-medium uppercase text-gray-500">
                            Actuele prijs
                        </p>
                        <p className="text-lg font-bold text-white-900">
                            €7,10
                        </p>
                    </div>
                </div>

                {/* Route afwijking */}
                <div className="mb-4 rounded-lg border border-gray-300 p-4">
                    <div className="mb-3 flex items-center gap-2">
                        <span className="text-lg"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle-alert preview-icon"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg></span>

                        <p className="text-sm font-bold text-white-900">
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
                <button className="mb-3 w-full rounded-md bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700 cursor-pointer">
                    Bestemming bereikt
                </button>

                {/* Route beëindigen */}
                <button className="w-full text-sm text-gray-500 underline transition hover:text-gray-700 cursor-pointer">
                    Rit beëindigen (noodgeval)
                </button>
            </div>
        </div>
    )
}

export default LiveLocation