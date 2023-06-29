module.exports = {
    beforeCreate(event) {
      const { data, where, select, populate } = event.params;
      data.CreatedOn = new Date();
    },
};










// module.exports = {
//     beforeCreate: async (data) => {
//         data.createdAt = new Date();
//         const { user } = data;
//         const author = await strapi.plugins['users-permissions'].services.user.fetch({ id: user.id });
//         data.AuthorName = author.username;
//       }
//   };