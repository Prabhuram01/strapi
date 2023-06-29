import { request } from "@strapi/helper-plugin";

const restaurantRequests = {
    addRestaurant: async (data) => {
        return await request(`/restaurant/create`, {
            method: "POST",
            body: { data: data },
        });
    },
    getAllCategories:async () =>{
        return await request(`/restaurant/getcategories`, {
            method: "GET",
        });
    }
}

export default restaurantRequests