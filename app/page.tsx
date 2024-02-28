'use client'

import { Calendar } from "./components/calendar/Calendar";
import { MomentRange } from "./components/calendar/Entities";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="">
        <Calendar
          onChangeRange={(range: MomentRange) => { console.log(range) }}
          numberOfMonths={2}
          firstWeekDay={0}
        />
      </div>
    </main>
  );
}
