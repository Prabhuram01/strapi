module.exports = ({ env }) => ({
  'todo': {
    enabled: true,
    resolve: './src/plugins/todo'
  },
  'webstories': {
    enabled: true,
    resolve: './src/plugins/webstories'
  },
  'audit-logs': {
    enabled: true,
    resolve: './src/plugins/audit-logs'
  },
  'restaurant': {
    enabled: true,
    resolve: './src/plugins/restaurant'
  },
  'primary-category': {
    enabled: true,
    resolve: './src/plugins/primary-category'
  },
  'primary-sub-category': {
    enabled: true,
    resolve: './src/plugins/primary-sub-category'
  },
  'cj-primary-category': {
    enabled: true,
    resolve: './src/plugins/cj-primary-category'
  },
  'elections': {
    enabled: true,
    resolve: './src/plugins/elections'
  },
})