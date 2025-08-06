'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Frame } from '@/types'
import { frames } from '@/data/products'

interface FrameSelectorProps {
  selectedFrame: Frame | null
  onFrameSelect: (frame: Frame) => void
  uploadedImage?: string
}

export default function FrameSelector({ selectedFrame, onFrameSelect, uploadedImage }: FrameSelectorProps) {
  const [previewFrame, setPreviewFrame] = useState<Frame | null>(selectedFrame)

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Choose Your Frame</h3>
      
      {/* Frame Preview */}
      {uploadedImage && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="text-lg font-medium mb-4">Preview with Frame</h4>
          <div className="relative max-w-md mx-auto">
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Frame */}
              {previewFrame && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundColor: previewFrame.color.toLowerCase() === 'black' ? '#000' :
                      previewFrame.color.toLowerCase() === 'white' ? '#fff' :
                      previewFrame.color.toLowerCase() === 'gold' ? '#ffd700' :
                      previewFrame.color.toLowerCase() === 'silver' ? '#c0c0c0' :
                      '#8b4513',
                    padding: '24px',
                    boxShadow: `inset 0 0 0 24px ${
                      previewFrame.color.toLowerCase() === 'black' ? '#000' :
                      previewFrame.color.toLowerCase() === 'white' ? '#fff' :
                      previewFrame.color.toLowerCase() === 'gold' ? '#ffd700' :
                      previewFrame.color.toLowerCase() === 'silver' ? '#c0c0c0' :
                      '#8b4513'
                    }`
                  }}
                />
              )}

              {/* Image Container */}
              <div className={`relative ${previewFrame ? 'p-6' : 'p-2'}`}>
                <div className="relative aspect-[4/5] bg-white rounded-lg overflow-hidden">
                  <Image
                    src={uploadedImage}
                    alt="Your custom poster"
                    fill
                    className="object-cover"
                    sizes="(max-width: 400px) 100vw, 400px"
                  />
                </div>
              </div>
            </div>
            
            {previewFrame && (
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  {previewFrame.name} - ${previewFrame.price.toFixed(2)}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Frame Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {frames.map((frame) => (
          <div
            key={frame.id}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              selectedFrame?.id === frame.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => {
              onFrameSelect(frame)
              setPreviewFrame(frame)
            }}
            onMouseEnter={() => setPreviewFrame(frame)}
            onMouseLeave={() => setPreviewFrame(selectedFrame)}
          >
            <div className="relative h-32 mb-3">
              <Image
                src={frame.image}
                alt={frame.name}
                fill
                className="object-cover rounded"
              />
            </div>
            
            <h4 className="font-medium text-gray-900 mb-1">{frame.name}</h4>
            <p className="text-sm text-gray-600 mb-2">
              {frame.material} • {frame.color}
            </p>
            <p className="text-lg font-bold text-blue-600">
              ${frame.price.toFixed(2)}
            </p>
            
            {selectedFrame?.id === frame.id && (
              <div className="mt-2 flex items-center text-blue-600">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Selected</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
