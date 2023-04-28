import { RenderPosition, render } from '../src/render';
import ViewFilters from './view-filters.js';
import ViewSort from './view-sort.js';
import EditPointForm from './edit-point-form.js';
import ListPoint from './list-point.js';
import AddPointForm from './add-point-form.js';


const presenter = () => {
  const filtersContainer = document.querySelector('.trip-controls__filters');
  const sortContainer = document.querySelector('.trip-events');
  const listPointContainer = document.querySelector('.trip-events');

  render(new ViewFilters(), filtersContainer, RenderPosition.BEFOREEND);
  render(new ViewSort(), sortContainer, RenderPosition.BEFOREEND);
  render(new ListPoint(), listPointContainer, RenderPosition.BEFOREEND);

  const editFormContainer = document.querySelector('.trip-events__list');
  const addFormContainer = document.querySelector('.trip-events__list');
  render(new EditPointForm(), editFormContainer, RenderPosition.AFTERBEGIN);
  render(new AddPointForm(), addFormContainer, RenderPosition.BEFOREEND);
};

export { presenter };
