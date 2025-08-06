import ProductGrid from '@/components/ProductGrid'
import { posters } from '@/data/products'

export default function PostersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Premium Posters
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our curated collection of high-quality posters perfect for any space. 
          From abstract art to nature photography, find the perfect piece for your home or office.
        </p>
      </div>
      
      <ProductGrid products={posters} />
    </div>
  )
}
