'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('audit-logs')
      .service('myService')
      .getWelcomeMessage();
  },
});
