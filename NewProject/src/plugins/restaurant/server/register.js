'use strict';

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: 'restaurant',
    plugin: 'restaurant',
    type: 'string',
    inputSize: { // optional
      default: 4,
      isResizable: true,
    },
  });
};