import {Input, InputPicker, DatePicker, Button} from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import LocationIcon from '@rsuite/icons/Location';
import PlusIcon from '@rsuite/icons/Plus';
import MinusIcon from '@rsuite/icons/Minus';
import { useState } from 'react';

export default function Home() {
  return (
    <div>
      <Search />
      <SectionText />
      <Section type="left" url="/images/home/book1.png"/>
      <Section type="right" url="/images/home/book2.png"/>
      <Section type="left" url="/images/home/book3.png"/>
      <EasierForYou />
      <Trustedbythousands />
      <Testimonial />
      <Download />
      <FAQ />
      <GetStarted />
    </div>
  )
}

function Search() {
  return (
    <div className="absolute left-[8.5rem] right-[8.5rem] rs-theme-light flex justify-between rounded-3xl z-10 shadow-2xl h-[11rem] -mt-[5.5rem] bg-white p-[2.5rem] space-x-[2rem]">
      <div className='rounded-2xl border px-[1.5rem] py-[1rem] flex-col grow'>
        <div className="font-semibold text-[1.25rem] mb-[0.5rem]">Address</div>
        <Input placeholder='Address, club name, city...' className='text-[1rem]'/>
      </div>
      <div className='rounded-2xl border px-[1.5rem] py-[1rem] flex-col grow'>
        <div className="font-semibold text-[1.25rem] mb-[0.5rem]">Date & Time</div>
        <DatePicker />
      </div>
      <div className='justify-center items-center flex grow'>
        <Button appearance='primary' className='!bg-green !text-black'>Search <SearchIcon/></Button>
      </div>
    </div>
  );
}
function SectionText() {
  return (
  <div className='mt-[8.75rem]'>
    <div className="flex justify-center items-center font-Saira text-[3rem] flex-col font-semibold">
      <div>Top Searched Clubs in Norway</div><div>Book Now!</div>
    </div>
    <div className="flex justify-center items-center font-sans text-[1rem] flex-col mt-[1.5rem] text-[#4A4654]">
      <div>Interpadel Shop sells most padel equipment for both beginners and the more experienced player. The</div>
      <div>online store has finally opened, and you will find many good offers on various equipment.</div>
    </div>
  </div>
  );
}
function Section(props) {
  return(
    props.type == "left" ? 
  <div className='text-white flex my-[2.5rem] px-[8.5rem]'>
      <img src={props.url}></img>
      <div className='bg-dark rounded-3xl pt-[2rem] px-[4rem] pb-[3rem] h-[15rem] -ml-[5rem] mt-[6rem]'>
        <div className='flex justify-between'>
          <div className='font-Saira text-[2rem] font-semibold'>Sanset Padel</div>
          <img src="/images/home/Direction.png"></img>
        </div>
        <div className='font-sans text-[1.25rem] font-normal mt-[1rem]'><LocationIcon/>&nbsp;Olympisch Stadion 23, Amsterdam</div>
        <div className='flex mt-[0.5rem]'>
          <div className='text-[#869300]'>Open</div>
          <div className='ml-[0.5rem]'>Cloese 11pm</div>
        </div>
        <div className='mt-[1rem]'>
          <Button appearance='primary' className='!bg-green !text-black w-full h-[2.5rem]'>Book Now</Button>
        </div>
      </div>
    </div>
    :
    <div className='text-white flex my-[2.5rem] px-[8.5rem]'>
      <div className='z-10 bg-dark rounded-3xl pt-[2rem] px-[4rem] pb-[3rem] h-[15rem] mt-[6rem]'>
        <div className='flex justify-between'>
          <div className='font-Saira text-[2rem] font-semibold'>Sanset Padel</div>
          <img src="/images/home/Direction.png"></img>
        </div>
        <div className='font-sans text-[1.25rem] font-normal mt-[1rem]'><LocationIcon/>&nbsp;Olympisch Stadion 23, Amsterdam</div>
        <div className='flex mt-[0.5rem]'>
          <div className='text-[#869300]'>Open</div>
          <div className='ml-[0.5rem]'>Cloese 11pm</div>
        </div>
        <div className='mt-[1rem]'>
          <Button appearance='primary' className='!bg-green !text-black w-full h-[2.5rem]'>Book Now</Button>
        </div>
      </div>
      <img src={props.url} className='-ml-[5rem] '></img>
    </div>
  );
}
function EasierForYou() {
  const data = [
    {
      title: "Find Here",
      text: "Interpadel Shop sells most padel equipm for both beginners and the more experienced player. The online store has finally opened, and you will find many good offers on various equipment."
    },
    {
      title: "Booking",
      text: "Interpadel Shop sells most padel equipm for both beginners and the more experienced player. The online store has finally opened, and you will find many good offers on various equipment."
    },
    {
      title: "Community Inspire Us",
      text: "Interpadel Shop sells most padel equipm for both beginners and the more experienced player. The online store has finally opened, and you will find many good offers on various equipment."
    }
  ]
  return (
    <div className='bg-dark py-[5rem] px-[8.5rem]'>
      <div className='flex justify-center items-center'>
        <span className='font-Saira font-semibold text-[3rem] text-white'>
          Interpadel Makes It 
        </span>
        <span className='font-Saira font-semibold text-[3rem] text-green'>
          &nbsp;Easier For You
        </span>
      </div>
      <div className='flex space-x-[1.875rem] justify-center'>
        {
          data.map((item, key) => (
            <div className='mt-[3.75rem] w-[23.125rem] flex flex-col justify-center items-center' key={key}>
              <div className='z-10 font-Saira rounded-full bg-grey-light border-dark border-[0.5rem] w-[6rem] h-[6rem] text-green flex items-center justify-center text-[3rem] font-semibold'>
                {"0"}{key + 1}
              </div>
              <div className=' bg-grey-light h-[19rem] rounded-3xl -mt-[3rem] flex flex-col justify-center items-center px-[1.75rem]'>
                <div className='font-Saira text-white text-[1.5rem] font-semibold mb-[1rem]'>{item.title}</div>
                <div className='text-white text-[1rem] font-normal text-center'>{item.text}</div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

function Trustedbythousands() {
  return (
    <div className='bg-green text-black py-[5rem] px-[8.5rem]'>
      <div className='flex justify-between'>
        <div className='text-[3rem] font-semibold font-Saira'>
          Trusted by thousands
        </div>
        <div className='flex items-center space-x-[1.5rem]'>
          <div className='border-black border rounded-[0.3rem] px-[1rem] py-[0.5rem]'>
            <img src="images/home/companies/01.png"/>
          </div>
          <div className='border-black border rounded-[0.3rem] px-[1rem] py-[0.5rem]'>
            <img src="images/home/companies/02.png"/>
          </div>
          <div className='border-black border rounded-[0.3rem] px-[1rem] py-[0.5rem]'>
            <img src="images/home/companies/03.png"/>
          </div>
        </div>
      </div>
      <div className='flex space-x-[4.625rem] mt-[1.5rem]'>
        <div className='w-[24rem] text-[1rem] font-normal font-sans opacity-70'>
        Over 1 million users. Used by thousands of teams, companies and organizations worldwide.
        </div>
        <div className='flex items-center space-x-[1.5rem]'>
          <div className='border-black border rounded-[0.3rem] px-[1rem] py-[0.5rem]'>
            <img src="images/home/companies/04.png"/>
          </div>
          <div className='border-black border rounded-[0.3rem] px-[1rem] py-[0.5rem]'>
            <img src="images/home/companies/05.png"/>
          </div>
          <div className='border-black border rounded-[0.3rem] px-[1rem] py-[0.5rem]'>
            <img src="images/home/companies/06.png"/>
          </div>
        </div>
      </div>
    </div>
  );
}

function Testimonial() {
  return (
    <div className='py-[8.75rem] flex px-[8.5rem]'>
      <div className='z-10 mt-[7.5rem]'>
        <img src="images/home/quote.png"/>
      </div>
      <div className='py-[7.5rem] pl-[13.375rem] pr-[2.75rem] text-white bg-dark -ml-[10.625rem] flex flex-col w-[45rem]'>
        <div>Testimonial</div>
        <div className='text-[3rem] font-semibold font-Saira'>Our Customer Says</div>
        <div>
          <img src="images/home/qutesMark.png"/>
        </div>
        <div className='mt-[1.375rem]'>
          Great job on my Cakephp scraper script! Easy to communicate with and even did a few additional tasks that were not apart of the project that were greatly appreciated! Will be hiring again for sure. ;-) 
        </div>
        <div className='flex mt-[1.876rem]'>
          <img src="images/home/quoteWoman.png"/>
          <div className='flex flex-col ml-[1.5rem]'>
            <div className='text-[1.25rem] font-semibold'>Elenor Rose</div>
            <div>Manager</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Download() {
  return(
    <div className='flex bg-dark text-white py-[1.5rem] px-[8.5rem]'>
      <div className='flex justify-center flex-col'>
        <div className='font-semibold text-[3rem] font-Saira'>Download our mobile app</div>
        <div className='w-[28.563rem] mt-[1.5rem]'>Disposable temporary email protects your real email address from spam, advertising mailings, malwares.
</div>
        <div className='mt-[3.75rem] flex space-x-[2.215rem]'>
          <img src="images/home/googleBadge.png"/>
          <img src="images/home/appBadge.png"/>
        </div>
      </div>
      <div>
        <img src="images/home/iphone.png"/>
      </div>
    </div>
  );
}

function FAQ() {
  const data = [
    {
      question: "What if I am not satisfied with my service?",
      answer: "Customer satisfaction is important to us. We aim to provide you with a pleasant customer service experience process. We offer a one month risk free service."
    },
    {
      question: "Are there recruitment or contractual fees?",
      answer: "Customer satisfaction is important to us. We aim to provide you with a pleasant customer service experience process. We offer a one month risk free service."
    },
    {
      question: "Where are your talents located?",
      answer: "Customer satisfaction is important to us. We aim to provide you with a pleasant customer service experience process. We offer a one month risk free service."
    },
    {
      question: "Are all project development experts fluent in English?",
      answer: "Customer satisfaction is important to us. We aim to provide you with a pleasant customer service experience process. We offer a one month risk free service."
    },
    {
      question: "Where is your customer service team located?",
      answer: "Customer satisfaction is important to us. We aim to provide you with a pleasant customer service experience process. We offer a one month risk free service."
    }
  ];
  const [isOpen, onisOpen] = useState(1);
  return (
    <div className="flex flex-col items-center justify-center">
      <div className='text-[3rem] font-semibold mt-[8.75rem] font-Saira'>
        Frequently Asked Questions
      </div>
      <div className='w-[48.125rem] font-normal text-center mt-[1.5rem]'>
        Over a dozen reusable features built to provide iconography, dropdowns, input groups, alerts, and much more.Over a dozen reusable features
      </div>
      <div className='flex mt-[3.75rem]'>
        <div className='py-[3rem] mr-[1.875rem]'>
          <img src="images/home/faq.png"/>
        </div>
        <div>
            {
              data.map((item, key) => (
                <div className='w-[41.875rem] mb-[1.5rem]'>
                  <div key={key} className="font-Saira font-semibold rounded-xl hover:bg-dark hover:text-white bg-light h-[4.875rem] flex items-center px-[2rem]  mb-[1rem]">
                    <MinusIcon/>&nbsp;&nbsp;&nbsp;{item.question}
                  </div>
                  { isOpen &&
                    <div className='px-[2rem]'>
                      {item.answer}
                    </div>
                  }
                </div>
              ))
            }
        </div>
      </div>
    </div>
  );
}

function GetStarted() {
  return (
    <div className='bg-dark text-white flex mt-[16rem] mx-[8.5rem] py-[3rem] rounded-3xl mb-[8.75rem]'>
      <img src="images/home/getstarted.png" className='-mt-[7.3rem] ml-[2rem]'/>
      <div className='flex flex-col ml-[2rem]'>
        <div className='font-semibold text-[3rem] font-Saira'>Your data security is our first priority, explore now!</div>
        <div className='mt-[1.5rem] opacity-70 w-[28.1rem]'>Enjoy the most powerful cloud storage. Provide security for all your data</div>
        <div>
          <Button appearance='primary' className='!bg-green !text-black mt-[2.688rem] w-[12.125rem] h-[3.75rem]'>Get Started Now</Button>
        </div>
      </div>
    </div>
  );
}