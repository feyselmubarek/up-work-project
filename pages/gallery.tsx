import type {NextPage} from 'next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useTranslation} from 'next-i18next';
import AppCard from "../components/general/AppCard/AppCard";
// @ts-ignore
import Toggle from "react-toggle";
import "react-toggle/style.css"


const Home: NextPage = () => {
    const {t} = useTranslation('common');
    return (
        <div className={"page"}>
            <h1>Gallery of Third-Party components</h1>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <h2>Toggles</h2>
            <p><a href={"http://aaronshaf.github.io/react-toggle/"}>Documentation</a><br/></p>
            <p>&nbsp;</p>
            <label>
                <Toggle
                    defaultChecked={false} />
                <span>Wrapper label tag</span>
            </label>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <h2>Checkboxes</h2>
            <br/><br/><br/>
            <div className="field" data-check="valid">
                <input type="checkbox" value="1" id="c1" name="c1"/>
                <label htmlFor="c1">Option 1</label>
                <br/>
                <input type="checkbox" value="1" id="c2" name="c2"/>
                <label htmlFor="c2">Option 2</label>
                <br/>
                <input type="checkbox" value="1" id="c3" name="c3"/>
                <label htmlFor="c3">Option 3</label>
            </div>

            <h2>Radio Buttons</h2>
            <br/><br/><br/>
            <div className="field" data-check="valid">
                <input type="radio" value="1" id="r1" name="r1"/>
                <label htmlFor="r1">Option 1</label>
                <br/>
                <input type="radio" value="1" id="r2" name="r1"/>
                <label htmlFor="r2">Option 2</label>
                <br/>
                <input type="radio" value="1" id="r3" name="r1"/>
                <label htmlFor="r3">Option 3</label>

            </div>
            
            <h2>Application Card</h2>
            <AppCard title={"Test"} href={"https://www.agoraspeakers.org"} icon={"/icons/calendar.svg"} />


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
