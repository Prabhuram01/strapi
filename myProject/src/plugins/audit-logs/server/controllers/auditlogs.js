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
    }
});
