import moment, { Moment } from 'moment';
import { Day, Month } from './Entities';


const getFirstMomentForWeek = (
  date: Moment,
  firstDayOfWeek: number,
): Moment => {
  let momentToReturn = date.clone();
  while (momentToReturn.weekday() !== firstDayOfWeek) {
    momentToReturn = momentToReturn.subtract(1, 'days');
  }

  return momentToReturn;
}

const getLastMomentForWeek = (
  date: Moment,
  firstDayOfWeek: number,
): Moment => {
  let momentToReturn = date.clone();
  const lastDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  while (momentToReturn.weekday() !== lastDayOfWeek) {
    momentToReturn = momentToReturn.add(1, 'days');
  }

  return momentToReturn;
}

const createMonth = (
  date: Moment,
  firstDayOfWeek: number,
): Month => {
  const firstDayOfMonth = date.clone().startOf('month');
  const lastDayOfMonth = date.clone().endOf('month');
  const firstMomentForWeek = getFirstMomentForWeek(firstDayOfMonth, firstDayOfWeek);
  const lastMomentForWeek = getLastMomentForWeek(lastDayOfMonth, firstDayOfWeek);

  const days = [];
  let i = 0;
  let weekDependOnFirstDayOfWeek = 0;
  while (
    firstMomentForWeek.clone().add(i, 'days').isBefore(lastMomentForWeek)
  ) {
    const day = firstMomentForWeek.clone().add(i, 'days');
    if (i % 7 === 0) weekDependOnFirstDayOfWeek++;

    const classNames = [];
    let enabled = true;
    if (
      day.isBefore(firstDayOfMonth, 'day')
      || day.isAfter(lastDayOfMonth, 'day')
    ) {
      classNames.push('cursor-not-allowed');
      classNames.push('text-gray-400/40');
      enabled = false;
    } else {
      classNames.push('cursor-pointer');
    }

    days.push({
      date: day,
      classNames: classNames,
      weekDependOnFirstDayOfWeek,
      enabled,
    });

    i++;
  }

  return {
    date: firstDayOfMonth,
    weeks: Object.values(Object.groupBy(days, (day: Day) => day.weekDependOnFirstDayOfWeek)),
  };
}

export const getDaysInRange = (
  date: Moment,
  firstDayOfWeek: number,
  numberOfMonths: number,
): Month[] => {
  const months = [];
  for (let i = 0; i < numberOfMonths; i++) {
    months.push(createMonth(
      date.clone().startOf('month').add(i, 'months'),
      firstDayOfWeek,
    ));
  }

  return months;
}
