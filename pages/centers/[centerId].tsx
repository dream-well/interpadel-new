import PaymentCard from "components/PaymentCard";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { axios, fetcher } from "utils/helpers";
import { DatePicker, SelectPicker } from "rsuite";
import useSWR from "swr";
import { useRouter } from "next/router";
import moment from "moment";

export default function Center() {
  
  const router = useRouter();
  const { centerId } = router.query;
  const { data: center } = useSWR(`/api/centers/${centerId}`, fetcher);
  const closeAt = moment.duration(center?.closeAt).hours();
  const openAt = moment.duration(center?.openAt).hours();
  const hours = closeAt - openAt;

  const book = (court, i) => {
    const startAt = openAt + i;
    
  }

  return (
    <div className='py-[5rem] px-[10rem] flex flex-col justify-center'>
      <div className='rounded-t-[1.5rem] w-full bg-green h-[4rem] flex items-center justify-center'>
        <span className='text-[2rem] font-bold saira'>{center?.name}</span>
      </div>
      <div className='w-full bg-dark rounded-b-[1.5rem] pb-[3.5rem]'>
        <div className='h-[5rem] p-6 justify-between w-full flex text-white items-center'>
          <DatePicker value={new Date} cleanable={false} />
          <div className='flex items-center'>
            <img src='/images/icons/location.svg' className='h-5' />
            <span className='ml-2'>Helsingborg</span>
          </div>
        </div>
        <div className='px-6 text-light'>
          <table className='w-full saira'>
            <tr>
              <td className='border pl-4 py-2 w-[7.5rem]'>Time/Courts</td>
              {
                center?.courts.map((court, key) => (
                  <td key={key} className='border py-2 text-center'>
                    { court.name }
                  </td>
                ))
              }
            </tr>
            {
              (new Array(hours)).fill(0).map((_, i) => (
                <tr key={i}>
                  <td className='border pl-4'>{moment(`2000-01-01 ${openAt + i}:00`).format('h:mm a')}</td>
                  {
                    center?.courts.map((court, key) => (
                      <td key={key} className='border py-2 text-center h-12' onClick={() => book(court, i)}>
                        {/* { court.name } */}
                      </td>
                    ))
                  }   
                </tr>
              ))
            }
          </table>
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
  )
}