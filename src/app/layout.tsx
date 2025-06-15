import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:8000'),
  title: "AutoVault - Premium Car Dealer",
  description: "Your trusted source for premium vehicles. Browse our extensive collection of new and used cars, with expert guidance and exceptional service.",
  keywords: "car dealer, luxury cars, used cars, new cars, car sales, auto dealer, vehicle marketplace",
  authors: [{ name: "AutoVault" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://autovault.com",
    siteName: "AutoVault",
    title: "AutoVault - Premium Car Dealer",
    description: "Your trusted source for premium vehicles. Browse our extensive collection of new and used cars.",
    images: [
      {
        url: "/assets/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AutoVault - Premium Car Dealer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoVault - Premium Car Dealer",
    description: "Your trusted source for premium vehicles. Browse our extensive collection of new and used cars.",
    images: ["/assets/images/og-image.jpg"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="shortcut icon" type="image/x-icon" href="/assets/images/fav.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow pt-[104px] md:pt-[88px]">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
