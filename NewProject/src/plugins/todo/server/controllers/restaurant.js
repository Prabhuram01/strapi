'use strict';

module.exports = ({ strapi }) => ({
    async createRestaurant(ctx) {
        try {
            ctx.body = await strapi
                .plugin('todo')
                .service('restaurantService')
                // .createRestaurant(ctx.request.body);
                .createRestaurant(ctx);
        } catch (err) {
            ctx.throw(500, err);
        }
    },
    async getCategory(ctx) {
        try {
            return await strapi.plugin("todo").service("restaurantService").getCat(ctx.query);
        } catch (err) {
            ctx.throw(500, err);
        }
    }
});
