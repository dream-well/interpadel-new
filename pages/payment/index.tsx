import PaymentCard from "components/PaymentCard";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from 'axios';

const stripePromise = loadStripe(process.env.STRIPE_KEY);

console.log('stripe key', process.env.STRIPE_KEY);

export default function Payment() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axios.post("/api/payments", {})
      .then((data:any) => {
        console.log(data);
        if(data)
          setClientSecret(data.client_secret)
      });
  }, []);

  console.log('client secret', clientSecret);

  return (
    <div className='px-[8.5rem] py-[6rem] flex space-x-8 text-light'>
      <div className='bg-dark p-10 rounded-[1.5rem] w-1/2 flex flex-col h-min'>
        <span className='text-[2rem] text-white mb-[1.5rem]'>Payment data</span>
        {
          clientSecret &&
          <Elements options={{clientSecret: clientSecret, appearance: { theme: 'night', labels: 'floating'}}} stripe={stripePromise}>
            <PaymentCard />
          </Elements>
        }
      </div>
      <div className='bg-dark p-10 rounded-[1.5rem] w-1/2 flex flex-col'>
        <InformationCard />
      </div>
    </div>
  )
}

function InformationCard() {
  return (
    <div className='flex flex-col'>
      <span className='text-2xl text-white'>Padel Los Nogales</span>
      <span className='mt-3'>Padel</span>
      <span className='mt-2'>Paseo imperial, 26 entrada por Sta Maria la Real de Nieva S/N</span>
      <div className='flex items-center justify-between h-[4rem]'>
        <span>Type</span>
        <span>Outdoor</span>
      </div>
      <hr/>
      <div className='flex items-center justify-between h-[4rem]'>
        <span>Size</span>
        <span>Double</span>
      </div>
      <hr/>
      <div className='flex items-center justify-between h-[4rem]'>
        <span>Features</span>
        <span>Crystal</span>
      </div>
      <hr/>
      <div className='flex items-center justify-between h-[4rem]'>
        <span>Start</span>
        <span>Nov17,2022, 1:30PM <span className='text-red'>*</span></span>
      </div>
      <hr/>
      <div className='flex items-center justify-between h-[4rem]'>
        <span>Duration</span>
        <span>60</span>
      </div>
      <div className='flex items-center justify-between h-[4rem]'>
        <span>Price (TAX Include)</span>
        <span className='text-3xl'>$10.40</span>
      </div>
      <div className='flex items-center justify-between h-[4rem]'>
        <span>Service Fee</span>
        <span>$0.40</span>
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