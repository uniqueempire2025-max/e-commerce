import Link from 'next/link'
import ProductGrid from '@/components/ProductGrid'
import { posters } from '@/data/products'

export default function Home() {
  const featuredPosters = posters.slice(0, 8)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100/50 via-pink-50/30 to-orange-100/40"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-gray-800 mb-6 leading-tight">
              Transform Your Space with
              <span className="block bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent font-medium">
                Beautiful Art
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Create custom posters from your photos or choose from our curated collection.
              Premium quality printing with elegant framing options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/custom"
                className="btn-primary text-center"
              >
                Create Custom Poster
              </Link>
              <Link
                href="/posters"
                className="btn-secondary text-center"
              >
                Browse Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Custom Upload</h3>
              <p className="text-gray-600 leading-relaxed">Upload your photos and transform them into beautiful custom posters with professional framing.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Premium Quality</h3>
              <p className="text-gray-600 leading-relaxed">Museum-quality printing on archival paper with premium frames crafted from sustainable materials.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Express Delivery</h3>
              <p className="text-gray-600 leading-relaxed">Fast, secure shipping with careful packaging to ensure your artwork arrives in perfect condition.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posters */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-rose-50/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-800 mb-4">
              Featured Collection
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Carefully curated posters that bring personality and style to any space
            </p>
          </div>
          <ProductGrid products={featuredPosters} />
          <div className="text-center mt-12">
            <Link
              href="/posters"
              className="btn-primary"
            >
              Explore All Posters
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
