export interface Book {
  _id: string
  title: string
  price: number
  image: string
  author: string
  description?: string
  category?: string
  createdAt?: string
}