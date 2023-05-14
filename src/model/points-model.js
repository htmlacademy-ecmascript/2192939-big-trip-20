import { generateRandomPoint } from '../mock/point.js';
import { getRandomInteger } from '../utils/common.js';

const POINT_COUNT = getRandomInteger(1, 2);

class PointsModel {
  #points = Array.from({ length: POINT_COUNT }, generateRandomPoint);

  get points() {
    return this.#points;
  }
}

export default PointsModel;
