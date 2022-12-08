import LocationIcon from '@rsuite/icons/Location';
import { Input, Button, DatePicker } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
export default function Centers() {
    return (
        <div className='rs-theme-light'>
        <div className='flex space-x-[2rem]'>
            <Input placeholder='Find venue, city...'/>
            <DatePicker/>
            <Button appearance='primary' className='!bg-green !text-black'>Search <SearchIcon/></Button>
        </div>
        <div className="font-Saira text-[1.5rem] font-semibold my-[2rem]">
            18 found clubs, 12 with availability
        </div>
        <div className="flex flex-wrap">
            {
                data.map((item, key) => (
                    <div key={key} className="mr-[1.5rem] mb-[1.5rem] flex flex-col">
                        <img src="images/centers/01.png" />
                        <div className="bg-dark text-white flex flex-col p-[1rem] rounded-b-2xl">
                            <div className="font-Saira text-[1.75rem] font-semibold">Sanset Padel</div>
                            <div><LocationIcon/>&nbsp;Helsingborg</div>
                        </div>
                    </div>
                ))
            }
        </div>
        </div>
    );
}

const data = [
    {
        name: "Sanset Padel",
        location: "Helsingborg"
    },
    {
        name: "Sanset Padel",
        location: "Helsingborg"
    },
    {
        name: "Sanset Padel",
        location: "Helsingborg"
    },
    {
        name: "Sanset Padel",
        location: "Helsingborg"
    },
    {
        name: "Sanset Padel",
        location: "Helsingborg"
    },
    {
        name: "Sanset Padel",
        location: "Helsingborg"
    }, 
    {
        name: "Sanset Padel",
        location: "Helsingborg"
    },
    {
        name: "Sanset Padel",
        location: "Helsingborg"
    },
    {
        name: "Sanset Padel",
        location: "Helsingborg"
    }, 
];
