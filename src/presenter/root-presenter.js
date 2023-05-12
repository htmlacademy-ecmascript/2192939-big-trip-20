import HeaderPresenter from './header-presenter.js';
import PagePresenter from './page-presenter.js';

class RootPresenter {
  #pagePoints = null;
  #pageDestinations = null;
  #pageOffers = null;
  #tripEventsContainer = null;
  #headerPresenter = null;
  #pagePresenter = null;

  constructor({ pointsModel, destinationsModel, offersModel, tripEventsContainer }) {
    this.#pagePoints = [...pointsModel.points];
    this.#pageDestinations = [...destinationsModel.destinations];
    this.#pageOffers = offersModel.offers;
    this.#tripEventsContainer = tripEventsContainer;

    this.#headerPresenter = new HeaderPresenter({
      pagePoints: this.#pagePoints,
      pageDestinations: this.#pageDestinations,
      pageOffers: this.#pageOffers
    });
    this.#pagePresenter = new PagePresenter({
      pagePoints: this.#pagePoints,
      pageDestinations: this.#pageDestinations,
      pageOffers: this.#pageOffers,
      tripEventsContainer: this.#tripEventsContainer
    });
  }

}

export default RootPresenter;
