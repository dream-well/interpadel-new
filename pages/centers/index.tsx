import LocationIcon from "@rsuite/icons/Location";
import { Input, Button, DatePicker, SelectPicker } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import useSWR from "swr";
import { axios, fetcher } from "utils/helpers";
import Link from 'next/link';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useAppSelector } from "store/hook";
import { useDispatch } from "react-redux";
import { updateFavorites } from "store/slices/authSlice";

export default function Centers() {

  const dispatch = useDispatch();
  const { data: centers } = useSWR('/api/centers', fetcher);
  const { favoriteCenters } = useAppSelector(state => state.auth);

  const addToFavorite = (_id) => axios.post(`/api/profile/favorite-centers/${_id}`)
  const removeFromFavorite = (_id) => axios.delete(`/api/profile/favorite-centers/${_id}`)

  const handleToggleFavorite = (_id) => {
    const currentStatus = favoriteCenters.indexOf(_id) !== -1;
    (currentStatus ? removeFromFavorite(_id) : addToFavorite(_id))
    .then(data => {
      dispatch(updateFavorites(data))
    })
    .catch(err => {
    })
  }

  return (
    <div className="px-[8.5rem] rs-theme-light">
      <SearchBar />
      <CenterList favoriteCenters={favoriteCenters} centers={centers} onToggleFavorite={handleToggleFavorite}/>
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

function CenterList({centers = [], onToggleFavorite, favoriteCenters = []}) {
  return (
    <div>
      <div className="font-Saira text-[1.5rem] font-semibold my-[2rem]">
        {centers.length} found clubs, {centers.length} with availability
      </div>
      <div className="flex flex-wrap w-full">
        {centers.map((center, key) => (
          <Center key={key} {...center} onToggleFavorite={onToggleFavorite} isFavorite={favoriteCenters.indexOf(center._id) !== -1 } />
        ))}
      </div>
    </div>
  );
}

const Center = ({_id, name, image, city, isFavorite=false, onToggleFavorite}) => {
  const toggleFavorite = (evt) => {
    evt.preventDefault();
    onToggleFavorite(_id);
  }
  return (
    <Link href={`/centers/${_id}`} className="mb-[1.5rem] flex flex-col px-4 w-1/3">
      <img src={image} className='h-[20rem] object-center object-cover rounded-t-2xl'/>
      <div className="flex bg-dark text-white p-[1rem] rounded-b-2xl justify-between items-center">
        <div className="flex flex-col">
          <div className="saira text-[1.75rem] font-semibold">
            {name} 
          </div>
          <div className='flex items-center space-x-1'>
            <LocationIcon />
            <span>{city}</span>
          </div>
        </div>
        <div className='text-[2rem]'>
          {isFavorite && <AiFillHeart onClick={toggleFavorite} />}
          {!isFavorite && <AiOutlineHeart onClick={toggleFavorite} />}
        </div>
      </div>
    </Link>
  )
}
