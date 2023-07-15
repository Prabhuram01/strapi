'use strict';

module.exports = ({ strapi }) => {
  // registeration phase
  strapi.customFields.register({
    name: 'subCategory',
    plugin: 'todo',
    type: 'string',
    inputSize: { // optional
      default: 4,
      isResizable: true,
    },
  });
};
