export interface PosterSize {
  id: string
  name: string
  dimensions: string
  multiplier: number
}

export interface Product {
  id: string
  name: string
  price: number
  image: string
  category: 'poster' | 'frame'
  description: string
  inStock: boolean
  sizes?: PosterSize[]
}

export interface Frame {
  id: string
  name: string
  price: number
  image: string
  width: number
  height: number
  material: string
  color: string
}

export interface CartItem {
  product: Product
  quantity: number
  selectedSize?: PosterSize
  customization?: {
    uploadedImage: string
    selectedFrame: Frame
  }
}

export interface User {
  id: string
  name: string
  email: string
  address?: {
    street: string
    city: string
    zipCode: string
    country: string
  }
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  createdAt: string
}
