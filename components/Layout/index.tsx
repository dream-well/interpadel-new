import { useRouter } from "next/router";
import Footer from "./Footer";
import Header from "./Header";
import cn from 'classnames';
import { useEffect } from "react";
import axios from 'axios';
import { login } from "store/slices/authSlice";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react"

export default function Layout({ children }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const showHeader = !router.pathname.startsWith('/auth');
    const isHome = router.pathname == '/home';
    const isCenter = router.pathname == '/centers';
    const { data: session, status } = useSession();
    
    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        if(access_token) {
            axios.get('/api/profile')
            .then(res => {
                dispatch(login({ access_token: access_token, profile: res }));
            })
            .catch((e) => {
                console.log(e);
            })
        }
    }, [])
    
    useEffect(() => {

    }, [])

    return (
        <div className='open-sans flex flex-col min-h-screen'>
            {
                showHeader && 
                <Header banner={isHome} className={'bg-[rgba(0,0,0,0.3)]'}/>
            }
            <div className={cn('flex flex-col flex-grow', showHeader && !isHome && '')}>
                {children}
            </div>
            {showHeader && <Footer/> }
        </div>
    )
}
