module.exports = ({ env }) => ({
  'todo': {
    enabled: true,
    resolve: './src/plugins/todo'
  },
  'audit-logs': {
    enabled: true,
    resolve: './src/plugins/audit-logs'
  },
  'restaurant': {
    enabled: true,
    resolve: './src/plugins/restaurant'
  },
  'publisher': {
    enabled: true,
    config: {
      hooks: {
        beforePublish: async ({ strapi, uid, entity }) => {
          console.log('beforePublish');
        },
        afterPublish: async ({ strapi, uid, entity }) => {
          console.log('afterPublish');
        },
        beforeUnpublish: async ({ strapi, uid, entity }) => {
          console.log('beforeUnpublish');
        },
        afterUnpublish: async ({ strapi, uid, entity }) => {
          console.log('afterUnpublish');
        },
      },
    },
  },
})