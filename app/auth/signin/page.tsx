import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AuthForm from "@/features/auth/components/AuthForm";

export default function page() {
  return (
    <div>
      <Navbar></Navbar>
      <AuthForm title="Sign In">
        <form
          action="/auth/signin"
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
              className="mt-2 px-5 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password..."
              required
              className="mt-2 px-5 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <a
            href="/auth/reset-password"
            className="text-sm text-blue-500 hover:underline text-right"
          >
            Forgotten Password?
          </a>

          <button className="bg-black text-white py-3 rounded-lg font-medium">
            Sign In
          </button>

          <a
            href="/auth/google"
            className="flex gap-3 items-center justify-center py-3 shadow-lg border rounded-lg hover:bg-gray-50 transition"
          >
            <img src="/assets/google.png" className="w-8 h-8" />
            Sign in with Google
          </a>
        </form>

        <hr className="my-6" />

        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <a href="/auth/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </AuthForm>
      <Footer></Footer>
    </div>
  );
}
