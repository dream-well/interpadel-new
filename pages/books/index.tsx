import axios from 'axios';
import { now } from 'moment';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { Badge, Calendar, Whisper, Popover } from 'rsuite'
import useSWR from 'swr';
import { fetcher } from 'utils/helpers';
// import CalendarIcon from '@rsuite/icons/Calendar';

export default function Books() {

  return (
    <div className="px-[8.5rem] py-[2.5rem] bg-dark text-white">
      <BookCalendar />
    </div>
  );
}


const BookCalendar = () => {

  const [currentDate, setCurrentDate] = useState(new Date());
  const { data: bookings, error } = useSWR(`/api/bookings?month=${currentDate.getFullYear()}-${currentDate.getMonth()}`, fetcher)

  const handleSelect = (newDate) => {
    setCurrentDate(newDate);
  }

  useEffect(() => {
    console.log(bookings);
  }, [currentDate])
  

  function getTodoList(date) {
      const day = date.getDate();
    
      switch (day) {
        case 10:
          return [
            { time: '10:30 am', title: 'Meeting' },
            { time: '10:30 am', title: 'Meeting' },
          ];
        case 15:
          return [
            { time: '09:30 pm', title: 'Products Introduction' },
          ];
        default:
          return [];
      }
  }

  function renderCell(date) {
      const list = getTodoList(date);
      const displayList = list.filter((item, index) => index < 2);
  
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
                          <p key={index}>
                          <b>{item.time}</b> - {item.title}
                          </p>
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
                  <li key={index}>
                      <Badge /> <b>{item.time}</b> - {item.title}
                  </li>
                  ))}
                  {moreCount ? moreItem : null}
              </ul>
          );
      }
  }

  return (
    <Calendar bordered renderCell={renderCell} onSelect={handleSelect} />
  )
}