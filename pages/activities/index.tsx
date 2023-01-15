import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Button, Form, Pagination, Progress, SelectPicker, useToaster, Tooltip } from 'rsuite'
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
import cn from 'classnames';
import moment from 'moment';
import { setDate, setQuery } from 'store/slices/appSlice';
import GoogleMapReact from 'google-map-react';
import PeoplesIcon from '@rsuite/icons/Peoples';

const ROW_PER_PAGE = 5;

export default function Activities() {

    const dispatch = useDispatch();

    const [activePage, setActivePage] = useState(1)
    const [favorites, setFavorites] = useState([])

    const query = useAppSelector(state => state.app.query);
    const router = useRouter();
    const q = router.query.q;
    const {data: centers, error, mutate} = useApi('/api/centers', {address: q ?? ''});

    useEffect(() => {
        if(q == query) return;
        // router.replace('/activities?q=' + query);
    }, [query])

    useEffect(() => {
        dispatch(setDate(new Date));
    }, [])
    
    const toaster = useToaster();    

    useEffect(() => {
        setFavorites(centers?.slice((activePage-1) * ROW_PER_PAGE, activePage * ROW_PER_PAGE));
        if (centers?.length <= (activePage-1) * ROW_PER_PAGE)
            setActivePage(1);
    }, [centers])

    useEffect(() => {
        setFavorites(centers?.slice((activePage-1) * ROW_PER_PAGE, activePage * ROW_PER_PAGE));
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
                centers?.map(d => d._id)
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
        <div>
            <div className='px-[8.5rem] flex flex-col space-y-[3.5rem] my-[4.375rem]'>
                {centers?.length > 0 && (
                    <CenterSection favorites={favorites} onRemove={handleRemove} />
                )}
                {centers?.length > 0 && (
                    <Paginator
                        activePage={activePage}
                        setActivePage={setActivePage}
                        rows={centers?.length}
                    />
                )}
                {centers?.length === 0 && <NoItems className='text-black' href={'/centers'} text='No Favorite centers yet' />}
            </div>
        </div>
    )
}

const Center = ({image, name, city, courts, description, _id, onRemove, isFavorite=false, onToggleFavorite, isActive, onActive}) => {
    const toggleFavorite = (evt) => {
      evt.preventDefault();
      onToggleFavorite(_id);
    }
    const selectedDate = useAppSelector(state => state.app.date);
    const timeSlots = [9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
    const [currentSlot, setCurrentSlot] = useState(-1);
    const [isFold, setFold] = useState(true);
    const { data: center, loading: center_loading } = useApi(isActive ? `/api/centers/${_id}` : null);
    const router = useRouter();

    useEffect(() => {
        if(isActive)
            setFold(false);
    }, [isActive]);  

    const gotoPayment = (court, startAt) => {
        const searchParams = new URLSearchParams();
        const startDate = moment(selectedDate).startOf('day');
        startDate.add(startAt, 'h');
        searchParams.append('court', court._id);
        searchParams.append('startAt', startDate.toJSON());
        searchParams.append('duration', '60');
        router.push('/payment?' + searchParams.toString());
    }

    const date = useAppSelector(state => state.app.date);

    return (
    <div className='flex text-white items-center relative'>
        <Link href={`/centers/${_id}/today`} className='w-[8rem] h-[8rem] absolute top-2'>
           <Image src={image} alt={name} className='rounded-[1rem] object-cover h-full w-full' />
        </Link>
        <div className='flex bg-dark w-full px-[3rem] py-[1.5rem] space-y-[0.5rem] ml-[6rem] border rounded-[0.5rem] border-grey-light justify-between'>
            <div className='flex flex-col min-w-[30rem]'>
                <Link href={`/centers/${_id}/today`}  className='text-[2rem] font-bold saira'>
                    {name}
                </Link>
                <span className='flex space-x-1 items-center'>
                    <LocationIcon/>
                    <span>{city}</span>
                </span>
            </div>
            <div className='flex flex-col ml-8 flex-grow'>
                <div className='flex justify-between text-xl font-bold'>
                    <span>Beat the Boss</span>
                    <span>Level 4 - 8</span>
                </div>
                <div className='text-sm py-2 flex justify-between items-end'>
                    <div className={cn('flex-shrink w-[20rem] flex-grow', isFold ? 'truncate': '')}>
                        <span className={isFold ? 'whitespace-pre': ''}>
                            Vem älskar inte en Vinnarbana? Konceptet är enkelt men väldigt roligt. Vinner ni så avancerar ni upp mot Vinnarbanan, förlorar ni så kommer ni närmare Träskbanan. Som en extra morot står Marcus Lindmark och Joakim Andersson på Träskbanan från start. Står du och din partner som segrare när tiden är slut får ni tillbaka anmälningsavgiften! Ni anmäler er individuellt men om ni önskar att spela med en viss person så skriver ni detta i kommentarsfältet när ni bokar. Har du ingen partner så paras du ihop med någon på plats. Ni hänger ihop med er partner under hela aktiviteten. Platserna var man startar lottas förutom för Marcus och Joakim som börjar på Träskbanan. - Det här är ingen aktivitet för dåliga förlorare, hälsar Joakim.
                        </span>
                    </div>
                    <span className='w-[5rem] text-right cursor-pointer text-green-dark' onClick={() => { setFold(!isFold) }}>
                        {isFold ? 'Read more' : 'Show less'}
                    </span>
                </div>
                <div className='flex justify-between items-center'>
                    <div className='font-bold w-[14rem]'>
                        { '01-15-2023' } 13:00 - 15:00
                    </div>
                    <div className='font-bold space-x-1 flex items-center px-3 py-1 rounded rounded-[4rem] bg-green-dark'>
                        <PeoplesIcon />
                        <span className=''>7 / 10</span>
                    </div>
                    <div className='flex-grow'></div>
                    <div className='font-bold'>
                        {175} SEK
                    </div>
                </div>
            </div>
        </div>
    </div>
)}

const CenterSection = ({ favorites, onRemove }) => {
    const [activeCenter, setActiveCenter] = useState(-1);
    return (
        <div className='flex flex-col space-y-[1.5rem]'>
            {favorites?.map((favorite, i) => (
                <Center
                    {...favorite}
                    key={i}
                    onRemove={onRemove}
                    isFavorite={true}
                    isActive={i == activeCenter}
                    onActive={() => setActiveCenter(i)}
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
