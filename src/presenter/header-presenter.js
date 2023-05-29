import { RenderPosition, render, remove } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';
import TripInfoMainView from '../view/trip-info-main-view.js';
import TripInfoCostView from '../view/trip-info-cost-view.js';
import AbstractView from '../framework/view/abstract-view.js';
import FilterPresenter from './filter-presenter.js';


class HeaderPresenter extends AbstractView {
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filtersPresenter = null;
  #tripInfoMainComponent = null;
  #tripInfoCostComponent = null;
  #tripInfoComponent = null;
  #filterModel = null;
  #tripHeaderContainer = null;
  #filtersContainer = null;

  constructor({
    tripHeaderContainer,
    filtersContainer,
    pointsModel,
    destinationsModel,
    offersModel,
    filterModel,
  }) {
    super();
    this.#tripHeaderContainer = tripHeaderContainer;
    this.#filtersContainer = filtersContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#tripInfoComponent = new TripInfoView();
    this.#filtersPresenter = new FilterPresenter({
      filtersContainer: this.#filtersContainer,
      filterModel: this.#filterModel,
      pointsModel: this.#pointsModel,
    });
    this.#tripInfoMainComponent = new TripInfoMainView({
      points: this.points,
      destinations: this.destinations,
    });
    this.#tripInfoCostComponent = new TripInfoCostView({
      points: this.points,
      offers: this.offers
    });

    this.#pointsModel.addObserver(this.#handleModeEvent);
    this.#filterModel.addObserver(this.#handleModeEvent);
  }

  get points() {
    return this.#pointsModel.points;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  get offers() {
    return this.#offersModel.offers;
  }


  init() {
    if (!this.points.length) {
      this.#filtersPresenter.init();
      return;
    }

    this.#renderTripInfo();
    this.#filtersPresenter.init();
    this.#renderTripInfoMain();
    this.#renderTripInfoCost();
  }


  #renderTripInfo() {
    render(this.#tripInfoComponent, this.#tripHeaderContainer, RenderPosition.AFTERBEGIN);
  }

  #renderTripInfoMain() {
    render(this.#tripInfoMainComponent, this.#tripInfoComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderTripInfoCost() {
    this.#tripInfoCostComponent.init({
      points: this.points,
      offers: this.offers
    });
    render(this.#tripInfoCostComponent, this.#tripInfoComponent.element);
  }

  #handleModeEvent = () => {
    if (!this.points.length) {
      remove(this.#tripInfoComponent);
      return;
    }
    remove(this.#tripInfoMainComponent);
    this.#tripInfoMainComponent = new TripInfoMainView({
      points: this.points,
      destinations: this.destinations,
    });
    this.#renderTripInfoMain();

    remove(this.#tripInfoCostComponent);
    this.#tripInfoCostComponent = new TripInfoCostView({
      points: this.points,
      offers: this.offers
    });
    this.#renderTripInfoCost();
  };
}

export default HeaderPresenter;
