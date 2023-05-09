import dayjs from 'dayjs';
import { getPointOffers, getPointDestination } from '../utils/points.js';
import { getTimeTravel } from '../utils/date.js';
import AbstractView from '../framework/view/abstract-view.js';

function createPointList(pointOffers) {
  let pointList = '';
  pointOffers.forEach((pointOffer) => {
    pointList += `<li class="event__offer">
                      <span class="event__offer-title">${pointOffer.title}</span>
                      &plus;&euro;&nbsp;
                      <span class="event__offer-price">${pointOffer.price}</span>
                    </li>`;
  });
  return pointList;
}

function createPointView(point, destinations, offers) {
  const favoriteClassName = point.isFavorite ? 'event__favorite-btn--active' : '';
  const timeTravel = getTimeTravel(point.dateFrom, point.dateTo);
  const pointOffers = getPointOffers(point, offers);
  const pointDestination = getPointDestination(point, destinations);

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
                  ${createPointList(pointOffers)}
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
}

class PointView extends AbstractView {
  #point = null;
  #destinations = null;
  #offers = null;

  #handleEditPoint = null;

  constructor({ point, destinations, offers, onEditClick }) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    this.#handleEditPoint = onEditClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHadler);
  }

  get template() {
    return createPointView(this.#point, this.#destinations, this.#offers);
  }

  #editClickHadler = (evt) => {
    evt.preventDefault();
    this.#handleEditPoint();
  };
}

export default PointView;
