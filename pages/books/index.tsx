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
    const m = moment(date).startOf('day');  // compare date only (ignore time)
    const data = bookings?.records.filter(booking => {
      const startTime = moment(booking.startAt).startOf('day'); // compare date only (ignore time)
      return startTime.isSame(m);
    })
    
    return data;
  }

  function renderCell(date) {
    const list = getTodoList(date) || [];
    const displayList = list.filter((item, index) => index < 1);

    const BookingItem = ({data}) => {
      const startTime =moment(data.startAt);
      const endTime = moment(startTime);
      endTime.add(data.duration, "minutes");

      return (
        <Link
          className='text-white text-sm'
          href={`/centers/${data.center?._id}/${startTime.format("YYYY-MM-DD")}`}>
            <b>{moment(startTime).format('hh:mm A')}-{moment(endTime).format('hh:mm A')}</b>
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