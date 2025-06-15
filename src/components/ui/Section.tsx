'use client';

import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div' | 'article';
  container?: boolean;
  spacing?: 'none' | 'sm' | 'md' | 'lg';
}

const spacingStyles = {
  none: '',
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-16',
};

export function Section({
  as: Component = 'section',
  container = true,
  spacing = 'md',
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn(
        'w-full',
        spacing && spacingStyles[spacing],
        className
      )}
      {...props}
    >
      {container ? (
        <div className="container mx-auto px-4">
          {children}
        </div>
      ) : (
        children
      )}
    </Component>
  );
}

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({
  title,
  description,
  align = 'center',
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-8 md:mb-12',
        align === 'center' && 'text-center',
        className
      )}
      {...props}
    >
      <h2 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-gray-600 md:mt-6">
          {description}
        </p>
      )}
    </div>
  );
}
