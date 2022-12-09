import Link from 'next/link'
import { Badge, Calendar, Whisper, Popover } from 'rsuite'
import CalendarIcon from '@rsuite/icons/Calendar';

export default function Books() {

  return (
    <div className="px-[8.5rem]">
      <BookCalendar />
    </div>
  );
}


const BookCalendar = () => {
  function getTodoList(date) {
      const day = date.getDate();
    
      switch (day) {
        case 10:
          return [
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
      <div className='flex flex-col p-[2.5rem] space-y-[3.313rem] bg-dark'>
          <span className='text-white flex items-center space-x-2 text-[1.75rem] font-bold'>
              <CalendarIcon />
              <span>Your Bookings</span>
          </span>
          <span className='flex text-white bg-dark'>
              <Calendar bordered renderCell={renderCell} className='!w-[55rem]' />
          </span>
      </div>
  )
}