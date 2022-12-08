import { useRouter } from "next/router";
import Footer from "./Footer";
import Header from "./Header";
import cn from 'classnames';
import { useEffect } from "react";
import { axios } from "utils/helpers";
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
        <div className='open-sans'>
            {
                showHeader && 
                <Header banner={isHome}/>
            }
            <div className={cn('flex flex-col', showHeader && !isHome && 'px-[8.5rem]')}>
                {children}
            </div>
            {showHeader && <Footer/> }
        </div>
    )
}

function dispatch(arg0: any) {
    throw new Error("Function not implemented.");
}
