'use client';

import { useState } from "react";
import { Event } from "../event/entity/Event";
import { Calendar } from "../calendar/components/Calendar";
import { EventList } from "../event/component/EventList";

const Page = () => {
  const [eventList, setEventList] = useState<Event[]>([])

  return (
    <div className="flex p-8 w-full justify-around">
      <div className="w-1/2 flex justify-center">
        <div className="w-fit">
          <Calendar
          />
        </div>
      </div>
      <div className="w-1/2 flex justify-center">
        <div className="w-fit">
          <EventList
            events={eventList}
            setEventList={setEventList}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
