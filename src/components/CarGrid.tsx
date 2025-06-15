'use client';

import { CarCard } from '@/components/CarCard';

interface Car {
  title: string;
  price: number;
  mileage: string;
  fuelType: string;
  transmission: string;
  image: string;
  slug: string;
  status: 'available' | 'sold' | 'pending';
}

interface CarGridProps {
  cars: Car[];
  className?: string;
}

export function CarGrid({ cars, className }: CarGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cars.map((car) => (
        <CarCard key={car.slug} car={car} />
      ))}
      {cars.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-lg text-gray-500">No cars found</p>
        </div>
      )}
    </div>
  );
}
