import { getDestinations } from '../mock/point.js';

class DestinationsModel {
  destinations = getDestinations();

  getDestinations = () => this.destinations;
}

export default DestinationsModel;
