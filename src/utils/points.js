

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
  return points.map((point) => point.id === update.date ? update : point);
}


export { getPointOffers, getPointDestination, getPointAllOffers, updatePoint };
