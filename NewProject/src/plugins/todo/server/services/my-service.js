'use strict';

module.exports = ({ strapi }) => ({
  getWelcomeMessage() {
    return 'Welcome to Strapi 🚀';
  },
  createRestaurant(ctx){
    console.log("strapi");
    console.log(strapi);
    console.log("strapi end........");
    console.log();
    console.log("Context");
    console.log(ctx);
    console.log("Context end........");
    return "creating a restaurant";
  }
});
