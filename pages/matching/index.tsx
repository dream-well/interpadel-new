import { useState } from 'react'
import { Avatar, Button, Form, Pagination, Progress, SelectPicker } from 'rsuite'
import SearchIcon from '@rsuite/icons/Search';
import LocationIcon from '@rsuite/icons/Location';
import CreditCardPlusIcon from '@rsuite/icons/CreditCardPlus';
import Link from 'next/link';

export default function Matching() {
    const [searchValues, setSearchValues] = useState({})
    const [activePage, setActivePage] = useState(1)

    const handleSearch = (evt) => {
        evt.preventDefault();
        console.log(searchValues);
    }

    return (
        <div className='flex flex-col space-y-[3.5rem] my-[4.375rem]'>
            <SearchSection
                searchValues={searchValues}
                setSearchValues={setSearchValues}
                onSearch={handleSearch}
            />
            <Matchings matchings={matchings}
            />
            <Paginator
                activePage={activePage}
                setActivePage={setActivePage}
                rows={100}
            />
        </div>
    )
}

const matchings = [
    {
        avatar: '/images/matching/1.png',
        rate: 5,
        name: 'Tobias Ribba',
        location: 'Helsingburg',
        matching: 49,
        level: 'Intermediate Level 5',
    },
    {
        avatar: '/images/matching/2.png',
        rate: 4,
        name: 'Tobias Ribba',
        location: 'Helsingburg',
        matching: 56,
        level: 'Intermediate Level 5',
    },
    {
        avatar: '/images/matching/3.png',
        rate: 6,
        name: 'Tobias Ribba',
        location: 'Helsingburg',
        matching: 70,
        level: 'Intermediate Level 5',
    },
    {
        avatar: '/images/matching/4.png',
        rate: 6,
        name: 'Tobias Ribba',
        location: 'Helsingburg',
        matching: 70,
        level: 'Intermediate Level 5',
    },
    {
        avatar: '/images/matching/5.png',
        rate: 6,
        name: 'Tobias Ribba',
        location: 'Helsingburg',
        matching: 70,
        level: 'Intermediate Level 5',
    },
    {
        avatar: '/images/matching/6.png',
        rate: 6,
        name: 'Tobias Ribba',
        location: 'Helsingburg',
        matching: 70,
        level: 'Intermediate Level 5',
    },
    {
        avatar: '/images/matching/7.png',
        rate: 6,
        name: 'Tobias Ribba',
        location: 'Helsingburg',
        matching: 70,
        level: 'Intermediate Level 5',
    },
    {
        avatar: '/images/matching/8.png',
        rate: 6,
        name: 'Tobias Ribba',
        location: 'Helsingburg',
        matching: 70,
        level: 'Intermediate Level 5',
    },
]
const countries = [
    {
        label: "Norway",
        value: "nr",
    },
    {
        label: "United States",
        value: "us",
    },
    {
        label: "Canada",
        value: "ca",
    },
]
const municipalties = [
    {
        label: "Norway",
        value: "nr",
    },
    {
        label: "United States",
        value: "us",
    },
    {
        label: "Canada",
        value: "ca",
    },
]

const MatchingCard = ({avatar, name, location, rate, matching, level}) => (
    <div className='flex bg-dark space-x-[2.5rem] px-[3rem] py-[2.5rem] text-white items-center'>
        <Avatar size='md' src={avatar} alt='Venue' className='w-[6rem] h-[6rem] rounded-full'></Avatar>
        <div className='flex flex-col flex-grow space-y-2'>
            <div className='flex space-x-5'>
                <span className='rounded-md bg-green text-black px-[0.5rem] py-[0.2rem] text-[0.75rem]'>{rate.toFixed(1)}</span>
                <span className='text-[#F4F3F4] items-center'>{name}</span>
            </div>
            <span className='flex space-x-2 items-center'>
                <LocationIcon/>
                <span>{location}</span>
            </span>
            <Progress.Line percent={matching} showInfo={false} className='px-0' />
            <span className='0.875rem'>{name.split(' ')[0]} Matches your profile {matching}%</span>
        </div>
        <span className='flex flex-grow justify-center'>Plays Padel at {level}</span>
        <Button className='flex rounded-xl bg-green text-black w-[12rem] h-[3rem] px-[1.5rem] py-[0.75rem] items-center justify-center space-x-2 text-[1.5rem]'>
            <Link href={'#'}>Make a team</Link>
            <CreditCardPlusIcon />
        </Button>
    </div>
)
const SearchSection = ({searchValues, setSearchValues, onSearch}) => {
    return (
        <Form
            className='flex space-x-[1.875rem] justify-center !h-[3.75rem]'
            onChange={setSearchValues} formValue={searchValues}
        >
            <Form.Group controlId="country">
                <SelectPicker size='lg' name="country" placeholder='All Countries' data={countries}
                    className='flex items-center text-black bg-white w-[12.75rem]'
                />
            </Form.Group>
            <Form.Group controlId="municipalty">
                <SelectPicker size='lg' name="municipalty" placeholder='All Municipalties' data={municipalties}
                    className='flex items-center text-black bg-white w-[18.75rem]'
                />
            </Form.Group>
            <Button
                className='flex bg-green py-[1.115rem] px-[2.25rem] text-[black] items-center space-x-1 w-[10rem]'
                onClick={onSearch}
            >
                <span>Search</span>
                <SearchIcon />
            </Button>
        </Form>
    )
}
const Matchings = ({ matchings }) => {
    return (
        <div className='flex flex-col space-y-[2.5rem]'>
            {matchings.map((match, i) => (
                <MatchingCard
                    {...match}
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