import { generateOffers } from '../mock/point.js';

class OffersModel {
  offers = generateOffers();

  getOffers = () => this.offers;
}

export default OffersModel;
