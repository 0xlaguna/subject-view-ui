"use client"

import Link from "next/link"

import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {

  const pathname = usePathname()

  console.log(pathname)

  const isActive = (path: string) => pathname === path ? "text-primary" : "text-muted-foreground"

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/dash/overview"
        className={`hover:text-primary text-sm font-medium transition-colors ${isActive('/dash/overview')}`}
      >
        Overview
      </Link>
      <Link
        href="/dash/subjects"
        className={`hover:text-primary text-sm font-medium transition-colors ${isActive('/dash/subjects')}`}
      >
        Subjects
      </Link>
      <Link
        href="/dash/settings"
        className={`hover:text-primary text-sm font-medium transition-colors ${isActive('/dash/settings')}`}
      >
        Settings
      </Link>
    </nav>
  )
}
