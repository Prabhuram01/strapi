'use strict';

module.exports = ({ strapi }) => ({
    async getAuditLogs(ctx) {
        try {
            ctx.body = await strapi
                .plugin('audit-logs')
                .service('auditLogsService')
                .getAuditLogs(ctx);
        } catch (err) {
            ctx.throw(500, err);
        }
    },
    async getUsers(ctx) {
        try {
            ctx.body = await strapi
                .plugin('audit-logs')
                .service('auditLogsService')
                .getUsers(ctx);
        } catch (err) {
            ctx.throw(500, err);
        }
    }
});
