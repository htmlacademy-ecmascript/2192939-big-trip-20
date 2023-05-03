import { createElement } from '../render.js';

const createTripInfoView = () => '<section class="trip-main__trip-info  trip-info"></section>';

class TripInfoView {
  getTemplate = () => createTripInfoView();

  getElement = () => {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  };

  removeElement = () => {
    this.element = null;
  };
}

export default TripInfoView;
