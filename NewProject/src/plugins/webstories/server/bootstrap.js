'use strict';

// Role Based Access Control
const RBAC_ACTIONS = [
  {
    section: 'plugins',
    displayName: 'Read',
    uid: 'read',
    pluginName: 'webstories',
  },
];

/**
 *
 * @param {{strapi: import("@strapi/strapi").Strapi}} args
 */
module.exports = async ({ strapi }) => {
  await strapi.admin.services.permission.actionProvider.registerMany(RBAC_ACTIONS);

  const pluginStore = strapi.store({
    environment: '',
    type: 'plugin',
    name: 'webstories',
  });
};