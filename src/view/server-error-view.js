import AbstractView from '../framework/view/abstract-view';


function createServerErrorViewTemplate() {
  return `<p class="trip-events__msg">Something went wrong! We are already running to fix this problem.</p>
  `;
}

class NoPointView extends AbstractView {

  get template() {
    return createServerErrorViewTemplate();
  }

}

export default NoPointView;
