'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product, PosterSize } from '@/types'
import { useStore } from '@/contexts/StoreContext'
import SizeSelector from './SizeSelector'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useStore()
  const [selectedSize, setSelectedSize] = useState<PosterSize | null>(
    product.category === 'poster' && product.sizes ? product.sizes[0] : null
  )
  const [showSizeSelector, setShowSizeSelector] = useState(false)

  const getFinalPrice = () => {
    if (product.category === 'poster' && selectedSize) {
      return product.price * selectedSize.multiplier
    }
    return product.price
  }

  const addToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        product,
        quantity: 1,
        selectedSize: selectedSize || undefined,
      },
    })
    setShowSizeSelector(false)
  }

  const handleQuickAdd = () => {
    if (product.category === 'poster' && product.sizes) {
      setShowSizeSelector(true)
    } else {
      addToCart()
    }
  }

  return (
    <div className="group relative">
      {/* Quick Size Selector Overlay */}
      {showSizeSelector && product.sizes && (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <button
                onClick={() => setShowSizeSelector(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSizeSelect={setSelectedSize}
              basePrice={product.price}
            />

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowSizeSelector(false)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addToCart}
                disabled={!selectedSize}
                className="flex-1 px-4 py-2.5 bg-rose-500 hover:bg-rose-600 disabled:bg-gray-300 text-white rounded-xl transition-colors font-medium"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Card */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-50">
        <Link href={`/product/${product.id}`}>
          <div className="relative overflow-hidden">
            <div className="aspect-[4/5] relative">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>

            {!product.inStock && (
              <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
                <span className="text-gray-600 font-medium bg-white px-3 py-1 rounded-full shadow-sm">
                  Out of Stock
                </span>
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </Link>

        <div className="p-4 space-y-3">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-medium text-gray-800 hover:text-rose-600 transition-colors line-clamp-2 leading-relaxed">
              {product.name}
            </h3>
          </Link>

          <p className="text-gray-500 text-sm line-clamp-1">
            {product.description}
          </p>

          <div className="flex items-center justify-between pt-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-800">
                  ${getFinalPrice().toFixed(2)}
                </span>
                {product.category === 'poster' && selectedSize && (
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                    {selectedSize.name}
                  </span>
                )}
              </div>
              {product.category === 'poster' && selectedSize && (
                <p className="text-xs text-gray-400">{selectedSize.dimensions}</p>
              )}
            </div>

            <button
              onClick={handleQuickAdd}
              disabled={!product.inStock}
              className="bg-rose-500 hover:bg-rose-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-xl transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
            >
              {product.inStock ?
                (product.category === 'poster' ? 'Select Size' : 'Add to Cart') :
                'Unavailable'
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
