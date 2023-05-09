import { FilterType } from './const.js';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const filter = {
  [FilterType.EVERYTHING]: (points) => points.sort((a, b) => dayjs(a.dateFrom).unix() - dayjs(b.dateFrom).unix()),
  [FilterType.FUTURE]: (points) => points.filter((point) => dayjs(point.dateFrom).isSameOrAfter(dayjs(new Date()))),
  [FilterType.PRESENT]: (points) => points.filter((point) => dayjs(point.dateFrom).isSameOrAfter(dayjs(new Date)) && dayjs(point.dateTo).isSameOrBefore(dayjs(new Date))),
  [FilterType.PAST]: (points) => points.filter((point) => dayjs(point.dateFrom).isSameOrBefore(dayjs(new Date()))),
};

export { filter };
