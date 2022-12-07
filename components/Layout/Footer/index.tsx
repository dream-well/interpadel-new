import Link from 'next/link';

export default function Footer() {
    return (
        <div>
            <div className='flex flex-col py-[5rem] px-[10rem]'>
                
            </div>
        </div>
    )
}

const menus = [
    {
        title: 'Explore',
        href: '/explore'
    },
    {
        title: 'Collections',
        href: '/collections'
    },
    {
        title: 'Creators',
        href: '/creators'
    },
    {
        title: 'About',
        href: '/about'
    },
    {
        title: 'My Account',
        href: '/account'
    },
    {
        title: 'Blog',
        href: '/blog'
    },
    {
        title: 'Contact',
        href: '/contact'
    },
]