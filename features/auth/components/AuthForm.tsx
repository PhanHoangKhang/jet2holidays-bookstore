interface AuthProps {
    title: string,
}

export default function AuthForm({ title, children }: React.PropsWithChildren<AuthProps>) {
  return (
    <div className="flex justify-center items-center bg-[#f2fafc] mt-40">
      <div className="bg-white px-10 py-10 rounded-lg shadow-md w-110">
        <p className="text-3xl font-bold text-center mb-8">{title}</p>
        {children}
      </div>
    </div>
  )
}
