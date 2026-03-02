'use client'

import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  description?: string
}

export default function page() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter()

    useEffect(() => {
        const fetchUser = async() => {
            try {
                const res = await fetch('/api/auth/me', {
                    credentials: 'include'
                })

                if(!res.ok) {
                    router.push('/auth/signin')
                    return
                }

                const data = await res.json()
                setUser(data.user)
            } catch (error) {
                console.error("Fetch user failed:", error);
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [router])

  return (
    <div>
        <Navbar/>
        <div className="max-w-4xl mx-auto mt-30 px-4 min-h-[60vh] mb-5">
        <Breadcrumb/>
        {loading ? (
            <div className='flex justify-center items-center h-[60vh]'>
                <p className='text-gray-500'>Loading...</p>
            </div>
        ) : !user ? (
            <div className='flex justify-center items-center h-[60vh]'>
                <p className='text-gray-500'>Cannot find user!</p>
            </div>
        ) : (
            <div className="bg-white shadow rounded-xl p-8">
                {/* Header */}
                <div className="flex items-center gap-6">
                    <img
                    src={user.avatar || "/assets/user.png"}
                    alt="Avatar"
                    className="w-28 h-28 rounded-full object-cover border"
                    />

                    <div>
                        <h1 className="text-2xl font-semibold">{user.name}</h1>
                        <p className="text-gray-500">{user.email}</p>
                    </div>
                </div>

                <hr className="my-8" />

                <div>
                    <h2 className="text-lg font-semibold mb-2">About</h2>
                    <p className="text-gray-600">
                    {user.description || "No description provided."}
                    </p>
                </div>

                <div className="mt-8 flex gap-4">
                    <button
                    className="px-5 py-2 bg-black text-white rounded-lg"
                    onClick={() => router.push("/profile/edit")}
                    >
                    Edit profile
                    </button>

                    <button
                    className="px-5 py-2 border rounded-lg"
                    onClick={() => router.push("/orders")}
                    >
                    My orders
                    </button>
                </div>
            </div>
        )}
        
        </div>
        <Footer/>
    </div>
  )
}
