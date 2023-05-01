import { getRandomPoint } from '../mock/point.js';

const POINT_COUNT = 3;

class PointsModel {
  points = Array.from({ length: POINT_COUNT }, getRandomPoint);

  getPoints = () => this.points;
}

export default PointsModel;
