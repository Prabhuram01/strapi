'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('restaurant')
      .service('myService')
      .getWelcomeMessage();
  }
});
