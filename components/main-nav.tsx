"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link
        href="/the-van"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/the-van" ? "text-primary" : "text-muted-foreground",
        )}
      >
        The Van (Database)
      </Link>
    </nav>
  )
}
