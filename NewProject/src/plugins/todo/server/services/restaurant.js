'use strict';

module.exports = ({ strapi }) => ({
    async createRestaurant(ctx) {
        try {
            console.log("Data is ");
            console.log(ctx.request.body);

            return await strapi.entityService.create("api::restaurant.restaurant", ctx.request.body);
        } catch (err) {
            console.log("some error occured which is ");
            console.log(err.message);
            console.log("Complete error is");
            console.log(err);
        }
    },
    async getCat(query) {
        try {
            console.log("In GetCategories Service");
            console.log("ctx.query");
            console.log(ctx.query);
            console.log("");

            return await strapi.entityService.findMany("api::category.category", {
                populate: { sub_categories: true },
            });

        } catch (err) {
            console.log("some error occured which is ");
            console.log(err.message);
            console.log("Complete error is");
            console.log(err);
        }
    },
});