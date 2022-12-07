import { useRouter } from "next/router";
import Footer from "./Footer";
import Header from "./Header";
import cn from 'classnames';

export default function Layout({ children }) {
    const router = useRouter();
    const showHeader = !router.pathname.startsWith('/auth');
    return (
        <div className='open-sans'>
            {
                showHeader && 
                <Header banner={router.pathname == '/home'}/>
            }
            <div className={cn('flex flex-col', showHeader && 'px-[8.5rem]')}>
                {children}
            </div>
            {showHeader && <Footer/> }
        </div>
    )
}