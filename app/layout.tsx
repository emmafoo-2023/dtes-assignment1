import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { BottomNav } from "@/components/bottom-nav"
import { TopNav } from "@/components/top-nav"
import { Suspense } from "react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "GreenPlate - Eco-Friendly Meal Tracking",
  description: "Track your eco-friendly meals and make a positive impact on the planet",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="hidden md:block">
            <TopNav />
          </div>
          <main className="min-h-screen">{children}</main>
          <div className="md:hidden">
            <BottomNav />
          </div>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
