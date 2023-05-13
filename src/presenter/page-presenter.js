import { render, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import ListPointView from '../view/list-point-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';

class PagePresenter {
  #pagePoints = null;
  #pageDestinations = null;
  #pageOffers = null;
  #tripEventsContainer = null;

  #listPointComponent = new ListPointView();
  #sortPointComponent = new SortView();
  #noPointComponent = new NoPointView();

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

    this.#renderListPoint(this.#pagePoints, this.#listPointComponent, this.#tripEventsContainer);

  }

  #renderListPoint(points, listPointComponent, tripEventsContainer) {
    if (!points.length) {
      this.#renderNoPointComponent();
      return;
    }

    this.#renderSort();
    this.#renderListPointComponent(listPointComponent, tripEventsContainer);
    this.#pagePoints.forEach((pagePoint) =>
      this.#renderPoint(pagePoint,
        this.#pageDestinations,
        this.#pageOffers));
  }


  #renderListPointComponent(listPointComponent, tripEventsContainer) {
    render(listPointComponent, tripEventsContainer);
  }

  #renderSort() {
    render(this.#sortPointComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point, destinations, offers) {
    const pointPresenter = new PointPresenter({
      listPointContainer:
        this.#listPointComponent.element
    });

    pointPresenter.init(point, destinations, offers);
  }

  #renderNoPointComponent() {
    render(this.#noPointComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);
  }
}

export default PagePresenter;
