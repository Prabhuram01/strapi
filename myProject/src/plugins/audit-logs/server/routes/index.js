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
];
