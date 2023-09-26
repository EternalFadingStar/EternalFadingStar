'use client'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })


function DarkModeHandler() {
  useEffect(() => {
    document.body.classList.add('dark-mode');
  }, []);

  return null;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <DarkModeHandler />
      <body className={inter.className}>{children}</body>
    </html>
  )
}