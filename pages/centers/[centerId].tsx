import { fetcher } from "utils/helpers";
import { Button, DatePicker, Modal, Placeholder, Radio, RadioGroup, SelectPicker } from "rsuite";
import useSWR from "swr";
import { useRouter } from "next/router";
import moment from "moment";
import React, { useState } from "react";
import TimeIcon from '@rsuite/icons/Time';
import styles from './Center.module.scss';
import cn from 'classnames';

export default function Center() {
  
  const router = useRouter();
  const { centerId } = router.query;
  const { data: center } = useSWR(centerId ? `/api/centers/${centerId}` : null, fetcher);
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
            <DatePicker cleanable={false} defaultValue={new Date}/>
            <div className='flex items-center'>
              <img src='/images/icons/location.svg' className='h-5' />
              <span className='ml-2'>{center?.city}</span>
            </div>
          </div>
          <div className='px-6 text-light'>
            <SlotTable openAt={openAt} hours={hours} courts={center?.courts} />
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

function SlotTable({ openAt, hours = 0, courts = [] }) {
  const [open, setOpen] = useState(false);
  const [court, setCourt] = useState<any>({});
  const [startAt, setStartAt] = useState();

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
              courts.map((_court, key) => (
                <td key={key} 
                  className={cn('cursor-pointer border py-2 text-center h-12', (startAt == openAt + i && court._id == _court._id && open) && 'bg-green')}
                  onMouseEnter={() => { setCourt(_court), setStartAt(openAt + i)}}
                  onClick={() => setOpen(true)}>
                  {/* { court.name } */}
                </td>
              ))
              }   
            </tr>
          ))
          }
        </tbody>
      </table>
      <DurationDialog open={open} setOpen={setOpen} court={court} startAt={startAt}/>
    </div>
  )
}

function DurationDialog({ open, setOpen, court, startAt}) {
  const [duration, setDuration] = useState(1);
  const router = useRouter();
  const gotoPayment = () => {
    router.push('/payment');
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
        <DurationSelector price={court.price} duration={duration} setValue={setDuration} value={1} />
        <DurationSelector price={court.price} duration={duration} setValue={setDuration} value={1.5} />
        <DurationSelector price={court.price} duration={duration} setValue={setDuration} value={2} />
        <Button color='green' className='bg-green w-full text-dark' onClick={gotoPayment}>Continue {duration * court.price + 40}-kr.</Button>
      </Modal.Body>
    </Modal>
  )
}

function DurationSelector({ value, setValue, duration, price }) {
  return (
    <button 
      className={cn('w-full bg-grey-light h-[2.8rem] rounded-[0.75rem] text-white flex items-center justify-between px-4', duration == value && 'opacity-50')}
      onClick={() => setValue(value)}
    >
      <span>{Math.floor(value)}h {60 * (value - Math.floor(value))}min</span>
      <span>{value * price}-kr.</span>
    </button> 
  )
}