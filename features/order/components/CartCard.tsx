import React from "react";

interface cartProps {
    bookId: string
    image?: string | undefined
    title?: string | undefined
    price?: number | undefined
    quantity: number
    setCart: () => void
}

export default function CartCard({bookId, image, title, price, quantity, setCart}: cartProps) {
  return (
    <div
      className="grid grid-cols-6 gap-4 items-center py-5 border-b"
    >
      {/* Product */}
      <div className="col-span-2 flex gap-4 items-center">
        <div className="w-16 h-20 bg-gray-100 rounded-md flex items-center justify-center text-xs text-gray-400">
          <img src={image}></img>
        </div>
        <div>
          <p className="font-medium text-gray-800">{title}</p>
          <p className="text-sm text-gray-500">{bookId}</p>
        </div>
      </div>

      {/* Price */}
      <p className="text-center text-gray-700">{price ?? 0}</p>

      {/* Quantity */}
      <p className="text-center">{quantity}</p>

      {/* Total */}
      <p className="text-center font-medium">
        {(price ?? 0) * quantity}
      </p>

      {/* Action */}

      {/* <button
        onClick={() => {
          const updated = removeFromGuestCart(item.bookId);
          setCart(updated.items);
        }}
        className="text-center text-sm text-red-500 hover:underline"
      >
        Remove
      </button> */}

      <button
        onClick={setCart}
        className="text-center text-sm text-red-500 hover:underline"
      >
        Remove
      </button>
    </div>
  );
}
