import AbstractView from '../framework/view/abstract-view.js';
import { getPointDestination } from '../utils/points.js';
import dayjs from 'dayjs';

function createTripInfoTitle(points, destinations) {
  const firstPoint = points.length > 0 ? getPointDestination(points[0], destinations).name : '';
  const endPoint = getPointDestination(points[points.length - 1], destinations).name;

  let midllePoint = null;
  let tripInfoTitle = '';

  switch (points.length) {
    case 1:
      tripInfoTitle = `<h1 class="trip-info__title">${firstPoint}`;
      break;
    case 2:
      tripInfoTitle = `<h1 class="trip-info__title">${firstPoint} &mdash; ${endPoint}`;
      break;
    case 3:
      midllePoint = getPointDestination(points[1], destinations).name;
      tripInfoTitle = `<h1 class="trip-info__title">${firstPoint} &mdash; ${midllePoint} &mdash; ${endPoint}</h1>`;
      break;
    default:
      tripInfoTitle = `<h1 class="trip-info__title">${firstPoint} &mdash; ${'. . .'} &mdash; ${endPoint}</h1>`;
      break;
  }
  return tripInfoTitle;
}

function createTripInfoMainView(points, destinations) {
  const firstDate = points.length > 0 ? dayjs(points[0].dateFrom).format('MMM DD') : '';
  let secondDate = points.length > 1 ? `${'&nbsp;&mdash;&nbsp;'}${dayjs(points[points.length - 1].dateTo).format('MMM DD')}` : '';

  if (dayjs(points[0].dateFrom).format('MMM') === dayjs(points[points.length - 1].dateTo).format('MMM')) {
    secondDate = points.length > 1 ? `${'&nbsp;&mdash;&nbsp;'}${dayjs(points[points.length - 1].dateTo).format('DD')}` : '';
  }
  return /*html*/`<div class="trip-info__main">
    ${createTripInfoTitle(points, destinations)}

    <p class="trip-info__dates">${firstDate}${secondDate}</p>
  </div > `;
}

class TripInfoMainView extends AbstractView {
  #points = null;
  #destinations = null;

  constructor({ points, destinations }) {
    super();

    this.#points = points;
    this.#destinations = destinations;
  }

  get template() {
    return createTripInfoMainView(this.#points, this.#destinations);
  }
}

export default TripInfoMainView;