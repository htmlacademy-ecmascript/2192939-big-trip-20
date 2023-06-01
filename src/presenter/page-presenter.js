import { render, RenderPosition, remove } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import ListPointView from '../view/list-point-view.js';
import NoPointView from '../view/no-point-view.js';
import NewPointButtonView from '../view/new-point-button-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import { sortPointByTime, sortPointByPrice, sortPointByDay, } from '../utils/points.js';
import { SortType, UpdateType, UserAction, FilterType, EMPTY_POINT } from '../utils/const.js';
import { filter } from '../utils/filter.js';

class PagePresenter {
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filtersModel = null;
  #tripEventsContainer = null;
  #tripHeaderContainer = null;

  #sortPointComponent = null;
  #listPointComponent = new ListPointView();
  #noPointComponent = null;
  #newPointButtonComponent = null;

  #pointPresenters = new Map();
  #newPointPresenter = null;
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;

  constructor({
    tripEventsContainer,
    tripHeaderContainer,
    pointsModel,
    destinationsModel,
    offersModel,
    filtersModel,
  }) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#tripHeaderContainer = tripHeaderContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filtersModel = filtersModel;

    this.#newPointButtonComponent = new NewPointButtonView({
      onNewPointButtonClick: this.#handleNewPointButtonClick
    });

    render(this.#newPointButtonComponent, this.#tripHeaderContainer);


    this.#pointsModel.addObserver(this.#handleModeEvent);
    this.#filtersModel.addObserver(this.#handleModeEvent);
  }

  get points() {
    this.#filterType = this.#filtersModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return sortPointByTime(filteredPoints);
      case SortType.PRICE:
        return sortPointByPrice(filteredPoints);
      case SortType.DEFAULT:
        return sortPointByDay(filteredPoints);
    }
    return filteredPoints;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  init() {
    this.#renderListPoint(this.points, this.#listPointComponent, this.#tripEventsContainer);
  }

  #renderListPoint() {
    if (!this.points.length) {
      this.#renderNoPointComponent();
      return;
    }

    this.#renderSort();

    this.#renderListPointComponent(this.#listPointComponent, this.#tripEventsContainer);
    this.points.forEach((point) =>
      this.#renderPoint(point,
        this.destinations,
        this.offers));
  }

  #renderListPointComponent(listPointComponent, tripEventsContainer) {
    render(listPointComponent, tripEventsContainer);
  }

  #renderSort() {
    this.#sortPointComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });
    render(this.#sortPointComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point, destinations, offers) {
    const pointPresenter = new PointPresenter({
      listPointContainer:
        this.#listPointComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point, destinations, offers);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearListPoint({ resetSortType = false } = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortPointComponent);
    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderNoPointComponent() {
    this.#noPointComponent = new NoPointView({ filterType: this.#filterType });
    render(this.#noPointComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);
  }

  #handleNewPointButtonClick = () => {
    this.#newPointPresenter = new NewPointPresenter({
      listPointContainer: this.#listPointComponent.element,
      point: EMPTY_POINT,
      destinations: this.destinations,
      offers: this.offers,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      onNewPointEditClose: this.#handleNewPointEditClose
    });
    this.#newPointButtonComponent.element.disabled = true;

    this.#filtersModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  };

  #handleNewPointEditClose = () => {
    this.#newPointButtonComponent.element.disabled = false;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearListPoint();
    this.#renderListPoint();
  };


  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => {
      presenter.resetView();
    }
    );
  };

  #handleModeEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data, this.destinations, this.offers);
        break;
      case UpdateType.MINOR:
        this.#clearListPoint();

        this.#renderListPoint();
        break;
      case UpdateType.MAJOR:
        this.#clearListPoint({ resetSortType: true });

        this.#renderListPoint();
        break;
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };
}

export default PagePresenter;
