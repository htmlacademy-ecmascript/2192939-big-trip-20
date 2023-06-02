import Observable from '../framework/observable.js';

class DestinationsModel extends Observable {
  #destinationsApiService = null;
  #destinations = [];

  constructor({ destinationsApiService }) {
    super();
    this.#destinationsApiService = destinationsApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      this.#destinations = this.#destinationsApiService.destinations;
    } catch (err) {
      this.#destinations = [];
    }
  }
}

export default DestinationsModel;
