'use strict';

module.exports = ({ strapi }) => ({
    // async createRestaurant(ctx) {
    //     try {
    //         // console.log("Data is ");
    //         // console.log(ctx.request.body);

    //         return await strapi.entityService.create("api::restaurant.restaurant", ctx.request.body);
    //     } catch (err) {
    //         // console.log("some error occured which is ");
    //         // console.log(err.message);
    //         // console.log("Complete error is");
    //         // console.log(err);
    //     }
    // },
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
            // console.log("some error occured which is ");
            console.log(err.message);
            // console.log("Complete error is");
            // console.log(err);
        }
    }
});

// const strapiresponse = await fetch('http://127.0.0.1:1337/api/restaurants', {
// method: 'POST',
// headers: {
//     'Content-Type': 'application/json',
// },
// body: JSON.stringify({
//     data: {
//         name: "res.name",
//         description: "res.description",
//         category: "res.category",
//         subCategory: "res.subCategory",
//     }
// }),
// })
// .then(response => response.json())
//     .then(data => console.log(data));

// const datas = await strapiresponse.json();
// console.log(strapiresponse.json());
// console.log("datas");
// console.log(datas);