import { UserLoginForm } from "./components/user-login-form"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="container relative flex h-screen flex-col items-center justify-center md:grid lg:max-w-none">
      <UserLoginForm />
    </div>
  )
}
