import { Dropdown, SelectPicker, Whisper, Popover } from 'rsuite';
import { Badge } from 'rsuite';
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';
import UserBadgeIcon from '@rsuite/icons/UserBadge';
import CalendarIcon from '@rsuite/icons/Calendar';
import HelpOutlineIcon from '@rsuite/icons/HelpOutline';
import PublicOpinionIcon from '@rsuite/icons/PublicOpinion';
import GearIcon from '@rsuite/icons/Gear';
import ExitIcon from '@rsuite/icons/Exit';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { logout } from 'store/slices/authSlice';
import Avatar from 'components/Avatar';

export default function DropDownMenu({ name, image }) {
    return (
        <Whisper placement="bottomEnd" trigger="click" speaker={RenderMenu}>
            <div className='flex items-center rs-btn bg-transparent'>
                {name}
                <div className='relative flex'>
                    <Avatar src={image} className='ml-3 w-[2.5rem] h-[2.5rem]'/>
                    <Badge className='bg-green absolute right-0 bottom-1'/>
                </div>
                <ArrowDownLineIcon className='text-xl ml-1' />
            </div>
        </Whisper>
    )
}

const RenderMenu = ({ onClose, left, top, className }, ref) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const handleSelect = eventKey => {
      onClose();
      if(eventKey == '/logout') {
        dispatch(logout());
        router.replace('/home');
      } 
      else{
        router.push(eventKey);
      }
    };
    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu onSelect={handleSelect}>
            {
                dropDownMenu.map((menu, key) => (
                    <Dropdown.Item key={key} icon={menu.icon} eventKey={menu.href}>{menu.title}</Dropdown.Item>
                ))
            }
        </Dropdown.Menu>
      </Popover>
    );
  };

const dropDownMenu = [
    {
        title: 'My bookings',
        icon: <CalendarIcon/>,
        href: '/books'
    },
    {
        title: 'My profile',
        icon: <UserBadgeIcon/>,
        href: '/profile'
    },
    // {
    //     title: 'Help section',
    //     icon: <HelpOutlineIcon/>,
    //     href: '/help'
    // },
    {
        title: 'Favourite courts',
        icon: <PublicOpinionIcon/>,
        href: '/favorites'
    },
    // {
    //     title: 'Account preferences',
    //     icon: <GearIcon/>,
    //     href: '/preferences'
    // },
    {
        title: 'Log out',
        icon: <ExitIcon/>,
        href: '/logout'
    },
]