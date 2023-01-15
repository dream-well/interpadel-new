import Link from "next/link";
import { Button, DatePicker } from 'rsuite';
import cn from 'classnames'
import { useAppSelector } from "store/hook";
import DropDownMenu from './DropDownMenu';
import { Menus } from "./Menus";
import LanguagePicker from "./LanguagePicker";
import NavSearch from "./NavSearch";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setDate } from "store/slices/appSlice";
import EmailIcon from '@rsuite/icons/Email';
import SpeakerIcon from '@rsuite/icons/Speaker';
import { FaBell } from 'react-icons/fa'

export default function Header({banner, className = ''}) {
    return (
        <div className={cn('flex flex-col px-[8.5rem] bg-dark text-white relative z-10', banner ? 'bg-transparent': 'border-b border-[rgba(255,255,255,0.2)]', className)}>
            <div className='flex w-full justify-between h-[5rem]'>
                <Menus />
                <RightSide />
            </div>
            
        </div>
    )
}


const RightSide = () => {
    const { _id, firstname, lastname, image } = useAppSelector(state => state.auth);
    const router = useRouter();
    const date = useAppSelector(state => state.app.date);
    const dispatch = useDispatch();

    return (
        <div className='flex items-center'>
            {
                router.pathname == '/bookings' &&   
                <DatePicker
                    className='mr-4'
                    appearance='subtle'
                    format="yyyy-MM-dd"
                    placeholder='Select date'
                    value={date}
                    onChange={date => dispatch(setDate(date))}
                    cleanable={false}
                />
            }
            <NavSearch />
            <LanguagePicker />
            {
                _id ?
                <div className='flex items-center space-x-2'>
                    <Link href='/messages' className={router.pathname == '/messages' && 'text-green'}>
                        <EmailIcon className='cursor-pointer text-xl mr-4' />
                    </Link>
                    <FaBell className='cursor-pointer text-xl' />
                    <DropDownMenu name={firstname} image={image} />
                </div>
                :
                <div className='flex items-center'>
                    <Link href='/auth/login' className='ml-[2.5rem]'>Log in</Link>
                    <Button appearance="ghost" className='ml-[2.5rem] h-[3.5rem] w-[7.5rem] !border-green !text-green'>
                        <Link href='/auth/signup'>Sign Up</Link>
                    </Button>
                </div>
            }
        </div>
    )
}
