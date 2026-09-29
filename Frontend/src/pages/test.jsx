import DistanceTraveled from '../components/DistanceTraveled.jsx'

function Test() {
  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-4xl">

        <h1 className="text-3xl font-bold text-gray-900">
          Test
        </h1>

        <p className="mt-2 text-gray-600">
          This is the test page.
        </p>

        <div className="mt-8 flex justify-center rounded-xl shadow-sm">
          <DistanceTraveled />
        </div>

      </div>
    </main>
  )
}

export default Test