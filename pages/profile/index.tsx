import Link from 'next/link'
import { Button } from 'rsuite'
import EmailIcon from '@rsuite/icons/Email';

export default function Profile() {
  return (
    <div className='flex flex-col my-[6rem] space-y-[3rem]'>
        <Summary
            name='Tobias Ribba'
            avatar='images/profile/avatar.png'
            rate={5.0}
        />
        <div className='flex justify-between space-x-[3rem]'>
            {/* left space */}
            <div className='flex flex-col space-y-[3rem] w-1/4'>
                <Collection name='Favorite Venues'>
                    {favoriteVenues.map((favoriteVenue, key) =>(
                        <FavoriteCard {...favoriteVenue} key={key}/>
                    ))}
                </Collection>
                <Collection name='Memberships'>
                    <span className='flex bg-[#1d1829] space-x-5 p-[1rem] text-white'>
                        You're not a member at any venue.
                    </span>
                </Collection>
                <Collection name='Matching Players'>
                    {matchingPlayers.map((matching, key) =>(
                        <MatchingCard {...matching} key={key}/>
                    ))}
                </Collection>
            </div>
            {/* right space */}
            <div className='flex flex-col space-y-[3rem] w-3/4'>
                right space
            </div>
        </div>
    </div>
  )
}

const Summary = ({name, avatar, rate}) => {
    return (
        <div className='flex p-[3rem] space-x-[3rem] bg-[#1d1829] justify-between'>
            <div className='flex flex-col w-1/3 space-y-[3rem]'>
                <div className='flex justify-between'>
                    <img src={avatar} alt='User Avatar' />
                    <span className='font-bold text-[2rem] text-white'>{name}</span>
                </div>
                <div className='flex flex-col rounded-3xl border-grey border-2 p-[2rem] space-y-[1rem]'>
                    <span className='font-bold text-white text-[1.5rem]'>Your next booking</span>
                    <span className='text-white'>You have no upcoming bookings</span>
                </div>
                <Button appearance="ghost" className='w-[15rem] h-[3rem] rounded-xl bg-[#c2ff00] !border-green text-black'>
                    <Link href='/profile/edit'>+ Book New Time Slot</Link>
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
        <img src={image} alt='Venue' className='w-[3rem] h-[3rem] rounded-md'></img>
        <div className='flex flex-col'>
            <span>{name}</span>
            <span>{location}</span>
        </div>
    </div>
)

const MatchingCard = ({avatar, name, location, rate, matching}) => (
    <div className='flex bg-[#1d1829] space-x-5 p-[1rem] text-white'>
        <img src={avatar} alt='Venue' className='w-[3rem] h-[3rem] rounded-full'></img>
        <div className='flex flex-col'>
            <div className='flex justify-between'>
                
                <span>{name}</span>
                <EmailIcon className='justify-end' />
            </div>
            <span>{location}</span>
        </div>
    </div>
)

const Collection = ({name, children}) => (
    <div className='flex flex-col space-y-1'>
        <span className='p-5 font-bold text-[1.25rem] bg-[#c2ff00]'>{name}</span>
        {children}
    </div>
)

const favoriteVenues = [
    {
        image: '/images/profile/favoriteVenus/1.png',
        name: '247 PADEL Vala centrum',
        location: 'Helsingburg',
    },
    {
        image: '/images/profile/favoriteVenus/2.png',
        name: '247 PADEL Vala centrum',
        location: 'Helsingburg',
    },
    {
        image: '/images/profile/favoriteVenus/3.png',
        name: '247 PADEL Vala centrum',
        location: 'Helsingburg',
    },
]

const matchingPlayers = [
    {
        avatar: '/images/profile/matchingPlayers/1.png',
        rate: 5,
        name: 'Tobias Ribba',
        location: 'Helsingburg',
        matching: 49,
    },
    {
        avatar: '/images/profile/matchingPlayers/2.png',
        rate: 4,
        name: 'Tobias Ribba',
        location: 'Helsingburg',
        matching: 56,
    },
    {
        avatar: '/images/profile/matchingPlayers/3.png',
        rate: 6,
        name: 'Tobias Ribba',
        location: 'Helsingburg',
        matching: 70,
    },
]