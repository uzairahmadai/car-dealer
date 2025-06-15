'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface CTAProps {
  className?: string;
}

export function CTA({ className }: CTAProps) {
  return (
    <section className={cn('overflow-hidden bg-black', className)}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-12 py-16 lg:flex-row lg:py-24">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="font-heading mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Ready to Sell Your Car?
            </h2>
            <p className="mb-8 text-lg text-gray-300">
              List your car on AutoVault and reach thousands of potential buyers. 
              Our platform makes selling your car quick, easy, and secure.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Link href="/cars/add" className="inline-block">
                <Button size="lg" className="inline-flex items-center">
                  List Your Car
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link 
                href="/about"
                className="flex items-center gap-2 text-sm font-medium text-white hover:text-gray-300"
              >
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-[4/3] w-full max-w-lg lg:w-1/2">
            <Image
              src="/assets/images/cta/01.webp"
              alt="Sell your car"
              fill
              className="rounded-lg object-cover"
            />
            {/* Stats Overlay */}
            <div className="absolute -left-4 bottom-4 rounded-lg bg-white p-4 shadow-lg">
              <div className="text-sm font-medium text-gray-600">
                Average Selling Time
              </div>
              <div className="font-heading text-2xl font-bold text-black">
                7 Days
              </div>
            </div>
            <div className="absolute -right-4 top-4 rounded-lg bg-white p-4 shadow-lg">
              <div className="text-sm font-medium text-gray-600">
                Success Rate
              </div>
              <div className="font-heading text-2xl font-bold text-black">
                98%
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
