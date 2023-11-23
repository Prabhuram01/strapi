'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('primary-sub-category')
      .service('myService')
      .getWelcomeMessage();
  },
});
