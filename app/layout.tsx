import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Solyn - Democratic Party Tools Mimicry",
  description: "Mimicking 'The Van' and 'Minivan' for demonstration purposes.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem 
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-40 w-full border-b bg-background">
              <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                <MainNav />
                <div className="flex flex-1 items-center justify-end space-x-4">
                  {/* You can add user profile/settings here later */}
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
