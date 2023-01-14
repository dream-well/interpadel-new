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

const ROW_PER_PAGE = 5;

export default function Bookings() {

    const dispatch = useDispatch();

    const [activePage, setActivePage] = useState(1)
    const [favorites, setFavorites] = useState([])

    const query = useAppSelector(state => state.app.query);
    const router = useRouter();
    const q = router.query.q;
    const {data: centers, error, mutate} = useApi('/api/centers', {address: q ?? ''});

    useEffect(() => {
        if(q == query) return;
        router.replace('/bookings?q=' + query);
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
            <Maps centers={centers} onCenterClick={(center) => dispatch(setQuery(center.name))} />
        </div>
    )
}

const Center = ({image, name, address, courts, description, _id, onRemove, isFavorite=false, onToggleFavorite, isActive, onActive}) => {
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
                <span className='flex space-x-2 items-center'>
                    <LocationIcon/>
                    <span>{address}</span>
                </span>
                {/* <span className='flex space-x-2 items-center'>
                    <AbTestIcon/>
                    <span>{courts.length} Bookable courts</span>
                </span> */}
                <div className='text-sm'>
                    {courts.length} courts are available
                </div>
            </div>
            <div className='flex flex-col ml-8'>
                <div className='flex items-start justify-start flex-grow flex-wrap'>
                    {
                        timeSlots.map((slot, key) => (
                            <div 
                                key={key}
                                onClick={() => { if(isActive && currentSlot == slot) setFold(!isFold); else setFold(false); setCurrentSlot(slot); onActive(); }}
                                className={cn('select-none w-[3rem] h-[3rem] bg-grey-light border border-grey flex justify-center items-center mr-2 cursor-pointer hover:bg-grey', isActive && slot == currentSlot && 'bg-green text-black')}>
                                {slot}
                            </div>
                        ))
                    }
                </div>
                <div className='overflow-hidden'>
                    <div className={cn('flex flex-col pt-4 transition-all overflow-hidden', isActive && !isFold ? 'translate-y-0' : '-translate-y-full h-0')}>
                        <span className='py-4'>Available courts &nbsp; <b>{moment(date).format('dddd, Do MMMM YYYY')} {currentSlot}:00</b></span>
                        {
                            center?.courts.map((court, key) => {
                                return (
                                    <div key={key} className='flex border py-2 px-4 justify-between items-center text-sm'>
                                        <span className='w-[20rem]'>
                                        { court.name }
                                        </span>
                                        {/* <span className='flex-grow'>
                                        </span> */}
                                        <div className='pr-8'>
                                            60 min
                                        </div>
                                        <div className='pr-8'>
                                            {court.type}
                                        </div>
                                        <div className='flex flex-col space-y-1'>
                                            <span>{ court.price } NOK</span>
                                            <Button className='bg-green' color='green' appearance='ghost' onClick={() => {gotoPayment(court, currentSlot)}}>
                                                Book
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })
                        }
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

const MapPin = ({ text, onClick }) => {
    const [hover, setHover] = useState(false);
    return (
      <div className='cursor-pointer relative' onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <Image src='/images/centers/padel.png' className='w-[2rem]'/>
        <Tooltip visible={hover} className={cn('absolute left-[2rem] bottom-0', hover && '!opacity-70 bg-green !text-[#1a424a] font-bold')}>
          <span className='text-black text-md'>{text}</span>
          <br/>
          <Link href={`https://www.google.com/maps/search/${text.replace(' ', '+')}`} target='_blank' className='font-bold text-sm'>GoogleMap</Link>
        </Tooltip>
      </div>
  )};
  
function Maps({centers=[], onCenterClick}) {
    const defaultProps = {
      center: {
        lat: 59.950272862410756,
        lng: 10.880461887376
      },
      zoom: 6
    };
  
    const ref = useRef<GoogleMapReact>();
  
    useEffect(() => {
      if(!ref.current) return;
      const fullscreenBtn = document.querySelector(".gm-control-active.gm-fullscreen-control");
      if(fullscreenBtn) {
        fullscreenBtn.setAttribute('hidden', 'hidden');
      }
    }, [ref]);
  
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '32rem', width: '100%' }}>
        <GoogleMapReact
          ref={ref}
          bootstrapURLKeys={{key:''}}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          options={{gestureHandling: 'greedy', fullscreenControlOptions: {position:9}}}
        >
          {
            centers.map((center, key) => 
              <MapPin
                key={key}
                text={center.name}
                onClick={() => onCenterClick(center)}
              />
            )
          }
        </GoogleMapReact>
      </div>
    );
}
  