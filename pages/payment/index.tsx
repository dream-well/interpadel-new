import PaymentCard from "components/PaymentCard";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from 'axios';
import { useRouter } from "next/router";
import useSWR from "swr";
import Loader from "components/Loader";
import { postFetcher } from "utils/helpers";
import moment from "moment";

const stripePromise = loadStripe(process.env.STRIPE_KEY);

console.log('stripe key', process.env.STRIPE_KEY);

export default function Payment() {

  const router = useRouter();

  const { court, startAt, duration } = router.query;

  useEffect(() => {
    if(!router.pathname) return;
    if(!court || !startAt || !duration) 
      router.replace('/404');
    
  }, [router.pathname, router.query])

  const { data: booking } = useSWR(router.pathname ? { url: `/api/bookings`, body: {
    court, startAt, duration
  }} : null, postFetcher);

  if(!router.pathname) {
    return <Loader />
  }


  if(!booking)
    return <Loader />

  return (
    <div className='px-[8.5rem] py-[6rem] flex space-x-8 text-light'>
      <div className='bg-dark p-10 rounded-[1.5rem] w-1/2 flex flex-col h-min'>
        <span className='text-[2rem] text-white mb-[1.5rem]'>Payment data</span>
        {
          <Elements options={{clientSecret: booking.clientSecret, appearance: { theme: 'night', labels: 'floating'}}} stripe={stripePromise}>
            <PaymentCard return_url={'/centers/' + booking.court.center._id + '/' + moment(booking.startAt).format('yyyy-MM-DD')} />
          </Elements>
        }
      </div>
      <div className='bg-dark p-10 rounded-[1.5rem] w-1/2 flex flex-col'>
        <InformationCard {...booking}/>
      </div>
    </div>
  )
}

function InformationCard({startAt, court, price, duration}) {
  return (
    <div className='flex flex-col'>
      <span className='text-2xl text-white'>{court.center.name}</span>
      <span className='mt-3'>{court.name}</span>
      <span className='mt-2'>{court.center.address}</span>
      <div className='flex items-center justify-between h-[4rem]'>
        <span>Type</span>
        <span>{court.type}</span>
      </div>
      <hr/>
      <div className='flex items-center justify-between h-[4rem]'>
        <span>Size</span>
        <span>{court.size}</span>
      </div>
      <hr/>
      <div className='flex items-center justify-between h-[4rem]'>
        <span>Features</span>
        <span>Crystal</span>
      </div>
      <hr/>
      <div className='flex items-center justify-between h-[4rem]'>
        <span>Start</span>
        <span>{(new Date(startAt)).toLocaleString()} <span className='text-red'>*</span></span>
      </div>
      <hr/>
      <div className='flex items-center justify-between h-[4rem]'>
        <span>Duration</span>
        <span>{duration}</span>
      </div>
      <div className='flex items-center justify-between h-[4rem]'>
        <span>Price (TAX Include)</span>
        <span className='text-3xl'>{price}-kr.</span>
      </div>
      <div className='flex items-center justify-between h-[4rem]'>
        <span>Service Fee</span>
        <span>40-kr.</span>
      </div>
      <div className='flex items-center justify-between h-[4rem]'>
        <span>Cancellation Policy</span>
      </div>
      <div className='flex items-center justify-between h-[4rem]'>
        <span>This club allows the booking cancellation of the reservation up to 12 hours before</span>
      </div>
      <div className='flex items-center justify-between h-[4rem]'>
        <span>Clab’s local time</span>
      </div>
    </div>
  )
}