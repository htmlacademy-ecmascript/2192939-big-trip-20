import HeaderPresenter from './header-presenter.js';
import PagePresenter from './page-presenter.js';

class RootPresenter {
  #pagePoints = null;
  #pageDestinations = null;
  #pageOffers = null;
  #headerPresenter = null;
  #pagePresenter = null;

  constructor({ pointsModel, destinationsModel, offersModel }) {
    this.#pagePoints = [...pointsModel.points];
    this.#pageDestinations = [...destinationsModel.destinations];
    this.#pageOffers = offersModel.offers;
    this.#headerPresenter = new HeaderPresenter({
      pagePoints: this.#pagePoints,
      pageDestinations: this.#pageDestinations,
      pageOffers: this.#pageOffers
    });
    this.#pagePresenter = new PagePresenter({
      pagePoints: this.#pagePoints,
      pageDestinations: this.#pageDestinations,
      pageOffers: this.#pageOffers
    });
  }

}

export default RootPresenter;
