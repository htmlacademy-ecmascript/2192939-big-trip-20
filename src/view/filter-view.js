import AbstractView from '../framework/view/abstract-view.js';

function createFilterViewItemTemplate(filter, currentFilterType) {
  const { type, count } = filter;
  return /*html*/`<div class="trip-filters__filter">
                  <label class="trip-filters__filter-label"
                  for="filter-${type}">${type}</label>
                  <input id="filter-${type}"
                   class="trip-filters__filter-input  visually-hidden"
                   type="radio"
                   name="trip-filter"
                   value="${type}"
                   ${type === currentFilterType ? 'checked' : ''}
                   ${count === 0 ? 'disabled' : ''}>
                </div>`;
}

function createFilterViewTemplate(filterItems, currentFilterType) {
  const filterItemsTemplate = filterItems.map((filter) =>
    createFilterViewItemTemplate(filter, currentFilterType)).join('');
  return /*html*/`<form class="trip-filters" action="#" method="get">
                    ${filterItemsTemplate}
                <button class="visually-hidden" type="submit">Accept filter</button>
              </form>
`;
}

class FilterView extends AbstractView {
  #filters = null;
  #currentFilterType = null;
  #handleFilterTypeChange = null;

  constructor({ filters, currentFilterType, onFilterTypeChange }) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterViewTemplate(this.#filters, this.#currentFilterType);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}

export default FilterView;
