import PaymentCard from "components/PaymentCard";

export default function Payment() {
  return (
    <div className='py-[6rem] flex space-x-8 text-light'>
      <div className='bg-dark p-10 rounded-[1.5rem] w-1/2 flex flex-col h-min'>
        <span className='text-[2rem] text-white'>Payment data</span>
        <PaymentCard />
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