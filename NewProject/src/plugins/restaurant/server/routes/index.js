module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      policies: [],
      auth:false,
    },
  },
  {
    method: 'GET',
    path: '/getcategories',
    handler: 'restaurantController.getCategories',
    config: {
      policies: [],
      auth:false,
    },
  },
  {
    method: 'POST',
    path: '/create',
    handler: 'restaurantController.createRestaurant',
    config: {
      policies: [],
      auth:false,
    },
  },
];
