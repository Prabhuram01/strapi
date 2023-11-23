'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('primary-category')
      .service('myService')
      .getWelcomeMessage();
  },
});
