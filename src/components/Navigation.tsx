'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavigationProps {
  className?: string;
  onClick?: () => void;
}

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Cars', href: '/cars' },
  { name: 'Categories', href: '/categories' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Navigation({ className = '', onClick }: NavigationProps) {
  const pathname = usePathname();

  return (
    <div className={cn('flex flex-col md:flex-row md:space-x-8', className)}>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            'py-2 text-sm transition-colors',
            pathname === item.href
              ? 'text-black font-semibold'
              : 'text-gray-600 hover:text-gray-900'
          )}
          onClick={onClick}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
