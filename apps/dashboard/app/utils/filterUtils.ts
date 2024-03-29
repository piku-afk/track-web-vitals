import type { Duration } from '@constants/searchParams';

type DateRange = Record<'startDate' | 'endDate', Date>;

export const getDateRange = (duration: Duration): DateRange => {
  const today = new Date();
  const startDate: Date = new Date(today);
  const endDate: Date = new Date(today);

  switch (duration) {
    case '3 month':
    case 'month':
    case 'today':
    case 'week':
      startDate.setDate(today.getDate() - 6);
      break;
  }

  startDate.setHours(0);
  startDate.setMinutes(0);
  startDate.setSeconds(0);

  return { startDate, endDate };
};

export const getPreviousDateRange = (duration: Duration): DateRange => {
  const { startDate: endDate } = getDateRange(duration);
  const startDate: Date = new Date(endDate);

  // generate startDate
  switch (duration) {
    case '3 month':
    case 'month':
    case 'today':
    case 'week':
      startDate.setDate(endDate.getDate() - 6);
      break;
  }

  startDate.setHours(0);
  startDate.setMinutes(0);
  startDate.setSeconds(0);

  return { startDate, endDate };
};

export const calculatePercentageDifference = (current: number, previous: number): number => {
  const difference = current - previous;
  return (difference / (previous || Number.POSITIVE_INFINITY)) * 100;
};
