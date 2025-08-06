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
    <div className="min-h-screen bg-gradient-to-br from-rose-50/30 via-white to-pink-50/20">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-light text-gray-800 mb-4">
              Create Your Custom Poster
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Upload your favorite image, choose the perfect size and frame to create a unique piece of art.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12 overflow-x-auto">
            <div className="flex items-center space-x-3 md:space-x-6 min-w-max">
              <div className={`flex items-center ${step === 'upload' ? 'text-rose-600' : (step === 'size' || step === 'frame' || step === 'review') ? 'text-emerald-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${step === 'upload' ? 'border-rose-600 bg-rose-600 text-white' : (step === 'size' || step === 'frame' || step === 'review') ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-gray-300'}`}>
                  1
                </div>
                <span className="ml-2 font-medium text-sm md:text-base">Upload</span>
              </div>
              
              <div className={`w-6 md:w-8 h-0.5 transition-all ${(step === 'size' || step === 'frame' || step === 'review') ? 'bg-emerald-600' : 'bg-gray-300'}`}></div>
              
              <div className={`flex items-center ${step === 'size' ? 'text-rose-600' : (step === 'frame' || step === 'review') ? 'text-emerald-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${step === 'size' ? 'border-rose-600 bg-rose-600 text-white' : (step === 'frame' || step === 'review') ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-gray-300'}`}>
                  2
                </div>
                <span className="ml-2 font-medium text-sm md:text-base">Size</span>
              </div>
              
              <div className={`w-6 md:w-8 h-0.5 transition-all ${(step === 'frame' || step === 'review') ? 'bg-emerald-600' : 'bg-gray-300'}`}></div>
              
              <div className={`flex items-center ${step === 'frame' ? 'text-rose-600' : step === 'review' ? 'text-emerald-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${step === 'frame' ? 'border-rose-600 bg-rose-600 text-white' : step === 'review' ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-gray-300'}`}>
                  3
                </div>
                <span className="ml-2 font-medium text-sm md:text-base">Frame</span>
              </div>
              
              <div className={`w-6 md:w-8 h-0.5 transition-all ${step === 'review' ? 'bg-emerald-600' : 'bg-gray-300'}`}></div>
              
              <div className={`flex items-center ${step === 'review' ? 'text-rose-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${step === 'review' ? 'border-rose-600 bg-rose-600 text-white' : 'border-gray-300'}`}>
                  4
                </div>
                <span className="ml-2 font-medium text-sm md:text-base">Review</span>
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="glass-effect rounded-3xl p-6 lg:p-8 shadow-lg">
            {step === 'upload' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl lg:text-3xl font-light text-gray-800 mb-2">Upload Your Image</h2>
                  <p className="text-gray-600">Choose a high-quality image for the best results</p>
                </div>
                <ImageUploader onImageUpload={handleImageUpload} uploadedImage={uploadedImage} />
              </div>
            )}

            {step === 'size' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-light text-gray-800 mb-2">Choose Size</h2>
                    <p className="text-gray-600">Select the perfect size for your space</p>
                  </div>
                  <button
                    onClick={() => setStep('upload')}
                    className="text-rose-600 hover:text-rose-700 font-medium transition-colors flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Change Image
                  </button>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <SizeSelector
                      sizes={posterSizes}
                      selectedSize={selectedSize}
                      onSizeSelect={handleSizeSelect}
                      basePrice={basePrice}
                    />
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <div className="relative w-64 h-80 bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
                        <img
                          src={uploadedImage}
                          alt="Your image preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg">
                        <span className="text-sm font-medium text-gray-700">{selectedSize.dimensions}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <button
                    onClick={proceedToFrame}
                    className="btn-primary"
                  >
                    Continue to Frame Selection
                  </button>
                </div>
              </div>
            )}

            {step === 'frame' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-light text-gray-800 mb-2">Choose Frame</h2>
                    <p className="text-gray-600">Complete your artwork with premium framing</p>
                  </div>
                  <button
                    onClick={() => setStep('size')}
                    className="text-rose-600 hover:text-rose-700 font-medium transition-colors flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Change Size
                  </button>
                </div>
                
                <FrameSelector
                  selectedFrame={selectedFrame}
                  onFrameSelect={handleFrameSelect}
                  uploadedImage={uploadedImage}
                />
                
                {selectedFrame && (
                  <div className="text-center">
                    <button
                      onClick={proceedToReview}
                      className="btn-primary"
                    >
                      Continue to Review
                    </button>
                  </div>
                )}
              </div>
            )}

            {step === 'review' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-light text-gray-800 mb-2">Review Your Order</h2>
                    <p className="text-gray-600">Everything looks perfect? Let's add it to your cart</p>
                  </div>
                  <button
                    onClick={() => setStep('frame')}
                    className="text-rose-600 hover:text-rose-700 font-medium transition-colors flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Change Frame
                  </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800">Your Custom Poster</h3>
                    <div className="relative max-w-sm mx-auto">
                      <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
                        {/* Frame */}
                        {selectedFrame && (
                          <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                              backgroundColor: selectedFrame.color.toLowerCase() === 'black' ? '#000' :
                                selectedFrame.color.toLowerCase() === 'white' ? '#fff' :
                                selectedFrame.color.toLowerCase() === 'gold' ? '#ffd700' :
                                selectedFrame.color.toLowerCase() === 'silver' ? '#c0c0c0' :
                                '#8b4513',
                              padding: '24px',
                              boxShadow: `inset 0 0 0 24px ${
                                selectedFrame.color.toLowerCase() === 'black' ? '#000' :
                                selectedFrame.color.toLowerCase() === 'white' ? '#fff' :
                                selectedFrame.color.toLowerCase() === 'gold' ? '#ffd700' :
                                selectedFrame.color.toLowerCase() === 'silver' ? '#c0c0c0' :
                                '#8b4513'
                              }`
                            }}
                          />
                        )}

                        {/* Image Container */}
                        <div className={`relative ${selectedFrame ? 'p-6' : 'p-2'}`}>
                          <div className="relative aspect-[4/5] bg-white rounded-lg overflow-hidden">
                            <img
                              src={uploadedImage}
                              alt="Your custom poster"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800">Order Summary</h3>
                    <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Custom Poster ({selectedSize.name})</span>
                        <span className="font-semibold">${posterPrice.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{selectedSize.dimensions}</span>
                        <span>Premium printing</span>
                      </div>
                      
                      {selectedFrame && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">{selectedFrame.name}</span>
                          <span className="font-semibold">${selectedFrame.price.toFixed(2)}</span>
                        </div>
                      )}
                      
                      <hr className="border-rose-200" />
                      
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total</span>
                        <span className="text-rose-600">${totalPrice.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <button
                        onClick={addToCart}
                        className="w-full btn-primary text-center"
                      >
                        Add to Cart & Continue Shopping
                      </button>
                      
                      <div className="bg-emerald-50 rounded-xl p-4">
                        <div className="flex items-start space-x-3">
                          <svg className="w-5 h-5 text-emerald-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <div className="text-sm text-emerald-800 space-y-1">
                            <p className="font-medium">What's included:</p>
                            <ul className="space-y-0.5">
                              <li>• High-quality printing on premium paper</li>
                              <li>• Professional framing and mounting</li>
                              <li>• Ready to hang with included hardware</li>
                              <li>• Protective packaging for safe delivery</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
