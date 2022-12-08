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
  let hours = 0;
  return (
    <div className='py-[5rem] px-[10rem] flex flex-col justify-center'>
      <div className='rounded-t-[1.5rem] w-full bg-green h-[4rem] flex items-center justify-center'>
        <span className='text-[2rem] font-bold saira'>{center?.name}</span>
      </div>
      <div className='w-full bg-dark h-[10rem] rounded-b-[1.5rem]'>
        <div className='h-[5rem] p-6 justify-between w-full flex text-white items-center'>
          <DatePicker value={new Date} cleanable={false} />
          <div className='flex items-center'>
            <img src='/images/icons/location.svg' className='h-5' />
            <span className='ml-2'>Helsingborg</span>
          </div>
        </div>
        <div className='px-6'>
          <table className='text-light w-full saira'>
            <tr>
              <td className='border py-2 text-center w-[7rem]'>Time/Courts</td>
              {
                center?.courts.map((court, key) => (
                  <td className='border py-2 text-center'>
                    { court.name }
                  </td>
                ))
              }
            </tr>
            {
              
            }
          </table>
        </div>
      </div>
    </div>
  )
}