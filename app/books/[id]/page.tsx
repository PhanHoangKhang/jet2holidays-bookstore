"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import BookMenu from "@/features/book/components/BookMenu";
import { Book } from "@/features/book/types/book";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AddToCartButton from "@/components/AddToCartBtn";
import Breadcrumb from "@/components/Breadcrumb";

export default function Page() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/books/${id}`);
        const data = await res.json();
        setBook(data.item);
      } catch (error) {
        console.error(error);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mt-28 px-10 lg:px-32">
        <BookMenu />
        <Breadcrumb />
        {loading ? (
          <p className="text-center text-xl font-semibold mt-10">Loading...</p>
        ) : (
          <div className="mt-10 bg-white rounded-xl shadow-md p-10 grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Book Image */}
            <div className="flex justify-center items-center">
              <img
                src={book?.image}
                alt={book?.title}
                className="w-65 h-95 object-cover rounded-lg shadow"
              />
            </div>

            {/* Book Info */}
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-bold text-gray-800">
                {book?.title}
              </h1>

              <p className="text-lg text-gray-500 mt-2">by {book?.author}</p>

              <p className="text-3xl font-bold text-green-700 mt-6">
                {book?.price} VND
              </p>

              {/* Quantity */}
              <div className="mt-8">
                <label className="text-lg font-semibold">Quantity</label>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => setQuantity((prev) => prev - 1)}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-md border bg-[#263650] transition all ease-in-out duration-200 hover:bg-gray-200 border-none text-gray-100 hover:text-black disabled:opacity-40"
                  >
                    -
                  </button>

                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-16 text-center border rounded-md py-2"
                  />

                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    disabled={quantity >= 10}
                    className="w-10 h-10 rounded-md border bg-[#263650] transition all ease-in-out duration-200 hover:bg-gray-200 border-none text-gray-100 hover:text-black disabled:opacity-40"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to cart */}
              <div className="mt-8">
                {book?._id && (
                  <AddToCartButton
                    bookId={book._id}
                    quantity={quantity}
                    isAuthenticated={false}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
