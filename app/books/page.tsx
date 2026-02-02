"use client"

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import BookCard from "@/features/book/components/BookCard";
import BookMenu from "@/features/book/components/BookMenu";
import React, { useEffect, useState } from "react";

export default function page() {
    const [books, setBooks] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);

                const res = await fetch("/api/books");
                const data = await res.json();

                setBooks(data.products || []);
            } catch (error) {
                console.error("Fetch books failed:", error);
                setBooks([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

  return (
    <div>
      <Navbar></Navbar>
      <div className="flex flex-col mt-30 mx-20">
        <BookMenu></BookMenu>
        <div className="flex w-full mt-10 gap-8">
          <div className="menu-product w-1/5 bg-white h-fit rounded-lg p-5 shadow-lg">
            <h3>Filter By:</h3>
            <br />
            <br />
            <div>
              <p className="title-menu">Price:</p>
              <label className="flex gap-3 cursor-pointer my-2">
                <input type="checkbox" className="filter" value="0-50000" />{" "}
                50000 VND
              </label>
              <label className="flex gap-3 cursor-pointer my-2">
                <input
                  type="checkbox"
                  className="filter"
                  value="50000-100000"
                />{" "}
                50000 - 100000 VND
              </label>
              <label className="flex gap-3 cursor-pointer my-2">
                <input
                  type="checkbox"
                  className="filter"
                  value="100000-200000"
                />{" "}
                100000 - 200000 VND
              </label>
              <label className="flex gap-3 cursor-pointer my-2">
                <input
                  type="checkbox"
                  className="filter"
                  value="200000-300000"
                />{" "}
                200000 - 300000 VND
              </label>
              <label className="flex gap-3 cursor-pointer my-2">
                <input
                  type="checkbox"
                  className="filter"
                  value="300000-999999"
                />{" "}
                300000 VND
              </label>
            </div>
            <br />
            <br />
            <div className="rating-menu">
              <p className="title-menu">Rating:</p>
              <label className="flex gap-3 cursor-pointer my-2">
                <input type="checkbox" className="filter-rate" value="4-5" />4 -
                5 <span className="stars-bar">★</span>
              </label>
              <label className="flex gap-3 cursor-pointer my-2">
                <input type="checkbox" className="filter-rate" value="3-4" />3 -
                4 <span className="stars-bar">★</span>
              </label>
              <label className="flex gap-3 cursor-pointer my-2">
                <input type="checkbox" className="filter-rate" value="2-3" />2 -
                3 <span className="stars-bar">★</span>
              </label>
              <label className="flex gap-3 cursor-pointer my-2">
                <input type="checkbox" className="filter-rate" value="1-2" />1 -
                2 <span className="stars-bar">★</span>
              </label>
            </div>
            <br />
            <br />
            <div className="category-className">
              <p className="title-menu">Category:</p>
              <label className="flex gap-3 cursor-pointer my-2">
                <input
                  type="checkbox"
                  className="filter-category"
                  value="Productivity"
                />{" "}
                Productivity
              </label>
              <label className="flex gap-3 cursor-pointer my-2">
                <input
                  type="checkbox"
                  className="filter-category"
                  value="Psychology"
                />{" "}
                Psychology
              </label>
              <label className="flex gap-3 cursor-pointer my-2">
                <input
                  type="checkbox"
                  className="filter-category"
                  value="Self-help"
                />{" "}
                Self-help
              </label>
              <label className="flex gap-3 cursor-pointer my-2">
                <input
                  type="checkbox"
                  className="filter-category"
                  value="Finance"
                />{" "}
                Finance
              </label>
              <label className="flex gap-3 cursor-pointer my-2">
                <input
                  type="checkbox"
                  className="filter-category"
                  value="History"
                />{" "}
                History
              </label>
              <label className="flex gap-3 cursor-pointer my-2">
                <input
                  type="checkbox"
                  className="filter-category"
                  value="Business"
                />{" "}
                Business
              </label>
            </div>
            <br />
            <br />
          </div>
          <div className="w-4/5 bg-white shadow-lg pb-10">
            <div className="flex flex-row justify-between items-center py-5 px-10">
                <p>All Books</p>
                <div className="sort-bar">
                  <label>Sort by:</label>
                  <select id="sort">
                      <option value="az">A → Z</option>
                      <option value="za">Z → A</option>
                      <option value="priceAsc">Price ↑</option>
                      <option value="priceDesc">Price ↓</option>
                      <option value="ratingAsc">Rating ↑</option>
                      <option value="ratingDesc">Rating ↓</option>
                  </select>
                </div>
            </div>

            {loading ? (<p className="text-center text-black py-5 text-2xl">Loading...</p>) : (
                <div className="grid grid-cols-3 gap-3 px-10">
                    {books.map((book: any) => (
                        <BookCard key={book._id} id={book._id} title={book.title} price={book.price} image={book.image}></BookCard>
                    ))}
                </div>
            )}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}