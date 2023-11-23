module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      policies: [],
    },
  },
  // {
  //   method: 'POST',
  //   path: '/create',
  //   handler: 'restaurantController.createRestaurant',
  //   config: {
  //     policies: [],
  //     auth:false,
  //   },
  // },
  // {
  //   method: "GET",
  //   path: "/getCat",
  //   handler: "restaurantController.getCategory",
  //   config: {
  //     policies: [],
  //   },
  // },
];
