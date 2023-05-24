import Observable from '../framework/observable.js';
import { generateRandomPoint } from '../mock/point.js';
import { getRandomInteger } from '../utils/common.js';
import dayjs from 'dayjs';

const POINT_COUNT = getRandomInteger(2, 3);
/**
 * @class Данные точек маршрута
 * @extends Observable
 */
class PointsModel extends Observable {
  #points = Array.from({ length: POINT_COUNT }, generateRandomPoint)
    .sort((a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom)));

  /**
 * Геттер возвращает массив точек маршрута
 * @returns {Array<objects>} #points
 */
  get points() {
    return this.#points;
  }

  /**
   *Функция обновления точки маршрута
   * @param {string} updateType тип обновления (сколько нужно перерисовывать)
   * @param {object} update измененная точка маршрута
   */
  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    /**
     * Вставляем обновленную точку маршрута на свое место в массиве
     */
    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    /**
     * Отправляем сообщение об изменении точки маршрута всем подписчикам
     */
    this._notify(updateType, update);
  }

  /**
   * Функция добавления точки маршрута
   * @param {string} updateType тип обновления (сколько нужно перерисовывать)
   * @param {object} update новая точка маршрута
   */
  addPoint(updateType, update) {
    /**
     * Вставляем новую точку маршрута в начало массива
     */
    this.#points = [
      update,
      ...this.#points
    ];

    /**
     * Отправляем сообщение об добавлении точки маршрута всем подписчикам
     */

    this._notify(updateType, update);
  }

  /**
 *Функция удаления точки маршрута
 * @param {string} updateType тип обновления (сколько нужно перерисовывать)
 * @param {object} update удаленная точка маршрута
 */
  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    /**
     * Удаляем точку маршрута со своего места в массиве
     */
    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1)
    ];

    /**
     * Отправляем сообщение об удалении точки маршрута всем подписчикам
     */
    this._notify(updateType);
  }

}

export default PointsModel;
