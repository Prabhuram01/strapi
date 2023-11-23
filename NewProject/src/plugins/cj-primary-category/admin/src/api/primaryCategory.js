import { request } from "@strapi/helper-plugin";

const cjPrimaryCategoryRequests = {
    getAllCategories: async () => {
        console.log("inside cj cat api")
        return await request(`/cj-primary-category/getcategories`, {
            method: "GET",
        });
    }
}

export default cjPrimaryCategoryRequests