import Link from 'next/link';
import Image from 'components/Image';

export default function Footer() {
    return (
        <div className='text-white bg-dark'>
            <div className='flex py-[3rem] px-[8.5rem] justify-between'>
                <div className='flex flex-col w-[32rem]'>
                   <Image src='/images/logo.png' className='h-[1.5rem] w-min'/>
                    <span className='text-light mt-[1.5rem]'>
                        For us, it&apos;s about offering Padel for everyone! 
                        We want to cultivate an environment and create enthusiasm for the sport throughout the country. 
                        Our goal is to become a leading padel chain in Norway.
                    </span>
                </div>
                <div className='flex space-x-[6rem] ml-[4rem]'>
                {
                    categories.map((category, key) => (
                        <div className='flex flex-col w-max' key={key}>
                            <span className='text-xl font-bold'>{category.title}</span>
                            <div className='text-light mt-[1.5rem] flex flex-col'>
                                {
                                    category.links.map((link, key) => (
                                        <Link href={link.href} key={key} target={link.href.startsWith('/home') ? '_self' : '_blank'}>
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
            <div className='h-[5rem] flex items-center justify-center relative'>
                <span>
                    Copyright © InterPadel–&nbsp;
                    <Link href='/privacy' className='text-green'>Privacy and Cookies</Link>
                </span>
                <div className='flex space-x-4 absolute top-1/2 -translate-y-1/2 right-[8.5rem] items-center'>
                    {
                        socialLinks.map((social, key) => (
                            <Link key={key} href={social.href} target='_blank'>
                                <Image src={social.image} className='w-[1.5rem] h-min' />
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

const categories = [
    {
        title: 'Company',
        links: [
            { title: 'About', href: 'https://interpadel.no/om-interpadel' },
            { title: 'Contact', href: 'https://interpadel.no/kontakt-oss/' },
            { title: 'Online Store', href: 'https://interpadelshop.no/' },
        ]
    },
    {
        title: 'Help',
        links: [
            { title: 'Game Rules', href: 'https://interpadel.no/hva-er-padel/padel-spilleregler/' },
            { title: 'Establishment', href: 'https://interpadel.no/om-interpadel/#etablering' },
            { title: 'Privacy Policy    ', href: 'https://interpadel.no/personvern-og-cookies/' },
        ]
    },
    // {
    //     title: 'Resources',
    //     links: [
    //         { title: 'Free eBooks', href: '/about' },
    //         { title: 'Development Tutorial', href: '/features' },
    //         { title: 'Youtube Playlist', href: '/works' },
    //         { title: 'How to - Blog', href: '/career' },
    //     ]
    // },
    // {
    //     title: 'Links',
    //     links: [
    //         { title: 'Free eBooks', href: '/about' },
    //         { title: 'Development Tutorial', href: '/features' },
    //         { title: 'Youtube Playlist', href: '/works' },
    //         { title: 'How to - Blog', href: '/career' },
    //     ]
    // },
]

const socialLinks = [
    {
        type: 'facebook',
        image: '/images/icons/facebook.png',
        href: 'https://www.facebook.com/interpadelnorge'
    },
    {
        type: 'instagram',
        image: '/images/icons/twitter.png',
        href: 'https://www.instagram.com/interpadel_norge/'
    },
    {
        type: 'twitter',
        image: '/images/icons/linkedin.png',
        href: 'https://twitter.com/padel_inter'
    },
    {
        type: 'youtube',
        image: '/images/icons/youtube.png',
        href: 'https://www.youtube.com/channel/UC7mJ9uY8jLUEnsBapYfczBw'
    },
]