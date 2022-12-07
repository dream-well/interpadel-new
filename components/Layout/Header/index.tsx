import Image from "next/image";
import { Input, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import Link from "next/link";
import { Button } from 'rsuite';

export default function Header() {
    return (
        <div className='flex items-center justify-between h-[7.5rem] px-[8.5rem] bg-grey'>
            <div className='flex items-center'>
                <Link href={'/'}>
                    <Image src='/images/logo.png' alt="logo" width="233" height="33"/>
                </Link>
                <ul className='ml-[5.5rem] flex space-x-12 text-white'>
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
            <Button appearance="ghost" className='h-[3.5rem] w-[7.5rem] !border-green !text-green'>
                <Link href='/auth/login'>Sign Up</Link>
            </Button>
        </div>
    )
}

const menus = [
    {
        title: 'Book',
        href: '/book'
    },
    {
        title: 'Activies',
        href: '/activies'
    },
    {
        title: 'Centers',
        href: '/centers'
    },
    {
        title: 'Matching',
        href: '/matching'
    },
]