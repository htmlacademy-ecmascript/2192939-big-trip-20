import { render, RenderPosition, remove } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import ListPointView from '../view/list-point-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import { sortPointByTime, sortPointByPrice, } from '../utils/points.js';
import { SortType, UpdateType, UserAction, FilterType } from '../utils/const.js';
import { filter } from '../utils/filter.js';

class PagePresenter {
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;
  #tripEventsContainer = null;

  #sortPointComponent = null;
  #listPointComponent = new ListPointView();
  #noPointComponent = null;

  #pointPresenters = new Map();
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;

  constructor({
    tripEventsContainer,
    pointsModel,
    destinationsModel,
    offersModel,
    filterModel,
  }) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModeEvent);
    this.#filterModel.addObserver(this.#handleModeEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return sortPointByTime(filteredPoints);
      case SortType.PRICE:
        return sortPointByPrice(filteredPoints);
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
