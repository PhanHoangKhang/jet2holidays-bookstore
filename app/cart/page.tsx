"use client";

import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CartCard from "@/features/order/components/CartCard";
import CartTotal from "@/features/order/components/CartTotal";
import {
  getGuestCart,
  removeFromGuestCart,
} from "@/features/order/services/CartService";
import { CartItem, GuestCartItem } from "@/features/order/types/cart";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [cart, setCart] = useState<GuestCartItem[]>([]);

  useEffect(() => {
    const guestCart = getGuestCart();
    setCart(guestCart?.items ?? []);
  }, []);

  return (
    <div>
      <div className="mt-30 px-25">
        <h2 className="text-center text-3xl font-semibold mb-10">Your Cart</h2>
        <Breadcrumb />
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
              <>
                {cart.map((item) => (
                  <CartCard
                    key={item.bookId}
                    bookId={item.bookId}
                    image={item.image}
                    title={item.title}
                    price={item.price}
                    quantity={item.quantity}
                    setCart={() => {
                      const updated = removeFromGuestCart(item.bookId);
                      setCart(updated.items);
                    }}
                  />
                ))}
                
                <CartTotal cart={cart} />
              </>
              
            ) : (
              <div className="flex flex-col items-center mt-20 text-gray-500">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-3xl">
                  🛒
                </div>
                <p className="mt-6 text-xl font-medium">Your cart is empty</p>
                <p className="text-sm mt-2">
                  Looks like you haven’t added anything yet
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
