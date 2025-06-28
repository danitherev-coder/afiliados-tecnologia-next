import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CategoryPageClient from '../../components/CategoryPageClient'
import productsData from '../../data/products.json'

interface Props {
  params: { category: string }
}

export async function generateStaticParams() {
  const categories = [...new Set(productsData.map(product => 
    product.category.toLowerCase().replace(/\s+/g, '-')
  ))]
  
  return categories.map((category) => ({
    category: category,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoryName = params.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  const categoryProducts = productsData.filter(product => 
    product.category.toLowerCase().replace(/\s+/g, '-') === params.category
  )

  if (categoryProducts.length === 0) {
    return {
      title: 'Categoría no encontrada - InnovaByte',
    }
  }

  return {
    title: `${categoryName} - InnovaByte`,
    description: `Descubre los mejores productos de ${categoryName}. Compara precios y características de los productos más populares.`,
    keywords: `${categoryName}, tecnología, comprar, reviews, productos`,
    openGraph: {
      title: `${categoryName} - InnovaByte`,
      description: `Descubre los mejores productos de ${categoryName}. Compara precios y características.`,
      url: `https://innovabyte.com/categoria/${params.category}`,
    },
  }
}

export default function CategoryPage({ params }: Props) {
  const categoryProducts = productsData.filter(product => 
    product.category.toLowerCase().replace(/\s+/g, '-') === params.category
  )

  if (categoryProducts.length === 0) {
    notFound()
  }

  const categoryName = params.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

  return (
    <CategoryPageClient 
      category={params.category}
      categoryName={categoryName}
      products={categoryProducts}
    />
  )
}