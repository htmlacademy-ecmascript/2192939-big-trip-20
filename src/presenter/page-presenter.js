import { render, replace, RenderPosition } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import ListPointView from '../view/list-point-view.js';
import PointView from '../view/point-view.js';
import EditPointForm from '../view/edit-point-form-view.js';
import NoPointView from '../view/no-point-view.js';


class PagePresenter {
  #pagePoints = null;
  #pageDestinations = null;
  #pageOffers = null;
  #tripEventsContainer = null;

  #listPointContainer = new ListPointView();
  #sortPointComponent = new SortView();
  #noPointComponent = new NoPointView();

  constructor({ pagePoints, pageDestinations, pageOffers, tripEventsContainer }) {
    this.#pagePoints = pagePoints;
    this.#pageDestinations = pageDestinations;
    this.#pageOffers = pageOffers;
    this.#tripEventsContainer = tripEventsContainer;

    this.#renderListPoint(this.#pagePoints, this.#listPointContainer, this.#tripEventsContainer);

  }

  #renderListPoint(points, listPointContainer, tripEventsContainer) {
    if (!points.length) {
      this.#noPointComponent();
      return;
    }

    this.#renderListPointContainer(listPointContainer, tripEventsContainer);
    this.#renderSort();
    this.#pagePoints.forEach((pagePoint) => this.#renderPoint(pagePoint, this.#pageDestinations, this.#pageOffers));
  }


  #renderListPointContainer(listPointContainer, tripEventsContainer) {
    render(listPointContainer, tripEventsContainer);
  }

  #renderSort() {
    render(this.#sortPointComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point, destinations, offers) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
      }
      document.removeEventListener('keydown', escKeyDownHandler);
    };

    const pointComponent = new PointView({
      point,
      destinations,
      offers,
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new EditPointForm({
      point, destinations, offers,
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onFormClose: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#listPointContainer.element);
  }
}

export default PagePresenter;
