import Link from 'next/link'
import { useState } from 'react';
import { Badge, Calendar, Whisper, Popover } from 'rsuite'
import useSWR from 'swr';
import { fetcher } from 'utils/helpers';
import Image from 'components/Image';
import moment from 'moment';
import useApi from 'hooks/useApi';

export default function Books() {

  return (
    <div className="px-[8.5rem] py-[2.5rem] bg-dark text-white">
      <BookCalendar />
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
    const data = bookings?.records.filter(booking => {
      const startTime = new Date(booking.startAt);
      return (
        (startTime.getFullYear() === date.getFullYear()) && 
        (startTime.getMonth() === date.getMonth()) &&
        (startTime.getDate() === date.getDate())
      );
    })
    
    return data;
  }

  function renderCell(date) {
    const list = getTodoList(date) || [];
    const displayList = list.filter((item, index) => index < 1);

    const BookingItem = ({data}) => {
      const startTime = new Date(data.startAt);
      const endTime = new Date(startTime);
      endTime.setMinutes(startTime.getMinutes() + data.duration);

      return (
        <Link
          className='text-white text-sm'
          href={`/centers/${data.center?._id}/${startTime.getFullYear()}-${startTime.getMonth()+1}-${startTime.getDate()}`}>
            <b>{moment(startTime).format('hh:MM A')}-{moment(endTime).format('hh:MM A')}</b>
            <br/>
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
        <ul className="calendar-todo-list">
          {displayList.map((item, index) => (
          <li key={index} className='whitespace-nowrap'>
            <Badge /> <BookingItem data={item} />
          </li>
          ))}
          {moreCount ? moreItem : null}
        </ul>
      );
    }
  }

  return (
    <Calendar bordered renderCell={renderCell} onChange={handleSelect} value={currentDate} />
  )
}