import SearchIcon from '@rsuite/icons/Search';
import Avatar from 'components/Avatar';
import useApi from 'hooks/useApi';
import {  useState } from 'react';
import { Button, Input, InputGroup, List, useToaster } from 'rsuite'
import SendIcon from '@rsuite/icons/Send';
import axios from 'axios';
import { notification } from 'utils/helpers';
import cn from 'classnames';

export default function Messages() {
    
    const [currentUser, setCurrentUser] = useState({})
    const [query, setQuery] = useState('')

    const { data: users } = useApi('/api/chats/contacts', { query: query || '' })

    return (
        <div className='flex px-[8.5rem] bg-grey-dark'>
            <div className='flex flex-col w-1/4 border-r-2 p-[1rem]'>
                <SearchBox
                    query={query}
                    onSearch={setQuery}
                />
                <Users
                    users={users}
                    currentUser={currentUser}
                    onUserChange={setCurrentUser}
                />
                {users?.length === 0 && <span className='text-white'>No one in the contacts</span>}
            </div>
            <div className='w-full'>
                <MessagePanel
                    currentUser={currentUser}
                />
            </div>
        </div>
    )
}

const SearchBox = ({ query, onSearch }) => {

    const CustomInputGroupWidthButton = ({ value, onPressEnter, placeholder, ...props }) => {
        const [query, setQuery] = useState(value)

        return (
            <InputGroup {...props} inside className='mb-[1rem]'>
            <Input
                placeholder={placeholder} 
                onPressEnter={() => onPressEnter(query)} 
                onChange={setQuery} 
                value={query}
            />
            <InputGroup.Button onClick={() => onPressEnter(query)}>
                <SearchIcon />
            </InputGroup.Button>
            </InputGroup>
        )
    };

    return (
        <CustomInputGroupWidthButton 
            placeholder="Search players..."
            value={query}
            onPressEnter={onSearch}
        />
    )
}

const Users = ({users, currentUser, onUserChange, className=''}) => {

    const UserLisItem = ({ user, isSelected=false, onClick }) => {
        const name = user.firstname + ' ' + user.lastname;

        return (
            <List.Item 
                className={cn('flex p-[1rem] items-center', className, isSelected ? "bg-grey border-r-white border-r-[1rem]" : "")}
                onClick={() => onClick(user)}
            >
                <Avatar src={user.image} alt={name} className='w-[2rem] h-[2rem]' />
                <span className='pl-[1rem]'>{name}</span>
            </List.Item>
        )
    }

    return (
        <List className='rounded-[0.5rem] text-white'>
        {users?.map(user => (
            <UserLisItem 
                user={user}
                key={user._id}
                isSelected={currentUser._id === user._id}
                onClick={onUserChange}
            />
        ))}
        </List>
    )
}

const MessagePanel = ({ currentUser }) => {

    const { data: messages, mutate } = useApi(`/api/chats/${currentUser._id}`)
    const [message, setMessage] = useState('')

    const toaster = useToaster();

    const sendMessage = (evt) => {
        evt.preventDefault();
        if ( message.length === 0 ) return;

        axios.post(`/api/chats/${currentUser._id}`, { message })
        .then(data => {
            mutate();
            setMessage('')
        })
        .catch(err => {
            toaster.push(
                notification({
                    title: "Messages",
                    description: "Could not send messages due to some issues",
                    type: "error",
                }),
                { placement: 'topEnd', }
            )
        })
    }

    const InfoPanel = ({user}) => {
        
        const name = user.firstname + ' ' + user.lastname;

        const Info = ({detail, value}) => (
            <span>
                <span className='font-bold'>{detail}</span> : <span>{value}</span>
            </span>
        )
        
        return (
            <div className='flex flex-col border-b-2 p-[1rem] justify-center'>
                <div className='flex space-x-[1rem] items-center'>
                    <Avatar alt={name} src={user.image} className='w-[2rem] h-[2rem]' />
                    <span>{name}</span>
                </div>
                <div className='flex space-x-[2rem]'>
                    <Info detail='Email' value={user.email} />
                    <Info detail='Address' value={user.address} />
                </div>
            </div>
        )
    }

    const ChatElement = ( { chat, className='' } ) => {
        if (chat?.message === '')   return <></>
        return (
            <div className={cn('m-1 p-2 bg-grey rounded-[0.5rem] w-auto', chat?.to === currentUser?._id ? "text-right" : "text-left")}>
                {chat.message}
            </div>
        )
    }

    return (
        <div className='flex flex-col text-white'>
            {currentUser?._id && <InfoPanel user={currentUser} />}
            {messages?.length > 0 && (
                <div className='p-2'>
                    {messages.map((msg, index) => <ChatElement key={index} chat={msg} />)}
                </div>
            )}
            {messages?.length === 0 && (
                <span>No Messages with this player</span>
            )}
            <div className='flex space-x-2 p-3 border-t-2'>
                <Input 
                    as="textarea"
                    rows={3}
                    placeholder="Message..."
                    value={message}
                    onChange={setMessage}
                    className='w-grow align-bottom'
                    onClick={sendMessage}
                />
                <Button color="green" appearance="primary" onClick={sendMessage}>
                    <SendIcon /> Send
                </Button>
            </div>
        </div>
    )
}