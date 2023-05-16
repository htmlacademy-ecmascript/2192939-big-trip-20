import { render, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import ListPointView from '../view/list-point-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import { updatePoint, sortPointByTime, sortPointByPrice, } from '../utils/points.js';
import { SortType } from '../utils/const.js';

class PagePresenter {
  #pagePoints = null;
  #pageDestinations = null;
  #pageOffers = null;
  #tripEventsContainer = null;

  #sortPointComponent = null;
  #listPointComponent = new ListPointView();
  #noPointComponent = new NoPointView();

  #pointPresenters = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedPagePoints = [];

  constructor({
    pagePoints,
    pageDestinations,
    pageOffers,
    tripEventsContainer,
  }) {
    this.#pagePoints = pagePoints;
    this.#pageDestinations = pageDestinations;
    this.#pageOffers = pageOffers;
    this.#tripEventsContainer = tripEventsContainer;
    this.#sourcedPagePoints = [...this.#pagePoints];

    this.#renderSort();
    this.#renderListPoint(this.#pagePoints, this.#listPointComponent, this.#tripEventsContainer);

  }

  #renderListPoint(points, listPointComponent, tripEventsContainer) {
    if (!points.length) {
      this.#renderNoPointComponent();
      return;
    }

    this.#renderListPointComponent(listPointComponent, tripEventsContainer);
    this.#pagePoints.forEach((pagePoint) =>
      this.#renderPoint(pagePoint,
        this.#pageDestinations,
        this.#pageOffers));
  }

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this.#pagePoints = [...sortPointByTime(this.#pagePoints)];
        break;
      case SortType.PRICE:
        this.#pagePoints = [...sortPointByPrice(this.#pagePoints)];
        break;
      default:
        this.#pagePoints = [...this.#sourcedPagePoints];
    }

    this.#currentSortType = sortType;
  }


  #renderListPointComponent(listPointComponent, tripEventsContainer) {
    render(listPointComponent, tripEventsContainer);
  }

  #renderSort() {
    this.#sortPointComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
    });
    render(this.#sortPointComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point, destinations, offers) {
    const pointPresenter = new PointPresenter({
      listPointContainer:
        this.#listPointComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point, destinations, offers);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearListPoint() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderNoPointComponent() {
    render(this.#noPointComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearListPoint();
    this.#renderListPoint(this.#pagePoints, this.#listPointComponent, this.#tripEventsContainer);
  };

  #handlePointChange = (updatedPoint) => {
    this.#pagePoints = updatePoint(this.#pagePoints, updatedPoint);
    this.#sourcedPagePoints = updatePoint(this.#sourcedPagePoints, updatePoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.#pageDestinations, this.#pageOffers);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => {
      presenter.resetView();
    }
    );
  };
}

export default PagePresenter;
