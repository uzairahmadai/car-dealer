'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/Section';
import { cn } from '@/lib/utils';

interface TestimonialsProps {
  className?: string;
}

const testimonials = [
  {
    name: 'John Smith',
    role: 'Business Owner',
    image: '/assets/images/testimonials/author-02.svg',
    content: 'AutoVault made selling my luxury car a breeze. Their platform is professional and the team was incredibly helpful throughout the process.',
    rating: 5,
  },
  {
    name: 'Sarah Johnson',
    role: 'Car Enthusiast',
    image: '/assets/images/blog/author-01.svg',
    content: 'I found my dream car through AutoVault. The detailed listings and verification process gave me complete confidence in my purchase.',
    rating: 5,
  },
  {
    name: 'Michael Brown',
    role: 'First-time Buyer',
    image: '/assets/images/blog/author-02.svg',
    content: 'As a first-time buyer, I appreciated how AutoVault made the car buying process simple and transparent. Excellent service!',
    rating: 5,
  },
];

export function Testimonials({ className }: TestimonialsProps) {
  return (
    <Section className={cn('bg-gray-50', className)}>
      <SectionHeader
        title="What Our Customers Say"
        description="Hear from our satisfied customers about their experience with AutoVault."
      />

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.name}
            className="relative rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            {/* Quote mark */}
            <div className="absolute -top-4 left-6 text-5xl font-serif text-black opacity-10">
              "
            </div>

            {/* Content */}
            <div className="mb-4 text-gray-600">
              {testimonial.content}
            </div>

            {/* Rating */}
            <div className="mb-4 flex">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-current text-yellow-400"
                />
              ))}
            </div>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-heading font-semibold">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-600">
                  {testimonial.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
