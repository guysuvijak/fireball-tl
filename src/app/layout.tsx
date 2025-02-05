import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import { QueryProvider } from '@/app/QueryProvider';

export const metadata: Metadata = {
    manifest: '/manifest.json',
    title: 'FIREB4LL - GUILD',
    description: 'Together, we burn brighter!',
    openGraph: {
        title: 'FIREB4LL',
        description: 'Together, we burn brighter! Fireball TL is a guild management website for Throne & Liberty, designed to help guild leaders and members efficiently manage their guild operations.',
        url: 'https://fireball-tl.vercel.app/',
        siteName: 'FIREB4LL',
        images: [
            {
                url: 'https://fireball-tl.vercel.app/metadata/manifest.webp',
                width: 1200,
                height: 630
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
 
const LocaleLayout = async ({children}: Readonly<{children: React.ReactNode}>) => {
    return (
        <html lang={'en'} style={{ height: '100%' }}>
            <body
                style={{display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
                className='bg-gradient-to-b from-gray-900 to-black'
            >
                <QueryProvider>
                    <Navbar />
                    <main className='flex-grow pt-16'>
                        {children}
                    </main>
                </QueryProvider>
            </body>
        </html>
    );
}

export default LocaleLayout;