'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Fuel, Gauge, GaugeCircle } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface CarCardProps {
  car: {
    title: string;
    price: number;
    mileage: string;
    fuelType: string;
    transmission: string;
    image: string;
    slug: string;
    status: 'available' | 'sold' | 'pending';
  };
}

export function CarCard({ car }: CarCardProps) {
  const { title, price, mileage, fuelType, transmission, image, slug, status } = car;

  return (
    <Card as="article" className="overflow-hidden">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform hover:scale-105"
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
        />
        {status !== 'available' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="text-lg font-semibold uppercase text-white">
              {status}
            </span>
          </div>
        )}
      </div>

      <CardHeader>
        <CardTitle className="line-clamp-1">{title}</CardTitle>
        <p className="text-2xl font-semibold text-black">{formatPrice(price)}</p>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Gauge className="h-4 w-4" />
            <span>{mileage}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Fuel className="h-4 w-4" />
            <span>{fuelType}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <GaugeCircle className="h-4 w-4" />
            <span>{transmission}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Link href={`/cars/${slug}`} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
