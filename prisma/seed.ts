import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Hatchback',
        slug: 'hatchback',
        icon: '/assets/images/category/01.svg'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Minivans',
        slug: 'minivans',
        icon: '/assets/images/category/02.svg'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Luxury Cars',
        slug: 'luxury-cars',
        icon: '/assets/images/category/03.svg'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Sedans',
        slug: 'sedans',
        icon: '/assets/images/category/04.svg'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Convertible',
        slug: 'convertible',
        icon: '/assets/images/category/05.svg'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Sports Car',
        slug: 'sports-car',
        icon: '/assets/images/category/06.svg'
      }
    })
  ])

  // Create sample cars
  await Promise.all([
    prisma.car.create({
      data: {
        title: '2023 Mercedes-Benz C-Class',
        price: 45000,
        mileage: '1,200 mi',
        fuelType: 'Petrol',
        transmission: 'Automatic',
        image: '/assets/images/portfolio/01.svg',
        slug: 'mercedes-benz-c-class',
        status: 'available',
        categoryId: categories[2].id // Luxury Cars
      }
    }),
    prisma.car.create({
      data: {
        title: '2023 BMW 3 Series',
        price: 42000,
        mileage: '800 mi',
        fuelType: 'Hybrid',
        transmission: 'Automatic',
        image: '/assets/images/portfolio/02.svg',
        slug: 'bmw-3-series',
        status: 'available',
        categoryId: categories[2].id // Luxury Cars
      }
    }),
    prisma.car.create({
      data: {
        title: '2023 Audi A4',
        price: 40000,
        mileage: '1,500 mi',
        fuelType: 'Petrol',
        transmission: 'Automatic',
        image: '/assets/images/portfolio/03.svg',
        slug: 'audi-a4',
        status: 'available',
        categoryId: categories[2].id // Luxury Cars
      }
    })
  ])

  console.log('Database seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
