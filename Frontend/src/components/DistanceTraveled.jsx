import { useState } from 'react'

function DistanceTraveled() {
  const trip = {
    start: 'Amsterdam',
    destination: 'Nijmegen',
  }

  const taxiDrivers = [
    {
      id: 1,
      name: 'Jan Meeuwissen  Taxi',
      pricePerKm: 4.45,
      pricePerMinute: 1.75,
    },
    {
      id: 2,
      name: 'City Cab',
      pricePerKm: 0.90,
      pricePerMinute: 0.25,
    },
    {
      id: 3,
      name: 'Blue Taxi',
      pricePerKm: 0.65,
      pricePerMinute: 0.45,
    },
  ]

  const [selectedDriver, setSelectedDriver] = useState(taxiDrivers[0])
  const [distance, setDistance] = useState(121.4)
  const [minutes, setMinutes] = useState(35)
  const [price, setPrice] = useState(null)

  function calculatePrice() {
    if (distance <= 0 || minutes < 0) {
      setPrice(0)
      return
    }

    const distancePrice = distance * selectedDriver.pricePerKm
    const timePrice = minutes * selectedDriver.pricePerMinute
    const total = distancePrice + timePrice

    setPrice(total)
  }

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <div className="mx-auto w-full max-w-4xl">

        {/* Main box */}
        <div className="rounded-2xl p-8 shadow-sm">

          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-black">
              Distance Traveled
            </h1>

            <p className="mt-2 text-black">
              Enter your trip details to calculate the estimated price.
            </p>
          </div>

          {/* Trip */}
          <div className="mt-8">
            <p className="text-sm font-medium text-black">
              Your trip
            </p>

            <div className="mt-5 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <div className="text-center sm:text-left">
                <p className="text-sm text-black">
                  From
                </p>

                <p className="mt-1 text-xl font-bold text-black">
                  {trip.start}
                </p>
              </div>

              <div className="text-2xl font-bold text-blue-600">
                →
              </div>

              <div className="text-center sm:text-right">
                <p className="text-sm text-black">
                  To
                </p>

                <p className="mt-1 text-xl font-bold text-black">
                  {trip.destination}
                </p>
              </div>
            </div>
          </div>

          {/* Taxi driver */}
          <div className="mt-8">
            <label
              htmlFor="driver"
              className="text-sm font-semibold text-black"
            >
              Taxi driver
            </label>

            <select
              id="driver"
              value={selectedDriver.id}
              onChange={(e) => {
                const driver = taxiDrivers.find(
                  (driver) => driver.id === Number(e.target.value)
                )

                setSelectedDriver(driver)
                setPrice(null)
              }}
              className="mt-3 w-full rounded-lg px-4 py-3 text-black outline-none transition focus:border-blue-600"
            >
              {taxiDrivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.name}
                </option>
              ))}
            </select>

            {/* Selected driver's tariffs */}
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-8">
              <p className="text-sm text-black">
                €{selectedDriver.pricePerKm} per km
              </p>

              <p className="text-sm text-black">
                €{selectedDriver.pricePerMinute} per minute
              </p>
            </div>
          </div>

          {/* Distance */}
          <div className="mt-8">
            <label
              htmlFor="distance"
              className="text-sm font-semibold text-black"
            >
              Distance traveled
            </label>

            <div className="mt-3 flex items-center gap-3">
              <input
                id="distance"
                type="number"
                min="0"
                step="0.1"
                value={distance}
                onChange={(e) => {
                  setDistance(Number(e.target.value))
                  setPrice(null)
                }}
                className="w-full rounded-lg px-4 py-3 text-2xl font-bold text-black outline-none transition focus:border-blue-600"
              />

              <span className="text-xl font-semibold text-black">
                km
              </span>
            </div>
          </div>

          {/* Time */}
          <div className="mt-6">
            <label
              htmlFor="minutes"
              className="text-sm font-semibold text-black"
            >
              Travel time
            </label>

            <div className="mt-3 flex items-center gap-3">
              <input
                id="minutes"
                type="number"
                min="0"
                step="1"
                value={minutes}
                onChange={(e) => {
                  setMinutes(Number(e.target.value))
                  setPrice(null)
                }}
                className="w-full rounded-lg px-4 py-3 text-2xl font-bold text-black outline-none transition focus:border-blue-600"
              />

              <span className="text-xl font-semibold text-black">
                min
              </span>
            </div>
          </div>

          {/* Price calculation */}
          <div className="mt-8">
            <p className="text-sm font-semibold text-black">
              Price calculation
            </p>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-black">
                  Distance
                </span>

                <span className="font-bold text-black">
                  {distance} km × €{selectedDriver.pricePerKm}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-black">
                  Time
                </span>

                <span className="font-bold text-black">
                  {minutes} min × €{selectedDriver.pricePerMinute}
                </span>
              </div>
            </div>

            <button
              onClick={calculatePrice}
              className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-black"
            >
              Calculate price
            </button>

            {/* Result */}
            {price !== null && (
              <div className="mt-6 rounded-xl bg-blue-600 p-6 text-center">
                <p className="text-sm font-medium text-white">
                  Estimated trip price
                </p>

                <p className="mt-2 text-4xl font-bold text-white">
                  €{price}
                </p>

                <p className="mt-2 text-sm text-white">
                  {distance} km + {minutes} minutes
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  )
}

export default DistanceTraveled