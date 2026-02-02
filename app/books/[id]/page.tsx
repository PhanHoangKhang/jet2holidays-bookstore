import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import BookMenu from '@/features/book/components/BookMenu'
import React from 'react'

export default function page() {
  return (
    <div>
        <Navbar></Navbar>
        <div className='flex flex-col mt-30 mx-20'>
            <BookMenu></BookMenu>
        </div>
        <Footer></Footer>
    </div>
  )
}
