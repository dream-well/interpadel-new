import { fetcher } from "utils/helpers";
import { Button, DatePicker, Modal, Placeholder, Radio, RadioGroup, SelectPicker, Tooltip } from "rsuite";
import useSWR from "swr";
import { useRouter } from "next/router";
import moment from "moment";
import React, { useEffect, useState } from "react";
import TimeIcon from '@rsuite/icons/Time';
import styles from './Center.module.scss';
import cn from 'classnames';
import axios from "axios";
import Image from 'components/Image';
import Loader from "components/Loader";
import useApi from "hooks/useApi";
import Link from "next/link";
import PageNextIcon from '@rsuite/icons/PageNext';
import PagePreviousIcon from '@rsuite/icons/PagePrevious';
import SpinnerIcon from '@rsuite/icons/legacy/Spinner';
import { CircleLoader } from "react-spinners";

// moment.tz.setDefault('CET');

export default function Center() {
  
  const router = useRouter();
  const { centerId, payment_intent_client_secret, redirect_status } = router.query;
  const [date, setDate] = useState(null);
  const { data: center, loading: center_loading } = useApi(centerId ? `/api/centers/${centerId}` : null);
  const { data: reservations, mutate: refreshReservations, loading } = useApi(centerId && date ? `/api/reservations/${centerId}` : null, date && {date: date.toJSON()});

  const [calendarOpen, setCalendarOpen] = useState(false);

  useEffect(() => {
    if(!date) return;
    if(!router.query.centerId) return;
    const query = {
      ...router.query, // list all the queries here
      date: moment(date).format('yyyy-MM-DD'),
    };
    router.replace(
      {
        pathname: `/centers/[centerId]/[date]`,
        query,
      },
      undefined,
      {
        shallow: true
      }
    );
  }, [date])
  
  useEffect(() => {
    if(router.query.date) {
      if(router.query.date == 'today')
        setDate(moment(new Date).startOf('day').toDate());
      else  
        setDate(moment(router.query.date).startOf('day').toDate());
    }
  }, [router.query.date]);

  useEffect(() => {
    if(payment_intent_client_secret) {
      axios.put(`/api/bookings`, {
        clientSecret: payment_intent_client_secret,
        status: redirect_status
      }).then(data => {
        refreshReservations();
      });
    }
  }, [payment_intent_client_secret, redirect_status]);

  if(!center || center_loading)
    return <Loader />
  // useEffect(() => {
  //   setDate(moment(date).startOf('day').toDate());
  // }, [date])

  let closeAt = moment.duration(center?.closeAt).hours();
  let openAt = moment.duration(center?.openAt).hours();
  if(center?.closeAt == '24:00:00') closeAt = 24;
  const hours = closeAt - openAt;

  const setNewDate = (date) => {
    const newDate = moment(date);
    if(newDate < moment().startOf('day'))
      return;
    setDate(newDate.toDate());
  }

  return (
    <div className='relative bg-cover bg-center bg-dark'>
      <Image className='w-full h-full !absolute blur-sm' src={center?.image}/>
      <div className='py-[4rem] px-[6rem] flex flex-col justify-center w-full flex flex-col bg-white/10 backdrop-blur'>
        <div className='rounded-t-[1.5rem] w-full bg-green h-[4rem] flex items-center justify-center'>
          <span className='text-[2rem] font-bold saira text-dark'>{center?.name}</span>
        </div>
        <div className='w-full bg-dark rounded-b-[1.5rem] pb-[3.5rem]'>
          <div className='h-[5rem] p-6 justify-center relative w-full flex text-white items-center'>
            <div className='absolute left-1/2 -translate-x-1/2 text-[1.5rem] cursor-pointer space-x-4 select-none'>
              <PagePreviousIcon onClick={() => setNewDate(moment(date).subtract(1, 'day').toDate())} />
              <span onClick={() => setCalendarOpen(true)}>{moment(date).format('dddd D MMMM')}</span>
              <PageNextIcon onClick={() => setDate(moment(date).add(1, 'day').toDate())} />
            </div>
            <DatePicker placement='bottom' cleanable={false} value={date} onChange={(date) => { setNewDate(date); setCalendarOpen(false) }} format='yyyy-MM-dd' className='invisible cursor-pointer' open={calendarOpen} onOk={() => setCalendarOpen(false)}/>
            <Link href={`https://www.google.com/maps/search/${center.name.replace(' ', '+')}`} 
              target='_blank' 
              className='flex items-center absolute right-8'>
              <Image src='/images/icons/location.svg' className='h-5' />
              <span className='ml-2'>{center?.city}</span>
            </Link>
          </div>
          <div className='px-6 text-light'>
            <SlotTable openAt={openAt} hours={hours} courts={center?.courts} date={date} loading={loading} reservations={reservations} refreshReservations={refreshReservations}/>
            <div className='flex justify-end items-center text-sm mt-6 space-x-4'>
              <div className='flex items-center'>
                <div className='bg-dark border rounded-[0.125rem] w-[0.8rem] h-[0.8rem] mr-1'></div>
                Available
              </div>
              <div className='flex items-center'>
                <div className='bg-grey rounded-[0.125rem] w-[0.8rem] h-[0.8rem] mr-1'></div>
                Not Available
              </div>
              <div className='flex items-center'>
                <div className='bg-green rounded-[0.125rem] w-[0.8rem] h-[0.8rem] mr-1'></div>
                Your Booking
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SlotTable({ openAt, hours = 0, courts = [], date, reservations={}, refreshReservations, loading }) {
  const [open, setOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(0);
  const [court, setCourt] = useState<any>({});
  const [startAt, setStartAt] = useState();

  const getReservationStatus = (court, offset) => {
    if(!reservations[court._id]) return 0;
    return reservations[court._id][offset];
  }  
  let current_hour = -1;
  const diff = moment(date).startOf('day').diff(moment().startOf('day'), 'second');
  if(diff == 0) {
    current_hour = moment().hour();
  }
  else if(diff < 0)
  {
    current_hour = 24;
  }
  const hour_array = (new Array(hours)).fill(0).map((_, i) => i + openAt);

  const onSlotClick = (status, hour) => {
    if(status == 2 && hour > current_hour) {
      setDetailOpen(status);
      return;
    }
    if(hour > current_hour && status == 0) setOpen(true)
  };
  // alert(openAt);
  return (
    <div className='relative'>
      <div className='absolute left-1/2 top-1/2 z-10'>
        { loading && <CircleLoader color="#C2FF00" speedMultiplier={2} />}
      </div>
      <table className='w-full saira table-fixed break-words'>
        <tbody>
          <tr>
            <td className='text-center py-2 w-[7.5rem]'></td>
            {
                
              hour_array.map((hour) => (
                <td key={hour} className={cn(' text-center py-2', (hour) == startAt && 'bg-grey')}>{hour > 12 ? hour - 12 : hour} {hour >= 12 ? 'PM' : 'AM'}</td>
              ))
            }
          </tr>
          {
          courts.map((_court, key) => (
            <tr key={key}>
                <td key={key} className={cn('text-center px-2 h-[3.75rem]', court._id == _court._id && 'bg-grey')}>
                    { _court.name }
                </td>
              {
              hour_array.map((hour, i) => {
                const status = getReservationStatus(_court, i);
                const hover = (startAt == hour && court._id == _court._id);
                const className = cn('relative cursor-pointer border py-2 text-center h-12', 
                  hover && ( open ? 'bg-green' : 'bg-grey-light'), 
                  (status != 1 && status != 0) && '!bg-green', status == 1 && '!bg-grey',
                  status > 0 && hover && '!bg-opacity-50',
                  hour <= current_hour && '!bg-grey-dark',
                  current_hour == hour && 'border-r-2 border-r-[#a2f917]'
                  );
                return (
                <td key={i} 
                  className={className}
                  onMouseEnter={() => { setCourt(_court), setStartAt(openAt + i)}}
                  onClick={() => onSlotClick(status, hour)}
                >
                  <span className={hour > current_hour && 'hidden'}>X</span>
                  <div className={cn('absolute select-none bottom-[4rem] w-max left-1/2 -translate-x-1/2 bg-white flex flex-col text-md text-black rounded-[0.5rem] px-2', (!hover || (status == 0 && hour > current_hour)) && 'hidden')}>
                    <span className='text-black font-bold'>{ hour <= current_hour ? 'Time Passed' : 'Booked' }</span>
                    <span className='text-black'>{court.name}</span>
                    <span className='text-black'>{openAt + i}:00 - {openAt + i + 1}:00</span>
                  </div>
                </td>
                );
              })
              }   
            </tr>
          ))
          }
        </tbody>
      </table>
      <DurationSelectDialog open={open} setOpen={setOpen} court={court} startAt={startAt} date={date}/>
      <DetailDialog bookingId={detailOpen} setOpen={setDetailOpen} court={court} startAt={startAt} date={date} refreshReservations={refreshReservations}/>
    </div>
  )
}

function DurationSelectDialog({ open, setOpen, court, startAt, date}) {
  const [duration, setDuration] = useState(60);
  const router = useRouter();
  const gotoPayment = () => {
    const searchParams = new URLSearchParams();
    const startDate = moment(date).startOf('day');
    startDate.add(startAt, 'h');
    searchParams.append('court', court._id);
    searchParams.append('startAt', startDate.toJSON());
    searchParams.append('duration', duration+'');
    router.push('/payment?' + searchParams.toString());
  }
  return (
    <Modal open={open} onClose={() => setOpen(false)} size='xs' dialogClassName={styles.durationSelector}>
      <Modal.Header as={() => (
        <div className='w-full flex justify-between text-white'>
            <span>{court.name}</span>
            <span className='flex items-center'>
              <TimeIcon className='text-[1.2rem] mr-1'/>
              {startAt}:00
            </span>
        </div>
      )}/>
      <Modal.Body className='space-y-5'>
        {
          durations.map((_duration, key) => 
            <DurationSelector key={key} price={court.price} duration={_duration} setValue={setDuration} value={duration} />
          )
        }
        <Button color='green' className='bg-green w-full text-dark' onClick={gotoPayment}>Continue {moment.duration(duration, 'm').asHours() * court.price + 40}-kr.</Button>
      </Modal.Body>
    </Modal>
  )
}

function DurationSelector({ value, setValue, duration, price }) {
  const m_duration = moment.duration(duration, 'minutes');
  return (
    <button 
      className={cn('w-full bg-grey-light h-[2.8rem] rounded-[0.75rem] text-white flex items-center justify-between px-4', duration == value && 'opacity-50')}
      onClick={() => setValue(duration)}
    >
      <span>{m_duration.hours()}h {m_duration.minutes()}min</span>
      <span>{duration * price / 60}-kr.</span>
    </button> 
  )
}

const durations = [60,120,180];



const data = ['Eugenia', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  item => ({ label: item, value: item })
);

function PlayerSelector({ value, readOnly = false }) {
const [players, setPlayers] = React.useState([]);

const renderMenu = menu => {
  if (players.length === 0) {
    return (
      <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
        <SpinnerIcon spin /> Loading...
      </p>
    );
  }
  return menu;
};

const updateData = () => {
  if (players.length === 0) {
    setPlayers(data);
  }
};

return (
  <SelectPicker
  readOnly={readOnly}
  data={players}
  value={value}
  style={{ width: '16rem' }}
  onOpen={updateData}
  onSearch={updateData}
  renderMenu={renderMenu}
/>
);
}

function DetailDialog({ bookingId, setOpen, court, startAt, date, refreshReservations}) {
const { data: bookingDetail, loading } = useApi(bookingId ? `/api/bookings/${bookingId}` : null);
const [players, setPlayers] = useState([]);
const router = useRouter();

useEffect(() => {
  if(!bookingDetail) return;
  setPlayers(bookingDetail.players);
}, [bookingDetail?.players]);

const cancelBooking = () => {
  axios.put(`/api/bookings/cancel/${bookingId}`).then((resp) => {
    console.log('cancel', resp);
    setOpen(false);
    refreshReservations();
  })
}
if(!bookingId || !bookingDetail) return;
const m_duration = moment.duration(bookingDetail.duration, 'minutes');
const duration_txt = `${m_duration.hours()}h ${m_duration.minutes()}min`;
return (
  <Modal open={bookingId != 0} onClose={() => setOpen(0)} size='sm' dialogClassName={styles.durationSelector}>
    <Modal.Header as={() => (
      <div className='w-full'>
          <div className='flex justify-between text-white text-md'>
            <span>Update booking</span>
            <span className='flex items-center'>
              {court.name}
            </span>
          </div>
          <div className='text-white text-2xl pt-2'>
            { moment(date).startOf('day').format('dddd (D MMMM)') }&nbsp;
            { moment(bookingDetail.startAt).format('h:mm A') } -&nbsp;
            { moment(bookingDetail.startAt).add(bookingDetail.duration, 'm').format('h:mm A') }
          </div>
      </div>
    )}/>
    <Modal.Body className='space-y-5'>
      <div className='flex p-4 bg-grey-dark justify-between'>
        <div className='flex'>
          <Image src={bookingDetail.user.image} className='w-[5rem] h-[5rem] bg-white border object-cover'/>
          <div className='flex flex-col'>
            <span className='text-white pl-4 text-lg font-bold'>{bookingDetail.user.firstname} {bookingDetail.user.lastname}</span>
            <span className='text-white pl-4 '>{bookingDetail.user.email}</span>
            <span className='text-white pl-4 '>{bookingDetail.user.phone}</span>
          </div>
        </div>
        <div className='flex flex-col text-white items-end'>
          <span className='font-bold pt-3'>Paid</span>
          <span className='font-bold text-lg pt-3'>{bookingDetail.price}</span>
        </div>
      </div>
      <div className='flex mt-2 p-4 bg-grey-dark justify-between text-white'>
        <div className='flex flex-col  w-full'>
          <span className='pb-2'>Players</span>
          <PlayerSelector value={'Martin'} readOnly={true} />
          {
            players.map((player, key) => (
              <PlayerSelector value={'Martin'} key={key} />
            ))
          }
        </div>
      </div>
      <div className='w-full flex space-x-4 justify-between'>
        <div className='flex space-x-4'>
          <Button color='green' className='bg-green text-dark' onClick={() => setOpen(false)}>Save</Button>
          <Button color='green' className='bg-red text-dark' onClick={cancelBooking}>Cancel</Button>
        </div>
        <div>
          <Button color='green' className='bg-green w-full text-dark' onClick={() => setOpen(false)}>Close</Button>
        </div>
      </div>
    </Modal.Body>
  </Modal>
)
}
