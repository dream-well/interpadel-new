import Image from "next/image";
import { SelectPicker } from 'rsuite';
import Link from "next/link";
import { Button } from 'rsuite';
import cn from 'classnames'

export default function Header({className=''}) {
    return (
        <div className={cn('flex items-center justify-between h-[7.5rem] px-[8.5rem] bg-grey text-white', className)}>
            <div className='flex items-center'>
                <Link href={'/'}>
                    <Image src='/images/logo.png' alt="logo" width="233" height="33"/>
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
            <div className='flex items-center'>
                <SelectPicker 
                    data={langs} 
                    defaultValue={'en'} 
                    appearance='subtle'
                    cleanable={false}
                    className='w-[6.8rem]' 
                />
                <Link href='/auth/login' className='ml-[2.5rem]'>Log in</Link>
                <Button appearance="ghost" className='ml-[2.5rem] h-[3.5rem] w-[7.5rem] !border-green !text-green'>
                    <Link href='/auth/login'>Sign Up</Link>
                </Button>
            </div>
        </div>
    )
}

const langs = ['en'].map(lang => ({
    value: lang,
    label: (
        <div className='flex'>
            <img src={`/images/flags/${lang}.png`} />
            <span className='ml-2 text-white'>{ lang.toUpperCase() }</span>
        </div>
    )
}))

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