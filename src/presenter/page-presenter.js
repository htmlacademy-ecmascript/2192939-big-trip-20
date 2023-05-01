import { RenderPosition, render } from '../render';
import SortView from '../view/sort-view.js';
import EditPointForm from '../view/edit-point-form-view.js';
import ListPointView from '../view/list-point-view.js';
import AddPointFormView from '../view/add-point-form-view.js';
import PointView from '../view/point-view.js';

const listPointContainer = new ListPointView();
const tripEventsContainer = document.querySelector('.trip-events');

class PagePresenter {
  constructor({ pointsModel }) {
    this.pagePoints = [...pointsModel.getPoints()];
    render(new SortView(), tripEventsContainer);
    render(listPointContainer, tripEventsContainer);
    render(new EditPointForm(), listPointContainer.getElement(), RenderPosition.AFTERBEGIN);
    for (let i = 0; i < this.pagePoints.length; i++) {
      render(new PointView({ point: this.pagePoints[i] }), listPointContainer.getElement());
    }
    render(new AddPointFormView(), listPointContainer.getElement());
  }
}

export default PagePresenter;
