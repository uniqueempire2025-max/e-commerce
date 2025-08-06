import { Product } from '@/types'
import ProductGrid from './ProductGrid'

interface RelatedProductsProps {
  products: Product[]
  category: string
}

export default function RelatedProducts({ products, category }: RelatedProductsProps) {
  if (products.length === 0) return null

  return (
    <section className="pt-12 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        Related {category === 'poster' ? 'Posters' : 'Frames'}
      </h2>
      <ProductGrid products={products} />
    </section>
  )
}
