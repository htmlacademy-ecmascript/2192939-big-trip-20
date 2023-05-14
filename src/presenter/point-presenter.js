import { replace, render, remove } from '../framework/render.js';
import PointView from '../view/point-view.js';
import EditPointForm from '../view/edit-point-form-view.js';


class PointPresenter {
  #point = null;
  #destinations = null;
  #offers = null;

  #listPointContainer = null;

  #pointComponent = null;
  #pointEditComponent = null;

  constructor({ listPointContainer }) {
    this.#listPointContainer = listPointContainer;
  }

  init(point, destinations, offers) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onEditClick: this.#handleEditClick,

    });

    this.#pointEditComponent = new EditPointForm({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onFormClose: this.#handleFormClose
    });
    render(this.#pointComponent, this.#listPointContainer);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#listPointContainer);
    }

    if (this.#pointComponent.contains(prevPointComponent.elment)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointEditComponent.contains(prevPointEditComponent)) {
      replace(this.#pointEditComponent, prevPointEditComponent.element);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #replacePointToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormClose = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

}

export default PointPresenter;
