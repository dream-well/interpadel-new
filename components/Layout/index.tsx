import { useRouter } from "next/router";
import Footer from "./Footer";
import Header from "./Header";
import cn from 'classnames';

export default function Layout({ children }) {
    const router = useRouter();
    const showHeader = !router.pathname.startsWith('/auth');
    return (
        <div>
            {
                showHeader && 
                <Header className={router.pathname == '/home' && '!bg-transparent'}/>
            }
            <div className={cn('flex flex-col', showHeader && 'px-[8.5rem]')}>
                {children}
            </div>
            {showHeader && <Footer/> }
        </div>
    )
}