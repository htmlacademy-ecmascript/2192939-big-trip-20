import { createElement } from '../render.js';
import { getPointsDestinathion } from '../utils.js';

const createTripInfoMainView = (points, destinations) => {
  const pointsName = getPointsDestinathion(points, destinations);
  const pointsNameList = pointsName.length > 3 ? `${pointsName[0].name} &mdash; ${'...'} &mdash; ${pointsName[pointsName.length - 1].name}`
    : `${pointsName[0].name} &mdash; ${pointsName[1].name} &mdash; ${pointsName[pointsName.length - 1].name}`;

  return /*html*/`<div class="trip-info__main">
              <h1 class="trip-info__title">${pointsNameList}</h1>

              <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
            </div>`;
};

class TripInfoMainView {
  constructor({ points, destinations, offers }) {
    this.points = points;
    this.destinations = destinations;
    this.offers = offers;
  }

  getTemplate = () => createTripInfoMainView(this.points, this.destinations, this.offers);

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

export default TripInfoMainView;
