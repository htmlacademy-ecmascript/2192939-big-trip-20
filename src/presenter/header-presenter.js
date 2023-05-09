import { RenderPosition, render } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import TripInfoView from '../view/trip-info-view.js';
import TripInfoMainView from '../view/trip-info-main-view.js';
import TripInfoCostView from '../view/trip-info-cost-view.js';
import AbstractView from '../framework/view/abstract-view.js';
import { generateFilter } from '../mock/filter.js';

const tripInfoContainer = new TripInfoView();
const tripMainContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');


class HeaderPresenter extends AbstractView {
  #pagePoints = null;
  #pageDestinations = null;
  #pageOffers = null;
  #filters = null;

  constructor({ pagePoints, pageDestinations, pageOffers }) {
    super();
    this.#pagePoints = pagePoints;
    this.#pageDestinations = pageDestinations;
    this.#pageOffers = pageOffers;
    this.#filters = generateFilter(this.#pagePoints);
    render(new FilterView(this.#filters), filtersContainer);
    render(tripInfoContainer, tripMainContainer, RenderPosition.AFTERBEGIN);
    render(new TripInfoMainView({ points: this.#pagePoints, destinations: this.#pageDestinations }), tripInfoContainer.element);
    render(new TripInfoCostView({ points: this.#pagePoints, offers: this.#pageOffers }), tripInfoContainer.element);
  }
}

export default HeaderPresenter;
