import RootPresenter from './presenter/root-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinetions-model.js';
import OffersModel from './model/offers-model.js';

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

const mainPage = new RootPresenter({ pointsModel, destinationsModel, offersModel });

mainPage.init();
