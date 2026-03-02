"use client";

import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import BookCard from "@/features/book/components/BookCard";
import BookMenu from "@/features/book/components/BookMenu";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const searchParam = useSearchParams();
  const search = searchParam.get("search");
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [sort, setSort] = useState<string>("az");
  const [priceRanges, setPriceRanges] = useState<string[]>([]);
  const [ratings, setRatings] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const query = search ? `?search=${encodeURIComponent(search)}` : "";
        const res = await fetch(`/api/books${query}`);
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
  }, [search]);

  const filterBooks = (books: any[]) => {
    return books.filter((book) => {
      // PRICE
      if (priceRanges.length > 0) {
        const matchPrice = priceRanges.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return book.price >= min && book.price <= max;
        });
        if (!matchPrice) return false;
      }

      // RATING
      if (ratings.length > 0) {
        const matchRating = ratings.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return book.rating >= min && book.rating <= max;
        });
        if (!matchRating) return false;
      }

      // CATEGORY
      if (categories.length > 0 && !categories.includes(book.category)) {
        return false;
      }

      return true;
    });
  };

  const sortBooks = (books: any[]) => {
    const sorted = [...books];

    switch (sort) {
      case "az":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "za":
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      case "priceAsc":
        return sorted.sort((a, b) => a.price - b.price);
      case "priceDesc":
        return sorted.sort((a, b) => b.price - a.price);
      case "ratingAsc":
        return sorted.sort((a, b) => a.rating - b.rating);
      case "ratingDesc":
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return sorted;
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="flex flex-col mt-30 mx-20">
        <BookMenu></BookMenu>
        <Breadcrumb></Breadcrumb>
        <div className="flex w-full mt-10 gap-8">
          <div className="menu-product w-1/5 bg-white h-fit rounded-lg p-5 shadow-lg">
            <h3>Filter By:</h3>
            <br />
            <br />
            <div>
              <p className="title-menu">Price:</p>
              <label className="flex gap-3 cursor-pointer my-2">
                <input
                  type="checkbox"
                  className="filter"
                  value="0-50000"
                  onChange={(e) =>
                    setPriceRanges((prev) =>
                      e.target.checked
                        ? [...prev, e.target.value]
                        : prev.filter((v) => v !== e.target.value),
                    )
                  }
                />{" "}
                50000 VND
              </label>
              <label className="flex gap-3 cursor-pointer my-2">
                <input
                  type="checkbox"
                  className="filter"
                  value="50000-100000"
                  onChange={(e) =>
                    setPriceRanges((prev) =>
                      e.target.checked
                        ? [...prev, e.target.value]
                        : prev.filter((v) => v !== e.target.value),
                    )
                  }
                />{" "}
                50000 - 100000 VND
              </label>
              <label className="flex gap-3 cursor-pointer my-2">
                <input
                  type="checkbox"
                  className="filter"
                  value="100000-200000"
                  onChange={(e) =>
                    setPriceRanges((prev) =>
                      e.target.checked
                        ? [...prev, e.target.value]
                        : prev.filter((v) => v !== e.target.value),
                    )
                  }
                />{" "}
                100000 - 200000 VND
              </label>
              <label className="flex gap-3 cursor-pointer my-2">
                <input
                  type="checkbox"
                  className="filter"
                  value="200000-300000"
                  onChange={(e) =>
                    setPriceRanges((prev) =>
                      e.target.checked
                        ? [...prev, e.target.value]
                        : prev.filter((v) => v !== e.target.value),
                    )
                  }
                />{" "}
                200000 - 300000 VND
              </label>
              <label className="flex gap-3 cursor-pointer my-2">
                <input
                  type="checkbox"
                  className="filter"
                  value="300000-999999"
                  onChange={(e) =>
                    setPriceRanges((prev) =>
                      e.target.checked
                        ? [...prev, e.target.value]
                        : prev.filter((v) => v !== e.target.value),
                    )
                  }
                />{" "}
                300000 VND
              </label>
            </div>
            <br />
            <br />
            <div className="rating-menu">
              <p className="title-menu">Rating:</p>
              <label className="flex gap-3 cursor-pointer my-2">
                <input
                  type="checkbox"
                  className="filter-rate"
                  value="4-5"
                  onChange={(e) =>
                    setRatings((prev) =>
                      e.target.checked
                        ? [...prev, e.target.value]
                        : prev.filter((v) => v !== e.target.value),
                    )
                  }
                />
                4 - 5 <span className="stars-bar">★</span>
              </label>
              <label className="flex gap-3 cursor-pointer my-2">
                <input
                  type="checkbox"
                  className="filter-rate"
                  value="3-4"
                  onChange={(e) =>
                    setRatings((prev) =>
                      e.target.checked
                        ? [...prev, e.target.value]
                        : prev.filter((v) => v !== e.target.value),
                    )
                  }
                />
                3 - 4 <span className="stars-bar">★</span>
              </label>
              <label className="flex gap-3 cursor-pointer my-2">
                <input
                  type="checkbox"
                  className="filter-rate"
                  value="2-3"
                  onChange={(e) =>
                    setRatings((prev) =>
                      e.target.checked
                        ? [...prev, e.target.value]
                        : prev.filter((v) => v !== e.target.value),
                    )
                  }
                />
                2 - 3 <span className="stars-bar">★</span>
              </label>
              <label className="flex gap-3 cursor-pointer my-2">
                <input
                  type="checkbox"
                  className="filter-rate"
                  value="1-2"
                  onChange={(e) =>
                    setRatings((prev) =>
                      e.target.checked
                        ? [...prev, e.target.value]
                        : prev.filter((v) => v !== e.target.value),
                    )
                  }
                />
                1 - 2 <span className="stars-bar">★</span>
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
                  onChange={(e) =>
                    setCategories((prev) =>
                      e.target.checked
                        ? [...prev, e.target.value]
                        : prev.filter((v) => v !== e.target.value),
                    )
                  }
                />{" "}
                Productivity
              </label>
              <label className="flex gap-3 cursor-pointer my-2">
                <input
                  type="checkbox"
                  className="filter-category"
                  value="Psychology"
                  onChange={(e) =>
                    setCategories((prev) =>
                      e.target.checked
                        ? [...prev, e.target.value]
                        : prev.filter((v) => v !== e.target.value),
                    )
                  }
                />{" "}
                Psychology
              </label>
              <label className="flex gap-3 cursor-pointer my-2">
                <input
                  type="checkbox"
                  className="filter-category"
                  value="Self-help"
                  onChange={(e) =>
                    setCategories((prev) =>
                      e.target.checked
                        ? [...prev, e.target.value]
                        : prev.filter((v) => v !== e.target.value),
                    )
                  }
                />{" "}
                Self-help
              </label>
              <label className="flex gap-3 cursor-pointer my-2">
                <input
                  type="checkbox"
                  className="filter-category"
                  value="Finance"
                  onChange={(e) =>
                    setCategories((prev) =>
                      e.target.checked
                        ? [...prev, e.target.value]
                        : prev.filter((v) => v !== e.target.value),
                    )
                  }
                />{" "}
                Finance
              </label>
              <label className="flex gap-3 cursor-pointer my-2">
                <input
                  type="checkbox"
                  className="filter-category"
                  value="History"
                  onChange={(e) =>
                    setCategories((prev) =>
                      e.target.checked
                        ? [...prev, e.target.value]
                        : prev.filter((v) => v !== e.target.value),
                    )
                  }
                />{" "}
                History
              </label>
              <label className="flex gap-3 cursor-pointer my-2">
                <input
                  type="checkbox"
                  className="filter-category"
                  value="Business"
                  onChange={(e) =>
                    setCategories((prev) =>
                      e.target.checked
                        ? [...prev, e.target.value]
                        : prev.filter((v) => v !== e.target.value),
                    )
                  }
                />{" "}
                Business
              </label>
            </div>
            <br />
            <br />
          </div>
          <div className="w-4/5 bg-white shadow-lg pb-10">
            <div className="flex flex-row justify-between items-center py-5 px-10">
              {search ? (
                <p className="text-xl">
                  <span className="font-bold">Search for:</span> "{search}"
                </p>
              ) : (
                <p className="text-xl">All Books</p>
              )}

              <div className="sort-bar">
                <label>Sort by:</label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="az">A → Z</option>
                  <option value="za">Z → A</option>
                  <option value="priceAsc">Price ↑</option>
                  <option value="priceDesc">Price ↓</option>
                  <option value="ratingAsc">Rating ↑</option>
                  <option value="ratingDesc">Rating ↓</option>
                </select>
              </div>
            </div>

            {loading ? (
              <p className="text-center text-black py-5 text-2xl">Loading...</p>
            ) : (
              <div className="grid grid-cols-3 gap-3 px-10">
                {sortBooks(filterBooks(books)).map((book: any) => (
                  <BookCard
                    key={book._id}
                    id={book._id}
                    title={book.title}
                    price={book.price}
                    image={book.image}
                  ></BookCard>
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
