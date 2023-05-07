import AbstractView from '../framework/view/abstract-view.js';

function createTripInfoMainView() {
  return /*html*/`<div class="trip-info__main">
              <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

              <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
            </div>`;
}

class TripInfoMainView extends AbstractView {
  #points = null;
  #destinations = null;
  #offers = null;

  constructor({ points, destinations, offers }) {
    super();

    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createTripInfoMainView(this.#points, this.#destinations, this.#offers);
  }
}

export default TripInfoMainView;
