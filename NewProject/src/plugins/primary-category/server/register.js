'use strict';

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: 'category',
    plugin: 'primary-category',
    type: 'string',
    inputSize: { // optional
      default: 4,
      isResizable: true,
    },
  });
};
