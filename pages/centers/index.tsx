import LocationIcon from "@rsuite/icons/Location";
import { Input, Button, DatePicker, InputPicker } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import useSWR from "swr";
import { fetcher } from "utils/helpers";
import Link from 'next/link';

export default function Centers() {
  const { data: centers } = useSWR('/api/centers', fetcher);
  return (
    <div className="rs-theme-light">
      <SearchBar />
      <CenterList centers={centers}/>
    </div>
  );
}

function SearchBar() {
  return (
    <div>
      <div className="flex mt-[6.25rem] justify-between">
        <InputPicker
          placeholder="In/out condition"
          className="border-none w-[20rem]"
          data={[]}
        />
        <Input placeholder="Find venue, city..." className="w-[20rem]" />
        <DatePicker className="w-[15rem]" size="lg" />
        <div>
          <Button
            appearance="primary"
            className="!bg-green !text-black h-[2rem] w-[9rem]"
          >
            Search <SearchIcon />
          </Button>
        </div>
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
          // <Link key={key} href={`/centers/${center._id}`}>
            <div className="mb-[1.5rem] flex flex-col px-4 w-1/3">
              <img src={center.image} className='h-[20rem] object-center object-cover'/>
              <div className="bg-dark text-white flex flex-col p-[1rem] rounded-b-2xl">
                <div className="saira text-[1.75rem] font-semibold">
                  {center.name}
                </div>
                <div>
                  <LocationIcon />
                  Helsingborg
                </div>
              </div>
            </div>
          // </Link>
        ))}
      </div>
    </div>
  );
}
