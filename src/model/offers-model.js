import Observable from '../framework/observable.js';
import { generateOffers } from '../mock/point.js';

/**
 * @class Модель офферов точки маршрута
 * @extends {Observable}
 */
class OffersModel extends Observable {
  #offers = generateOffers();

  /**
   * Геттер массива офферов точки маршрута
   * @returns {Array.<objects>} #offers
   */
  get offers() {
    return this.#offers;
  }
}

export default OffersModel;
