const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};


const SortType = {
  DEFAULT: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const EMPTY_POINT = {
  'id': '',
  'basePrice': 0,
  'dateFrom': '',
  'dateTo': '',
  'destination': '',
  'isFavorite': false,
  'offers': [],
  'type': ''
};

export { FilterType, SortType, UserAction, UpdateType, EMPTY_POINT };
