import { RenderPosition, render } from '../render';
import SortView from '../view/sort-view.js';
import EditPointForm from '../view/edit-point-form-view.js';
import ListPointView from '../view/list-point-view.js';
import PointView from '../view/point-view.js';

const listPointContainer = new ListPointView();
const tripEventsContainer = document.querySelector('.trip-events');

class PagePresenter {
  constructor({ pagePoints, pageDestinations, pageOffers }) {
    this.pagePoints = pagePoints;
    this.pageDestinations = pageDestinations;
    this.pageOffers = pageOffers;
    render(new SortView(), tripEventsContainer);
    render(listPointContainer, tripEventsContainer);
    render(new EditPointForm({ point: this.pagePoints[0], destinations: this.pageDestinations, offers: pageOffers }), listPointContainer.getElement(), RenderPosition.AFTERBEGIN);
    for (let i = 1; i < this.pagePoints.length; i++) {
      render(new PointView({ point: this.pagePoints[i], destinations: this.pageDestinations, offers: pageOffers }), listPointContainer.getElement());
    }
  }
}

export default PagePresenter;
