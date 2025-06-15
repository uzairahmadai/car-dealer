'use client';

import { Mail, Phone, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContactInfoProps {
  className?: string;
}

const contactInfo = [
  {
    icon: Mail,
    text: 'info@autovault.com',
    href: 'mailto:info@autovault.com',
  },
  {
    icon: Phone,
    text: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: MapPin,
    text: '123 Car Street, Auto City, AC 12345',
    href: '#',
  },
];

export function ContactInfo({ className }: ContactInfoProps) {
  return (
    <div className={cn('flex items-center justify-center gap-6', className)}>
      {contactInfo.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.text}
            href={item.href}
            className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Icon className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{item.text}</span>
          </a>
        );
      })}
    </div>
  );
}
