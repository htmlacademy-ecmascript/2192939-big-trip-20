import { RenderPosition, render } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import TripInfoView from '../view/trip-info-view.js';
import TripInfoMainView from '../view/trip-info-main-view.js';
import TripInfoCostView from '../view/trip-info-cost-view.js';
import AbstractView from '../framework/view/abstract-view.js';
import { generateFilter } from '../mock/filter.js';

const tripMainContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');

class HeaderPresenter extends AbstractView {
  #pagePoints = null;
  #pageDestinations = null;
  #pageOffers = null;
  #filters = null;
  #filtersComponent = null;
  #tripInfoMainComponent = null;
  #tripInfoCostComponent = null;
  #tripInfoComponent = null;

  constructor({ pagePoints, pageDestinations, pageOffers }) {
    super();
    this.#pagePoints = pagePoints;
    this.#pageDestinations = pageDestinations;
    this.#pageOffers = pageOffers;

    this.#tripInfoComponent = new TripInfoView();
    this.#filters = generateFilter(this.#pagePoints);
    this.#filtersComponent = new FilterView(this.#filters);
    this.#tripInfoMainComponent = new TripInfoMainView({
      points: this.#pagePoints,
      destinations: this.#pageDestinations,
    });
    this.#tripInfoCostComponent = new TripInfoCostView({
      points: this.#pagePoints,
      offers: this.#pageOffers
    });
    this.#renderHeader();
  }

  #renderHeader() {
    if (!this.#pagePoints.length) {
      this.#renderFilters();
      return;
    }

    this.#renderTripInfo();
    this.#renderFilters();
    this.#renderTripInfoMain();
    this.#renderTripInfoCost();
  }

  #renderTripInfo() {
    render(this.#tripInfoComponent, tripMainContainer, RenderPosition.AFTERBEGIN);
  }

  #renderFilters() {
    render(this.#filtersComponent, filtersContainer);
  }

  #renderTripInfoMain() {
    render(this.#tripInfoMainComponent, this.#tripInfoComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderTripInfoCost() {
    render(this.#tripInfoCostComponent, this.#tripInfoComponent.element);
  }
}

export default HeaderPresenter;
