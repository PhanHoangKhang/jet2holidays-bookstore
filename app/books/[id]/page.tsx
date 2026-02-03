"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import BookMenu from "@/features/book/components/BookMenu";
import { Book } from "@/features/book/types/book";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function page() {
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
    <div>
      <Navbar />
      <div className="flex flex-col mt-30 mx-20">
        <BookMenu />
        {loading ? (
          <p className="text-center text-2xl p-4 font-semibold">Loading...</p>
        ) : (
          <div className="flex flex-row gap-50 px-30 mt-10 bg-white shadow-lg py-10">
            <div className="flex justify-center items-center">
              <img src={book?.image} width="300" height="400"></img>
            </div>
            <div className="flex flex-col">
              <p className="text-2xl font-semibold">
                {book?.title} - {book?.author}
              </p>
              <br></br>
              <br></br>
              <p className="text-3xl text-green-800">{book?.price} VND</p>
              <section className="flex flex-col mt-5">
                <label className="text-2xl">Quantity:</label>
                <div className="border-collapse mt-5 flex gap-2">
                  <button
                    onClick={() => setQuantity((prev) => prev - 1)}
                    className={`bg-[#263650] text-[#f5f3c1] cursor-pointer border py-1 px-3 text-2xl ${quantity <= 1 ? "opacity-50" : ""}`}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    className="text-xl w-15 border text-center py-1 px-2"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  ></input>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className={`bg-[#263650] text-[#f5f3c1] cursor-pointer border py-1 px-3 text-2xl ${quantity >= 10 ? "opacity-50" : ""}`}
                    disabled={quantity >= 10}
                  >
                    +
                  </button>
                </div>
                <button
                  type="submit"
                  className="bg-green-700 py-3 px-10 w-fit text-white mt-10 font-semibold text-lg rounded-lg"
                >
                  Add To Cart
                </button>
              </section>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
