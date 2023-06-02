import Observable from '../framework/observable.js';

class OffersModel extends Observable {
  #offersApiService = null;
  #offers = [];

  constructor({ offersApiService }) {
    super();
    this.#offersApiService = offersApiService;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    try {
      this.#offers = this.#offersApiService.offers;
    } catch (err) {
      this.#offers = [];
    }
  }
}

export default OffersModel;
