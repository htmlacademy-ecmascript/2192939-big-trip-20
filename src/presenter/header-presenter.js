import { RenderPosition, render, remove } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';
import TripInfoMainView from '../view/trip-info-main-view.js';
import TripInfoCostView from '../view/trip-info-cost-view.js';
import AbstractView from '../framework/view/abstract-view.js';
import FilterPresenter from './filter-presenter.js';
import { UpdateType } from '../utils/const.js';


class HeaderPresenter extends AbstractView {
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filtersPresenter = null;
  #tripInfoMainComponent = null;
  #tripInfoCostComponent = null;
  #tripInfoComponent = null;
  #filtersModel = null;
  #tripHeaderContainer = null;
  #filtersContainer = null;

  constructor({
    tripHeaderContainer,
    filtersContainer,
    pointsModel,
    destinationsModel,
    offersModel,
    filtersModel,
  }) {
    super();
    this.#tripHeaderContainer = tripHeaderContainer;
    this.#filtersContainer = filtersContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filtersModel = filtersModel;

    this.#tripInfoComponent = new TripInfoView();
    this.#filtersPresenter = new FilterPresenter({
      filtersContainer: this.#filtersContainer,
      filtersModel: this.#filtersModel,
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
    this.#destinationsModel.addObserver(this.#handleModeEvent);
    this.#offersModel.addObserver(this.#handleModeEvent);
    this.#filtersModel.addObserver(this.#handleModeEvent);
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

    this.#filtersPresenter.init();
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

  #handleModeEvent = (updateType) => {
    switch (updateType) {
      case UpdateType.PATCH:
      case UpdateType.MINOR:
      case UpdateType.MAJOR:

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
        break;

      case UpdateType.INIT:
        this.#renderTripInfo();

        if (!this.points.length || !this.destinations.length || !this.offers.length) {
          remove(this.#tripInfoComponent);
          return;
        }
        this.#tripInfoMainComponent = new TripInfoMainView({
          points: this.points,
          destinations: this.destinations,
        });
        this.#renderTripInfoMain();

        this.#tripInfoCostComponent = new TripInfoCostView({
          points: this.points,
          offers: this.offers
        });
        this.#renderTripInfoCost();
        break;
    }
  };
}

export default HeaderPresenter;
