import Link from "next/link";
import Image from 'components/Image';
import { useRouter } from "next/router";

export const Menus = () => {
    const router = useRouter();
    return (
    <div className='flex items-center'>
        <Link href={'/'}>
           <Image src='/images/logo.svg' alt="logo" className='h-[1.5rem] select-none'/>
        </Link>
        <ul className='ml-[5.5rem] flex space-x-12'>
            {
                menus.map((menu, i) => (
                    <li key={i}>
                        <Link href={menu.href}>
                            {menu.title}
                        </Link>
                    </li>
                ))
            }
        </ul>
    </div>
)}

const menus = [
    {
        title: 'Booking',
        href: '/bookings'
    },
    // {
    //     title: 'Centers',
    //     href: '/centers'
    // },
    {
        title: 'Matching',
        href: '/matching'
    },
    // {
    //     title: 'Books',
    //     href: '/books'
    // },
]