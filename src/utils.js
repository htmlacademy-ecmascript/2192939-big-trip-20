const HOURES_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const SECONDS_IN_MINUTE = 60;
const MILLISECONDS_IN_SECONDS = 1000;

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];
const getRandomInteger = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};


const formatDate = (date, item) => {
  if (date < 10) {
    return `0${date}${item}`;
  } else {
    return `${date}${item}`;
  }
};

const getTimeTravel = (date1, date2) => {
  const dateFirst = Date.parse(date1);
  const dateSecond = Date.parse(date2);
  let date = '';
  const days = Math.trunc((dateSecond - dateFirst) / MILLISECONDS_IN_SECONDS / SECONDS_IN_MINUTE / MINUTES_IN_HOUR / HOURES_IN_DAY);
  let houres = Math.trunc((dateSecond - dateFirst) / MILLISECONDS_IN_SECONDS / SECONDS_IN_MINUTE / MINUTES_IN_HOUR);
  let minutes = Math.trunc((dateSecond - dateFirst) / MILLISECONDS_IN_SECONDS / SECONDS_IN_MINUTE);
  date += days > 0 ? formatDate(days, 'D ') : '';
  houres -= days * HOURES_IN_DAY;
  date += houres > 0 ? formatDate(houres, 'H ') : '';
  minutes -= (days * HOURES_IN_DAY + houres) * MINUTES_IN_HOUR;
  date += minutes > 0 ? formatDate(minutes, 'M') : '00M';

  return date;
};

const getPointOffers = (point, offers) => {
  const pointOffers = [];
  offers.forEach((offer) => {
    if (point.type === offer.type) {
      point.offers.forEach((pointId) => {
        offer.offers.forEach((offerId) => {
          if (pointId === offerId.id) {
            pointOffers.push(offerId);
          }
        });
      });
    }
  });
  return pointOffers;
};

const getPointAllOffers = (point, offers) => offers.find((offer) => point.type === offer.type);

const getPointDestination = (point, destinations) => {
  let pointDestination = {};
  destinations.forEach((destination) => {
    if (point.id === destination.id) {
      pointDestination = destination;
    }
  });
  return pointDestination;
};

const getPointsDestinathion = (points, destinations) => {
  const pointsDestination = [];
  points.forEach((point) => {
    pointsDestination.push(getPointDestination(point, destinations));
  });
  return pointsDestination;
};

export { getRandomArrayElement, getTimeTravel, getPointOffers, getPointDestination, getPointsDestinathion, getPointAllOffers, getRandomInteger };
