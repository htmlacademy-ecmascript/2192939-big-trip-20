import HeaderPresenter from './header-presenter.js';
import PagePresenter from './page-presenter.js';


class RootPresenter {
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;
  #tripEventsContainer = null;
  #tripHeaderContainer = null;
  #filtersContainer = null;
  #headerPresenter = null;
  #pagePresenter = null;

  constructor({ tripEventsContainer, tripHeaderContainer, filtersContainer }) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripHeaderContainer = tripHeaderContainer;
    this.#filtersContainer = filtersContainer;
  }

  init(pointsModel, destinationsModel, offersModel, filterModel) {
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#headerPresenter = new HeaderPresenter({
      tripHeaderContainer: this.#tripHeaderContainer,
      filtersContainer: this.#filtersContainer,
      pointsModel: this.#pointsModel,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      filterModel: this.#filterModel,
    });
    this.#pagePresenter = new PagePresenter({
      tripEventsContainer: this.#tripEventsContainer,
      tripHeaderContainer: this.#tripHeaderContainer,
      pointsModel: this.#pointsModel,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      filterModel: this.#filterModel
    });

    this.#headerPresenter.init();
    this.#pagePresenter.init();
  }
}

export default RootPresenter;
