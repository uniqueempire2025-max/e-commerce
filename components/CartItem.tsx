'use client'

import Image from 'next/image'
import { CartItem as CartItemType } from '@/types'
import { useStore } from '@/contexts/StoreContext'

interface CartItemProps {
  item: CartItemType
  index: number
}

export default function CartItem({ item, index }: CartItemProps) {
  const { dispatch } = useStore()

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity === 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: index.toString() })
    } else {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id: item.product.id, quantity: newQuantity },
      })
    }
  }

  const removeItem = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: index.toString() })
  }

  const posterPrice = item.selectedSize ?
    item.product.price * item.selectedSize.multiplier :
    item.product.price
  const itemTotal = posterPrice + (item.customization?.selectedFrame.price || 0)
  const totalPrice = itemTotal * item.quantity

  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm border">
      <div className="relative w-20 h-20 flex-shrink-0">
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          className="object-cover rounded"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-medium text-gray-900 truncate">
          {item.product.name}
        </h3>
        
        <div className="text-sm text-gray-600 space-y-1">
          {item.selectedSize && (
            <p>Size: {item.selectedSize.name} ({item.selectedSize.dimensions})</p>
          )}
          {item.customization ? (
            <>
              <p>✓ Custom uploaded image</p>
              <p>✓ {item.customization.selectedFrame.name}</p>
              <p className="text-xs">Frame: ${item.customization.selectedFrame.price.toFixed(2)}</p>
            </>
          ) : (
            <p className="truncate">{item.product.description}</p>
          )}
        </div>
        
        <p className="text-lg font-semibold text-blue-600 mt-1">
          ${itemTotal.toFixed(2)} each
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => updateQuantity(item.quantity - 1)}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        
        <button
          onClick={() => updateQuantity(item.quantity + 1)}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
      
      <div className="text-right">
        <p className="text-lg font-bold text-gray-900">
          ${totalPrice.toFixed(2)}
        </p>
        <button
          onClick={removeItem}
          className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  )
}
