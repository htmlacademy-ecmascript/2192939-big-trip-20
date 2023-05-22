import HeaderPresenter from './header-presenter.js';
import PagePresenter from './page-presenter.js';

class RootPresenter {
  #pagePoints = null;
  #pageDestinations = null;
  #pageOffers = null;
  #tripEventsContainer = null;
  #headerPresenter = null;
  #pagePresenter = null;

  constructor({ tripEventsContainer }) {
    this.#tripEventsContainer = tripEventsContainer;
  }

  init(pointsModel, destinationsModel, offersModel) {
    this.#pagePoints = [...pointsModel.points];
    this.#pageDestinations = [...destinationsModel.destinations];
    this.#pageOffers = [...offersModel.offers];

    this.#headerPresenter = new HeaderPresenter();
    this.#pagePresenter = new PagePresenter({ tripEventsContainer: this.#tripEventsContainer });

    this.#headerPresenter.init({
      pagePoints: this.#pagePoints,
      pageDestinations: this.#pageDestinations,
      pageOffers: this.#pageOffers,
    });
    this.#pagePresenter.init(this.#pagePoints, this.#pageDestinations, this.#pageOffers,);
  }

}

export default RootPresenter;
