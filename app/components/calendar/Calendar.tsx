'use client';

import moment, { Moment } from 'moment';
import { getDaysInRange } from './MonthFactory';
import { useEffect, useState } from 'react';
import { Day, MomentRange, Month } from './Entities';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface CalendarProps {
  onChange?: (date: Moment) => void;
  onPickDate?: (date: Moment) => void;
  containerClassName?: string;
  contentClassName?: string;
  numberOfMonths?: number;
  firstWeekDay?: number;
  onChangeRange?: (range: MomentRange) => void;
}

export const Calendar = ({
  containerClassName = '',
  contentClassName = '',
  numberOfMonths = 1,
  firstWeekDay = 1,
  onChangeRange = () => { },
}: CalendarProps) => {
  const [date, setDate] = useState<Moment>(moment());
  const [days, setDays] = useState<Month[]>();
  const [firstSelectedDate, setFirstSelectedDate] = useState<Moment | null>(null);
  const [lastSelectedDate, setLastSelectedDate] = useState<Moment | null>(null);
  const [minDate, setMinDate] = useState<Moment | null>(null);
  const [maxDate, setMaxDate] = useState<Moment | null>(null);

  useEffect(() => {
    setDays(getDaysInRange(date, firstWeekDay, numberOfMonths));
  }, [date, numberOfMonths, firstWeekDay]);

  useEffect(() => {
    if (
      lastSelectedDate !== null
      && firstSelectedDate !== null
    ) {
      if (firstSelectedDate.isAfter(lastSelectedDate)) {
        setMinDate(lastSelectedDate);
        setMaxDate(firstSelectedDate);
      } else {
        setMinDate(firstSelectedDate);
        setMaxDate(lastSelectedDate);
      }

      onChangeRange({
        start: firstSelectedDate as Moment,
        end: lastSelectedDate as Moment,
      });
    }
  }, [firstSelectedDate, lastSelectedDate, onChangeRange]);

  const rowClassName = 'flex w-full justify-between';

  const handleNextMonth = () => {
    setDate(date.clone().add(1, 'months'));
  };

  const handlePrevMonth = () => {
    setDate(date.clone().subtract(1, 'months'));
  };

  const handleClickOnDay = (day: Day) => {
    if (day.enabled) {
      if (firstSelectedDate === null) {
        setFirstSelectedDate(day.date);
      } else if (lastSelectedDate === null) {
        setLastSelectedDate(day.date);
      } else {
        setFirstSelectedDate(day.date);
        setLastSelectedDate(null);
      }
    }
  }

  const renderDay = (day: Day) => (
    <div
      key={day.date.format()}
      className={`
        w-8
        h-8
        flex
        justify-center
        items-center
        ${minDate !== null
          && maxDate !== null
          && day.enabled
          && day.date.isSameOrAfter(minDate)
          && day.date.isSameOrBefore(maxDate) ? 'bg-slate-400' : ''
        }
        ${day.classNames.join(' ')}
      `}
      onClick={() => handleClickOnDay(day)}
    >
      {day.date.format('D')}
    </div>
  );

  const renderWeek = (week: Day[]) => (
    <div
      key={week[0].date.format()}
      className={rowClassName}
    >
      {week.map((day: Day) => renderDay(day))}
    </div>
  );

  const renderMonth = (month: Month) => {
    return <div
      key={month.date.format()}
      className='flex flex-col'
    >
      <div className='flex justify-center items-center'>{month.date.format('MMMM')}</div>

      {month.weeks.map((week: Day[]) => renderWeek(week))}
    </div>
  }

  return (days === undefined)
    ? <div>Loading...</div>
    : <div className={`
        flex
        flex-row
        justify-between
        items-center
        gap-4
        ${containerClassName}
      `}>
      <div
        className='flex w-8 h-8 justify-center items-center cursor-pointer hover:bg-slate-400'
        onClick={handlePrevMonth}
      ><FaArrowLeft /></div>
      <div className={`
        flex
        flex-wrap
        gap-4
        justify-center
        items-center
        ${contentClassName}
      `}>
        {days.map((month) => renderMonth(month))}
      </div>
      <div
        className='flex w-8 h-full justify-center items-center cursor-pointer hover:bg-slate-400'
        onClick={handleNextMonth}
      ><FaArrowRight /></div>
    </div>
    ;
}
