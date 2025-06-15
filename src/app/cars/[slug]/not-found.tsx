import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Car Not Found</h2>
        <p className="text-lg text-gray-600 mb-8">
          Sorry, we couldn't find the car you're looking for.
        </p>
        <Link 
          href="/"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
