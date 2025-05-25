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
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: {
            en: {
                translation: {
                    [config.mainHero.description]: 'Experimental site'
                }
            }
        },
        lng: 'ru', // if you're using a language detector, do not define the lng option
        fallbackLng: 'ru',

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        }
    });

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
                    background: '#ffffff'
                }}
            >
                <Menu
                    className={`flex flex-row w-full justify-center`}
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
