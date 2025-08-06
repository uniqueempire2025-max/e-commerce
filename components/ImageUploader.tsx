'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void
  uploadedImage?: string
}

export default function ImageUploader({ onImageUpload, uploadedImage }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('Image size must be less than 10MB')
      return
    }

    setIsUploading(true)

    try {
      // Convert file to base64 URL for demo purposes
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        onImageUpload(imageUrl)
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Upload failed. Please try again.')
      setIsUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  if (uploadedImage) {
    return (
      <div className="relative">
        <div className="relative w-full h-96 rounded-lg overflow-hidden border-2 border-gray-200">
          <Image
            src={uploadedImage}
            alt="Uploaded image"
            fill
            className="object-contain"
          />
        </div>
        <button
          onClick={() => onImageUpload('')}
          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    )
  }

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragging
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 hover:border-gray-400'
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {isUploading ? (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Uploading your image...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Upload Your Image
          </h3>
          
          <p className="text-sm text-gray-600 mb-4">
            Drag and drop your image here, or click to browse
          </p>
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
          >
            Choose File
          </button>
          
          <p className="text-xs text-gray-500 mt-4">
            Supports: JPG, PNG, GIF (Max 10MB)
          </p>
        </div>
      )}
    </div>
  )
}
