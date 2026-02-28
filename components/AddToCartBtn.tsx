"use client";

import axios from "axios";
import { addGuestCart } from "@/features/order/services/CartService";

interface Props {
  bookId: string;
  isAuthenticated: boolean;
  quantity: number;
}

export default function AddToCartButton({
  bookId,
  isAuthenticated,
  quantity,
}: Props) {
  const addToCart = async () => {
    if (!isAuthenticated) {
      await addGuestCart(bookId, quantity);
      alert("Added to cart!");
      return;
    }

    await axios.post(
      "/api/cart/add",
      { bookId, quantity },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    alert("Added to cart!");
  };

  return (
    <button
      onClick={addToCart}
      className="bg-black cursor-pointer text-white px-4 py-2 rounded mt-6"
    >
      Add to Cart
    </button>
  );
}
