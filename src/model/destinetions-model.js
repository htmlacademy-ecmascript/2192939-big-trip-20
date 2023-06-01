import Observable from '../framework/observable.js';
import { generateDestinations } from '../mock/point.js';

/**
 * @class Модель описания точки маршрута
 * @extends Observable
 */
class DestinationsModel extends Observable {
  #destinations = generateDestinations();

  /**
   * Геттер массива описаний точки маршрута
   * @returns {Array.<objects>} #destinations
   */
  get destinations() {
    return this.#destinations;
  }
}

export default DestinationsModel;
