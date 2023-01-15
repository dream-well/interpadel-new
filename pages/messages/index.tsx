import SearchIcon from '@rsuite/icons/Search';
import Avatar from 'components/Avatar';
import useApi from 'hooks/useApi';
import {  useEffect, useState } from 'react';
import { Button, Input, InputGroup, List, useToaster } from 'rsuite'
import SendIcon from '@rsuite/icons/Send';
import axios from 'axios';
import { notification } from 'utils/helpers';
import cn from 'classnames';
import moment from 'moment';

export default function Messages() {
    
    const [currentUser, setCurrentUser] = useState<any>({})
    const [query, setQuery] = useState('')

    const { data: users } = useApi('/api/chats/contacts', { query: query || '' })
    useEffect(() => {
        if(users && !currentUser._id) {
            setCurrentUser(users[0]);
        }
    }, [users])
    return (
        <div className='flex px-[16em] bg-grey-dark py-9'>
            <div className='flex flex-col w-1/4 p-[1rem]'>
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
                className={cn('flex p-[1rem] items-center cursor-pointer select-none', className, isSelected ? "bg-grey" : "")}
                onClick={() => onClick(user)}
            >
                <Avatar src={user.image} alt={name} className='w-[2rem] h-[2rem]' />
                <div className='flex flex-col ml-4'>
                    <span className=''>{name}</span>
                    <span className='text-xs'>{user.email}</span>
                </div>
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

    const { data, mutate } = useApi(`/api/chats/${currentUser._id}`)
    const messages = data ? [...data].reverse() : [];
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
        
        const name = user ? user.firstname + ' ' + user.lastname : '';

        const Info = ({detail, value}) => (
            <span>
                <span className='font-bold'>{detail}</span> : <span>{value}</span>
            </span>
        )
        
        return (
            <div className='flex flex-col border-b-2 border-grey p-[1rem] justify-center'>
                {
                    user.image ? 
                    <div>
                        <div className='flex space-x-[1rem] items-center'>
                            <Avatar alt={name} src={user?.image} className='w-[2rem] h-[2rem]' />
                            <span>{name}</span>
                        </div>
                        <div className='flex space-x-[2rem]'>
                            <Info detail='Email' value={user?.email} />
                            <Info detail='Address' value={user?.address} />
                        </div>
                    </div> :
                    <div className='pt-6 font-bold'> Messages </div>
                }
            </div>
        )
    }

    const ChatElement = ( { chat, className='' } ) => {
        const time = moment(chat.createdAt);
        if (chat?.message === '')   return <></>
        return (
            <div className={cn('flex m-1 w-min min-w-[16rem] items-center', chat?.to === currentUser?._id && "ml-auto flex-row-reverse")}>
                {/* { chat?.to !== currentUser?._id &&<img src={`/api/users/avatar/${chat?.from}`} className='w-[4rem] h-[4rem] rounded-full'/>} */}
                <div className='flex flex-col mx-2 bg-grey rounded-[0.5rem] p-2'>
                    <i className='text-xs'>{time.format("yyyy-MM-DD hh:mm:ss A")}</i>
                    <div >{chat.message}</div>
                </div>
            </div>
        )
    }

    return (
        <div className='flex flex-col text-white'>
            <InfoPanel user={currentUser} />
            <div className='p-2 justify-start flex flex-col-reverse overflow-auto h-[30rem] h-pull'>
                {messages?.map((msg, index) => <ChatElement key={index} chat={msg} />)}
            </div>
            <div className='flex space-x-2 p-3'>
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