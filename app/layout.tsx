import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './main.scss'
import QueryWrapper from './auth/QueryWrapper'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Noted',
  description: 'Noted is your ultimate digital notebook, designed to capture your thoughts, ideas, and important information effortlessly. Whether you are a student, professional, or creative thinker, Noted provides a seamless platform to organize your life, collaborate with others, and stay productive on the go.',
  keywords: [
    'Noted',
    'Note-taking app',
    'Digital notebook',
    'Note organizer',
    'Note sync',
    'Note management app',
    'Collaborative note-taking',
    'Cloud-based note app',
    'Productivity tool',
    'Memo app',
    'Note-sharing platform',
    'Task manager with notes',
    'Online note-taking',
    'Note-taking software',
    'Note-taking tool',
    'Note app for students',
    'Note app for professionals',
    'Mobile note app',
    'Note app for iOS/Android',
    'Organize notes online',
    'Personalized note app'
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    type: 'website',
    title: 'Noted',
    description: 'Noted is your ultimate digital notebook, designed to capture your thoughts, ideas, and important information effortlessly. Whether you are a student, professional, or creative thinker, Noted provides a seamless platform to organize your life, collaborate with others, and stay productive on the go.'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter}`}>
        <QueryWrapper>
          {children}
        </QueryWrapper>
      </body>
    </html>
  )
}
