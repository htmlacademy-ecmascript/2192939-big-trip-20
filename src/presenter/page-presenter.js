import { render, replace } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import ListPointView from '../view/list-point-view.js';
import PointView from '../view/point-view.js';
import EditPointForm from '../view/edit-point-form-view.js';
import NoPointView from '../view/no-point-view.js';


class PagePresenter {
  #pagePoints = null;
  #pageDestinations = null;
  #pageOffers = null;

  #listPointContainer = new ListPointView();
  #tripEventsContainer = document.querySelector('.trip-events');

  constructor({ pagePoints, pageDestinations, pageOffers }) {
    this.#pagePoints = pagePoints;
    this.#pageDestinations = pageDestinations;
    this.#pageOffers = pageOffers;
    render(new SortView(), this.#tripEventsContainer);
    this.#renderListPoint(this.#pagePoints, this.#listPointContainer, this.#tripEventsContainer);
    this.#pagePoints.forEach((pagePoint) => this.#renderPoint(pagePoint, this.#pageDestinations, this.#pageOffers));
  }

  #renderListPoint(points, listPointContainer, tripEventsContainer) {
    render(!points.length ? new NoPointView() : listPointContainer, tripEventsContainer);
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
