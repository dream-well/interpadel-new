import { fetcher } from "utils/helpers";
import { Button, DatePicker, Modal, Placeholder, Radio, RadioGroup, SelectPicker } from "rsuite";
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

export default function Center() {
  
  const router = useRouter();
  const { centerId, payment_intent_client_secret, redirect_status } = router.query;
  const [date, setDate] = useState(moment(new Date).startOf('day').toDate());
  const { data: center } = useSWR(centerId ? `/api/centers/${centerId}` : null, fetcher);
  const { data: reservations, mutate: refreshReservations } = useSWR(centerId ? `/api/reservations/${centerId}?date=${date.toJSON()}` : null, fetcher);
  
  useEffect(() => {
    if(router.query.date) {
      if(router.query.date == 'today')
        setDate(moment(new Date).startOf('day').toDate());
      else  
        setDate(moment(router.query.date).startOf('day').toDate());
    }
  }, [router.query.date]);

  useEffect(() => {
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

  return (
    <div className='bg-cover bg-center' style={{backgroundImage: `url(${center?.image})`}}>
      <div className='py-[5rem] px-[10rem] flex flex-col justify-center w-full flex flex-col bg-white/10 backdrop-blur'>
        <div className='rounded-t-[1.5rem] w-full bg-green h-[4rem] flex items-center justify-center'>
          <span className='text-[2rem] font-bold saira'>{center?.name}</span>
        </div>
        <div className='w-full bg-dark rounded-b-[1.5rem] pb-[3.5rem]'>
          <div className='h-[5rem] p-6 justify-between w-full flex text-white items-center'>
            <DatePicker cleanable={false} value={date} onChange={setDate}/>
            <div className='flex items-center'>
             <Image src='/images/icons/location.svg' className='h-5' />
              <span className='ml-2'>{center?.city}</span>
            </div>
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

  return (
    <div>
      <table className='w-full saira table-fixed'>
        <tbody>
          <tr>
            <td className='border pl-4 py-2 w-[7.5rem]'>Time/Courts</td>
            {
              courts.map((_court, key) => (
                <td key={key} className={cn('border py-2 text-center', court._id == _court._id && 'bg-grey')}>
                  { _court.name }
                </td>
              ))
            }
          </tr>
          {
          (new Array(hours)).fill(0).map((_, i) => (
            <tr key={i}>
              <td className={cn('border pl-4', (openAt + i) == startAt && 'bg-grey')}>{moment(`2000-01-01 ${openAt + i}:00`).format('h:mm a')}</td>
              {
              courts.map((_court, key) => {
                const status = getReservationStatus(_court, i);
                const className = cn('cursor-pointer border py-2 text-center h-12', 
                  startAt == openAt + i && court._id == _court._id && ( open ? 'bg-green' : 'bg-grey-light'), 
                  status == 2 && '!bg-green', status == 1 && '!bg-grey');
                return (
                <td key={key} 
                  className={className}
                  onMouseEnter={() => { setCourt(_court), setStartAt(openAt + i)}}
                  onClick={() => { if(getReservationStatus(_court, i) == 0) setOpen(true)}} >
                  {/* { court.name } */}
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

const durations = [60,90,120];