import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

const MILLISECONDS_IN_SECOND = 1000;
const MILLISECONDS_IN_MINUTE = MILLISECONDS_IN_SECOND * 60;
const MILLISECONDS_IN_HOUR = MILLISECONDS_IN_MINUTE * 60;
const MILLISECONDS_IN_DAY = MILLISECONDS_IN_HOUR * 24;

dayjs.extend(duration);

function getTimeTravel(date1, date2) {
  const timeDiff = dayjs(date2).diff(dayjs(date1));
  let pointDuration = '';

  switch (true) {
    case (timeDiff >= MILLISECONDS_IN_DAY):
      pointDuration = dayjs.duration(timeDiff).format('DD[D] HH[H] mm[M]');
      break;
    case (timeDiff >= MILLISECONDS_IN_HOUR):
      pointDuration = dayjs.duration(timeDiff).format('HH[H] mm[M]');
      break;
    case (timeDiff < MILLISECONDS_IN_MINUTE):
      pointDuration = dayjs.duration(timeDiff).format('mm[M]');
      break;
  }
  return pointDuration;
}

export { getTimeTravel };
