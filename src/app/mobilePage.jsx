'use client';
import { useRef } from 'react';
import MainHero from '@/components/MainHero';
import Header from '@/components/Header';
import About from '@/components/About';
import config from '@/config/index.json';
import Product from '@/components/Product';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';

export default function MobilePage({mobile}) {
    const { navigation } = config;
    const refs = {};
    navigation.forEach((item) => {
        refs[item.href] = useRef(null);
    });
    return (
        <div className={`bg-background grid gap-y-16 overflow-hidden`}>
            <div className={`relative bg-background flex items-center flex-col`}>
                <div className="max-w-7xl mx-auto">
                    <Header refs={refs} />
                    <MainHero mobile={mobile} />
                </div>
            </div>
            <Product ref={refs.production} />
            <Features ref={refs.features} />
            <Pricing ref={refs.pricing} />
            <About ref={refs.about} />
        </div>
    );
};
