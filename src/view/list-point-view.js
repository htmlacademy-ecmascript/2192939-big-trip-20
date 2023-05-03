import { createElement } from '../render.js';

const createListPointView = () => '<ul class="trip-events__list"></ul>';

class ListPointView {
  getTemplate = () => createListPointView();

  getElement = () => {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  };

  removeElement = () => {
    this.element = null;
  };
}

export default ListPointView;
