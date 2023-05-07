const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;
const MILLISECONDS_IN_HOUR = 1000 * 60 * 60;
const MILLISECONDS_IN_MINUTE = 1000 * 60;
const HOURES_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}
function getRandomInteger(min, max) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}


function formatDate(date, item) {
  if (date < 10) {
    return `0${date}${item}`;
  } else {
    return `${date}${item}`;
  }
}

function getTimeTravel(date1, date2) {
  const dateFirst = Date.parse(date1);
  const dateSecond = Date.parse(date2);
  let date = '';
  const days = Math.trunc((dateSecond - dateFirst) / MILLISECONDS_IN_DAY);
  let houres = Math.trunc((dateSecond - dateFirst) / MILLISECONDS_IN_HOUR);
  let minutes = Math.trunc((dateSecond - dateFirst) / MILLISECONDS_IN_MINUTE);
  date += days > 0 ? formatDate(days, 'D ') : '';
  houres -= days * HOURES_IN_DAY;
  date += houres > 0 ? formatDate(houres, 'H ') : '';
  minutes -= (days * HOURES_IN_DAY + houres) * MINUTES_IN_HOUR;
  date += minutes > 0 ? formatDate(minutes, 'M') : '00M';

  return date;
}

function getPointOffers(point, offers) {
  const correctOffer = offers.find((offer) => offer.type === point.type);
  if (!correctOffer) {
    return [];
  }
  return correctOffer.offers;
}

function getPointAllOffers(point, offers) {
  return offers.find((offer) => point.type === offer.type);
}

function getPointDestination(point, destinations) {
  return destinations.find((destination) => point.id === destination.id);
}


export { getRandomArrayElement, getTimeTravel, getPointOffers, getPointDestination, getPointAllOffers, getRandomInteger };
