import type {NextPage} from 'next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useTranslation} from 'next-i18next';
import {useState} from "react";

const Home: NextPage = () => {
    const {t} = useTranslation('common');
    const [state,setState] = useState(false);
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>{t('awards.agora.shortdesc')}</h1>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
        </div>
    )
}

// @ts-ignore
export async function getStaticProps({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'footer'])),
            // Will be passed to the page component as props
        },
    };
}

export default Home
