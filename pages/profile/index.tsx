import Link from 'next/link'
import { Button, Badge, Progress, Avatar } from 'rsuite'
import EmailIcon from '@rsuite/icons/Email';
import CalendarIcon from '@rsuite/icons/Calendar';
import LocationIcon from '@rsuite/icons/Location';
import CreditCardPlusIcon from '@rsuite/icons/CreditCardPlus';
import MinusIcon from '@rsuite/icons/Minus';
import { useAppSelector } from 'store/hook';

export default function Profile() {
    const { firstname, lastname, image } = useAppSelector(state => state.auth);
    
    return (
        <div className='flex flex-col my-[6rem] space-y-[3rem]'>
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
                    <Collection name='Memberships'>
                        <span className='flex bg-[#1d1829] space-x-5 p-[1rem] text-white'>
                            You are not a member at any venue.
                        </span>
                    </Collection>
                    <Collection name='Matching Players'>
                        {matchingPlayers.map((matching, key) =>(
                            <MatchingCard {...matching} key={key}/>
                        ))}
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
    return (
        <div className='flex p-[3rem] space-x-[3rem] bg-[#1d1829] justify-between'>
            <div className='flex flex-col w-1/3 space-y-[2rem]'>
                <div className='flex justify-between items-center'>
                    <Badge content={rate.toFixed(1)} color={'green'}>
                        <Avatar src={avatar} alt='User Avatar' circle size='lg' className='w-[7.5rem] h-[7.5rem]' />
                    </Badge>
                    <span className='font-bold text-[2.5rem] ml-2 text-white'>{name}</span>
                </div>
                <div className='flex flex-col rounded-3xl border-grey border-2 p-[2.5rem] space-y-[1rem]'>
                    <span className='font-bold text-white text-[1.5rem]'>Your next booking</span>
                    <span className='text-white flex items-center space-x-2'>
                        <CalendarIcon className='text-[1.5rem]' />
                        <span>You have no upcoming bookings</span>
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
        <Avatar size='lg' src={image} alt='Venue' className='w-[3rem] h-[3rem] rounded-md border-1'></Avatar>
        <div className='flex flex-col'>
            <span>{name}</span>
            <span className='flex space-x-2 items-center'>
                <LocationIcon/>
                <span>{location}</span>
            </span>
        </div>
    </div>
)

const MatchingCard = ({avatar, name, location, rate, matching}) => (
    <div className='flex bg-[#1d1829] space-x-5 p-[1rem] text-white'>
        <Avatar size='md' src={avatar} alt='Venue' className='w-[2.5rem] h-[2.5rem] rounded-full'></Avatar>
        <div className='flex flex-col flex-grow space-y-2'>
            <div className='flex space-x-5 justify-between'>
                <span className='rounded-md bg-green text-black px-[0.5rem] py-[0.2rem] text-[0.75rem]'>{rate.toFixed(1)}</span>
                <span className='text-[#F4F3F4] items-center'>{name}</span>
                <EmailIcon className='justify-end' />
            </div>
            <span className='flex space-x-2 items-center'>
                <LocationIcon/>
                <span>{location}</span>
            </span>
            <Progress.Line percent={matching} showInfo={false} className='px-0' />
            <span className='0.875rem'>{name.split(' ')[0]} Matches your profile {matching}%</span>
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
    return (
        <div className='flex flex-col p-[2.5rem] bg-dark space-y-[3.313rem]'>
            <span className='text-white flex items-center space-x-2 text-[1.75rem] font-bold'>
                <CalendarIcon />
                <span>Upcoming Booking</span>
            </span>
            <span className='flex text-white'>
                You have no upcoming bookings. Search for available times above.
            </span>
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

const TeamMember = ({avatar, name, location, rate, team}) => (
    <div className='flex bg-[#2c303a] space-x-[1rem] p-[2rem] text-white items-center rounded-xl'>
        <Avatar src={avatar} size='lg' alt='Venue' className='w-[5rem] h-[5rem] rounded-full'></Avatar>
        <div className='flex flex-col space-y-2'>
            <div className='flex space-x-5 justify-between'>
                <span className='rounded-md bg-green text-black px-[0.5rem] py-[0.2rem] text-[0.75rem]'>{rate.toFixed(1)}</span>
                <span className='text-[#F4F3F4] items-center'>{name}</span>
            </div>
            <span className='flex space-x-2 items-center'>
                <LocationIcon/>
                <span>{location}</span>
            </span>
        </div>
        <span className='flex flex-grow justify-center'>{team}</span>
        <Button appearance='ghost' className='flex rounded-xl border border-green text-green px-[1.5rem] py-[0.75rem] items-center space-x-2'>
            <span>Remove</span>
            <MinusIcon />
        </Button>
    </div>
)

const TeamMembers = () => {
    return (
        <div className='flex flex-col p-[2.5rem] bg-dark space-y-[2.5rem]'>
            <div className='flex justify-between'>
                <span className='text-white flex items-center space-x-2 text-[1.75rem] font-bold'>
                    <CalendarIcon />
                    <span>Your Team Members</span>
                </span>
                <Button className='flex rounded-xl bg-green text-black px-[1.5rem] py-[0.75rem] items-center space-x-2'>
                    <Link href='/profile/edit'>Make a new team </Link>
                    <CreditCardPlusIcon />
                </Button>
            </div>
            <div className='flex flex-col space-y-[1rem]'>
                {members.map((member, index) =>(
                    <TeamMember {...member} key={index} />
                ))}
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

const matchingPlayers = [
    {
        avatar: '/images/profile/matchings/1.png',
        rate: 5,
        name: 'Tobias Ribba',
        location: 'Helsingburg',
        matching: 49,
    },
    {
        avatar: '/images/profile/matchings/2.png',
        rate: 4,
        name: 'Tobias Ribba',
        location: 'Helsingburg',
        matching: 56,
    },
    {
        avatar: '/images/profile/matchings/3.png',
        rate: 6,
        name: 'Tobias Ribba',
        location: 'Helsingburg',
        matching: 70,
    },
]

const members = [
    {
        avatar: '/images/profile/team/1.png',
        rate: 5,
        name: 'Tobias Ribba',
        location: 'Helsingburg',
        team: 'Team name 1',
    },
    {
        avatar: '/images/profile/team/2.png',
        rate: 4,
        name: 'Tobias Ribba',
        location: 'Helsingburg',
        team: 'Team name 1',
    },
    {
        avatar: '/images/profile/team/3.png',
        rate: 6,
        name: 'Tobias Ribba',
        location: 'Helsingburg',
        team: 'Team name 1',
    },
    {
        avatar: '/images/profile/team/4.png',
        rate: 3,
        name: 'Tobias Ribba',
        location: 'Helsingburg',
        team: 'Team name 1',
    },
]