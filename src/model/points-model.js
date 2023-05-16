import { generateRandomPoint } from '../mock/point.js';
import { getRandomInteger } from '../utils/common.js';
import dayjs from 'dayjs';

const POINT_COUNT = getRandomInteger(2, 3);

class PointsModel {
  #points = Array.from({ length: POINT_COUNT }, generateRandomPoint)
    .sort((a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom)));

  get points() {
    return this.#points;
  }
}

export default PointsModel;
