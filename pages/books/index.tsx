import Link from 'next/link'
import { useState } from 'react';
import { Badge, Calendar, Whisper, Popover } from 'rsuite'
import useSWR from 'swr';
import { fetcher } from 'utils/helpers';
import Image from 'components/Image';
import moment from 'moment';
import useApi from 'hooks/useApi';
import cn from 'classnames';

export default function Books() {

  return (
    <div className="px-[8.5rem] py-[2.5rem] text-white">
      <div className='bg-dark rounded-[1rem] py-4 px-8'>
        <BookCalendar />
      </div>
    </div>
  );
}


const BookCalendar = () => {

  const [currentDate, setCurrentDate] = useState(new Date());
  const { data: bookings } = useApi(`/api/profile/bookings`, { month: moment(currentDate).format('yy-MM')})

  const handleSelect = (newDate) => {
    setCurrentDate(newDate);
  }

  function getTodoList(date) {
    const m = moment(date).startOf('day');  // compare date only (ignore time)
    const data = bookings?.records.filter(booking => {
      const startTime = moment(booking.startAt).startOf('day'); // compare date only (ignore time)
      return startTime.isSame(m);
    })
    
    return data;
  }

  function renderCell(date) {
    const list = getTodoList(date) || [];
    const displayList = list.filter((item, index) => index < 2);

    const BookingItem = ({data}) => {
      const startTime =moment(data.startAt);
      const endTime = moment(startTime);
      endTime.add(data.duration, "minutes");

      return (
        <Link
          className='text-white text-sm'
          href={`/centers/${data.center?._id}/${startTime.format("YYYY-MM-DD")}`}>
            <b>{moment(startTime).format('HH:mm')} </b>
            {/* <br/> */}
            <b>{data.center?.name}</b>
        </Link>
      )
    }

    if (list.length) {
      const moreCount = list.length - displayList.length;
      const moreItem = (
      <li>
          <Whisper
              placement="top"
              trigger="click"
              speaker={
                  <Popover>
                  {list.map((item, index) => (
                    <div key={index}>
                      <BookingItem data={item} />
                    </div>
                  ))}
                  </Popover>
              }
              >
              <a>{moreCount} more</a>
          </Whisper>
      </li>
      );

      return (
        <ul className="calendar-todo-list text-left">
          {displayList.map((item, index) => (
          <li key={index} className={cn('whitespace-nowrap whitespace-pre truncate mb-[0.1rem]', index % 2 == 0? 'bg-[#003b78]': 'bg-[#5c7800]')}>
            <BookingItem data={item} />
          </li>
          ))}
          {moreCount ? moreItem : null}
        </ul>
      );
    }
  }

  return (
    <Calendar bordered renderCell={renderCell} onChange={handleSelect} value={currentDate} locale={locale} />
  )
}

const locale = {
  sunday: 'Sun',
  monday: 'Mon',
  tuesday: 'Tue',
  wednesday: 'Wed',
  thursday: 'Thu',
  friday: 'Fri',
  saturday: 'Sat',
};