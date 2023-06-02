import Observable from '../framework/observable.js';
import { generateDestinations } from '../mock/point.js';

/**
 * @class Модель описания точки маршрута
 * @extends Observable
 */
class DestinationsModel extends Observable {
  #destinationsApiService = null;
  #destinations = generateDestinations();

  constructor({ destinationsApiService }) {
    super();
    this.#destinationsApiService = destinationsApiService;

    this.#destinationsApiService.destinations.then((destinations) => console.log(destinations));


  }

  get destinations() {
    return this.#destinations;
  }
}

export default DestinationsModel;
