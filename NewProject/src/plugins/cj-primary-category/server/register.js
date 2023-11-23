'use strict';

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: 'cjCategory',
    plugin: 'cj-primary-category',
    type: 'string',
    inputSize: { // optional
      default: 4,
      isResizable: true,
    },
  });
};
