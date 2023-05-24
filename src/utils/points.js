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

function getPointOffersId(offers, offersType) {
  return offers.find((offer) => offersType === offer.type).offers.map((offer) => offer.id);
}

function getPointDestination(point, destinations) {
  console.log(point);
  return destinations.find((destination) => point.destination === destination.id);
}

function getPointDestinationId(destinations, destinationName) {
  return destinations.find((destination) => destinationName === destination.name).id;
}

function durationPoint(point) {
  return dayjs(point.dateTo).diff(dayjs(point.dateFrom));
}

function sortPointByTime(points) {
  return [...points].sort((a, b) => durationPoint(b) - durationPoint(a));
}

function sortPointByPrice(points) {
  return [...points].sort((a, b) => b.basePrice - a.basePrice);
}

function isDateEqual(dateA, dateB) {
  return dayjs(dateA).isSame(dateB, 'm');
}

function isPriceEqual(priceA, priceB) {
  return priceA === priceB;
}

export {
  getPointOffers,
  getPointDestination,
  getPointDestinationId,
  getPointAllOffers,
  getPointOffersId,
  sortPointByTime,
  sortPointByPrice,
  isDateEqual,
  isPriceEqual,
};
