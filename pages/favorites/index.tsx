import { useState } from 'react'
import { Avatar, Button, Form, Pagination, Progress, SelectPicker } from 'rsuite'
import AbTestIcon from '@rsuite/icons/AbTest';
import LocationIcon from '@rsuite/icons/Location';
import CreditCardPlusIcon from '@rsuite/icons/CreditCardPlus';
import Link from 'next/link';

export default function Favorites() {
    const [activePage, setActivePage] = useState(1)

    return (
        <div className='flex flex-col space-y-[3.5rem] my-[4.375rem]'>
            <span className='flex text-[3rem] font-bold saira justify-center'>Your Favorite List</span>
            <FavoritesSection favorites={favorites} />
            <Paginator
                activePage={activePage}
                setActivePage={setActivePage}
                rows={100}
            />
        </div>
    )
}

const favorites = [
    {
        name: 'Sanset Padel',
        description: 'We offer 2 indoor courts of the highest quality at Väla södra in the same premises as NetOnNet with an entrance on the first short side of the building. Take advantage of our...',
        location: 'Helsingburg',
        bookableCourts: 5,
        avatar: '/images/favorites/1.png',
    },
    {
        name: 'Sanset Padel',
        bookableCourts: 4,
        location: 'Helsingburg',
        description: 'We offer 2 indoor courts of the highest quality at Väla södra in the same premises as NetOnNet with an entrance on the first short side of the building. Take advantage of our...',
        avatar: '/images/favorites/2.png',
    },
    {
        name: 'Sanset Padel',
        bookableCourts: 6,
        location: 'Helsingburg',
        description: 'We offer 2 indoor courts of the highest quality at Väla södra in the same premises as NetOnNet with an entrance on the first short side of the building. Take advantage of our...',
        avatar: '/images/favorites/3.png',
    },
    {
        name: 'Sanset Padel',
        bookableCourts: 6,
        location: 'Helsingburg',
        description: 'We offer 2 indoor courts of the highest quality at Väla södra in the same premises as NetOnNet with an entrance on the first short side of the building. Take advantage of our...',
        avatar: '/images/favorites/4.png',
    },
    {
        name: 'Sanset Padel',
        bookableCourts: 6,
        location: 'Helsingburg',
        description: 'We offer 2 indoor courts of the highest quality at Väla södra in the same premises as NetOnNet with an entrance on the first short side of the building. Take advantage of our...',
        avatar: '/images/favorites/5.png',
    },
]

const FavoriteCard = ({avatar, name, location, bookableCourts, description}) => (
    <div className='flex text-white items-center'>
        <img src={avatar} alt='Center' className='w-[16.875rem] h-[16.875rem] rounded-4 absolute justify-start' />
        <div className='flex flex-col flex-grow bg-dark px-[7rem] py-[3rem] space-y-[1rem] ml-[13.25rem]'>
            <span className='text-[2rem] font-bold saira'>{name}</span>
            <span>{description}</span>
            <span className='flex space-x-2 items-center'>
                <LocationIcon/>
                <span>{location}</span>
            </span>
            <span className='flex space-x-2 items-center'>
                <AbTestIcon/>
                <span>{bookableCourts} Bookable courts</span>
            </span>
            <Button className='flex rounded-xl bg-green text-black w-[12rem] h-[3rem] px-[1.5rem] py-[0.75rem] items-center justify-center space-x-2 text-[1.5rem]'>
                <Link href={'#'}>Remove From List</Link>
                <CreditCardPlusIcon />
            </Button>
        </div>
    </div>
)

const FavoritesSection = ({ favorites }) => {
    return (
        <div className='flex flex-col space-y-[2.5rem]'>
            {favorites.map((favorite, i) => (
                <FavoriteCard
                    {...favorite}
                    key={i}
                />
            ))}
        </div>
    )
}

const Paginator = ({activePage, setActivePage, rows}) => {
    return (
        <Pagination className='flex justify-center'
            prev
            last
            next
            first
            size="lg"
            total={rows}
            limit={10}
            activePage={activePage}
            onChangePage={setActivePage}
        />
    )
}