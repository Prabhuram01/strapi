'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('elections')
      .service('myService')
      .getWelcomeMessage();
  },
});
