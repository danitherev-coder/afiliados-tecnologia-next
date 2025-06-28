import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductDetailClient from '../../components/ProductDetailClient'
import productsData from '../../data/products.json'

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

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return productsData.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = productsData.find((p) => p.slug === params.slug)
  
  if (!product) {
    return {
      title: 'Producto no encontrado - InnovaByte',
    }
  }

  return {
    title: `${product.name} - InnovaByte`,
    description: product.description,
    keywords: `${product.name}, ${product.category}, tecnología, comprar, review`,
    openGraph: {
      title: `${product.name} - InnovaByte`,
      description: product.description,
      images: [product.images[0]],
      url: `https://innovabyte.com/producto/${product.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - InnovaByte`,
      description: product.description,
      images: [product.images[0]],
    },
  }
}

export default function ProductPage({ params }: Props) {
  const product = productsData.find((p) => p.slug === params.slug)

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}