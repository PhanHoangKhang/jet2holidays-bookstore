import React from "react";
import { GuestCartItem } from "../types/cart";

interface CartTotalProps {
  cart: GuestCartItem[];
}

export default function CartTotal({ cart }: CartTotalProps) {
  const subtotal = cart.reduce((sum, item) => {
    return sum + (item.price ?? 0) * item.quantity;
  }, 0);

  const shipping = subtotal > 0 ? 25000 : 0;

  const total = subtotal + shipping;

  return (
    <div className="w-full max-w-md ml-auto mt-10 border rounded-xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-6">Cart Total</h3>

      <div className="flex justify-between mb-3">
        <span>Subtotal</span>
        <span>{subtotal} VND</span>
      </div>

      <div className="flex justify-between mb-3">
        <span>Shipping</span>
        <span>{shipping} VND</span>
      </div>

      <hr className="my-4" />

      <div className="flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>{total} VND</span>
      </div>

      <button className="w-full cursor-pointer mt-6 bg-black text-white py-3 rounded-lg">
        Proceed to Checkout
      </button>
    </div>
  );
}