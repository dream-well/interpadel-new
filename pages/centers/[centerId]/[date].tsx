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

// moment.tz.setDefault('CET');

export default function Center() {
  
  const router = useRouter();
  const { centerId, payment_intent_client_secret, redirect_status } = router.query;
  const [date, setDate] = useState(null);
  const { data: center } = useApi(centerId ? `/api/centers/${centerId}` : null);
  const { data: reservations, mutate: refreshReservations } = useApi(centerId && date ? `/api/reservations/${centerId}` : null, date && {date: date.toJSON()});

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

  if(!center)
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
    <div className='bg-cover bg-center' style={{backgroundImage: `url(${center?.image})`}}>
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
            <SlotTable openAt={openAt} hours={hours} courts={center?.courts} date={date} reservations={reservations}/>
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

function SlotTable({ openAt, hours = 0, courts = [], date, reservations={} }) {
  const [open, setOpen] = useState(false);
  const [court, setCourt] = useState<any>({});
  const [startAt, setStartAt] = useState();

  const getReservationStatus = (court, offset) => {
    if(!reservations[court._id]) return 0;
    return reservations[court._id][offset];
  }  
  let current_hour = 0;
  if(moment(date).days() == moment().days()){
    current_hour = moment().hour();
    // alert(current_hour);
  }
  const hour_array = (new Array(hours)).fill(0).map((_, i) => i + openAt);
  // alert(openAt);
  return (
    <div>
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
                  status == 2 && '!bg-green', status == 1 && '!bg-grey',
                  status > 0 && hover && '!bg-opacity-50',
                  hour <= current_hour && '!bg-grey-dark'
                  );
                return (
                <td key={i} 
                  className={className}
                  onMouseEnter={() => { setCourt(_court), setStartAt(openAt + i)}}
                  onClick={() => { if(getReservationStatus(_court, i) == 0) setOpen(true)}} >
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
      <DurationDialog open={open} setOpen={setOpen} court={court} startAt={startAt} date={date}/>
    </div>
  )
}

function DurationDialog({ open, setOpen, court, startAt, date}) {
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