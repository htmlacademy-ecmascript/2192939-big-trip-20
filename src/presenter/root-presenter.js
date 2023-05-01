import HeaderPresenter from './header-presenter.js';
import PagePresenter from './page-presenter.js';
import PointsModel from '../model/points-model.js';

const pointsModel = new PointsModel();
class RootPresenter {
  init = () => {
    new HeaderPresenter();
    new PagePresenter({ pointsModel });
  };
}

export default RootPresenter;
