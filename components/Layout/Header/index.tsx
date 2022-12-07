import Image from "next/image";
import { Input, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import Link from "next/link";
import { Button } from 'rsuite';

export default function Header() {
    return (
        <div className='font-bold flex h-[100px] items-center justify-center'>
            <Link href={'/'}>
                <Image src='/images/logo.webp' alt="logo" width="233" height="33"/>
            </Link>
            <InputGroup inside className='ml-[100px] !w-[200px] rounded-full px-[10px] flex'>
                <InputGroup.Button>
                    <SearchIcon />
                </InputGroup.Button>
                <Input placeholder="Search" className='!outline-none'/>
            </InputGroup>
            <ul className='ml-[40px] flex space-x-4'>
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
            <Button appearance="ghost" className='!text-[#0f0e36] !border-[#0f0e36] rounded-full ml-[40px] border-[2px] !font-bold'>
                <Link href='/auth/login'>Login/Register</Link>
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