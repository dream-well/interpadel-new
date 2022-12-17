import SearchIcon from '@rsuite/icons/Search';
import cn from 'classnames';
import Avatar from 'components/Avatar';
import useApi from 'hooks/useApi';
import { useState } from 'react';
import { Input, InputGroup, List } from 'rsuite'

export default function Messages() {
    const { data: users } = useApi('/api/users')
    
    const [currentUser, setCurrentUser] = useState({})
    const [query, setQuery] = useState('')

    const handleSearch = () => {
        alert(query)
    }

    return (
        <div className='flex px-[8.5rem]'>
            <div className='flex flex-col w-1/4 border-r-2 p-[1rem]'>
                <SearchBox
                    query={query}
                    onChange={setQuery}
                    onSearch={handleSearch}
                />
                <Users
                    users={users}
                    currentUser={currentUser}
                    onUserChange={setCurrentUser}
                />
            </div>
            <div className='w-full'>
                <MessagePanel
                    currentUser={currentUser}
                />
            </div>
        </div>
    )
}

const SearchBox = ({ query, onChange, onSearch}) => {

    const CustomInputGroupWidthButton = ({ value, onChange, onPressEnter, placeholder, ...props }) => (
        <InputGroup {...props} inside className='mb-[1rem]'>
          <Input placeholder={placeholder} onPressEnter={onPressEnter} onChange={onChange} value={value} />
          <InputGroup.Button onClick={onPressEnter}>
            <SearchIcon />
          </InputGroup.Button>
        </InputGroup>
    );

    return (
        <CustomInputGroupWidthButton 
            placeholder="Search players..."
            onPressEnter={onSearch}
            value={query}
            onChange={onChange}
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

    const InfoPanel = ({user}) => {
        
        const name = user.firstname + ' ' + user.lastname;

        const Info = ({detail, value}) => (
            <span>
                <span className='font-bold'>{detail}</span> :
                <span>{value}</span>
            </span>
        )
        
        return (
            <div className='flex flex-col border-b-2 p-[1rem] justify-center'>
                <div className='flex space-x-[1rem] items-center'>
                    <Avatar alt={name} src={user.image} className='w-[2rem] h-[2rem]' />
                    <span>{name}</span>
                </div>
                <div className='flex space-x-[2rem]'>
                    <Info detail='Level' value={user.level} />
                    <Info detail='Email' value={user.email} />
                </div>
            </div>
        )
    }

    return (
        <div className='flex flex-col'>
            {currentUser?._id && <InfoPanel user={currentUser} />}
        </div>
    )
}