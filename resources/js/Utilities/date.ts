import { formatDistance, parseISO } from 'date-fns';

const relativeDate = (date: string): string =>
    formatDistance(parseISO(date), new Date());

export { relativeDate };
