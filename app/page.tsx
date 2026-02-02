import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import BookCard from "@/features/book/components/BookCard";
import { getBestSellerBooks, getNewBooks } from "@/features/book/services/book.service";
import connectDB from "@/lib/db";
import Link from "next/link";

export default async function Home() {
  await connectDB()

  const newIn = await getNewBooks(3)
  const bestSeller = await getBestSellerBooks(3)

  return (
    <div>
      <Navbar />
      <div className="relative w-full h-88 mt-30 px-20 overflow-hidden rounded-sm">
        <img src="/assets/cover.png" alt="Cover" className="absolute inset-0 w-full h-full object-cover brightness-60" />
        <div className="relative z-10 flex flex-col mt-30 gap-5 h-full">
          <p className="text-white text-4xl font-bold">
            Welcome to Jet2Holidays Bookstore
          </p>
          <p className="text-white font-semibold">
            Find your next favorite book
          </p>
          <a href='/books' className="text-white bg-green-700 p-3 object-cover w-fit rounded">Explore more</a>
        </div>
      </div>
      <div className="mt-10 px-50">
          <h2 className="text-center font-bold text-3xl">New In</h2>
          <div className="grid grid-cols-3 gap-10 mt-5">
              {newIn.map((book: any) => (
                <BookCard key={book._id} id={book._id} title={book.title} price={book.price} image={book.image}></BookCard>
              ))}
          </div>
      </div>

      <div className="mt-10 px-50">
          <h2 className="text-center font-bold text-3xl">Best Seller</h2>
          <div className="grid grid-cols-3 gap-10 mt-5">
              {bestSeller.map((book: any) => (
                <BookCard key={book._id} id={book._id}  title={book.title} price={book.price} image={book.image}></BookCard>
              ))}
          </div>
      </div>
      <Footer />
    </div>
  );
}
