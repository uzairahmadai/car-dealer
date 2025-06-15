'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/cars?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <section className="relative overflow-hidden bg-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/banner/banner-slider-bg-08.webp"
          alt="Hero background"
          fill
          className="object-cover opacity-50"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative">
        <div className="container mx-auto px-4">
          <div className="flex min-h-[600px] flex-col items-center justify-center py-20 text-center">
            <h1 className="font-heading mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Find Your Perfect Car
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-gray-300">
              Browse through our extensive collection of premium vehicles. 
              From luxury sedans to powerful SUVs, find the car that matches your style.
            </p>

            {/* Search Form */}
            <form 
              onSubmit={handleSearch}
              className="mb-8 flex w-full max-w-2xl flex-col gap-4 sm:flex-row"
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by make, model, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 w-full rounded-lg bg-white pl-12 pr-4 text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <Button type="submit" className="h-12 px-8">
                Search
              </Button>
            </form>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/categories"
                className="flex items-center gap-2 text-sm font-medium text-white hover:text-gray-300"
              >
                Browse Categories
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link 
                href="/cars"
                className="flex items-center gap-2 text-sm font-medium text-white hover:text-gray-300"
              >
                View All Cars
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
