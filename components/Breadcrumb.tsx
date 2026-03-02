'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Breadcrumb() {
  const pathname = usePathname()

  // "/books/react" => ["books", "react"]
  const segments = pathname
    .split("/")
    .filter(Boolean)

  return (
    <nav className="text-sm text-gray-600 mt-4 mb-4">
      <ul className="flex items-center gap-2 flex-wrap">
        {/* Home */}
        <li className="flex items-center gap-2">
          <img src="/assets/home.png" width={14} height={14}></img>
          <Link href="/" className="hover:underline font-medium">
            Home
          </Link>
        </li>

        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/")
          const isLast = index === segments.length - 1

          return (
            <li key={href} className="flex items-center gap-2">
              <span>/</span>

              {isLast ? (
                <span className="font-semibold capitalize">
                  {decodeURIComponent(segment)}
                </span>
              ) : (
                <Link
                  href={href}
                  className="hover:underline capitalize"
                >
                  {decodeURIComponent(segment)}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}