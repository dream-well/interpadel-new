import LocationIcon from "@rsuite/icons/Location";
import { Input, Button, DatePicker, SelectPicker, DateRangePicker } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import useSWR from "swr";
import axios from 'axios';
import { fetcher } from "utils/helpers";
import Link from 'next/link';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useAppSelector } from "store/hook";
import { useDispatch } from "react-redux";
import { updateFavorites } from "store/slices/authSlice";
import Image from 'components/Image';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import moment from "moment";
import useApi from "hooks/useApi";
import GoogleMapReact from 'google-map-react';


// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function Centers() {

  const dispatch = useDispatch();
  const [query, setQuery] = useState<any>({});
  const { data: centers } = useApi('/api/centers', query);
  const { favoriteCenters } = useAppSelector(state => state.auth);
  const [searchParams, setSearchParams] = useState<any>({});
  const router = useRouter();
  
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

  useEffect(() => {
    if(!router.query) return;
    // alert(JSON.stringify(router.query));
  }, [router.query]);

  const findCenters = () => {
    setQuery({ ...searchParams });
    router.replace(
      {
        pathname: `/centers`,
        query: {
          ...searchParams,
          ... (searchParams.date ? { date: moment(searchParams.date).format('yyyy-MM-DD') } : {}),
        },
      },
      undefined,
      {
        shallow: false
      }
    );
  }
  
  return (
    <div className='rs-theme-light mt-[-6rem] bg-grey-dark'>
      <Maps />
      <div className='px-[8.5rem] '>
        <SearchBar searchParams={searchParams} onChange={setSearchParams} onSearch={findCenters} />
        <CenterList favoriteCenters={favoriteCenters} centers={centers} onToggleFavorite={handleToggleFavorite}/>
      </div>
    </div>
  );
}

function Maps() {
  const defaultProps = {
    center: {
      lat: 59.950272862410756,
      lng: 10.880461887376
    },
    zoom: 11
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '32rem', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <div
          lat={59.950272862410756}
          lng={10.880461887376}
        >
          hello
        </div>
      </GoogleMapReact>
    </div>
  );
}

function SearchBar({searchParams, onChange, onSearch}) {
  return (
    <div className="z-10 flex mt-[-4rem] items-center space-x-4">
      <Input placeholder="Find venue, city..." className="w-[20rem] z-10" 
        value={searchParams.address} 
        onChange={v => onChange({...searchParams, address: v})}
        onPressEnter={onSearch}
      />
      <DatePicker 
        className="w-[12rem] rs-theme-light" 
        cleanable={true} 
        value={searchParams.date} 
        format="yyyy-MM-dd HH"
        onChange={v => onChange({ ...searchParams, date: v})} 
      />
      <div>
        <Button
          appearance="primary"
          className="!bg-green !text-black h-[2.5rem] w-[9rem]"
          onClick={onSearch}
        >
          Search <SearchIcon className="ml-2"/>
        </Button>
      </div>
    </div>
  );
}

function CenterList({centers = [], onToggleFavorite, favoriteCenters = []}) {
  return (
    <div className='mt-[4rem]'>
      {/* <div className="font-Saira text-[1.5rem] font-semibold mt-[3rem] mb-[2rem]">
        {centers.length} found clubs, {centers.length} with availability
      </div> */}
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
    <Link href={`/centers/${_id}/today`} className="mb-[1.5rem] flex flex-col px-4 w-1/3">
     <Image src={image} className='h-[20rem] object-center object-cover rounded-t-2xl'/>
      <div className="flex bg-dark text-white p-[1rem] rounded-b-2xl justify-between items-center">
        <div className="flex flex-col flex-grow min-w-[1rem]">
          <div className="saira text-[1.75rem] font-semibold min-w flex-shrink truncate">
            {name} 
          </div>
          <div className='flex items-center space-x-1'>
            <LocationIcon />
            <span>{city}</span>
          </div>
        </div>
        <div className='text-[2rem] ml-2'>
          {isFavorite && <AiFillHeart onClick={toggleFavorite} />}
          {!isFavorite && <AiOutlineHeart onClick={toggleFavorite} />}
        </div>
      </div>
    </Link>
  )
}
