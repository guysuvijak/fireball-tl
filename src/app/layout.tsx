import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
    manifest: '/manifest.json',
    title: 'FIREB4LL - GUILD',
    description: 'Together, we burn brighter!',
    openGraph: {
        title: 'FIREB4LL',
        description: 'Together, we burn brighter!',
        url: 'https://fireball-tl.vercel.app/',
        siteName: 'FIREB4LL',
        images: [
            {
                url: 'https://fireball-tl.vercel.app/assets/logo.png',
                width: 160,
                height: 160
            }
        ]
    },
    keywords: ['Fireball', 'Fireb4ll', 'TL', 'meteorviix'],
    authors: [
        { name: 'FIREB4LL' },
        {
            name: 'FIREB4LL',
            url: 'https://fireball-tl.vercel.app/',
        },
    ],
    icons: [
        { rel: 'apple-touch-icon', url: 'icon/icon-128x128.png' },
        { rel: 'icon', url: 'icon/icon-128x128.png' },
    ],
}
 
export default async function LocaleLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html style={{ height: '100%' }}>
            <body style={{display: 'flex', flexDirection: 'column', minHeight: '100vh' }} className='bg-gradient-to-b from-gray-900 to-black'>
                <Navbar />
                <main className='flex-grow pt-16'>
                    {children}
                </main>
            </body>
        </html>
    );
}