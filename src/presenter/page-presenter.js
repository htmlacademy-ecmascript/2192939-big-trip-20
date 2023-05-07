import { render, replace } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import ListPointView from '../view/list-point-view.js';
import PointView from '../view/point-view.js';
import EditPointForm from '../view/edit-point-form-view.js';


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
    render(this.#listPointContainer, this.#tripEventsContainer);
    for (let i = 1; i < this.#pagePoints.length; i++) {
      this.#renderPoint(this.#pagePoints[i], this.#pageDestinations, this.#pageOffers);
    }
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
        document.addEventListener('keydown', escKeyDownHandler);
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
