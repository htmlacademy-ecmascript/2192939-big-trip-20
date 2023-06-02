import Observable from '../framework/observable.js';
import { generateOffers } from '../mock/point.js';

class OffersModel extends Observable {
  #offersApiService = null;
  #offers = generateOffers();

  constructor({ offersApiService }) {
    super();
    this.#offersApiService = offersApiService;

    this.#offersApiService.offers.then((offers) => console.log(offers));
  }

  get offers() {
    return this.#offers;
  }
}

export default OffersModel;
