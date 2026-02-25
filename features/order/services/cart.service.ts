import { CartItem, GuestCart } from "../types/cart"

const CART = 'guest_cart'

// export const getGuestCart = ()=> {
//     const cart = localStorage.getItem(CART)
//     return cart ? JSON.parse(cart) : { item: [] }
// }

export function getGuestCart(): GuestCart {
  if (typeof window === 'undefined') {
    return { items: [] }
  }

  const raw = localStorage.getItem(CART)

  if (!raw) {
    return { items: [] }
  }

  try {
    const parsed = JSON.parse(raw)

    if (!parsed || !Array.isArray(parsed.items)) {
      return { items: [] }
    }

    return { items: parsed.items }
    
  } catch {
    return { items: [] }
  }
}

export const saveCart = (cart: any) => {
    localStorage.setItem(CART, JSON.stringify(cart) )
}

export const addGuestCart = (
  bookId: string,
  quantity = 1
): GuestCart => {
  const cart = getGuestCart()

  const index = cart.items.findIndex(
    (item: any) => item.bookId === bookId
  )

  if (index > -1) {
    cart.items[index].quantity += quantity

  } else {
    cart.items.push({ bookId, quantity })
  }

  saveCart(cart)
  return cart
}


export const removeFromGuestCart = (bookId: string): GuestCart => {
    const cart = getGuestCart()

    cart.items = cart.items.filter((item: any) => item.bookId !== bookId)

    saveCart(cart)
    
    return cart
}