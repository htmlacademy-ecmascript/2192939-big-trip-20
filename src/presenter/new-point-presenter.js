import EditPointFormView from '../view/edit-point-form-view';
import { render, remove, RenderPosition } from '../framework/render.js';
import { UpdateType, UserAction } from '../utils/const.js';

class NewPointPresenter {
  #listPointContainer;
  #point = null;
  #destinations = null;
  #offers = null;
  #newPointFormComponent = null;
  #handleDataChange = null;
  #handleModeChange = null;


  constructor({ listPointContainer, point, destinations, offers, onDataChange, onModeChange, }) {
    this.#listPointContainer = listPointContainer;
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;

    this.#newPointFormComponent = new EditPointFormView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onFormClose: this.#handleFormClose,
      onDeleteClick: this.#handleDeleteClick,
    });
    render(this.#newPointFormComponent, this.#listPointContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point);
    remove(this.#newPointFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormClose = () => {
    this.#newPointFormComponent.reset(this.#point);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#newPointFormComponent.reset(this.#point);
      remove(this.#newPointFormComponent);
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleDeleteClick = (point) => {
    this.#newPointFormComponent.reset(point);
    remove(this.#newPointFormComponent);
  };


}

export default NewPointPresenter;
