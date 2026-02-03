'use client'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { CartItem } from '@/features/order/types/cart'
import React, { useState } from 'react'

export default function page() {
    const [cart, setCart] = useState<CartItem[]>([])
  return (
    <div>
        <Navbar></Navbar>
        <div className='mt-30 px-25'>
            <h2 className='text-center text-3xl font-semibold'>Your Cart</h2>
            <div className='flex flex-col mt-15'>
                <div className='flex justify-around border-b py-1 text-xl font-semibold'>
                    <p>Item</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                </div>
                <div>
                    {cart.length > 0 ? (
                        <div>

                        </div>
                    ) : 
                        <p className='text-center text-xl mt-10'>Your cart is empty !</p>
                    }
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
  )
}
