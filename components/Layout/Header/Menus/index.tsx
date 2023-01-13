import Link from "next/link";
import Image from 'components/Image';
import { useRouter } from "next/router";
import { useAppSelector } from "store/hook";

export const Menus = () => {
    const router = useRouter();
    const { _id } = useAppSelector(state => state.auth);
    const menus = [
        {
            title: 'Booking',
            href: '/bookings'
        },
    ]
    if(_id)
        menus.push(
            {
                title: 'Matching',
                href: '/matching'
            });
    return (
    <div className='flex items-center'>
        <Link href={_id ? '/profile' : '/'}>
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
