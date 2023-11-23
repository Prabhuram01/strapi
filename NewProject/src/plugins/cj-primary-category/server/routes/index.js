module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/getcategories',
    handler: 'primaryCategoryController.getCategories',
    config: {
      policies: [],
      auth: false,
    },
  },
];
