import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    manifest: '/manifest.json',
    title: 'FIREB4LL - GUILD',
    description: 'FIREB4LL',
    openGraph: {
        title: 'FIREB4LL',
        description: 'FIREB4LL',
        url: 'https://Fireball-tl.vercel.app/',
        siteName: 'FIREB4LL',
        images: [
            {
                url: 'https://discord.com/channels/1295952192158564394/1295980823442620449/1300125877895430267',
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
            url: 'https://Fireball-tl.vercel.app/',
        },
    ],
    icons: [
        { rel: 'apple-touch-icon', url: 'icon/icon_128x128.png' },
        { rel: 'icon', url: 'icon/icon_128x128.png' },
    ],
}
 
export default async function LocaleLayout({children}: any) {
    return (
        <html style={{ height: '100%' }}>
            <body style={{backgroundColor: '#52483F', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                {children}
            </body>
        </html>
    );
}