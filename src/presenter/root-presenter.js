import HeaderPresenter from './header-presenter.js';
import PagePresenter from './page-presenter.js';

class RootPresenter {
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #tripEventsContainer = null;
  #headerPresenter = null;
  #pagePresenter = null;

  constructor({ tripEventsContainer }) {
    this.#tripEventsContainer = tripEventsContainer;
  }

  init(pointsModel, destinationsModel, offersModel) {
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#headerPresenter = new HeaderPresenter({
      pointsModel: this.#pointsModel,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
    });
    this.#pagePresenter = new PagePresenter({
      tripEventsContainer: this.#tripEventsContainer,
      pointsModel: this.#pointsModel,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
    });

    this.#headerPresenter.init();
    this.#pagePresenter.init();
  }
}

export default RootPresenter;
