import { generateDestinations } from '../mock/point.js';

class DestinationsModel {
  #destinations = generateDestinations();

  get destinations() {
    return this.#destinations;
  }
}

export default DestinationsModel;
