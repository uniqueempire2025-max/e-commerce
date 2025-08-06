import ProductGrid from '@/components/ProductGrid'
import { frameProducts } from '@/data/products'

export default function FramesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Premium Frames
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Complete your artwork with our selection of premium frames. 
          Available in various materials, colors, and sizes to complement any poster or custom print.
        </p>
      </div>
      
      <ProductGrid products={frameProducts} />
    </div>
  )
}
