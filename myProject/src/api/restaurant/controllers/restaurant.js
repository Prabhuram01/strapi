'use strict';

/**
 * restaurant controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::restaurant.restaurant',({strapi})=>({

        async create(ctx) {
          // Get the request data
          const data = ctx.request.body;
      
          // Find the selected category
          const category = await strapi.services.category.findOne({ id: data.category });
      
          // Find the sub categories that belong to the selected category
          const subCategories = await strapi.services.subCategory.find({ category: category.id });
      
          // Filter the data to only include the selected sub categories
          const filteredData = {
            ...data,
            sub_category: data.sub_category.filter((subCategory) => {
              return subCategories.some((item) => item.id === subCategory.id);
            }),
          };
      
          // Create the new restaurant entry with the filtered data
          const entry = await strapi.services.restaurant.create(filteredData);
      
          return entry;
        },
      
}));
