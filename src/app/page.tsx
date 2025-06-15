import { Hero } from "@/components/Hero"
import { Stats } from "@/components/Stats"
import { Features } from "@/components/Features"
import { CategoryGrid } from "@/components/CategoryGrid"
import { CarGrid } from "@/components/CarGrid"
import { CTA } from "@/components/CTA"
import { Testimonials } from "@/components/Testimonials"
import { Newsletter } from "@/components/Newsletter"
import { Section, SectionHeader } from "@/components/ui/Section"
import { prisma } from "@/lib/prisma"
import type { Car, Category } from "@/types"

async function getCars() {
  try {
    const cars = await prisma.car.findMany({
      include: {
        category: true,
      },
      take: 8,
      orderBy: {
        createdAt: 'desc',
      },
    })
    return cars
  } catch (error) {
    console.error('Error fetching cars:', error)
    return []
  }
}

async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            cars: true
          }
        }
      }
    })
    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export default async function Home() {
  const [cars, categories] = await Promise.all([getCars(), getCategories()])

  return (
    <main>
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <Stats />

      {/* Categories Section */}
      <Section>
        <SectionHeader
          title="Browse By Category"
          description="Explore our wide range of vehicles by category to find your perfect match."
        />
        <CategoryGrid 
          categories={categories.map(category => ({
            name: category.name,
            slug: category.name.toLowerCase().replace(/\s+/g, '-'),
            icon: category.icon,
            count: category._count?.cars || 0,
          }))}
          columns={6}
        />
      </Section>

      {/* Features Section */}
      <Features />

      {/* Featured Cars Section */}
      <Section className="bg-gray-50">
        <SectionHeader
          title="Featured Cars"
          description="Discover our handpicked selection of premium vehicles."
        />
        <CarGrid 
          cars={cars.map(car => ({
            title: car.title,
            price: car.price,
            mileage: car.mileage,
            fuelType: car.fuelType,
            transmission: car.transmission,
            image: car.image,
            slug: car.slug,
            status: 'available' as const, // Default status since it's not in our schema yet
          }))}
        />
      </Section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <CTA />

      {/* Newsletter Section */}
      <Newsletter />
    </main>
  )
}
