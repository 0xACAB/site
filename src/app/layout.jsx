import './globals.css';
//import { Suspense } from 'react';
import { YandexMetrika } from '@/components/YandexMetrika';

export const metadata = {
    title: '@xTranscendence',
    description: 'Frontend and Canvas API'
};

export default async function RootLayout({ children }) {
    //suppressHydrationWarning for fix hydratation error in iOS chrome
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                {/*<Suspense>
                    <YandexMetrika />
                </Suspense>*/}
                {children}
            </body>
        </html>
    );
}
