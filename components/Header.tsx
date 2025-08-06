'use client'

import Link from 'next/link'
import { useStore } from '@/contexts/StoreContext'
import { useState } from 'react'

export default function Header() {
  const { state } = useStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="glass-effect sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            Unique
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/posters" className="text-gray-600 hover:text-rose-600 transition-colors font-medium">
              Posters
            </Link>
            <Link href="/custom" className="text-gray-600 hover:text-rose-600 transition-colors font-medium">
              Custom Poster
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {state.isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600 text-sm">Hello, {state.user?.name}</span>
                <Link href="/account" className="text-gray-600 hover:text-rose-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
              </div>
            ) : (
              <Link href="/signin" className="text-gray-600 hover:text-rose-600 transition-colors font-medium">
                Sign In
              </Link>
            )}

            {/* Cart */}
            <Link href="/cart" className="relative p-2 rounded-full hover:bg-rose-50 transition-colors group">
              <svg className="w-5 h-5 text-gray-600 group-hover:text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-rose-50 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-4">
              <Link href="/posters" className="text-gray-600 hover:text-rose-600 font-medium">
                Posters
              </Link>
              <Link href="/custom" className="text-gray-600 hover:text-rose-600 font-medium">
                Custom Poster
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
