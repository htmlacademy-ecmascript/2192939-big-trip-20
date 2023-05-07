import { generateRandomPoint } from '../mock/point.js';

const POINT_COUNT = 4;

class PointsModel {
  #points = Array.from({ length: POINT_COUNT }, generateRandomPoint);

  get points() {
    return this.#points;
  }
}

export default PointsModel;
