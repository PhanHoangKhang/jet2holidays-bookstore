interface AuthProps {
    title: string,
    children: React.ReactNode
}

export default function AuthForm({ title, children }: AuthProps) {
  return (
    <div className="flex justify-center items-center bg-[#f2fafc] mt-40">
      <div className="bg-white px-10 py-7 rounded-lg shadow-md w-110">
        <p className="text-3xl font-bold text-center mb-8">{title}</p>
        {children}
      </div>
    </div>
  )
}
