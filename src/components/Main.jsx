import MainHero from '@/components/MainHero';
import Intro from '@/components/Intro';
import Product from '@/components/Product';
import Features from '@/components/Features';
import Experiments from '@/components/Experiments';
import About from '@/components/About';
const { Header, Content, Footer } = Layout;
import { Menu, Layout } from 'antd';
import config from '@/config/index.json';
import { useCallback, useRef } from 'react';

const { navigation } = config;
const items = navigation.map((item) => ({ key: item.href, label: item.name }));
export default function Main({ mobile }) {
    const refs = {};
    navigation.forEach((item) => {
        refs[item.href] = useRef(null);
    });
    const executeScroll = useCallback((refElement) => {
        refElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);
    return (
        <Layout>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    padding: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#ffffff'
                }}
            >
                <Menu
                    className={`flex flex-row ${mobile ? 'w-full' : 'w-2/3'} justify-between`}
                    onClick={({ key }) => {
                        executeScroll(refs[key].current);
                    }}
                    mode="horizontal"
                    theme="light"
                    defaultSelectedKeys={[navigation[0].href]}
                    items={items}
                />
            </Header>
            <Content
                style={{
                    background: '#ffffff'
                }}
            >
                <MainHero mobile={mobile} />
                <Intro ref={refs.intro} />
                <Product ref={refs.production} />
                <Features ref={refs.features} />
                <Experiments ref={refs.experiments} />
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                    background: '#ffffff'
                }}
            >
                <About ref={refs.about} />
            </Footer>
        </Layout>
    );
}
