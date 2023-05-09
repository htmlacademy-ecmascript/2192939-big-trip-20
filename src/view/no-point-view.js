import AbstractView from '../framework/view/abstract-view';

function createNoPointViewTemplate() {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>
  `;
}

class NoPointView extends AbstractView {

  get template() {
    return createNoPointViewTemplate();
  }

}

export default NoPointView;
