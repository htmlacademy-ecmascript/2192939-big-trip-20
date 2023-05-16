import dayjs from 'dayjs';

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

function updatePoint(points, update) {
  return points.map((point) => point.id === update.id ? update : point);
}

function durationPoint(point) {
  return dayjs(point.dateTo).diff(dayjs(point.dateFrom));
}

function sortPointByTime(points) {
  return points.sort((a, b) => durationPoint(b) - durationPoint(a));
}

function sortPointByPrice(points) {
  return points.sort((a, b) => b.basePrice - a.basePrice);
}

export {
  getPointOffers,
  getPointDestination,
  getPointAllOffers,
  updatePoint,
  sortPointByTime,
  sortPointByPrice,
};
