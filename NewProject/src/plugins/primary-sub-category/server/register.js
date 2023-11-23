'use strict';

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: 'subCategory',
    plugin: 'primary-sub-category',
    type: 'string',
    inputSize: { // optional
      default: 4,
      isResizable: true,
    },
  });
};
