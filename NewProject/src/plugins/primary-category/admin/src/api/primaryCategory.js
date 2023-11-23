import { request } from "@strapi/helper-plugin";

const primaryCategoryRequests = {
    getAllCategories: async () => {
        return await request(`/primary-category/getcategories`, {
            method: "GET",
        });
    }
}

export default primaryCategoryRequests