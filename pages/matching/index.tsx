import { useEffect, useState } from 'react'
import cn from "classnames";
import { Button, Form, Input, Modal, Pagination, Progress, SelectPicker, toaster, useToaster } from 'rsuite'
import SearchIcon from '@rsuite/icons/Search';
import LocationIcon from '@rsuite/icons/Location';
import CreditCardPlusIcon from '@rsuite/icons/CreditCardPlus';
import Avatar from 'components/Avatar';
import useSWR from 'swr';
import { fetcher, notification } from 'utils/helpers';
import NoItems from 'components/NoItems';
import useApi from 'hooks/useApi';
import axios from 'axios';

const ROW_PER_PAGE = 3;

export default function Matching() {
    const [searchValues, setSearchValues] = useState({})
    const [activePage, setActivePage] = useState(1)
    const [open, setOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState(0)
    const [matchings, setMatchings] = useState([])

    const {data: matchingsData, error, mutate} = useSWR('/api/profile/matchings', fetcher);
    
    const toaster = useToaster();

    useEffect(() => {
        setMatchings(matchingsData?.slice((activePage-1) * ROW_PER_PAGE, activePage * ROW_PER_PAGE));
        if (matchingsData?.length <= (activePage-1) * ROW_PER_PAGE)
            setActivePage(1);
    }, [matchingsData])

    useEffect(() => {        
        setMatchings(matchingsData?.slice((activePage-1) * ROW_PER_PAGE, activePage * ROW_PER_PAGE));
    }, [activePage])
    
    const handleOpen = (_id) => {
        setCurrentUser(_id);
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleSearch = (evt) => {
        evt.preventDefault();
        console.log(searchValues);
    }

    return (
        <div className='px-[8.5rem] flex flex-col space-y-[3.5rem] py-[4.375rem] bg-grey-dark'>
            {/* <SearchSection
                searchValues={searchValues}
                setSearchValues={setSearchValues}
                onSearch={handleSearch}
            /> */}
            {matchingsData?.length > 0 && (
                <Matchings
                    matchings={matchings}
                    onOpenModal={handleOpen}
                />
            )}
            {matchingsData?.length > 0 && (
                <Paginator
                    activePage={activePage}
                    setActivePage={setActivePage}
                    rows={matchingsData?.length}
                />
            )}
            {matchingsData?.length === 0 && <NoItems className='text-white' href={'/profile/edit'} text='Complete your profile to see your matchings' />}
            <AddToTeamModal open={open} onClose={handleClose} user={currentUser} />
        </div>
    )
}

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

const MatchingCard = ({_id, image, firstname, lastname, address, matching = 45, level, onOpenModal}) => (
    <div className='flex bg-dark space-x-[2.5rem] px-[3rem] py-[2.5rem] text-white items-center rounded-[1rem] border border-grey'>
        <Avatar src={image} alt={`Player ${firstname}`}  className='w-[6rem] h-[6rem]' />
        <div className='flex flex-col flex-grow space-y-2'>
            <div className='flex space-x-2'>
                {/* <span className='rounded-md bg-green text-black px-[0.5rem] py-[0.2rem] text-[0.75rem]'>{rate.toFixed(1)}</span> */}
                <span className='text-[#F4F3F4] items-center text-xl saira font-bold'>{firstname + ' ' + lastname}</span>
            </div>
            <span className='flex space-x-2 items-center'>
                <LocationIcon/>
                <span>{address}</span>
            </span>
            <Progress.Line percent={matching} showInfo={false} className='px-0' />
            <span className='0.875rem'>{firstname} Matches your profile {matching}%</span>
        </div>
        <span className='flex flex-grow justify-center'>Plays Padel at {level}</span>
        <Button className='flex rounded-xl bg-green text-black w-[12rem] h-[3rem] px-[1.5rem] py-[0.75rem] items-center justify-center space-x-2 text-[1.5rem]'>
            <span onClick={() => onOpenModal(_id)}>Make a team</span>
            <CreditCardPlusIcon />
        </Button>
    </div>
)
const SearchSection = ({searchValues, setSearchValues, onSearch}) => {
    return (
        <Form
            layout='inline'
            className='flex justify-center items-center'
            onChange={setSearchValues} formValue={searchValues}
        >
            <Form.Group controlId="country">
                <SelectPicker name="country" placeholder='All Countries' data={countries}
                    className='w-[12.75rem]'
                />
            </Form.Group>
            <Form.Group controlId="municipalty">
                <SelectPicker name="municipalty" placeholder='All Municipalties' data={municipalties}
                    className='w-[18.75rem]'
                />
            </Form.Group>
            <Button
                className='flex bg-green py-[1.115rem] px-[2.25rem] text-[black] items-center space-x-1 h-[2.4rem]'
                onClick={onSearch}
            >
                <span>Search</span>
                <SearchIcon />
            </Button>
        </Form>
    )
}
const Matchings = ({ matchings, onOpenModal }) => {
    return (
        <div className='flex flex-col space-y-[2.5rem]'>
            {matchings?.map((match, i) => (
                <MatchingCard
                    {...match}
                    key={i}
                    onOpenModal={onOpenModal}
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

function AddToTeamModal({ open, user, onClose }) {

    const [showFooter, setShowFooter] = useState(false)
    const [newTeamName, setNewTeamName] = useState('New Team Name')
    const { data: teams, error, mutate } = useApi('/api/teams/myteams');
    
    const addNewTeam = () => {
        axios.post('/api/teams', { name: newTeamName })
        .then(data => {
            toaster.push(
                notification({
                    title: "Teams",
                    description: "Added a team successfully",
                    type: "success",
                }),
                { placement: 'topEnd', }
            )
            mutate();
        })
        .catch(error => {
            toaster.push(
                notification({
                    title: "Teams",
                    description: "Could not add a new team",
                    type: "error",
                }),
                { placement: 'topEnd', }
            )
        })
        
        setShowFooter(false)
    }

    const addMemberToTeam = (currentTeam) => {
        const team = teams?.filter(t => t._id === currentTeam)[0];
        axios.put(`/api/teams/${currentTeam}`, {
            ...team,
            members: [
                ...team.members,
                user
            ]
         })
        .then(data => {
            toaster.push(
                notification({
                    title: "Teams",
                    description: `Added to team <${team.name}> successfully`,
                    type: "success",
                }),
                { placement: 'topEnd', }
            )
            mutate();
        })
        .catch(error => {
            toaster.push(
                notification({
                    title: "Teams",
                    description: "Could not add a new team",
                    type: "error",
                }),
                { placement: 'topEnd', }
            )
        })
    }

    const removeMemberFromTeam = (currentTeam) => {
        const team = teams?.filter(t => t._id === currentTeam)[0];
        axios.put(`/api/teams/${currentTeam}`, {
            ...team,
            members: team.members.filter(member => member._id !== user)
         })
        .then(data => {
            toaster.push(
                notification({
                    title: "Members",
                    description: `Removed from <${team.name}> successfully`,
                    type: "success",
                }),
                { placement: 'topEnd', }
            )
            mutate();
        })
        .catch(error => {
            toaster.push(
                notification({
                    title: "Members",
                    description: `Could not remove from <${team.name}>`,
                    type: "error",
                }),
                { placement: 'topEnd', }
            )
        })
    }

    const TeamCard = ({_id, name, members}) => {
        const isJoined = members.filter(member => member._id === user).length > 0;
        
        return (
            <div 
                className={cn(
                    'flex px-[2rem] py-[1rem] text-white bg-dark rounded-xl justify-between', 
                    isJoined ? 'border-2 border-grey' : '',
                )}
            >
                <div className='flex flex-col'>
                    <span className='font-bold text-[1.25rem] saira'>{name}</span>
                    <span>{members.length} member(s)</span>
                </div>
                <div>
                    <Button 
                        onClick={() => (isJoined ? removeMemberFromTeam(_id) : addMemberToTeam(_id))}
                        appearance="primary"
                    >
                        {isJoined ? 'Remove from Team' : 'Add to team'}
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <Modal
            keyboard={false} open={open} onClose={onClose}
            className='p-[2.5rem]'
        >
            <Modal.Header>
                <Modal.Title>Add him to a team</Modal.Title>
            </Modal.Header>

            <Modal.Body className='flex flex-col space-y-[1rem]'>
                {teams?.map((team, index) => (
                    <TeamCard
                        {...team}
                        key={index}
                    />
                ))}
                <div className='flex justify-between space-x-4'>
                    {/* <Button 
                        onClick={addMemberToTeam}
                        appearance="primary"
                    >
                        Add to team
                    </Button> */}
                    <Button 
                        onClick={() => setShowFooter(true)}
                        appearance="ghost" 
                    >
                        Create a new Team
                    </Button>
                </div>
            </Modal.Body>
            {showFooter && <Modal.Footer className='flex flex-col space-y-4'>
                <hr />
                <Input value={newTeamName} onChange={setNewTeamName} />
                <div className='flex space-x-4'>
                    <Button onClick={() => addNewTeam()} appearance="primary" className='items-start'>
                        OK
                    </Button>
                    <Button onClick={() => setShowFooter(false)} appearance="ghost" className='items-end'>
                        Cancel
                    </Button>
                </div>
            </Modal.Footer>}
        </Modal>
    )
}
