import React from "react";

export default function Navbar() {
  return (
    <header className="bg-[#f2fafc] flex justify-between items-center py-4 px-13 fixed w-full top-0 left-0 z-100">
      <div className="left-section flex items-center gap-10">
        <div className="logo-title">
          <a className="flex gap-3 flex-row items-center" href="/">
            <img
              className="rounded-xl"
              src="/assets/logo.png"
              width="60"
              height="60"
              alt="Jet2Holidays Logo"
            />
            <p className="font-semibold text-lg" id="title-name">
              Jet2Holidays <br /> Book store
            </p>
          </a>
        </div>

        <div className="navigation">
          <a className="ml-6 font-semibold hover:underline text-lg" href="/">
            Home
          </a>
          <a className="ml-6 font-semibold hover:underline text-lg" href="/books">
            Books
          </a>
          <a className="ml-6 font-semibold hover:underline text-lg" href="/forum">
            Discussion
          </a>
        </div>
      </div>

      <nav className="relative flex items-center justify-end flex-wrap gap-10">
        <div className="search-field relative w-71">
          <div className="search-nav hidden">
            <a className="font-bold text-lg" href="/">
              Home
            </a>
            <a className="font-bold text-lg" href="/shopping">
              Books
            </a>
            <a className="font-bold text-lg" href="/forum">
              Discussion
            </a>
          </div>
          <form className="search-point" action="/shopping" method="GET">
            <input
              className="bg-white w-full text-black py-3 px-5 rounded-xl border-black border"
              type="search"
              placeholder="Search for books"
              name="search"
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2"
              type="submit"
            >
              <img
                className="w-7 h-7 cursor-pointer"
                src="/assets/search-icon.png"
              />
            </button>
          </form>
        </div>

        <div className="user-actions flex flex-row gap-20 items-center">
          <a href="/cart" className="section-cart relative">
            <img
              className="w-12 h-12 cursor-pointer transition-all duration-200 ease"
              src="/assets/cart.png"
            />
            <span className="cart-num absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center p-1 rounded-full bg-red-600 text-white">
              0
            </span>
          </a>
          <a
            href="/auth/signin"
            className="btn bg-black text-white py-3 px-5 rounded-lg text-lg"
          >
            Sign In
          </a>
        </div>
      </nav>

      <div className="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
}
