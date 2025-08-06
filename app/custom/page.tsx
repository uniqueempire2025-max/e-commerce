'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ImageUploader from '@/components/ImageUploader'
import FrameSelector from '@/components/FrameSelector'
import SizeSelector from '@/components/SizeSelector'
import { useStore } from '@/contexts/StoreContext'
import { Frame, PosterSize } from '@/types'
import { posterSizes } from '@/data/products'

export default function CustomPosterPage() {
  const [uploadedImage, setUploadedImage] = useState<string>('')
  const [selectedFrame, setSelectedFrame] = useState<Frame | null>(null)
  const [selectedSize, setSelectedSize] = useState<PosterSize>(posterSizes[0]) // Default to small
  const [step, setStep] = useState<'upload' | 'size' | 'frame' | 'review'>('upload')
  const { dispatch } = useStore()
  const router = useRouter()

  const basePrice = 24.99 // Base price for custom poster

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl)
    if (imageUrl) {
      setStep('size')
    } else {
      setStep('upload')
    }
  }

  const handleSizeSelect = (size: PosterSize) => {
    setSelectedSize(size)
  }

  const proceedToFrame = () => {
    setStep('frame')
  }

  const handleFrameSelect = (frame: Frame) => {
    setSelectedFrame(frame)
  }

  const proceedToReview = () => {
    if (selectedFrame) {
      setStep('review')
    }
  }

  const addToCart = () => {
    if (!uploadedImage || !selectedFrame) return

    // Create a custom product for the poster
    const customPoster = {
      id: `custom-${Date.now()}`,
      name: 'Custom Poster',
      price: basePrice,
      image: uploadedImage,
      category: 'poster' as const,
      description: 'Your custom uploaded poster',
      inStock: true,
    }

    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        product: customPoster,
        quantity: 1,
        selectedSize,
        customization: {
          uploadedImage,
          selectedFrame,
        },
      },
    })

    router.push('/cart')
  }

  const posterPrice = basePrice * selectedSize.multiplier
  const totalPrice = posterPrice + (selectedFrame?.price || 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Create Your Custom Poster
          </h1>
          <p className="text-lg text-gray-600">
            Upload your favorite image and choose the perfect frame to create a unique piece of art.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${step === 'upload' ? 'text-blue-600' : step === 'frame' || step === 'review' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === 'upload' ? 'border-blue-600 bg-blue-600 text-white' : step === 'frame' || step === 'review' ? 'border-green-600 bg-green-600 text-white' : 'border-gray-300'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Upload Image</span>
            </div>
            
            <div className={`w-8 h-0.5 ${step === 'frame' || step === 'review' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            
            <div className={`flex items-center ${step === 'frame' ? 'text-blue-600' : step === 'review' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === 'frame' ? 'border-blue-600 bg-blue-600 text-white' : step === 'review' ? 'border-green-600 bg-green-600 text-white' : 'border-gray-300'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Select Frame</span>
            </div>
            
            <div className={`w-8 h-0.5 ${step === 'review' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            
            <div className={`flex items-center ${step === 'review' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === 'review' ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'}`}>
                3
              </div>
              <span className="ml-2 font-medium">Review & Order</span>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {step === 'upload' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-center">Step 1: Upload Your Image</h2>
              <ImageUploader onImageUpload={handleImageUpload} uploadedImage={uploadedImage} />
            </div>
          )}

          {step === 'frame' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Step 2: Choose Your Frame</h2>
                <button
                  onClick={() => setStep('upload')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  ← Change Image
                </button>
              </div>
              
              <FrameSelector
                selectedFrame={selectedFrame}
                onFrameSelect={handleFrameSelect}
                uploadedImage={uploadedImage}
              />
              
              {selectedFrame && (
                <div className="mt-8 text-center">
                  <button
                    onClick={proceedToReview}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                  >
                    Continue to Review
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 'review' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Step 3: Review Your Order</h2>
                <button
                  onClick={() => setStep('frame')}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  ← Change Frame
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Your Custom Poster</h3>
                  <div className="relative max-w-sm mx-auto">
                    <div className="relative">
                      {selectedFrame && (
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: `linear-gradient(to right, ${
                              selectedFrame.color.toLowerCase() === 'black' ? '#000' :
                              selectedFrame.color.toLowerCase() === 'white' ? '#fff' :
                              selectedFrame.color.toLowerCase() === 'gold' ? '#ffd700' :
                              selectedFrame.color.toLowerCase() === 'silver' ? '#c0c0c0' :
                              '#8b4513'
                            } 0%, ${
                              selectedFrame.color.toLowerCase() === 'black' ? '#000' :
                              selectedFrame.color.toLowerCase() === 'white' ? '#fff' :
                              selectedFrame.color.toLowerCase() === 'gold' ? '#ffd700' :
                              selectedFrame.color.toLowerCase() === 'silver' ? '#c0c0c0' :
                              '#8b4513'
                            } 20px, transparent 20px, transparent calc(100% - 20px), ${
                              selectedFrame.color.toLowerCase() === 'black' ? '#000' :
                              selectedFrame.color.toLowerCase() === 'white' ? '#fff' :
                              selectedFrame.color.toLowerCase() === 'gold' ? '#ffd700' :
                              selectedFrame.color.toLowerCase() === 'silver' ? '#c0c0c0' :
                              '#8b4513'
                            } calc(100% - 20px))`,
                          }}
                        />
                      )}
                      
                      <div className={`relative ${selectedFrame ? 'p-5' : ''}`}>
                        <div className="relative w-full h-64">
                          <img
                            src={uploadedImage}
                            alt="Your custom poster"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Order Summary</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span>Custom Poster Print</span>
                      <span>$39.99</span>
                    </div>
                    
                    {selectedFrame && (
                      <div className="flex justify-between">
                        <span>{selectedFrame.name}</span>
                        <span>${selectedFrame.price.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <hr className="border-gray-300" />
                    
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <button
                      onClick={addToCart}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                      Add to Cart & Continue Shopping
                    </button>
                    
                    <p className="text-sm text-gray-600 text-center">
                      ✓ High-quality printing on premium paper<br />
                      ✓ Professional framing and mounting<br />
                      ✓ Ready to hang with included hardware
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
