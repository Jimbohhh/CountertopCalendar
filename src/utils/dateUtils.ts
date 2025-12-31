import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameDay,
  isSameMonth,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
} from 'date-fns';

export const getMonthDays = (date: Date): Date[] => {
  const start = startOfWeek(startOfMonth(date));
  const end = endOfWeek(endOfMonth(date));
  const days: Date[] = [];
  let day = start;

  while (day <= end) {
    days.push(day);
    day = addDays(day, 1);
  }

  return days;
};

export const getWeekDays = (date: Date): Date[] => {
  const start = startOfWeek(date);
  const days: Date[] = [];

  for (let i = 0; i < 7; i++) {
    days.push(addDays(start, i));
  }

  return days;
};

export const formatDate = (date: Date, formatString: string): string => {
  return format(date, formatString);
};

export const isSameDayUtil = (date1: Date, date2: Date): boolean => {
  return isSameDay(date1, date2);
};

export const isSameMonthUtil = (date1: Date, date2: Date): boolean => {
  return isSameMonth(date1, date2);
};

export const navigateDate = (
  date: Date,
  direction: 'prev' | 'next',
  viewType: 'month' | 'week' | 'day'
): Date => {
  if (viewType === 'month') {
    return direction === 'next' ? addMonths(date, 1) : subMonths(date, 1);
  } else if (viewType === 'week') {
    return direction === 'next' ? addWeeks(date, 1) : subWeeks(date, 1);
  } else {
    return direction === 'next' ? addDays(date, 1) : addDays(date, -1);
  }
};
