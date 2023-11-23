'use strict';

module.exports = ({ strapi }) => ({
    async getCategories(ctx) {
        try {
            // console.log("In GetCategories Service");
            // console.log("ctx.query");
            // console.log(ctx.query);
            // console.log("");

            const datafromcategories = await strapi.entityService.findMany("api::category.category", {
                populate: { sub_categories: true },
            });
            // console.log(datafromcategories);
            // console.log(datafromcategories[0].sub_categories);
            return datafromcategories
        } catch (err) {
            console.log(err.message);
        }
    }
});
