import { createElement } from '../render.js';
import dayjs from 'dayjs';
import { mockOffers, mockDestinations } from '../mock/point.js';
import { getTimeTravel, getPointOffers, getPointDestination } from '../utils.js';

const createPointLis = (pointOffer) => {
  let pointList = '';
  for (let i = 0; i < pointOffer.length; i++) {
    pointList += `<li class="event__offer">
                      <span class="event__offer-title">${pointOffer[i].title}</span>
                      &plus;&euro;&nbsp;
                      <span class="event__offer-price">${pointOffer[0].price}</span>
                    </li>`;
  }
  return pointList;
};

const createPointView = (point) => {
  const favoriteClassName = point.isFavorite ? 'event__favorite-btn--active' : '';
  const timeTravel = getTimeTravel(point.dateFrom, point.dateTo);
  const pointOffer = getPointOffers(point, mockOffers);
  const pointDestination = getPointDestination(point, mockDestinations);

  return /*html*/`<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">${dayjs(point.dateFrom).format('MMM D')}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${point.type} ${pointDestination.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="2019-03-18T10:30">${dayjs(point.dateFrom).format('HH:mm')}</time>
                    &mdash;
                    <time class="event__end-time" datetime="2019-03-18T11:00">${dayjs(point.dateTo).format('HH:mm')}</time>
                  </p>
                  <p class="event__duration">${timeTravel}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${point.basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${createPointLis(pointOffer)}
                </ul>
                <button class="event__favorite-btn ${favoriteClassName}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
};

class PointView {
  constructor({ point }) {
    this.point = point;
  }

  getTemplate = () => createPointView(this.point);

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

export default PointView;
