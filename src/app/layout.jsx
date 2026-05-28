import './globals.css';
//import { Suspense } from 'react';
import { YandexMetrika } from '@/components/YandexMetrika';

export const metadata = {
    title: '@xTranscendence',
    description: 'Frontend and Canvas API'
};

export default async function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {/*<Suspense>
                    <YandexMetrika />
                </Suspense>*/}
                {children}
            </body>
        </html>
    );
}
