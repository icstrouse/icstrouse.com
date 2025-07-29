import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ian Strouse - Full Stack Engineer",
  description:
    "Personal website of Ian Strouse, a full stack engineer with 9 years of experience building scalable web applications.",
  keywords: ["full stack engineer", "web development", "React", "Next.js", "TypeScript", "PostgreSQL"],
  authors: [{ name: "Ian Strouse" }],
  openGraph: {
    title: "Ian Strouse - Full Stack Engineer",
    description: "Personal website of Ian Strouse, a full stack engineer with 9 years of experience.",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-950 text-white min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
