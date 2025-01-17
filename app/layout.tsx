import "@/styles/globals.css"

import { Metadata, Viewport } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { RQProvider } from "@/config/react-query"
import { NextAuthProvider } from "./auth-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "bg-background min-h-screen font-sans antialiased",
            fontSans.variable
          )}
        >
          <NextAuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <RQProvider>
                  <div vaul-drawer-wrapper="">
                    <div className="bg-background relative flex min-h-screen flex-col">
                      {children}
                    </div>
                    <Toaster />
                  </div>
                  <TailwindIndicator />
                </RQProvider>
            </ThemeProvider>
          </NextAuthProvider>
        </body>
      </html>
    </>
  )
}
