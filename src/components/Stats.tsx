'use client';

import { Car, Users, Award, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsProps {
  className?: string;
}

const stats = [
  {
    name: 'Total Cars',
    value: '1,000+',
    description: 'Premium vehicles',
    icon: Car,
  },
  {
    name: 'Happy Customers',
    value: '5,000+',
    description: 'Satisfied buyers',
    icon: Users,
  },
  {
    name: 'Years Experience',
    value: '10+',
    description: 'In the industry',
    icon: Award,
  },
  {
    name: 'Success Rate',
    value: '98%',
    description: 'Customer satisfaction',
    icon: ThumbsUp,
  },
];

export function Stats({ className }: StatsProps) {
  return (
    <div className={cn('bg-black py-12 text-white', className)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.name}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 rounded-full bg-white/10 p-3">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="font-heading text-3xl font-bold">
                  {stat.value}
                </div>
                <div className="mt-1 text-lg font-medium">
                  {stat.name}
                </div>
                <div className="mt-1 text-sm text-gray-400">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
