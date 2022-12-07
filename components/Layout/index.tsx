import { useRouter } from "next/router";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }) {
    const router = useRouter();
    const showHeader = !router.pathname.startsWith('/auth');
    return (
        <div>
            {showHeader && <Header/>}
            <div className='flex flex-col'>
                {children}
                {showHeader && <Footer/> }
            </div>
        </div>
    )
}