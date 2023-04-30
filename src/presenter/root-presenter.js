import HeaderPresenter from './header-presenter.js';
import PagePresenter from './page-presenter.js';

class RootPresenter {
  init() {
    new HeaderPresenter();
    new PagePresenter();
  }
}

export default RootPresenter;
