import LocationIcon from "@rsuite/icons/Location";
import { Input, Button, DatePicker, InputPicker, Placeholder, SelectPicker } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import useSWR from "swr";
import { fetcher } from "utils/helpers";
import Link from 'next/link';

export default function Centers() {
  const { data: centers } = useSWR('/api/centers', fetcher);
  return (
    <div className="px-[8.5rem] rs-theme-light">
      <SearchBar />
      <CenterList centers={centers}/>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="flex mt-[6.25rem] justify-between items-center space-x-4">
      <SelectPicker
        placeholder="In / out condition"
        className="w-[20rem]"
        searchable={false}
        cleanable={false}
        data={[]}
      />
      <Input placeholder="Find venue, city..." className="w-[20rem] flex-grow" />
      <DatePicker className="w-[12rem]"/>
      <div>
        <Button
          appearance="primary"
          className="!bg-green !text-black h-[2.5rem] w-[9rem]"
        >
          Search <SearchIcon className="ml-2"/>
        </Button>
      </div>
    </div>
  );
}

function CenterList({centers = []}) {
  return (
    <div>
      <div className="font-Saira text-[1.5rem] font-semibold my-[2rem]">
        {centers.length} found clubs, {centers.length} with availability
      </div>
      <div className="flex flex-wrap w-full">
        {centers.map((center, key) => (
          <Center key={key} {...center} />
        ))}
      </div>
    </div>
  );
}

const Center = ({_id, name, image, city}) => (
  <Link href={`/centers/${_id}`} className="mb-[1.5rem] flex flex-col px-4 w-1/3">
    <img src={image} className='h-[20rem] object-center object-cover rounded-t-2xl'/>
    {/* <Placeholder.Graph active={true} className='h-[20rem]' /> */}
    <div className="bg-dark text-white flex flex-col p-[1rem] rounded-b-2xl">
      <div className="saira text-[1.75rem] font-semibold">
        {name} 
      </div>
      <div className='flex items-center space-x-1'>
        <LocationIcon />
        <span>{city}</span>
      </div>
    </div>
  </Link>
)
