"use client"

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { ContactInfo } from '@/components/ContactInfo'
import { Navigation } from '@/components/Navigation'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top Bar - Contact Info */}
        <div className="hidden md:block border-b">
          <ContactInfo className="py-2" />
        </div>

        {/* Main Navigation */}
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <img 
              src="/assets/images/logo/logo-w.svg" 
              alt="AutoVault" 
              className="h-8 invert"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <Navigation />
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/cars/add">
                <Button>Add Car</Button>
              </Link>
            </div>
            <button 
              className={cn(
                "md:hidden p-2 rounded-md transition-colors",
                "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              )}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="py-6">
              <ContactInfo className="flex-col space-y-4 px-4 pb-6 border-b" />
              <div className="pt-6">
                <Navigation 
                  className="px-4" 
                  onClick={() => setIsMenuOpen(false)}
                />
              </div>
            </div>
            <div className="px-4 py-6 border-t space-y-3">
              <Link href="/auth/login" className="block">
                <Button variant="outline" className="w-full justify-center font-medium">
                  Sign In
                </Button>
              </Link>
              <Link href="/cars/add" className="block">
                <Button className="w-full justify-center font-medium">
                  Add Car
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
