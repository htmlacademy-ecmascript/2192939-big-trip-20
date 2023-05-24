import { RenderPosition, render, remove } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';
import TripInfoMainView from '../view/trip-info-main-view.js';
import TripInfoCostView from '../view/trip-info-cost-view.js';
import AbstractView from '../framework/view/abstract-view.js';
import FilterPresenter from './filter-presenter.js';

const tripMainContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');

/**Класс отвечает за отрисовку и взаимодействие представлений шапки страницы
 * @extends AbstractView
 */
class HeaderPresenter extends AbstractView {
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filters = null;
  #filtersPresenter = null;
  #tripInfoMainComponent = null;
  #tripInfoCostComponent = null;
  #tripInfoComponent = null;
  #filterModel = null;

  /**
   *
   * @param {Array.<objects>} pointsModel точки маршрута
   * @param {Array.<objects>} destinationsModel описания точек маршрута
   * @param {Array.<objects>} offersModel предложения точек маршрута
   */

  constructor({ pointsModel, destinationsModel, offersModel, filterModel }) {
    super();
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#tripInfoComponent = new TripInfoView();
    this.#filters = [{ type: 'everything', count: 0, }];
    this.#filtersPresenter = new FilterPresenter({
      filterContainer: filtersContainer,
      filterModel: this.#filterModel,
      pointsModel: this.#pointsModel,
    });
    this.#tripInfoMainComponent = new TripInfoMainView({
      points: this.points,
      destinations: this.destinations,
    });
    this.#tripInfoCostComponent = new TripInfoCostView({
      points: this.points,
      offers: this.offers
    });

    this.#pointsModel.addObserver(this.#handleModeEvent);
  }

  /**
 * Геттер отсортированного массива точек путешествия
 * @returns {Array.<objects>} отсортированный массив точек
 */
  get points() {
    return this.#pointsModel.points;
  }

  /**
   * Геттер модели описаний точки маршрута (обертка над геттером модели описаний DestinationsModel)
   * @returns {Array.<objects>} #offers
   */
  get destinations() {
    return this.#destinationsModel.destinations;
  }

  /**
  * Геттер модели офферов точки маршрута (обертка над геттером модели офферов OffersModel)
  * @returns {Array.<objects>} #offers
  */
  get offers() {
    return this.#offersModel.offers;
  }


  init() {
    if (!this.points.length) {
      this.#filtersPresenter.init();
      return;
    }

    this.#renderTripInfo();
    this.#filtersPresenter.init();
    this.#renderTripInfoMain();
    this.#renderTripInfoCost();
  }


  #renderTripInfo() {
    render(this.#tripInfoComponent, tripMainContainer, RenderPosition.AFTERBEGIN);
  }

  // #renderFilters() {
  //   render(this.#filtersComponent, filtersContainer);
  // }

  #renderTripInfoMain() {
    render(this.#tripInfoMainComponent, this.#tripInfoComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderTripInfoCost() {
    this.#tripInfoCostComponent.init({
      points: this.points,
      offers: this.offers
    });
    render(this.#tripInfoCostComponent, this.#tripInfoComponent.element);
  }

  #handleModeEvent = () => {
    if (!this.points.length) {
      remove(this.#tripInfoComponent);
      return;
    }
    remove(this.#tripInfoMainComponent);
    this.#tripInfoMainComponent = new TripInfoMainView({
      points: this.points,
      destinations: this.destinations,
    });
    this.#renderTripInfoMain();

    remove(this.#tripInfoCostComponent);
    this.#tripInfoCostComponent = new TripInfoCostView({
      points: this.points,
      offers: this.offers
    });
    this.#renderTripInfoCost();
  };
}

export default HeaderPresenter;
