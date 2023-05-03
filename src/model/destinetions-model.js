import { generateDestinations } from '../mock/point.js';

class DestinationsModel {
  destinations = generateDestinations();

  getDestinations = () => this.destinations;
}

export default DestinationsModel;
