import { useEffect, useState } from 'react'
import { Avatar, Button, Form, Pagination, Progress, SelectPicker } from 'rsuite'
import AbTestIcon from '@rsuite/icons/AbTest';
import LocationIcon from '@rsuite/icons/Location';
import CreditCardPlusIcon from '@rsuite/icons/CreditCardPlus';
import Link from 'next/link';
import useSWR from 'swr';
import { fetcher } from 'utils/helpers';

const ROW_PER_PAGE = 3;

export default function Favorites() {

    const [activePage, setActivePage] = useState(1)
    const [favorites, setFavorites] = useState([])
    const {data, error} = useSWR('/api/centers/favourite', fetcher);

    useEffect(() => {        
        setFavorites(data?.slice((activePage-1) * ROW_PER_PAGE, activePage * ROW_PER_PAGE));
    }, [activePage])
    
    return (
        <div className='flex flex-col space-y-[3.5rem] my-[4.375rem]'>
            <span className='flex text-[3rem] font-bold saira justify-center'>Your Favorite List</span>
            <FavoritesSection favorites={favorites} />
            <Paginator
                activePage={activePage}
                setActivePage={setActivePage}
                rows={data?.length}
            />
        </div>
    )
}

const FavoriteCard = ({image, name, address, courts, description}) => (
    <div className='flex text-white items-center'>
        <img src={image} alt='Center' className='w-[16.875rem] h-[16.875rem] rounded-[1rem] absolute justify-start object-cover' />
        <div className='flex flex-col flex-grow bg-dark px-[7rem] py-[3rem] space-y-[1rem] ml-[13.25rem]'>
            <span className='text-[2rem] font-bold saira'>{name}</span>
            <span>{description}</span>
            <span className='flex space-x-2 items-center'>
                <LocationIcon/>
                <span>{address}</span>
            </span>
            <span className='flex space-x-2 items-center'>
                <AbTestIcon/>
                <span>{courts.length} Bookable courts</span>
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
            {favorites?.map((favorite, i) => (
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
            limit={ROW_PER_PAGE}
            activePage={activePage}
            onChangePage={setActivePage}
        />
    )
}