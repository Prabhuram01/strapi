'use strict';

module.exports = ({ strapi }) => ({
    async getCategories(ctx) {
        try {
            ctx.body = await strapi
                .plugin('cj-primary-category')
                .service('primaryCategoryService')
                .getCategories(ctx);
        } catch (err) {
            ctx.throw(500, err);
        }
    }
});
