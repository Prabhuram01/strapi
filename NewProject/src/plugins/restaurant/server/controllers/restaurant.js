'use strict';

module.exports = ({ strapi }) => ({
    async createRestaurant(ctx) {
        try {
            ctx.body = await strapi
                .plugin('restaurant')
                .service('restaurantService')
                // .createRestaurant(ctx.request.body);
                .createRestaurant(ctx);
        } catch (err) {
            ctx.throw(500, err);
        }
    },
    async getCategories(ctx) {
        try {
            ctx.body = await strapi
                .plugin('restaurant')
                .service('restaurantService')
                .getCategories(ctx);
        } catch (err) {
            ctx.throw(500, err);
        }
    }
});
