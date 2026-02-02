import Link from 'next/link'
import React from 'react'

interface BookProps {
    id: string,
    image?: string,
    title: string,
    price: number,
}

export default function BookCard({id, image, title, price}: BookProps) {
  return (
    <Link href={`/books/${id}`} className='p-4 rounded cursor-pointer flex flex-col justify-center items-center gap-3'>
        <img src={image} className='h-90 w-60 object-cover rounded'></img>
        <p className='text-xl font-semibold mt-2'>{title}</p>
        <p className='text-green-900 text-lg'>{price} VND</p>
    </Link>
  )
}
