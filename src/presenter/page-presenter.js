import { RenderPosition, render } from '../render';
import SortView from '../view/sort-view.js';
import EditPointForm from '../view/edit-point-form-view.js';
import ListPointView from '../view/list-point-view.js';
import AddPointFormView from '../view/add-point-form-view.js';
import PointView from '../view/point-view.js';

const COUNT_POINTS = 3;
const listPointContainer = new ListPointView();
const tripEventsContainer = document.querySelector('.trip-events');

class PagePresenter {
  constructor() {
    render(new SortView(), tripEventsContainer);
    render(listPointContainer, tripEventsContainer);
    render(new EditPointForm(), listPointContainer.getElement(), RenderPosition.AFTERBEGIN);
    for (let i = 0; i < COUNT_POINTS; i++) {
      render(new PointView(), listPointContainer.getElement());
    }
    render(new AddPointFormView(), listPointContainer.getElement());
  }
}

export default PagePresenter;
