import Link from 'next/link'
import React from 'react'

export default function BookMenu() {
  return (
    <div className="menu-book shadow-md">
          <div className="menu-book-title bg-black text-white py-3 px-20 text-xl font-bold text-center rounded-tl-xl rounded-tr-xl">
            <p>Menu</p>
          </div>
          <div className="menu-categories flex justify-around gap-10 text-lg py-3 px-8 font-semibold bg-white">
            <Link href="/books?feature=best-seller">Best seller</Link>
            <Link href="/books?feature=new-in">New In</Link>
            <Link href="/books?feature=all-books">All books</Link>
          </div>
    </div>
  )
}
