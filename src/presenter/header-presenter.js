import { RenderPosition, render } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import TripInfoView from '../view/trip-info-view.js';
import TripInfoMainView from '../view/trip-info-main-view.js';
import TripInfoCostView from '../view/trip-info-cost-view.js';
import AbstractView from '../framework/view/abstract-view.js';


class HeaderPresenter extends AbstractView {
  #pagePoints = null;
  #pageDestinations = null;
  #pageOffers = null;

  #tripInfoContainer = new TripInfoView();
  #tripMainContainer = document.querySelector('.trip-main');
  #filtersContainer = document.querySelector('.trip-controls__filters');

  constructor({ pagePoints, pageDestinations, pageOffers }) {
    super();
    this.#pagePoints = pagePoints;
    this.#pageDestinations = pageDestinations;
    this.#pageOffers = pageOffers;
    render(new FilterView(), this.#filtersContainer);
    render(this.#tripInfoContainer, this.#tripMainContainer, RenderPosition.AFTERBEGIN);
    render(new TripInfoMainView({ points: this.#pagePoints, destinations: this.#pageDestinations, offers: this.#pageOffers }), this.#tripInfoContainer.element);
    render(new TripInfoCostView({ points: this.#pagePoints, destinations: this.#pageDestinations, offers: this.#pageOffers }), this.#tripInfoContainer.element);
  }
}

export default HeaderPresenter;
