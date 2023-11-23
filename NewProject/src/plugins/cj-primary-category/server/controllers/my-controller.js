'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('cj-primary-category')
      .service('myService')
      .getWelcomeMessage();
  },
});
