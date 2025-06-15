'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  category: {
    name: string;
    slug: string;
    icon: string;
    count?: number;
  };
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  const { name, slug, icon, count } = category;

  return (
    <Link href={`/categories/${slug}`}>
      <Card 
        className={cn(
          'group cursor-pointer transition-shadow hover:shadow-md',
          className
        )}
      >
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 h-16 w-16 relative">
            <Image
              src={icon}
              alt={name}
              fill
              className="object-contain transition-transform group-hover:scale-110"
            />
          </div>
          <CardTitle className="text-xl">{name}</CardTitle>
        </CardHeader>

        <CardContent className="text-center">
          <p className="text-sm text-gray-600">
            {count === undefined ? (
              'Browse category'
            ) : (
              `${count} ${count === 1 ? 'car' : 'cars'}`
            )}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
