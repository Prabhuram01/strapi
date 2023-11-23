'use strict';

/**
 * new-restaurant service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::new-restaurant.new-restaurant');
