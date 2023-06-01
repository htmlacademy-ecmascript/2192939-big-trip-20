import RootPresenter from './presenter/root-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinetions-model.js';
import OffersModel from './model/offers-model.js';
import FiltersModel from './model/filters-model.js';


const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const filtersModel = new FiltersModel();

const tripEventsContainer = document.querySelector('.trip-events');
const tripHeaderContainer = document.querySelector('.trip-main');
const filtersContainer = document.querySelector('.trip-controls__filters');


const rootPresenter = new RootPresenter({
  tripEventsContainer,
  tripHeaderContainer,
  filtersContainer
});

rootPresenter.init(pointsModel, destinationsModel, offersModel, filtersModel);
