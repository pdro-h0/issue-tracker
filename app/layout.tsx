import '@radix-ui/themes/styles.css';

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { Theme } from '@radix-ui/themes';

import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Theme appearance="dark">
          <Navbar />
          <main className="p-5">{children}</main>
        </Theme>
      </body>
    </html>
  )
}
