import ApiService from './framework/api-service.js';

class DestinationsApiService extends ApiService {
  get destinations() {
    return this._load({ url: 'destinations' })
      .then(ApiService.parseResponse);
  }
}

export default DestinationsApiService;
