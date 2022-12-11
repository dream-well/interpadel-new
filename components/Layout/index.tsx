import { useRouter } from "next/router";
import Footer from "./Footer";
import Header from "./Header";
import cn from 'classnames';
import { useEffect } from "react";
import axios from 'axios';
import { login } from "store/slices/authSlice";
import { useDispatch } from "react-redux";

export default function Layout({ children }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const showHeader = !router.pathname.startsWith('/auth');
    const isHome = router.pathname == '/home';
    
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
    
    return (
        <div className='open-sans flex flex-col min-h-screen'>
            {
                showHeader && 
                <Header banner={isHome}/>
            }
            <div className={cn('flex flex-col flex-grow', showHeader && !isHome && '')}>
                {children}
            </div>
            {showHeader && <Footer/> }
        </div>
    )
}
