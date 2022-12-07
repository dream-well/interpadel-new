import {Input, InputPicker, DatePicker, Button} from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

export default function Home() {
  return (
    <>
      <div className="w-full"><img src="/images/home/main.png"/></div>
      <div className="font-Saira text-[4rem] -mt-[23rem] text-white flex justify-center items-center flex-col">
        <div>Find where & with whom</div><div>to play Padel & Tennis instantly</div>
      </div>
      <Search />
      <div className='mt-[8.75rem]'>
        <div className="flex justify-center items-center font-Saira text-[3rem] flex-col">
          <div>Top Searched Clubs in Norway</div><div>Book Now!</div>
        </div>
        <div className="flex justify-center items-center font-sans text-[1rem] flex-col mt-[1.5rem] text-[#4A4654]">
          <div>Interpadel Shop sells most padel equipment for both beginners and the more experienced player. The</div>
          <div>online store has finally opened, and you will find many good offers on various equipment.</div>
        </div>
      </div>

      <Section type="left" url="/images/home/book1.png"/>
      <Section type="right" url="/images/home/book2.png"/>
      <Section type="left" url="/images/home/book3.png"/>
      <EasierForYou />
    </>
  )
}

function Search() {
  return (
    <div className="mx-[8.5rem] rounded-3xl shadow-2xl h-[11rem] mt-[6rem] bg-white flex p-[2.5rem]">
        <div className="border border-[#D2D1D4] rounded-2xl py-[1rem] mr-[2.5rem]">
          <span className='mx-[1.5rem] font-Saira font-semibold text-[1.25rem]'>Address</span>
          <Input className= "mx-[1.5rem] font-normal text-[1rem] w-fit" placeholder='Address, club name, city...'/>
        </div>
        <div className="border border-[#D2D1D4] rounded-2xl py-[1rem] w-[17.5rem] mr-[2.5rem]">
          <span className='mx-[1.5rem] font-Saira font-semibold text-[1.25rem]'>Select Sport</span><br/>
          <InputPicker className= "mx-[1.5rem] font-normal text-[1rem]" data={[{lable: "Padel", value: "Padel"}]}/>
        </div>
        <div className="border border-[#D2D1D4] rounded-2xl py-[1rem] w-[17.5rem]">
          <span className='mx-[1.5rem] font-Saira font-semibold text-[1.25rem]'>Date & time</span><br/>
          <DatePicker className= "mx-[1.5rem] font-normal text-[1rem] w-fit" />
        </div>
        <div className="flex justify-center items-center py-[1rem] w-[17.5rem]">
          <Button appearance='primary' className='!text-black !bg-green' size="lg">
            Search&nbsp;&nbsp;&nbsp;<SearchIcon/>
          </Button>
        </div>
      </div>
  );
}
function Section(props) {
  return(
    props.type == "left" ? 
  <div className='mx-[8.5rem] text-white flex my-[2.5rem]'>
      <img src={props.url}></img>
      <div className='bg-dark rounded-3xl pt-[2.625rem] px-[6.25rem] pb-[3rem] h-[18.75rem] -ml-[10.625rem] mt-[6.25rem]'>
        <div className='flex justify-between'>
          <div className='font-Saira text-[2rem] font-semibol'>Sanset Padel</div>
          <img src="/images/home/Direction.png"></img>
        </div>
        <div className='font-sans text-[1.25rem] font-normal mt-[1rem]'>Olympisch Stadion 23, Amsterdam</div>
        <div className='flex mt-[1rem]'>
          <div className='text-[#869300]'>Open</div>
          <div className='ml-[1rem]'>Cloese 11pm</div>
        </div>
        <div className='mt-[1.5rem]'>
          <Button appearance='primary' className='!bg-green !text-black w-full h-[3.75rem]'>Book Now</Button>
        </div>
      </div>
    </div>
    :
    <div className='mx-[8.5rem] text-white flex my-[2.5rem]'>
      <div className='bg-dark rounded-3xl z-10 pt-[2.625rem] px-[6.25rem] pb-[3rem] h-[18.75rem] mt-[6.25rem]'>
        <div className='flex justify-between'>
          <div className='font-Saira text-[2rem] font-semibol'>Sanset Padel</div>
          <img src="/images/home/Direction.png"></img>
        </div>
        <div className='font-sans text-[1.25rem] font-normal mt-[1rem]'>Olympisch Stadion 23, Amsterdam</div>
        <div className='flex mt-[1rem]'>
          <div className='text-[#869300]'>Open</div>
          <div className='ml-[1rem]'>Cloese 11pm</div>
        </div>
        <div className='mt-[1.5rem]'>
          <Button appearance='primary' className='!bg-green !text-black w-full h-[3.75rem]'>Book Now</Button>
        </div>
      </div>
      <img src={props.url} className='-ml-[10.625rem] '></img>
    </div>
  );
}
function EasierForYou() {
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
      <div className='flex mt-[3.75rem]'>
        <div>
          <div className='w-[21.875rem] bg-grey-light h-[19rem] rounded-3xl'>

          </div>
        </div>
      </div>
    </div>
  );
}