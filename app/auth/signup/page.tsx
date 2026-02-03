import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AuthForm from "@/features/auth/components/AuthForm";
import React from "react";

export default function page() {
  return (
    <div>
      <Navbar></Navbar>
      <AuthForm title="Sign Up">
        <form
          action="/auth/signup"
          method="post"
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col">
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email..."
              required
              className="mt-2 px-5 py-3 border rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password..."
              required
              className="mt-2 px-5 py-3 border rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password..."
              required
              className="mt-2 px-5 py-3 border rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="bg-black text-white py-3 rounded-lg font-medium"
          >
            Sign Up
          </button>

          <a
            href="/auth/google"
            className="flex gap-3 items-center justify-center py-3 shadow-lg border rounded-lg
                            hover:bg-gray-50 transition"
          >
            <img src="/assets/google.png" className="w-8 h-8" />
            Sign up with Google
          </a>
        </form>

        <hr className="my-6" />

        <p className="text-center text-sm">
          Already have an account?{" "}
          <a href="/auth/signin" className="text-blue-500 hover:underline">
            Sign in
          </a>
        </p>
      </AuthForm>
      <Footer></Footer>
    </div>
  );
}
