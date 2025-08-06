'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Confirmed!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your purchase! Your order has been confirmed and is being processed.
        </p>
        
        {orderId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Order Number</p>
            <p className="text-lg font-bold text-gray-900">{orderId}</p>
          </div>
        )}
        
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            You will receive an email confirmation with order details and tracking information soon.
          </p>
          
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Continue Shopping
            </Link>
            
            <Link
              href="/custom"
              className="block w-full bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Create Another Custom Poster
            </Link>
          </div>
        </div>
        
        <div className="mt-8 text-sm text-gray-600">
          <h3 className="font-medium mb-2">What happens next?</h3>
          <ul className="space-y-1 text-left max-w-xs mx-auto">
            <li>• Order processing (1-2 business days)</li>
            <li>• Quality printing and framing</li>
            <li>• Secure packaging</li>
            <li>• Shipping (3-7 business days)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
