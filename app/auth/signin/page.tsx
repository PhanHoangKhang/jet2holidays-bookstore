'use client'

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AuthForm from "@/features/auth/components/AuthForm";
import GoogleButton from "@/features/auth/components/GoogleBtn";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function page() {
   
    const router = useRouter()
    const [error, setError] = useState<any>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        
        try {
          const res = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
            credentials: 'include', 
          })

          const data = await res.json()

          if(!res.ok) {
            setError(data.message || 'Sign in failed')
          } else {
            router.push('/')
          }
        } catch (error) {
          setError('Something went wrong')
        } finally {
          setLoading(false)
        }
    }

  return (
    <div>
      <AuthForm title="Sign In">
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email..."
              onChange={e => setEmail(e.target.value)}
              required
              className="mt-2 px-5 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password..."
              onChange={e => setPassword(e.target.value)}
              required
              className="mt-2 px-5 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {error && (
            <p className="text-sm text-center text-red-500">{error}</p> 
          )}


          <a
            href="/auth/reset-password"
            className="text-sm text-blue-500 hover:underline text-right"
          >
            Forgotten Password?
          </a>

          <button
            type="submit"
            disabled={loading}
            className="bg-black cursor-pointer mb-5 hover:bg-gray-700 text-white py-3 rounded-lg font-medium disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

        </form>

        <GoogleButton/>

        <hr className="my-6" />

        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <a href="/auth/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </AuthForm>
    </div>
  );
}
