export interface Book {
  _id: string
  title: string
  price: number
  image?: string
}

export interface CartItem {
  bookId: Book
  quantity: number
}

// features/order/types/guest-cart.ts
export interface GuestCartItem {
  bookId: string
  title?: string
  price?: number
  image?: string
  quantity: number
}

export interface GuestCart {
  items: GuestCartItem[]
}



