import "@/styles/global.css"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import type { PropsWithChildren } from "react"
import { Providers } from "@/app/providers"
import { Sidebar } from "@/components/sidebar"

export default function RootLayout(props: PropsWithChildren) {
  const { children } = props

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} color-gray-slate color-primary-blue`}
      >
        <Providers>
          <div className="flex">
            <Sidebar />
            <main className="relative mx-auto flex w-full max-w-768 flex-col px-16 py-80">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  description: "React Components",
  title: "React Components",
}
