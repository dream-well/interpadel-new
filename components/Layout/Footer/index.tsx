import Link from 'next/link';
import Image from 'components/Image';

export default function Footer() {
    return (
        <div className='text-white bg-dark'>
            <div className='flex py-[5.5rem] px-[8.5rem]'>
                <div className='flex flex-col'>
                   <Image src='/images/logo.png' className='h-[1.5rem] w-min'/>
                    <span className='text-light mt-[2.5rem]'>
                        For us, it&apos;s about offering Padel for everyone! 
                        We want to cultivate an environment and create enthusiasm for the sport throughout the country. 
                        Our goal is to become a leading padel chain in Norway.
                    </span>
                </div>
                <div className='flex space-x-[4.5rem] ml-[4rem]'>
                {
                    categories.map((category, key) => (
                        <div className='flex flex-col w-max' key={key}>
                            <span className='text-xl font-bold'>{category.title}</span>
                            <div className='text-light mt-[2.5rem] flex flex-col'>
                                {
                                    category.links.map((link, key) => (
                                        <Link href={link.href} key={key} target={link.href.startsWith('/') ? '_self' : '_blank'}>
                                            {link.title}
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
            <hr className='border-green'/>
            <div className='h-[5.625rem] flex items-center justify-center relative'>
                <span>
                    Copyright © InterPadel–&nbsp;
                    <Link href='/privacy' className='text-green'>Privacy and Cookies</Link>
                </span>
                <div className='flex space-x-4 absolute top-1/2 -translate-y-1/2 right-[8.5rem] items-center'>
                   <Image src='/images/icons/facebook.png' className='w-[1.5rem] h-min' />
                   <Image src='/images/icons/twitter.png' className='w-[1.5rem] h-min' />
                   <Image src='/images/icons/linkedin.png' className='w-[1.5rem] h-min' />
                   <Image src='/images/icons/youtube.png' className='w-[1.5rem] h-min' />
                </div>
            </div>
        </div>
    )
}

const categories = [
    {
        title: 'Company',
        links: [
            { title: 'About', href: 'https://interpadel.no/om-interpadel/' },
            { title: 'Features', href: '/features' },
            { title: 'Works', href: '/works' },
            { title: 'Career', href: '/career' },
        ]
    },
    {
        title: 'Help',
        links: [
            { title: 'Delivery Details', href: '/about' },
            { title: 'Customer Support', href: '/features' },
            { title: 'Terms & Conditions', href: '/works' },
            { title: 'Privacy Policy    ', href: '/career' },
        ]
    },
    {
        title: 'Resources',
        links: [
            { title: 'Free eBooks', href: '/about' },
            { title: 'Development Tutorial', href: '/features' },
            { title: 'Youtube Playlist', href: '/works' },
            { title: 'How to - Blog', href: '/career' },
        ]
    },
    {
        title: 'Links',
        links: [
            { title: 'Free eBooks', href: '/about' },
            { title: 'Development Tutorial', href: '/features' },
            { title: 'Youtube Playlist', href: '/works' },
            { title: 'How to - Blog', href: '/career' },
        ]
    },
]