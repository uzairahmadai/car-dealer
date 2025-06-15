import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import type { Car } from "@/types"

async function getCar(slug: string): Promise<Car | null> {
  try {
    const car = await prisma.car.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    })
    return car as Car
  } catch (error) {
    console.error('Error fetching car:', error)
    return null
  }
}

export default async function CarDetail({ params }: { params: { slug: string } }) {
  const car = await getCar(params.slug)

  if (!car) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Car Image */}
            <div className="md:flex-shrink-0 md:w-1/2">
              <img
                className="h-full w-full object-cover md:h-[500px]"
                src={car.image}
                alt={car.title}
              />
            </div>

            {/* Car Details */}
            <div className="p-8 md:w-1/2">
              <div className="uppercase tracking-wide text-sm text-primary font-semibold">
                {car.category.name}
              </div>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                {car.title}
              </h1>
              <p className="mt-4 text-3xl text-primary font-bold">
                ${car.price.toLocaleString()}
              </p>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Mileage</dt>
                    <dd className="mt-1 text-sm text-gray-900">{car.mileage}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Fuel Type</dt>
                    <dd className="mt-1 text-sm text-gray-900">{car.fuelType}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Transmission</dt>
                    <dd className="mt-1 text-sm text-gray-900">{car.transmission}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Listed</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(car.createdAt).toLocaleDateString()}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-8 space-y-4">
                <button className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Contact Seller
                </button>
                <button className="w-full border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors">
                  Schedule Test Drive
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
