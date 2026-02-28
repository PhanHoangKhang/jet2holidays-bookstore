'use client'

import React from 'react'

interface LogOutProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function LogOutModal({
  open,
  onClose,
  onConfirm,
}: LogOutProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-white rounded-xl shadow-lg w-full max-w-md p-6
          transform transition-all duration-200 ease-in-out
          ${open ? 'scale-100 translate-y-0' : 'scale-95 translate-y-2'}
        `}
      >
        <h3 className="text-xl font-semibold text-gray-800">
          Sign out
        </h3>

        <p className="mt-3 text-gray-600">
          Are you sure you want to sign out of your account?
        </p>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2 cursor-pointer rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-black text-white hover:bg-gray-700"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  )
}