import { SelectPicker } from 'rsuite';
import Link from "next/link";
import { Button, Badge } from 'rsuite';
import cn from 'classnames'
import { useAppSelector } from "store/hook";

export default function Header({banner}) {
    const { firstname, lastname, image } = useAppSelector(state => state.auth);
    return (
        <div className={cn('flex flex-col px-[8.5rem] bg-grey text-white relative', banner && 'h-[38rem] bg-[url(/images/banner.png)] bg-cover')}>
            <div className='flex w-full justify-between h-[7.5rem]'>
                <div className='flex items-center'>
                    <Link href={'/'}>
                        <img src='/images/logo.svg' alt="logo" className='h-[1.5rem] w-min'/>
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
                        searchable={false}
                        className='w-[7rem]' 
                    />
                    {
                        firstname ?
                        
                        <div className='flex items-center'>
                            {firstname} {lastname}
                            <div className='relative'>
                                <img src={image} className='ml-3 w-[3rem] h-[3rem] rounded-full bg-white border'/>
                                <Badge className='bg-green absolute right-0 bottom-1'/>
                            </div>
                        </div> :

                        <div className='flex items-center'>
                            <Link href='/auth/login' className='ml-[2.5rem]'>Log in</Link>
                            <Button appearance="ghost" className='ml-[2.5rem] h-[3.5rem] w-[7.5rem] !border-green !text-green'>
                                <Link href='/auth/login'>Sign Up</Link>
                            </Button>
                        </div>
                    }
                </div>
            </div>
            <div className='saira text-[4rem] mx-[12rem] absolute -translate-y-1/2 top-1/2 flex items-center text-center'>
                Find where &amp; with whom to play Padel &amp; Tennis instantly
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