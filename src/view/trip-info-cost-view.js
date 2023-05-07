import AbstractView from '../framework/view/abstract-view.js';

function createTripInfoCostView() {
  return `<p class="trip-info__cost">
Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
            </p >`;
}
class TripInfoCostView extends AbstractView {
  get template() {
    return createTripInfoCostView();
  }
}

export default TripInfoCostView;
