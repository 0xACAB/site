'use client';
import { useRef, useState } from 'react';
import config from '@/config/index.json';
import Main from '@/components/Main';

export default function MobilePage() {
    const { navigation } = config;
    const refs = {};
    navigation.forEach((item) => {
        refs[item.href] = useRef(null);
    });
    const [opened, setOpened] = useState(false);
    return <Main opened={opened} setOpened={setOpened} refs={refs} navigation={navigation} />;
}
