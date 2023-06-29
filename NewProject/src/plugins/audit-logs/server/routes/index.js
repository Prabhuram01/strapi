module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      policies: [],
    },
  },
  ,
  {
    method: 'POST',
    path: '/getlogs',
    handler: 'auditLogsController.getAuditLogs',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/getusers',
    handler: 'auditLogsController.getUsers',
    config: {
      policies: [],
      auth: false,
    },
  },
];
