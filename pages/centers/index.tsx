import LocationIcon from "@rsuite/icons/Location";
import { Input, Button, DatePicker, SelectPicker, DateRangePicker, Tooltip, Whisper } from "rsuite";
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
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import useApi from "hooks/useApi";
import GoogleMapReact from 'google-map-react';
import cn from 'classnames';
import Loader from "components/Loader";

// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function Centers() {

  const dispatch = useDispatch();
  const query = useAppSelector(state => state.app.query);
  const { data: centers } = useApi('/api/centers', {address: query});
  const { favoriteCenters } = useAppSelector(state => state.auth);
  const [searchParams, setSearchParams] = useState<any>({});
  const router = useRouter();
  
  const addToFavorite = (_id) => axios.post(`/api/profile/favorite-centers/${_id}`)
  const removeFromFavorite = (_id) => axios.delete(`/api/profile/favorite-centers/${_id}`)
  
  const handleToggleFavorite = (_id) => {
    const currentStatus = favoriteCenters.indexOf(_id) !== -1;
    (currentStatus ? removeFromFavorite(_id) : addToFavorite(_id))
    .then((data: any) => {
      dispatch(updateFavorites(data.map(d => d._id)))
    })
    .catch(err => {
    })
  }

  useEffect(() => {
    if(!router.query) return;
    setSearchParams({ ...router.query });
    // setQuery({ ...router.query });
  }, [router.query]);

  const findCenters = () => {
    router.push({
      pathname: '/centers',
      query: {
      ...searchParams,
      ... (searchParams.date ? { date: moment(searchParams.date).format('yyyy-MM-DD') } : {}),
    }}, undefined, { shallow: true });
    
  }

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(loading && centers) {
      setLoading(false);
    }
  }, [centers]);

  if(loading) {
      return <Loader />
  }
  
  return (
    <div className='rs-theme-light bg-grey-dark'>   {/* mt-[-6rem]  */}
      {/* <Maps centers={centers} onCenterClick={(center) => setSearchParams({ ...searchParams, address: center.name})}/> */}
      <div className='px-[8.5rem] '>
        {/* <SearchBar searchParams={searchParams} onChange={setSearchParams} onSearch={findCenters} /> */}
        <CenterList favoriteCenters={favoriteCenters} centers={centers} onToggleFavorite={handleToggleFavorite}/>
      </div>
      <Maps centers={centers} onCenterClick={(center) => setSearchParams({ ...searchParams, address: center.name})}/>
    </div>
  );
}

const MapPin = ({ lat, lng, text, onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <div className='cursor-pointer relative' onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <Image src='/images/centers/padel.png' className='w-[2rem]'/>
      <Tooltip visible={hover} className={cn('absolute left-[2rem] bottom-0', hover && '!opacity-70 bg-green !text-[#1a424a] font-bold')}>
        <span className='text-black text-md'>{text}</span>
        <br/>
        <Link href={`https://www.google.com/maps/search/${text.replace(' ', '+')}`} target='_blank' className='font-bold text-sm'>GoogleMap</Link>
      </Tooltip>
    </div>
)};

function Maps({centers=[], onCenterClick}) {
  const defaultProps = {
    center: {
      lat: 59.950272862410756,
      lng: 10.880461887376
    },
    zoom: 6
  };

  const ref = useRef<GoogleMapReact>();

  useEffect(() => {
    if(!ref.current) return;
    const fullscreenBtn = document.querySelector(".gm-control-active.gm-fullscreen-control");
    if(fullscreenBtn) {
      fullscreenBtn.setAttribute('hidden', 'hidden');
    }
  }, [ref]);

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '32rem', width: '100%' }}>
      <GoogleMapReact
        ref={ref}
        bootstrapURLKeys={{key:''}}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={{gestureHandling: 'greedy', fullscreenControlOptions: {position:9}}}
      >
        {
          centers.map((center, key) => 
            <MapPin
              key={key}
              lat={center.latitude}
              lng={center.longitude}
              text={center.name}
              onClick={() => onCenterClick(center)}
            />
          )
        }
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
        className="w-[10rem] rs-theme-light" 
        cleanable={true} 
        value={searchParams.date} 
        format="yyyy-MM-dd"
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
    <Link href={`/centers/${_id}/today`} className="mb-[1.5r3em] flex flex-col px-4 w-1/3">
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
          {isFavorite && <AiFillHeart onClick={toggleFavorite} color={'#ff1122'} />}
          {!isFavorite && <AiOutlineHeart onClick={toggleFavorite} />}
        </div>
      </div>
    </Link>
  )
}
