import { Moment } from "moment";

export interface Month {
  date: Moment;
  weeks: Day[][];
}

export interface Day {
  date: Moment;
  classNames: string[];
  weekDependOnFirstDayOfWeek: number;
  enabled: boolean;
}

export interface MomentRange {
  start: Moment;
  end: Moment;
}
