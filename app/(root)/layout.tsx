import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic';

import Topbar from '@/components/shared/Topbar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import RightSidebar from '@/components/shared/RightSidebar'
import Bottombar from '@/components/shared/Bottombar'
import { ClerkProvider } from '@clerk/nextjs'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'GreenWave',
  description: 'The next Level Social App'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const Map = dynamic(() => import('./map/page'), {
    ssr: false,
  });  

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Topbar />

            <main className='flex flex-row'>
              <LeftSidebar />

                <section className='main-container'>
                  <div className='w-full h-full'>
                  {children}
                  </div>
                </section>
              <RightSidebar />
              
            </main>

          <Bottombar />
          </body>
      </html>
    </ClerkProvider>
  )
}
