import Observable from '../framework/observable.js';
import { generateRandomPoint } from '../mock/point.js';
import { getRandomInteger } from '../utils/common.js';
import dayjs from 'dayjs';

const POINT_COUNT = getRandomInteger(2, 3);
class PointsModel extends Observable {
  #points = Array.from({ length: POINT_COUNT }, generateRandomPoint)
    .sort((a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom)));

  get points() {
    return this.#points;
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType);
  }

}

export default PointsModel;
