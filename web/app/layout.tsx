import './globals.css'
import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
    title: 'VeryBudget – Student Budgeting Made Fun',
    description: 'Track spending fast, watch your savings grow. Join the waitlist for VeryBudget – the playful budgeting app for students.',
    icons: [{ rel: 'icon', url: '/icon.png' }],
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}