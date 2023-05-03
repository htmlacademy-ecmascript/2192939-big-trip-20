import { getOffers } from '../mock/point.js';

class OffersModel {
  offers = getOffers();

  getOffers = () => this.offers;
}

export default OffersModel;
