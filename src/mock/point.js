import { getRandomArrayElement } from '../utils/common.js';

const mockPoints = [
  {
    'id': '1',
    'basePrice': 1100,
    'dateFrom': '2023-05-10T22:00:00.00Z',
    'dateTo': '2023-05-31T11:10:00.00Z',
    'destination': '1',
    'isFavorite': false,
    'offers': [
      '1'
    ],
    'type': 'taxi'
  },
  {
    'id': '2',
    'basePrice': 2000,
    'dateFrom': '2023-02-10T21:35:56.845Z',
    'dateTo': '2023-02-11T10:22:13.375Z',
    'destination': '2',
    'isFavorite': true,
    'offers': [],
    'type': 'bus'
  },
  {
    'id': '3',
    'basePrice': 4500,
    'dateFrom': '2023-03-10T22:55:56.845Z',
    'dateTo': '2023-03-11T11:22:13.375Z',
    'destination': '3',
    'isFavorite': true,
    'offers': [
      '3',
    ],
    'type': 'train'
  },
  {
    'id': '4',
    'basePrice': 500,
    'dateFrom': '2023-04-10T22:55:56.845Z',
    'dateTo': '2023-04-11T11:22:13.375Z',
    'destination': '4',
    'isFavorite': true,
    'offers': [
      '4',
      '5',
      '8'
    ],
    'type': 'ship'
  },
  {
    'id': '5',
    'basePrice': 2700,
    'dateFrom': '2023-05-25T02:55:56.845Z',
    'dateTo': '2023-05-25T11:22:13.375Z',
    'destination': '5',
    'isFavorite': true,
    'offers': [
      '5'
    ],
    'type': 'drive'
  },
  {
    'id': '6',
    'basePrice': 3500,
    'dateFrom': '2023-05-14T22:55:56.845Z',
    'dateTo': '2023-05-16T11:22:13.375Z',
    'destination': '6',
    'isFavorite': false,
    'offers': [
      '6',
      '5',
    ],
    'type': 'flight'
  },
  {
    'id': '7',
    'basePrice': 6700,
    'dateFrom': '2023-06-20T22:55:56.845Z',
    'dateTo': '2023-06-30T11:22:13.375Z',
    'destination': '7',
    'isFavorite': true,
    'offers': [],
    'type': 'check-in'
  },
  {
    'id': '8',
    'basePrice': 2000,
    'dateFrom': '2023-07-10T22:55:56.845Z',
    'dateTo': '2023-07-11T11:22:13.375Z',
    'destination': '8',
    'isFavorite': false,
    'offers': [
      '8',
    ],
    'type': 'sightseeing'
  },
  {
    'id': '9',
    'basePrice': 2000,
    'dateFrom': '2023-05-25T02:55:56.845Z',
    'dateTo': '2023-05-25T11:22:13.375Z',
    'destination': '9',
    'isFavorite': true,
    'offers': [
      '7',
    ],
    'type': 'restaurant'
  }
];

const mockDestinations = [
  {
    'id': '1',
    'description': 'Paris: Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'name': 'Paris',
    'pictures': []
  },
  {
    'id': '2',
    'description': 'London: Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'name': 'London',
    'pictures': [
      {
        'src': 'img/photos/2.jpg',
        'description': 'Lorem ipsum dolor sit amet'
      },
      {
        'src': 'img/photos/3.jpg',
        'description': 'Lorem ipsum dolor sit amet'
      }
    ]
  },
  {
    'id': '3',
    'description': 'Berlin: Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'name': 'Berlin',
    'pictures': [
      {
        'src': 'img/photos/1.jpg',
        'description': 'Lorem ipsum dolor sit amet'
      },
      {
        'src': 'img/photos/2.jpg',
        'description': 'Lorem ipsum dolor sit amet'
      },
      {
        'src': 'img/photos/3.jpg',
        'description': 'Lorem ipsum dolor sit amet'
      },
    ]
  },
  {
    'id': '4',
    'description': 'Vienna: Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
    'name': 'Vienna',
    'pictures': [
      {
        'src': 'img/photos/4.jpg',
        'description': 'Lorem ipsum dolor sit amet'
      },
      {
        'src': 'img/photos/5.jpg',
        'description': 'Lorem ipsum dolor sit amet'
      },
      {
        'src': 'img/photos/3.jpg',
        'description': 'Lorem ipsum dolor sit amet'
      },
      {
        'src': 'img/photos/2.jpg',
        'description': 'Lorem ipsum dolor sit amet'
      },
      {
        'src': 'img/photos/4.jpg',
        'description': 'Lorem ipsum dolor sit amet'
      },
      {
        'src': 'img/photos/5.jpg',
        'description': 'Lorem ipsum dolor sit amet'
      },
      {
        'src': 'img/photos/3.jpg',
        'description': 'Lorem ipsum dolor sit amet'
      },
      {
        'src': 'img/photos/2.jpg',
        'description': 'Lorem ipsum dolor sit amet'
      },
    ]
  },
  {
    'id': '5',
    'description': 'Prague: Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    'name': 'Prague',
    'pictures': [
      {
        'src': 'img/photos/5.jpg',
        'description': 'Lorem ipsum dolor sit amet'
      }
    ]
  },
  {
    'id': '6',
    'description': 'Dublin: Fusce tristique felis at fermentum pharetra.',
    'name': 'Dublin',
    'pictures': [
      {
        'src': 'img/photos/1.jpg',
        'description': 'Lorem ipsum dolor sit amet'
      },
      {
        'src': 'img/photos/4.jpg',
        'description': 'Lorem ipsum dolor sit amet'
      }
    ]
  },
  {
    'id': '7',
    'description': 'Madrid: Cras aliquet varius magna, non porta ligula feugiat eget',
    'name': 'Madrid',
    'pictures': [
      {
        'src': 'img/photos/2.jpg',
        'description': 'Lorem ipsum dolor sit amet'
      }
    ]
  },
  {
    'id': '8',
    'description': 'Barselona: Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'name': 'Barselona',
    'pictures': [
      {
        'src': 'img/photos/3.jpg',
        'description': 'Lorem ipsum dolor sit amet'
      }
    ]
  },
  {
    'id': '9',
    'description': 'Rome: Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus..',
    'name': 'Rome',
    'pictures': [
      {
        'src': 'img/photos/4.jpg',
        'description': 'Lorem ipsum dolor sit amet'
      }
    ]
  }
];

const mockOffers = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': '1',
        'title': 'Offer - 1',
        'price': 120
      },
      {
        'id': '2',
        'title': 'Offer - 2',
        'price': 220
      },
      {
        'id': '3',
        'title': 'Offer - 1',
        'price': 120
      },
    ]
  },
  {
    'type': 'bus',
    'offers': [
      {
        'id': '2',
        'title': 'Offer - 2',
        'price': 220
      }, {
        'id': '4',
        'title': 'Offer - 1',
        'price': 120
      },
      {
        'id': '5',
        'title': 'Offer - 5',
        'price': 150
      },
      {
        'id': '6',
        'title': 'Offer - 6',
        'price': 160
      },
    ]
  },
  {
    'type': 'train',
    'offers': [
      {
        'id': '3',
        'title': 'Offer - 3',
        'price': 320
      }
    ]
  },
  {
    'type': 'ship',
    'offers': [
      {
        'id': '4',
        'title': 'Offer - 4',
        'price': 420
      },
      {
        'id': '7',
        'title': 'Offer - 7',
        'price': 170
      },
      {
        'id': '8',
        'title': 'Offer - 8',
        'price': 180
      },
      {
        'id': '5',
        'title': 'Offer - 5',
        'price': 150
      },
      {
        'id': '6',
        'title': 'Offer - 6',
        'price': 160
      },
    ]
  },
  {
    'type': 'drive',
    'offers': [
      {
        'id': '5',
        'title': 'Offer - 5',
        'price': 150
      }, {
        'id': '4',
        'title': 'Offer - 1',
        'price': 120
      },
      {
        'id': '6',
        'title': 'Offer - 6',
        'price': 160
      },
    ]
  },
  {
    'type': 'flight',
    'offers': [
      {
        'id': '6',
        'title': 'Offer - 6',
        'price': 160
      }, {
        'id': '4',
        'title': 'Offer - 1',
        'price': 120
      },
      {
        'id': '5',
        'title': 'Offer - 5',
        'price': 150
      },
    ]
  },
  {
    'type': 'check-in',
    'offers': [
      {
        'id': '7',
        'title': 'Offer - 7',
        'price': 170
      }
    ]
  },
  {
    'type': 'sightseeing',
    'offers': [
      {
        'id': '8',
        'title': 'Offer - 8',
        'price': 180
      }
    ]
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'id': '9',
        'title': 'Offer - 9',
        'price': 920
      }, {
        'id': '7',
        'title': 'Offer - 7',
        'price': 170
      },
      {
        'id': '8',
        'title': 'Offer - 8',
        'price': 180
      },
    ]
  }
];

function generateRandomPoint() {
  return getRandomArrayElement(mockPoints);
}
function generateDestinations() {
  return mockDestinations;
}
function generateOffers() {
  return mockOffers;
}
export { generateRandomPoint, generateDestinations, generateOffers };
