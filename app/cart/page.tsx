'use client'

import Link from 'next/link'
import { useStore } from '@/contexts/StoreContext'
import CartItem from '@/components/CartItem'

export default function CartPage() {
  const { state, dispatch } = useStore()

  const subtotal = state.cart.reduce((total, item) => {
    const posterPrice = item.selectedSize ?
      item.product.price * item.selectedSize.multiplier :
      item.product.price
    const itemPrice = posterPrice + (item.customization?.selectedFrame.price || 0)
    return total + (itemPrice * item.quantity)
  }, 0)

  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  if (state.cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your Cart is Empty
          </h1>
          
          <p className="text-gray-600 mb-8">
            Start shopping for amazing posters and frames to fill your cart.
          </p>
          
          <div className="space-y-4">
            <Link
              href="/posters"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Browse Posters
            </Link>
            
            <Link
              href="/custom"
              className="block w-full bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Create Custom Poster
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Shopping Cart ({state.cart.length} {state.cart.length === 1 ? 'item' : 'items'})
          </h1>
          
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-700 font-medium transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.cart.map((item, index) => (
              <CartItem key={index} item={item} index={index} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Order Summary
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                <hr className="border-gray-300" />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              {shipping > 0 && (
                <p className="text-sm text-gray-600 mt-3">
                  💡 Free shipping on orders over $100
                </p>
              )}
              
              <div className="mt-6 space-y-3">
                <Link
                  href="/checkout"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-center"
                >
                  Proceed to Checkout
                </Link>
                
                <Link
                  href="/posters"
                  className="block w-full bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 font-medium py-2 px-6 rounded-lg transition-colors text-center"
                >
                  Continue Shopping
                </Link>
              </div>
              
              <div className="mt-6 text-sm text-gray-600">
                <h3 className="font-medium mb-2">✓ What's included:</h3>
                <ul className="space-y-1">
                  <li>• High-quality printing</li>
                  <li>• Premium framing (if selected)</li>
                  <li>• Protective packaging</li>
                  <li>• Hanging hardware included</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
