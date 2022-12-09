import { useEffect, useState } from 'react'
import { Avatar, Button, Form, Pagination, Progress, SelectPicker, useToaster } from 'rsuite'
import AbTestIcon from '@rsuite/icons/AbTest';
import LocationIcon from '@rsuite/icons/Location';
import useSWR from 'swr';
import { axios, fetcher, notification } from 'utils/helpers';
import Link from 'next/link';

const ROW_PER_PAGE = 3;

export default function Favorites() {

    const [activePage, setActivePage] = useState(1)
    const [favorites, setFavorites] = useState([])

    const {data, error, mutate} = useSWR('/api/profile/favorite-centers', fetcher);
    
    const toaster = useToaster();

    
    useEffect(() => {        
        setFavorites(data?.slice((activePage-1) * ROW_PER_PAGE, activePage * ROW_PER_PAGE));
    }, [activePage, data])

    const handleRemove = (id) => {
        axios.delete(
            `/api/profile/favorite-centers/${id}`, 
        ).then(data => {
            toaster.push(
                notification({
                    title: "Favorites",
                    description: "Removed favorite successfully",
                    type: "success",
                }),
                { placement: 'topEnd', }
            )
            mutate();
        }).catch(() => {
            toaster.push(
                notification({
                    title: "Favorites",
                    description: "Could not remove from favorite list",
                    type: "error",
                }),
                { placement: 'topEnd', }
            )
        });
    }
    
    return (
        <div className='flex flex-col space-y-[3.5rem] my-[4.375rem]'>
            <span className='flex text-[3rem] font-bold saira justify-center'>Your Favorite List</span>
            <FavoritesSection favorites={favorites} onRemove={handleRemove} />
            <Paginator
                activePage={activePage}
                setActivePage={setActivePage}
                rows={data?.length}
            />
        </div>
    )
}

const FavoriteCard = ({image, name, address, courts, description, _id, onRemove}) => (
    <div className='flex text-white items-center'>
        <Link href={`/centers/${_id}`} className='w-[16.875rem] h-[16.875rem] absolute'>
            <img src={image} alt={name} className='rounded-[1rem] object-cover h-full w-full' />
        </Link>
        <div className='flex flex-col flex-grow bg-dark px-[7rem] py-[3rem] space-y-[1rem] ml-[13.25rem]'>
            <Link href={`/centers/${_id}`}  className='text-[2rem] font-bold saira'>
                {name}
            </Link>
            <span>{description}</span>
            <span className='flex space-x-2 items-center'>
                <LocationIcon/>
                <span>{address}</span>
            </span>
            <span className='flex space-x-2 items-center'>
                <AbTestIcon/>
                <span>{courts.length} Bookable courts</span>
            </span>
            <Button
                className='flex rounded-xl bg-green text-black w-[12rem] h-[3rem] px-[1.5rem] py-[0.75rem] items-center justify-center space-x-2 text-[1.5rem]'
                onClick={(evt) => onRemove(_id)}
            >
                Remove From List
            </Button>
        </div>
    </div>
)

const FavoritesSection = ({ favorites, onRemove }) => {
    return (
        <div className='flex flex-col space-y-[2.5rem]'>
            {favorites?.map((favorite, i) => (
                <FavoriteCard
                    {...favorite}
                    key={i}
                    onRemove={onRemove}
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