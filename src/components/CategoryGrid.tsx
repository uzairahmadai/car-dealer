'use client';

import { CategoryCard } from '@/components/CategoryCard';
import { cn } from '@/lib/utils';

interface Category {
  name: string;
  slug: string;
  icon: string;
  count?: number;
}

interface CategoryGridProps {
  categories: Category[];
  className?: string;
  columns?: 2 | 3 | 4 | 5 | 6;
}

export function CategoryGrid({ 
  categories, 
  className,
  columns = 6 
}: CategoryGridProps) {
  const gridCols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
    5: 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
    6: 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
  };

  return (
    <div 
      className={cn(
        'grid grid-cols-1 gap-6',
        gridCols[columns],
        className
      )}
    >
      {categories.map((category) => (
        <CategoryCard key={category.slug} category={category} />
      ))}
      {categories.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-lg text-gray-500">No categories found</p>
        </div>
      )}
    </div>
  );
}
