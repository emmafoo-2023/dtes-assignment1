"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Camera, Trophy, Users, Compass, Leaf } from "lucide-react"

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/scan", icon: Camera, label: "Scan" },
  { href: "/challenges", icon: Trophy, label: "Challenges" },
  { href: "/community", icon: Users, label: "Community" },
  { href: "/explore", icon: Compass, label: "Explore" },
]

export function TopNav() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Leaf className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">GreenPlate</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
