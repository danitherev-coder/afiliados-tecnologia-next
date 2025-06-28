import { Metadata } from 'next'
import SearchPageClient from '../components/SearchPageClient'

export const metadata: Metadata = {
  title: 'Buscar Productos - InnovaByte',
  description: 'Busca y encuentra los mejores productos tecnológicos. Laptops, smartphones, audio y más.',
  keywords: 'buscar, productos, tecnología, laptops, smartphones',
}

export default function SearchPage() {
  return <SearchPageClient />
}