import { Input, DatePicker, Button } from 'rsuite';
import useSWR from 'swr';
import moment from 'moment';
import { fetcher } from 'utils/helpers';
import SearchIcon from '@rsuite/icons/Search';
import LocationIcon from '@rsuite/icons/Location';
import PlusIcon from '@rsuite/icons/Plus';
import MinusIcon from '@rsuite/icons/Minus';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'components/Image';
import { useRouter } from 'next/router';

export default function Home() {
  return (
    <div>
      <Search />
      <SectionText />
      <Section />
      <EasierForYou />
      <Trustedbythousands />
      <Testimonial />
      <Download />
      <FAQ />
      {/* <GetStarted /> */}
    </div>
  );
}

function Search() {

  const router = useRouter();
  const [address, setAddress] = useState('');

  const onSearch = () => {
    router.push(`/centers?address=${address}`);
  }

  return (
    <div className='absolute left-[8.5rem] right-[8.5rem] rs-theme-light flex justify-between rounded-3xl z-10 shadow-2xl h-[11rem] -mt-[5.5rem] bg-white py-[2rem] space-x-[2rem] font-saira px-20 items-center'>
      <div className='rounded-2xl border px-[1.5rem] py-[1rem] flex-col'>
        <div className='font-semibold text-xl mb-[0.5rem] w-[30rem]'>
          Address
        </div>
        <Input
          placeholder='Address, club name, city...'
          className='border-none'
          value={address}
          onChange={setAddress}
          onPressEnter={onSearch}
        />
      </div>
      <div className='rounded-2xl border px-[1.5rem] py-[1rem] flex-col w-full'>
        <div className='font-semibold text-xl mb-[0.5rem]'>Date & Time</div>
        <DatePicker
          appearance='subtle'
          format="yyyy-MM-dd"
        />
      </div>
      <div className='justify-center items-center flex'>
        <Button
          appearance='primary'
          className='!bg-green !text-black h-[3.75rem] px-8'
          onClick={onSearch}
        >
          Search
          <SearchIcon className='ml-2' />
        </Button>
      </div>
    </div>
  );
}
function SectionText() {
  return (
    <div className='mt-[8.75rem]'>
      <div className='flex justify-center items-center font-saira text-[3rem] flex-col font-semibold'>
        <div>Top Searched Clubs in Norway</div>
        <div>Book Now!</div>
      </div>
      <div className='flex justify-center items-center font-sans text-base flex-col mt-6 text-grey'>
        <div>
          Interpadel Shop sells most padel equipment for both beginners and the
          more experienced player. The
        </div>
        <div>
          online store has finally opened, and you will find many good offers on
          various equipment.
        </div>
      </div>
    </div>
  );
}
function Section() {
  const { data: center } = useSWR(`/api/centers?search=Taktika`, fetcher);
  return (
    <div>
      {center?.map((item, key) =>
        key < 3 ?
        key % 2 == 0 ? (
          <div className='text-white flex my-[2.5rem] px-[8.5rem]' key={key}>
           <Image src={item.image} className='w-[48.125rem] h-[31.25rem]' />
            <div className='bg-dark rounded-3xl pt-[2rem] px-[4rem] pb-[3rem] h-[18rem] -ml-[6.25rem] mt-[6rem] w-[35.625rem] z-10'>
              <div className='flex justify-between'>
                <div className='font-saira text-[2rem] font-semibold'>
                  {item.name}
                </div>
               <Image src='/images/home/Direction.png' />
              </div>
              <div className='font-sans text-xl font-normal mt-[1rem]'>
                <LocationIcon />
                &nbsp;{getAddress(item.address)}
              </div>
              <div className='flex mt-[0.5rem]'>
                <div className='text-[#869300]'>
                  {item.status == 'Active' ? 'Open' : 'Close'}
                </div>
                <div className='ml-[0.5rem]'>
                  {item.status == 'Active'
                    ? 'Close ' + convertpm(item.closeAt)
                    : 'Open ' + convertpm(item.openAt)}
                </div>
              </div>
              <div className='mt-[1rem]'>
                <Link href={`/centers/${item._id}/today`}>
                  <Button
                    appearance='primary'
                    className='!bg-green !text-black w-full h-[2.5rem]'
                  >
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className='text-white flex my-[2.5rem] px-[8.5rem]' key={key}>
            <div className='z-10 bg-dark rounded-3xl pt-[2rem] px-[4rem] pb-[3rem] h-[18rem] mt-[6rem] w-[35.625rem]'>
              <div className='flex justify-between'>
                <div className='font-saira text-[2rem] font-semibold'>
                  {item.name}
                </div>
               <Image src='/images/home/Direction.png' />
              </div>
              <div className='font-sans text-xl font-normal mt-[1rem]'>
                <LocationIcon />
                &nbsp;{getAddress(item.address)}
              </div>
              <div className='flex mt-[0.5rem]'>
                <div className='text-[#869300]'>
                  {item.status == 'Active' ? 'Open' : 'Close'}
                </div>
                <div className='ml-[0.5rem]'>
                  {item.status == 'Active'
                    ? 'Close ' + convertpm(item.closeAt)
                    : 'Open ' + convertpm(item.openAt)}
                </div>
              </div>
              <div className='mt-[1rem]'>
                <Link href={`/centers/${item._id}/today`}>
                  <Button
                    appearance='primary'
                    className='!bg-green !text-black w-full h-[2.5rem]'
                  >
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
            <Image
              src={item.image}
              className='-ml-[6.25rem] w-[48.125rem] h-[31.25rem]'
             />
          </div>
        )
        : <div key={key}></div>
      )}
    </div>
  );
}
function convertpm(val) {
  let closeAt = moment.duration(val).hours(),
    temp;
  if (closeAt > 12) temp = closeAt - 12;
  if (val == '12:00:00') temp = 12;
  if (val == '24:00:00') temp = 24;
  return temp + (closeAt < 12 ? 'am' : 'pm');
}
function getAddress(val) {
  let temp = val.split(',');
  return val.replaceAll(',' + temp[temp.length-1], '');
}
function EasierForYou() {
  const data = [
    {
      title: 'Find Here',
      text: 'Interpadel Shop sells most padel equipm for both beginners and the more experienced player. The online store has finally opened, and you will find many good offers on various equipment.',
    },
    {
      title: 'Booking',
      text: 'Interpadel Shop sells most padel equipm for both beginners and the more experienced player. The online store has finally opened, and you will find many good offers on various equipment.',
    },
    {
      title: 'Community Inspire Us',
      text: 'Interpadel Shop sells most padel equipm for both beginners and the more experienced player. The online store has finally opened, and you will find many good offers on various equipment.',
    },
  ];
  return (
    <div className='bg-dark py-[5rem] px-[8.5rem]'>
      <div className='flex justify-center items-center'>
        <span className='font-saira font-semibold text-[3rem] text-white'>
          Interpadel Makes It
        </span>
        <span className='font-saira font-semibold text-[3rem] text-green'>
          &nbsp;Easier For You
        </span>
      </div>
      <div className='flex space-x-[1.875rem] justify-center'>
        {data.map((item, key) => (
          <div
            className='mt-[3.75rem] w-[23.125rem] flex flex-col justify-center items-center'
            key={key}
          >
            <div className='z-10 font-saira rounded-full bg-grey-light border-dark border-[0.5rem] w-[6rem] h-[6rem] text-green flex items-center justify-center text-[3rem] font-semibold'>
              {'0'}
              {key + 1}
            </div>
            <div className=' bg-grey-light h-[19rem] rounded-3xl -mt-[3rem] flex flex-col justify-center items-center px-[1.75rem]'>
              <div className='font-saira text-white text-[1.5rem] font-semibold mb-[1rem]'>
                {item.title}
              </div>
              <div className='text-white text-base font-normal text-center'>
                {item.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Trustedbythousands() {
  return (
    <div className='bg-green text-black py-[5rem] px-[8.5rem]'>
      <div className='flex justify-between'>
        <div className='text-[3rem] font-semibold font-saira'>
          Trusted by thousands
        </div>
        <div className='flex items-center space-x-[1.5rem]'>
          <CompaniesLogo src='/images/home/companies/01.png' />
          <CompaniesLogo src='/images/home/companies/02.png' />
          <CompaniesLogo src='/images/home/companies/03.png' />
        </div>
      </div>
      <div className='flex space-x-[4.625rem] mt-6'>
        <div className='w-[24rem] text-base font-normal font-sans opacity-70'>
          Over 1 million users. Used by thousands of teams, companies and
          organizations worldwide.
        </div>
        <div className='flex items-center space-x-[1.5rem]'>
          <CompaniesLogo src='/images/home/companies/04.png' />
          <CompaniesLogo src='/images/home/companies/05.png' />
          <CompaniesLogo src='/images/home/companies/06.png' />
        </div>
      </div>
    </div>
  );
}
function CompaniesLogo({ src }) {
  return (
    <div className='border-black border rounded-[0.3rem] px-[1rem] py-[0.5rem]'>
     <Image src={src} />
    </div>
  );
}

function Testimonial() {
  return (
    <div className='py-[8.75rem] flex px-[8.5rem] justify-between items-center'>
      <div className='z-10'>
        <img
          src='/images/home/quote.png'
          className='w-[35.625rem] h-[28.125rem]'
        />
      </div>
      <div className='py-[7.5rem] pl-[13.375rem] pr-[2.75rem] text-white bg-dark -ml-[10.625rem] flex flex-col w-[70rem]'>
        <div>Testimonial</div>
        <div className='text-[3rem] font-semibold font-saira'>
          Our Customer Says
        </div>
        <div>
         <Image src='/images/home/qutesMark.png' className='w-[3rem] h-[3rem]' />
        </div>
        <div className='mt-[1.375rem]'>
          Great job on my Cakephp scraper script! Easy to communicate with and
          even did a few additional tasks that were not apart of the project
          that were greatly appreciated! Will be hiring again for sure. ;-)
        </div>
        <div className='flex mt-[1.876rem]'>
         <Image src='/images/home/quoteWoman.png' />
          <div className='flex flex-col ml-6'>
            <div className='text-xl font-semibold'>Elenor Rose</div>
            <div>Manager</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Download() {
  return (
    <div className='flex bg-dark text-white py-[1.5rem] px-[8.5rem]'>
      <div className='flex justify-center flex-col'>
        <div className='font-semibold text-[2.75rem] font-saira'>
          Download our mobile app
        </div>
        <div className='w-[28.563rem] mt-6'>
          Disposable temporary email protects your real email address from spam,
          advertising mailings, malwares.
        </div>
        <div className='mt-[3.75rem] flex space-x-[2.215rem]'>
         <Image src='/images/home/googleBadge.png' />
         <Image src='/images/home/appBadge.png' />
        </div>
      </div>
      <div>
       <Image src='/images/home/iphone.png' className='w-[30rem] h-[29rem]' />
      </div>
    </div>
  );
}

function FAQ() {
  const data = [
    {
      question: 'What if I am not satisfied with my service?',
      answer:
        'Customer satisfaction is important to us. We aim to provide you with a pleasant customer service experience process. We offer a one month risk free service.',
    },
    {
      question: 'Are there recruitment or contractual fees?',
      answer:
        'Customer satisfaction is important to us. We aim to provide you with a pleasant customer service experience process. We offer a one month risk free service.',
    },
    {
      question: 'Where are your talents located?',
      answer:
        'Customer satisfaction is important to us. We aim to provide you with a pleasant customer service experience process. We offer a one month risk free service.',
    },
    {
      question: 'Are all project development experts fluent in English?',
      answer:
        'Customer satisfaction is important to us. We aim to provide you with a pleasant customer service experience process. We offer a one month risk free service.',
    },
    {
      question: 'Where is your customer service team located?',
      answer:
        'Customer satisfaction is important to us. We aim to provide you with a pleasant customer service experience process. We offer a one month risk free service.',
    },
  ];
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='text-[3rem] font-semibold mt-[8.75rem] font-saira'>
        Frequently Asked Questions
      </div>
      <div className='w-[48.125rem] font-normal text-center mt-6'>
        Over a dozen reusable features built to provide iconography, dropdowns,
        input groups, alerts, and much more.Over a dozen reusable features
      </div>
      <div className='flex mt-[3.75rem]'>
        <div className='py-[3rem] mr-[1.875rem]'>
          <img
            src='/images/home/faq.png'
            className='w-[29.375rem] h-[28.125rem]'
          />
        </div>
        <div>
          {data.map((item, key) => (
            <Accordion
              question={item.question}
              answer={item.answer}
              isOpenType={key == 0 ? true : false}
              key={key}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
function Accordion({ question, answer, isOpenType }) {
  const [isOpen, onisOpen] = useState(isOpenType);
  return (
    <div className='w-[41.875rem] mb-6'>
      <div
        className='cursor-pointer saira font-semibold rounded-xl hover:bg-dark hover:text-white bg-light h-[4.875rem] flex items-center px-[2rem]  mb-[1rem]'
        onClick={() => onisOpen(!isOpen)}
      >
        {isOpen && <MinusIcon className='mr-4' />}
        {isOpen || <PlusIcon className='mr-4' />}
        {question}
      </div>
      {isOpen && <div className='px-[2rem]'>{answer}</div>}
    </div>
  );
}

function GetStarted() {
  return (
    <div className='bg-dark text-white flex mt-[16rem] mx-[8.5rem] pt-[3rem] rounded-3xl mb-[8.75rem]'>
      <img
        src='/images/home/getstarted.png'
        className='-mt-[7.3rem] ml-8 w-[26rem] h-[35.625rem]'
      />
      <div className='flex flex-col ml-8'>
        <div className='font-semibold text-[3rem] font-saira'>
          Your data security is our first priority, explore now!
        </div>
        <div className='mt-6 opacity-70 w-[28.1rem]'>
          Enjoy the most powerful cloud storage. Provide security for all your
          data
        </div>
        <div>
          <Button
            appearance='primary'
            className='!bg-green !text-black mt-[2.688rem] w-[12.125rem] h-[3.75rem]'
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  );
}
