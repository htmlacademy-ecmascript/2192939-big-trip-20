import ApiService from './framework/api-service.js';

class OffersApiService extends ApiService {
  get offers() {
    return this._load({ url: 'offers' })
      .then(ApiService.parseResponse);
  }
}

export default OffersApiService;
