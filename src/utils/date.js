import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

const EnumTime = {
  MsInMinute: 1000 * 60,
  MsInHour: 1000 * 60 * 60,
  MsInDay: 1000 * 60 * 60 * 24,
};

dayjs.extend(duration);

function getTimeTravel(date1, date2) {
  const timeDiff = dayjs(date2).diff(dayjs(date1));

  if (timeDiff >= EnumTime.MsInDay) {
    return dayjs.duration(timeDiff).format('DD[D] HH[H] mm[M]');
  }
  if (timeDiff >= EnumTime.MsInHour) {
    return dayjs.duration(timeDiff).format('HH[H] mm[M]');
  }
  if (timeDiff < EnumTime.MsInMinute) {
    return dayjs.duration(timeDiff).format('mm[M]');
  }
}

export { getTimeTravel };
