export interface Car {
  id: number
  title: string
  price: number
  mileage: string
  fuelType: string
  transmission: string
  image: string
  slug: string
  status: 'available' | 'sold' | 'pending'
  categoryId: number
  category: Category
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: number
  name: string
  slug: string
  count?: number
  icon: string
  cars: Car[]
  createdAt: Date
  updatedAt: Date
  _count?: {
    cars: number
  }
}
