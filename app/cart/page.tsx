'use client'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import {
  getGuestCart,
  removeFromGuestCart,
} from '@/features/order/services/cart.service'
import { CartItem, GuestCartItem } from '@/features/order/types/cart'
import React, { useEffect, useState } from 'react'

export default function Page() {
  const [cart, setCart] = useState<GuestCartItem[]>([])

  useEffect(() => {
    const guestCart = getGuestCart()
    setCart(guestCart?.items ?? [])
  }, [])

  return (
    <div>
      <Navbar />

      <div className="mt-30 px-25">
        <h2 className="text-center text-3xl font-semibold mb-10">
          Your Cart
        </h2>

        <div className="flex flex-col mt-15">
          <div className="grid grid-cols-6 gap-4 border-b pb-3 text-sm font-semibold text-gray-600">
            <p className="col-span-2">Product</p>
            <p className="text-center">Price</p>
            <p className="text-center">Quantity</p>
            <p className="text-center">Total</p>
            <p className="text-center">Action</p>
          </div>

          <div>
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.bookId}
                  className="grid grid-cols-6 gap-4 items-center py-5 border-b"
                >
                  {/* Product */}
                  <div className="col-span-2 flex gap-4 items-center">
                    <div className="w-16 h-20 bg-gray-100 rounded-md flex items-center justify-center text-xs text-gray-400">
                      <img src={item.image}></img>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.bookId}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <p className="text-center text-gray-700">
                    ${item.price ?? 0}
                  </p>

                  {/* Quantity */}
                  <p className="text-center">
                    {item.quantity}
                  </p>

                  {/* Total */}
                  <p className="text-center font-medium">
                    ${(item.price ?? 0) * item.quantity}
                  </p>

                  {/* Action */}
                  <button
                    onClick={() => {
                      const updated =
                        removeFromGuestCart(item.bookId)
                      setCart(updated.items)
                    }}
                    className="text-center text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center mt-20 text-gray-500">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-3xl">
                  🛒
                </div>
                <p className="mt-6 text-xl font-medium">
                  Your cart is empty
                </p>
                <p className="text-sm mt-2">
                  Looks like you haven’t added anything yet
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
