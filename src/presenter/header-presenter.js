import { RenderPosition, render } from '../render';
import FilterView from '../view/filter-view.js';
import TripInfoView from '../view/trip-info-view.js';
import TripInfoMainView from '../view/trip-info-main-view.js';
import TripInfoCostView from '../view/trip-info-cost-view.js';

const tripInfoContainer = new TripInfoView();
const tripMainContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');

class HeaderPresenter {
  constructor({ pagePoints, pageDestinations, pageOffers }) {
    this.pagePoints = pagePoints;
    this.pageDestinations = pageDestinations;
    this.pageOffers = pageOffers;
    render(new FilterView(), filtersContainer);
    render(tripInfoContainer, tripMainContainer, RenderPosition.AFTERBEGIN);
    render(new TripInfoMainView({ points: this.pagePoints,destinations:this.pageDestinations,offers:this.pageOffers }), tripInfoContainer.getElement());
    render(new TripInfoCostView({ points: this.pagePoints,destinations:this.pageDestinations,offers:this.pageOffers }), tripInfoContainer.getElement());
  }
}

export default HeaderPresenter;
