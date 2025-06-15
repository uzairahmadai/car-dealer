'use client';

import { Shield, Clock, BadgeCheck, HeartHandshake } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/Section';
import { cn } from '@/lib/utils';

interface FeaturesProps {
  className?: string;
}

const features = [
  {
    name: 'Verified Vehicles',
    description: 'Every car undergoes a thorough inspection and verification process to ensure quality and reliability.',
    icon: Shield,
  },
  {
    name: 'Quick Process',
    description: 'Streamlined buying process with minimal paperwork and quick turnaround time.',
    icon: Clock,
  },
  {
    name: 'Quality Assured',
    description: 'All vehicles meet our strict quality standards and come with detailed history reports.',
    icon: BadgeCheck,
  },
  {
    name: 'Trusted Service',
    description: 'Dedicated support team to assist you throughout your car buying journey.',
    icon: HeartHandshake,
  },
];

export function Features({ className }: FeaturesProps) {
  return (
    <Section className={className}>
      <SectionHeader
        title="Why Choose Us"
        description="Experience hassle-free car buying with our premium services and dedicated support."
      />

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.name}
              className="group relative flex flex-col items-center text-center"
            >
              <div className="mb-6 rounded-xl bg-gray-100 p-4 transition-colors group-hover:bg-gray-200">
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="font-heading mb-3 text-xl font-semibold">
                {feature.name}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
