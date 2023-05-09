

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


export { getPointOffers, getPointDestination, getPointAllOffers };
