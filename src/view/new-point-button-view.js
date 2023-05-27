import AbstractView from '../framework/view/abstract-view';

function newPointButtonViewTemplate() {
  return `<button
            class="trip-main__event-add-btn btn btn--big btn--yellow"
            type="button"
          >
            New event
          </button>`;
}

class NewPointButtonView extends AbstractView {

  #handleClickNewPoint = null;

  constructor({ onClickNewPoint }) {
    super();
    this.#handleClickNewPoint = onClickNewPoint;

    this.element.addEventListener('click', this.#clickNewPointHandler);
  }

  get template() {
    return newPointButtonViewTemplate();
  }

  #clickNewPointHandler = (evt) => {
    evt.preventDefault();
    console.log('Сработал обработчик на кнопке из NewPointButtonView');
    this.#handleClickNewPoint();
  };
}

export default NewPointButtonView;
