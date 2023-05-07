import { generateOffers } from '../mock/point.js';

class OffersModel {
  #offers = generateOffers();

  get offers() {
    return this.#offers;
  }
}

export default OffersModel;
