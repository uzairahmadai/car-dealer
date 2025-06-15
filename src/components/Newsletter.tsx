'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface NewsletterProps {
  className?: string;
}

export function Newsletter({ className }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      // TODO: Implement newsletter subscription API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section className={cn('bg-black py-16 md:py-24', className)}>
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <Mail className="mx-auto mb-6 h-12 w-12 text-white opacity-75" />
          <h2 className="font-heading mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Stay Updated
          </h2>
          <p className="mb-8 text-lg text-gray-300">
            Subscribe to our newsletter for the latest car listings, automotive news, and exclusive offers.
          </p>

          <form onSubmit={handleSubmit} className="mx-auto max-w-md">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-12 w-full rounded-lg bg-white/10 px-4 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                  disabled={status === 'loading'}
                  required
                />
              </div>
              <Button
                type="submit"
                variant="outline"
                className="h-12 bg-white px-8 text-black hover:bg-gray-100"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
            {message && (
              <div 
                className={cn(
                  'mt-4 text-sm',
                  status === 'success' ? 'text-green-400' : 'text-red-400'
                )}
              >
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
