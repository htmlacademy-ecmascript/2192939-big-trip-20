import HeaderPresenter from './header-presenter.js';
import PagePresenter from './page-presenter.js';

class RootPresenter {
  constructor({ pointsModel, destinationsModel, offersModel }) {
    this.pagePoints = [...pointsModel.getPoints()];
    this.pageDestinations = [...destinationsModel.getDestinations()];
    this.pageOffers = offersModel.getOffers();
  }

  init = () => {
    new HeaderPresenter({
      pagePoints: this.pagePoints,
      pageDestinations: this.pageDestinations,
      pageOffers: this.pageOffers
    });
    new PagePresenter({
      pagePoints: this.pagePoints,
      pageDestinations: this.pageDestinations,
      pageOffers: this.pageOffers
    });
  };
}

export default RootPresenter;
