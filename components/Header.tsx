'use client'

import Link from 'next/link'
import { useStore } from '@/contexts/StoreContext'
import { useState } from 'react'

export default function Header() {
  const { state } = useStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900">
            FrameArt Store
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/posters" className="text-gray-700 hover:text-blue-600 transition-colors">
              Posters
            </Link>
            <Link href="/frames" className="text-gray-700 hover:text-blue-600 transition-colors">
              Frames
            </Link>
            <Link href="/custom" className="text-gray-700 hover:text-blue-600 transition-colors">
              Custom Poster
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {state.isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Hello, {state.user?.name}</span>
                <Link href="/account" className="text-gray-700 hover:text-blue-600">
                  Account
                </Link>
              </div>
            ) : (
              <Link href="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
            )}
            
            {/* Cart */}
            <Link href="/cart" className="relative flex items-center text-gray-700 hover:text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/posters" className="text-gray-700 hover:text-blue-600">
                Posters
              </Link>
              <Link href="/frames" className="text-gray-700 hover:text-blue-600">
                Frames
              </Link>
              <Link href="/custom" className="text-gray-700 hover:text-blue-600">
                Custom Poster
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600">
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
