'use client'

import { PosterSize } from '@/types'

interface SizeSelectorProps {
  sizes: PosterSize[]
  selectedSize: PosterSize | null
  onSizeSelect: (size: PosterSize) => void
  basePrice: number
}

export default function SizeSelector({ sizes, selectedSize, onSizeSelect, basePrice }: SizeSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-800">Choose Size</h3>
      <div className="grid grid-cols-3 gap-2">
        {sizes.map((size) => {
          const finalPrice = basePrice * size.multiplier
          const isSelected = selectedSize?.id === size.id
          
          return (
            <button
              key={size.id}
              onClick={() => onSizeSelect(size)}
              className={`relative p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                isSelected
                  ? 'border-rose-200 bg-rose-50 shadow-sm'
                  : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${
                    isSelected ? 'text-rose-700' : 'text-gray-700'
                  }`}>
                    {size.name}
                  </span>
                  {isSelected && (
                    <div className="w-4 h-4 rounded-full bg-rose-400 flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500">{size.dimensions}</p>
                <p className={`text-sm font-semibold ${
                  isSelected ? 'text-rose-600' : 'text-gray-600'
                }`}>
                  ${finalPrice.toFixed(2)}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
