"use client";

import LogOutModal from "@/features/auth/components/LogOutModal";
import { getGuestCart } from "@/features/order/services/CartService";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export default function Navbar() {
  const searchParam = useSearchParams();
  const search = searchParam.get("search") as string;
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [cartLength, setCartLength] = useState<number>(0);
  
  useEffect(() => {
    const updateCart = () => {
      const guestCart = getGuestCart()
      setCartLength(guestCart?.items?.length ?? 0)
    }

    updateCart()

    window.addEventListener('cartUpdated', updateCart)

     return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });

        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.error("Fetch user failed:", error);
        setUser(null);
      }
    };
    
    fetchUser();
  }, []);

  return (
    <header className="bg-[#f2fafc] flex justify-between items-center py-4 px-13 fixed w-full top-0 left-0 z-100">
      <div className="left-section flex items-center gap-10">
        <div className="logo-title">
          <Link className="flex gap-3 flex-row items-center" href="/">
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
          </Link>
        </div>

        <div className="navigation">
          <Link className="ml-6 font-semibold hover:underline text-lg" href="/">
            Home
          </Link>
          <Link
            className="ml-6 font-semibold hover:underline text-lg"
            href="/books"
          >
            Books
          </Link>
          <Link
            className="ml-6 font-semibold hover:underline text-lg"
            href="/forum"
          >
            Discussion
          </Link>
        </div>
      </div>

      <nav className="relative flex items-center justify-end flex-wrap gap-10">
        <div className="search-field relative w-71">
          <div className="search-nav hidden">
            <Link className="font-bold text-lg" href="/">
              Home
            </Link>
            <Link className="font-bold text-lg" href="/books">
              Books
            </Link>
            <Link className="font-bold text-lg" href="/forum">
              Discussion
            </Link>
          </div>
          <form className="search-point" action="/books" method="GET">
            <input
              className="bg-white w-full text-black py-3 px-5 rounded-xl border-black border"
              type="search"
              placeholder="Search for books"
              name="search"
              defaultValue={search || ""}
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
          <Link href="/cart" className="section-cart relative">
            <img
              className="w-12 h-12 cursor-pointer transition-all duration-200 ease"
              src="/assets/cart.png"
            />
            <span className="cart-num absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center p-1 rounded-full bg-red-600 text-white">
              {cartLength}
            </span>
          </Link>
          {!user ? (
            <Link
              href="/auth/signin"
              className="bg-black text-white py-3 px-5 rounded-lg text-lg"
            >
              Sign In
            </Link>
          ) : (
            <div className="relative">
              <img
                src={user.avatar || "/assets/user.png"}
                className="w-11 h-11 rounded-full cursor-pointer"
                onClick={() => setOpen(!open)}
              />

              {open && (
                <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-lg border">
                  <p className="px-4 py-3 text-sm font-semibold">{user.name}</p>

                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>

                  <Link
                    href="/orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Orders
                  </Link>

                  <button
                    onClick={() => setShowLogout(true)}
                    className="w-full cursor-pointer text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Sign out
                  </button>

                  <LogOutModal
                    open={showLogout}
                    onClose={() => setShowLogout(false)}
                    onConfirm={async () => {
                      await fetch("/api/auth/signout", {
                        method: "POST",
                        credentials: "include",
                      });
                      location.reload();
                    }}
                  ></LogOutModal>
                </div>
              )}
            </div>
          )}
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
