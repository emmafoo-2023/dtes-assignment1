"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Camera, Trophy, Users, Compass } from "lucide-react"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/scan", icon: Camera, label: "Scan" },
  { href: "/challenges", icon: Trophy, label: "Challenges" },
  { href: "/community", icon: Users, label: "Community" },
  { href: "/explore", icon: Compass, label: "Explore" },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                isActive ? "text-green-600 bg-green-50" : "text-gray-600 hover:text-green-600 hover:bg-green-50"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
