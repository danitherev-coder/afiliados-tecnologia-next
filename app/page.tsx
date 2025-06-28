import { Metadata } from 'next'
import Hero from './components/Hero'
import ProductSection from './components/ProductSection'
import productsData from './data/products.json'

export const metadata: Metadata = {
  title: 'InnovaByte - Tu guía confiable en tecnología actual',
  description: 'Descubre, compara y compra con confianza los mejores productos tecnológicos. Laptops, smartphones, audio y más con enlaces directos a tiendas oficiales.',
}

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  images: string[];
  affiliateLink: string;
  featured?: boolean;
  price?: string;
}

export default function Home() {
  const products: Product[] = productsData;
  
  // Agrupar productos por categoría
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const categories = Object.keys(productsByCategory);

  return (
    <div>
      <Hero />
      
      {/* Productos por Categoría */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.map((category) => (
            <ProductSection
              key={category}
              category={category}
              products={productsByCategory[category]}
            />
          ))}
        </div>
      </div>
    </div>
  )
}