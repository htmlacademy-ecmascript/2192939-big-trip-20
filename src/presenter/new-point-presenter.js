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
  #handleNewPointEditClose = null;


  constructor({ listPointContainer,
    point, destinations, offers, onDataChange, onModeChange, onNewPointEditClose }) {
    this.#listPointContainer = listPointContainer;
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#handleNewPointEditClose = onNewPointEditClose;

    this.#newPointFormComponent = new EditPointFormView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      onCancelClick: this.#handleCancelClick
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
    this.#handleNewPointEditClose();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#newPointFormComponent.reset(this.#point);
      remove(this.#newPointFormComponent);
      document.removeEventListener('keydown', this.#escKeyDownHandler);
      this.#handleNewPointEditClose();
    }
  };

  #handleDeleteClick = (point) => {
    this.#newPointFormComponent.reset(point);
    remove(this.#newPointFormComponent);
  };

  #handleCancelClick = () => {
    this.#newPointFormComponent.reset(this.#point);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#handleNewPointEditClose();
  };


}

export default NewPointPresenter;
