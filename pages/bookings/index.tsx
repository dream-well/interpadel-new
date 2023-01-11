import { useEffect, useState } from 'react'
import { Avatar, Button, Form, Pagination, Progress, SelectPicker, useToaster } from 'rsuite'
import AbTestIcon from '@rsuite/icons/AbTest';
import LocationIcon from '@rsuite/icons/Location';
import useSWR from 'swr';
import axios from 'axios';
import { fetcher, notification } from 'utils/helpers';
import Link from 'next/link';
import NoItems from 'components/NoItems';
import Image from 'components/Image';
import { updateFavorites } from 'store/slices/authSlice';
import { useDispatch } from 'react-redux';
import useApi from 'hooks/useApi';
import { useAppSelector } from 'store/hook';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useRouter } from 'next/router';

const ROW_PER_PAGE = 5;

export default function Bookings() {

    const dispatch = useDispatch();

    const [activePage, setActivePage] = useState(1)
    const [favorites, setFavorites] = useState([])

    const query = useAppSelector(state => state.app.query);
    const router = useRouter();
    const q = router.query.q;
    const {data: favoritesData, error, mutate} = useApi('/api/centers', {address: q});

    useEffect(() => {
        if(q == query) return;
        router.replace('/bookings?q=' + query);
    }, [query])
    
    const toaster = useToaster();    

    useEffect(() => {
        setFavorites(favoritesData?.slice((activePage-1) * ROW_PER_PAGE, activePage * ROW_PER_PAGE));
        if (favoritesData?.length <= (activePage-1) * ROW_PER_PAGE)
            setActivePage(1);
    }, [favoritesData])

    useEffect(() => {
        setFavorites(favoritesData?.slice((activePage-1) * ROW_PER_PAGE, activePage * ROW_PER_PAGE));
    }, [activePage])

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
            dispatch(updateFavorites(
                favoritesData?.map(d => d._id)
                    .filter(_id => _id != id)
            ));
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
        <div className='px-[8.5rem] flex flex-col space-y-[3.5rem] my-[4.375rem]'>
            {favoritesData?.length > 0 && (
                <FavoritesSection favorites={favorites} onRemove={handleRemove} />
            )}
            {favoritesData?.length > 0 && (
                <Paginator
                    activePage={activePage}
                    setActivePage={setActivePage}
                    rows={favoritesData?.length}
                />
            )}
            {favoritesData?.length === 0 && <NoItems className='text-black' href={'/centers'} text='No Favorite centers yet' />}
        </div>
    )
}

const FavoriteCard = ({image, name, address, courts, description, _id, onRemove, isFavorite=false, onToggleFavorite}) => {
    const toggleFavorite = (evt) => {
      evt.preventDefault();
      onToggleFavorite(_id);
    }
    return (
    <div className='flex text-white items-center'>
        <Link href={`/centers/${_id}/today`} className='w-[9rem] h-[9rem] absolute'>
           <Image src={image} alt={name} className='rounded-[1rem] object-cover h-full w-full' />
        </Link>
        <div className='flex flex-col flex-grow bg-dark px-[5rem] py-[2rem] space-y-[0.5rem] ml-[6.5rem] border rounded-[0.5rem] border-grey-light'>
            <Link href={`/centers/${_id}/today`}  className='text-[2rem] font-bold saira'>
                {name}
            </Link>
            <span className='flex space-x-2 items-center'>
                <LocationIcon/>
                <span>{address}</span>
            </span>
            {/* <span className='flex space-x-2 items-center'>
                <AbTestIcon/>
                <span>{courts.length} Bookable courts</span>
            </span> */}
            <div className='text-[2rem]'>
                {isFavorite && <AiFillHeart onClick={toggleFavorite} color={'#ff1122'} />}
                {!isFavorite && <AiOutlineHeart onClick={toggleFavorite} />}
            </div>
        </div>
    </div>
)}

const FavoritesSection = ({ favorites, onRemove }) => {
    return (
        <div className='flex flex-col space-y-[2.5rem]'>
            {favorites?.map((favorite, i) => (
                <FavoriteCard
                    {...favorite}
                    key={i}
                    onRemove={onRemove}
                    isFavorite={true}
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
