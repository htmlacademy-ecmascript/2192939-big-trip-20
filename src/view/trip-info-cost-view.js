import AbstractView from '../framework/view/abstract-view.js';
import { getPointOffers } from '../utils/points.js';

function createTripInfoCostView(points, offers) {
  let costOffers = 0;
  const costPoints = points.reduce((sum, point) => sum + point.basePrice, 0);
  for (const point of points) {
    costOffers += getPointOffers(point, offers).reduce((sum, offer) => sum + offer.price, 0);
  }

  return /*html*/`<p class="trip-info__cost">
Total: &euro;&nbsp;<span class="trip-info__cost-value">${costPoints + costOffers}</span>
            </p >`;
}
class TripInfoCostView extends AbstractView {
  #points = null;
  #offers = null;

  get template() {
    return createTripInfoCostView(this.#points, this.#offers);
  }

  init({ points, offers }) {
    this.#points = points;
    this.#offers = offers;
  }
}

export default TripInfoCostView;
