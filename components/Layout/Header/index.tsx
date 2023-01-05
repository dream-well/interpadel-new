import Link from "next/link";
import { Button } from 'rsuite';
import cn from 'classnames'
import { useAppSelector } from "store/hook";
import DropDownMenu from './DropDownMenu';
import { Menus } from "./Menus";
import LanguagePicker from "./LanguagePicker";
import NavSearch from "./NavSearch";

export default function Header({banner, className = ''}) {
    return (
        <div className={cn('flex flex-col px-[8.5rem] bg-dark text-white relative z-10', banner ? 'bg-transparent': 'border-b border-[rgba(255,255,255,0.2)]', className)}>
            <div className='flex w-full justify-between h-[6rem]'>
                <Menus />
                <RightSide />
            </div>
            
        </div>
    )
}


const RightSide = () => {
    const { firstname, lastname, image } = useAppSelector(state => state.auth);
    return (
        <div className='flex items-center'>
            <NavSearch />
            <LanguagePicker />
            {
                firstname ?
                <DropDownMenu name={firstname + ' ' + lastname} image={image} />
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
