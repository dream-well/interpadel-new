import Link from 'next/link'
import { Button, Badge, Progress, Calendar, Whisper, Popover } from 'rsuite'
import EmailIcon from '@rsuite/icons/Email';
import CalendarIcon from '@rsuite/icons/Calendar';
import LocationIcon from '@rsuite/icons/Location';
import CreditCardPlusIcon from '@rsuite/icons/CreditCardPlus';
import MinusIcon from '@rsuite/icons/Minus';
import { useAppSelector } from 'store/hook';
import Avatar from 'components/Avatar';
import useSWR from 'swr';
import { fetcher } from 'utils/helpers';
import Image from 'components/Image';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateProfile } from 'store/slices/authSlice';
import useApi from 'hooks/useApi';

export default function Profile() {
    const { firstname, lastname, image } = useAppSelector(state => state.auth);
    
    return (
        <div className='px-[8.5rem] flex flex-col my-[6rem] space-y-[3rem]'>
            <Summary
                name={firstname + ' ' + lastname}
                avatar={image}
                rate={5.0}
            />
            <div className='flex justify-between space-x-[3.813rem]'>
                {/* left space */}
                <div className='flex flex-col space-y-[2.5rem] w-[18.75rem]'>
                    <Collection name='Favorite Venues'>
                        {favoriteVenues.map((favoriteVenue, key) =>(
                            <FavoriteCard {...favoriteVenue} key={key}/>
                        ))}
                    </Collection>
                    {/* <Collection name='Memberships'>
                        <span className='flex bg-[#1d1829] space-x-5 p-[1rem] text-white'>
                            You are not a member at any venue.
                        </span>
                    </Collection> */}
                    <Collection name='Matching Players'>
                        <Matchings />
                    </Collection>
                </div>
                {/* right space */}
                <div className='flex flex-col space-y-[2.5rem] flex-grow'>
                    <UpcomingBooking />
                    <UpcomingActivity />
                    <TeamMembers />
                </div>
            </div>
        </div>
    )
}

const Summary = ({name, avatar, rate}) => {
    const { data } = useSWR(`/api/profile/bookings?month=${new Date().getFullYear()}-${new Date().getMonth() + 1}`, fetcher);

    const uploaderRef = useRef<HTMLInputElement>();
    const dispatch = useDispatch();

    const uploadPhoto = () => {
        if(!uploaderRef.current.files[0]) return;
        var formData = new FormData();
        formData.append("file", uploaderRef.current.files[0]);
        axios.post('/api/profile/avatar', formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        }).then(() => {
            axios.get('/api/profile')
            .then(res => {
                dispatch(updateProfile(res));
            })
        })
    }

    const bookings = data?.records?.filter((booking) => {
        const bookingTime = new Date(booking.startAt);
        const currentTime = new Date();
        return bookingTime > currentTime;
    }).sort((d1, d2) => {
        const off = (new Date(d1.startAt).getTime()) - (new Date(d2.startAt).getTime());
        return (off > 0 ? 1 : (off === 0 ? 0 : -1));
    });

    const BookingItem = ({data}) => {
        const startTime = new Date(data.startAt);
        const endTime = new Date(startTime);
        endTime.setMinutes(startTime.getMinutes() + data.duration);

        const checkTime = (i) => (i < 10 ? "0"+i : i) 
        const timeString = (time) => (
            checkTime(time.getHours()) + ':' + 
            checkTime(time.getMinutes()) + ':' +
            checkTime(time.getSeconds())
        )
        const formatDate = (d) => {
            var month = '' + (d.getMonth() + 1);
            var day = '' + d.getDate();
            var year = d.getFullYear();

            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;

            return [year, month, day].join('-');
        }
    
        return (
            <Link
            className='text-white'
            href={`/centers/${data.center?._id}/${startTime.getFullYear()}-${startTime.getMonth()+1}-${startTime.getDate()}`}>
                <span className='text-lg font-bold'>{formatDate(startTime)} {timeString(startTime)}-{timeString(endTime)}</span><br />
                <i className='text-sm'>{data.center?.name} / {data.court?.name}</i>
            </Link>
        )
    }

    return (
        <div className='flex p-[3rem] space-x-[3rem] bg-[#1d1829] justify-between'>
            <div className='flex flex-col w-1/3 space-y-[2rem]'>
                <div className='flex justify-between items-center'>
                    <Badge content={rate.toFixed(1)} color={'green'}>
                        <Avatar src={avatar} className='w-[7.5rem] h-[7.5rem] cursor-pointer' onClick={() => uploaderRef?.current.click()}/>
                    </Badge>
                    <input type="file" hidden onChange={uploadPhoto} ref={uploaderRef}/>
                    <span className='font-bold text-[2.5rem] ml-2 text-white'>{name}</span>
                </div>
                <div className='flex flex-col rounded-3xl border-grey border-2 p-[2.5rem] space-y-[1rem]'>
                    <span className='font-bold text-white text-[1.5rem]'>Your next booking</span>
                    <span className='text-white flex items-center space-x-2'>
                        {/* <CalendarIcon className='text-[1.5rem]' /> */}
                        {bookings?.length > 0
                            ? (<BookingItem data={bookings[0]} />)
                            : (<span>You have no upcoming bookings</span>)
                        }
                    </span>
                </div>
                <Button appearance="ghost" className='w-[15rem] h-[3rem] rounded-xl bg-[#c2ff00] !border-green text-black'>
                    <Link href='/centers'>+ Book New Time Slot</Link>
                </Button>
            </div>
            <div className='flex flex-col items-end'>
                <Button appearance="ghost" className='h-[3rem] w-[7.5rem] rounded-xl !border-green !text-green'>
                    <Link href='/profile/edit'>Edit Profile</Link>
                </Button>
            </div>
        </div>
    )
}

const FavoriteCard = ({image, name, location}) => (
    <div className='flex bg-[#1d1829] space-x-5 p-[1rem] text-white'>
       <Image src={image} className='w-[3rem] h-[3rem] border-1'/>
        <div className='flex flex-col'>
            <span>{name}</span>
            <span className='flex space-x-2 items-center'>
                <LocationIcon/>
                <span>{location}</span>
            </span>
        </div>
    </div>
)

const Matchings = () => {
    const { data: matchingPlayers } = useApi('/api/profile/matchings');

    return (
        <div>
            {matchingPlayers?.slice(0, 3).map((matching, key) =>(
                <MatchingCard {...matching} key={key}/>
            ))}
        </div>
    )
}

const MatchingCard = ({image, firstname, lastname, address, level/*, matching*/}) => (
    <div className='flex bg-[#1d1829] space-x-5 p-[1rem] text-white items-center'>
        <div className='flex w-[2.5rem] h-[2.5rem]'>
            <Avatar src={image} className='w-[2.5rem] h-[2.5rem]' />
        </div>
        <div className='flex flex-col flex-grow space-y-2'>
            <div className='flex space-x-5'>
                <span className='rounded-md bg-green text-black px-[0.5rem] py-[0.2rem] text-[0.75rem]'>{level.toFixed(1)}</span>
                <span className='text-[#F4F3F4] items-center'>{firstname + ' ' + lastname}</span>
                {/* <EmailIcon className='justify-end' /> */}
            </div>
            <span className='flex space-x-2 items-center'>
                <LocationIcon className='!w-[1rem]'/>
                <span className='whitespace-wrap'>{address}</span>
            </span>
            <Progress.Line percent={level * 10} showInfo={false} className='px-0' />
            {/* <span className='0.875rem'>Match score: {matching}%</span> */}
        </div>
    </div>
)

const Collection = ({name, children}) => (
    <div className='flex flex-col space-y-1'>
        <span className='p-5 font-bold text-[1.25rem] bg-[#c2ff00]'>{name}</span>
        {children}
    </div>
)

const UpcomingBooking = () => {
    const { data } = useSWR(`/api/profile/bookings?month=${new Date().getFullYear()}-${new Date().getMonth() + 1}`, fetcher);
    const bookings = data?.records?.filter((booking) => {
        const bookingTime = new Date(booking.startAt);
        const currentTime = new Date();
        const oneWeekTime = currentTime;
        oneWeekTime.setDate(oneWeekTime.getDate() + 7);
        return (bookingTime < oneWeekTime) && (bookingTime > currentTime);
    }).sort((d1, d2) => {
        const off = (new Date(d1.startAt).getTime()) - (new Date(d2.startAt).getTime());
        return (off > 0 ? 1 : (off === 0 ? 0 : -1));
    });

    const BookingItem = ({data}) => {
        const startTime = new Date(data.startAt);
        const endTime = new Date(startTime);
        endTime.setMinutes(startTime.getMinutes() + data.duration);
    
        return (
            <Link
            className='text-white'
            href={`/centers/${data.center?._id}/${startTime.getFullYear()}-${startTime.getMonth()+1}-${startTime.getDate()}`}>
                <b className='text-lg'>[ {startTime.toLocaleString()} - {endTime.toLocaleString()} ]</b> at <b>{data.center?.name}</b> / <b>{data.court?.name}</b>
            </Link>
        )
    }
    
    return (
        <div className='flex flex-col p-[2.5rem] bg-dark space-y-[2rem]'>
            <span className='text-white flex items-center space-x-2 text-[1.75rem] font-bold'>
                <CalendarIcon />
                <span>Upcoming Booking</span>
            </span>
            <ul className='flex flex-col text-white space-y-1 justify-center'>
                {bookings?.map((item, index) => (
                    <li key={index} className='flex whitespace-nowrap items-center space-x-2'>
                        <Badge /* className='bg-green' */ /> <BookingItem data={item} />
                    </li>
                ))}
                {(bookings?.length) === 0 && (
                    <span className='flex text-white'>
                        You have no upcoming bookings.
                    </span>
                )}
            </ul>
        </div>
    )
}

const UpcomingActivity = () => {
    return (
        <div className='flex flex-col p-[2.5rem] bg-dark space-y-[3.313rem]'>
            <span className='text-white flex items-center space-x-2 text-[1.75rem] font-bold'>
                <CalendarIcon />
                <span>Upcoming Activities</span>
            </span>
            <span className='flex text-white'>
                You have no upcoming activities.
            </span>
        </div>
    )
}

const TeamMember = ({image, firstname, lastname, address, level, team}) => (
    <div className='flex bg-[#2c303a] space-x-[1rem] p-[2rem] text-white items-center rounded-xl'>
        <Avatar src={image} className='w-[5rem] h-[5rem]'/>
        <div className='flex flex-col space-y-2'>
            <div className='flex space-x-5'>
                <span className='rounded-md bg-green text-black px-[0.5rem] py-[0.2rem] text-[0.75rem]'>Level : {level}</span>
                <span className='text-[#F4F3F4] items-center'>{firstname + ' ' + lastname}</span>
            </div>
            <span className='flex space-x-2 items-center'>
                <LocationIcon/>
                <span>{address}</span>
            </span>
        </div>
        <span className='flex flex-grow justify-end'>{team}</span>
        {/* <Button appearance='ghost' className='flex rounded-xl border border-green text-green px-[1.5rem] py-[0.75rem] items-center space-x-2'>
            <span>Remove</span>
            <MinusIcon />
        </Button> */}
    </div>
)

const TeamMembers = () => {
    const { data } = useApi('/api/teams/myteams');
    
    const [members, setMembers] = useState([])
    
    useEffect(() => {
        console.log(data);
        
      var newMembers = []
      
      for (const d of (data || [])) {
        for (const m of d.members) {
            newMembers = [
                ...newMembers,
                {
                    image: m.image,
                    firstname: m.firstname,
                    lastname: m.lastname,
                    address: m.address + ', ' + m.city + ', ' + m.country,
                    level: m.level,
                    team: d.name
                }
            ]
        }
      }

      setMembers(newMembers)
    }, [data])

    return (
        <div className='flex flex-col p-[2.5rem] bg-dark space-y-[2.5rem]'>
            <div className='flex justify-between'>
                <span className='text-white flex items-center space-x-2 text-[1.75rem] font-bold'>
                    <CalendarIcon />
                    <span>Your Team Members</span>
                </span>
                <Button className='flex rounded-xl bg-green text-black px-[1.5rem] py-[0.75rem] items-center space-x-2'>
                    <Link href='/matching'>Manage members</Link>
                    <CreditCardPlusIcon />
                </Button>
            </div>
            <div className='flex flex-col space-y-[1rem]'>
                {members?.map((member, index) =>(
                    <TeamMember {...member} key={index} />
                ))}
                {(members?.length) === 0 && (
                    <span className='flex text-white'>
                        You have no team members.
                    </span>
                )}
            </div>
        </div>
    )
}

const favoriteVenues = [
    {
        image: '/images/profile/favorites/1.png',
        name: '247 PADEL Vala centrum',
        location: 'Helsingburg',
    },
    {
        image: '/images/profile/favorites/2.png',
        name: '247 PADEL Vala centrum',
        location: 'Helsingburg',
    },
    {
        image: '/images/profile/favorites/3.png',
        name: '247 PADEL Vala centrum',
        location: 'Helsingburg',
    },
]