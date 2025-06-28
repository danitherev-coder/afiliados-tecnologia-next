import './globals.css'
import { Inter } from 'next/font/google'
import { LanguageProvider } from './contexts/LanguageContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Header from './components/Header'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'InnovaByte - Tu guía confiable en tecnología actual',
  description: 'Descubre, compara y compra con confianza los mejores productos tecnológicos. Laptops, smartphones, audio y más con enlaces directos a tiendas oficiales.',
  keywords: 'tecnología, laptops, smartphones, audio, tablets, gadgets, reviews, comprar tecnología',
  authors: [{ name: 'InnovaByte' }],
  robots: 'index, follow',
  openGraph: {
    title: 'InnovaByte - Tu guía confiable en tecnología actual',
    description: 'Descubre, compara y compra con confianza los mejores productos tecnológicos.',
    url: 'https://innovabyte.com',
    siteName: 'InnovaByte',
    images: [
      {
        url: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1200',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InnovaByte - Tu guía confiable en tecnología actual',
    description: 'Descubre, compara y compra con confianza los mejores productos tecnológicos.',
    images: ['https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1200'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider>
          <LanguageProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
              <Header />
              <main>
                {children}
              </main>
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}