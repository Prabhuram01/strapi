'use strict';

module.exports = ({ strapi }) => ({
    async getAuditLogs(ctx) {
        try {
            // console.log("In GetAuditLogs Service");
            // console.log("ctx");
            // console.log(ctx.request.body);
            // console.log(ctx.request.body.data.startdate);
            console.log(ctx.request.body.data.name);
            // console.log(ctx.request.body.data.enddate);
            // console.log("ctx.query");
            // console.log(ctx.query);
            // console.log("");
            const startdate = new Date(ctx.request.body.data.startdate);
            // console.log(startdate)
            const enddate = new Date(ctx.request.body.data.enddate);
            // console.log(enddate)

            const userAuditLogsData = await strapi.entityService.findMany("api::restaurant.restaurant", {
                publicationState: 'preview',
                filters: {
                    createdBy: {
                        $or: [
                            { email: ctx.request.body.data.name },
                            // { email: "prabhuramkancharla2@gmail.com" }
                        ]
                    }
                },
                populate: { createdBy: true },
            });
            let inrange = 0;
            // console.log("userAuditLogsData")
            console.log(userAuditLogsData)
            // console.log("userAuditLogsData.length")
            // console.log(userAuditLogsData.length)
            for (let i = 0; i < userAuditLogsData.length; i++) {
                let createDate = new Date(userAuditLogsData[i].createdAt.slice(0, 10));
                if (createDate >= startdate && createDate <= enddate) {
                    inrange += 1;
                }
            }
            // console.log(inrange);

            ctx.response.status = 200;
            ctx.response.message = {
                id: 1,
                message: "all ok",
                success: true,
                name: ctx.request.body.data.name,
                total: userAuditLogsData.length,
                inrange: inrange,
            };
            // console.log("ctx.response");
            // console.log(ctx.response);
            return ctx.response;
        } catch (err) {
            console.log("some error occured which is ");
            console.log(err.message);
            console.log("Complete error is");
            console.log(err);
        }
    },
    async getUsers(ctx) {
        try {
            const userdata = await strapi.entityService.findMany("api::restaurant.restaurant", {
                publicationState: 'preview',
                populate: { createdBy: true },
            });
            // console.log(userdata)
            return userdata
        } catch (err) {
            console.log("some error occured which is ");
            console.log(err.message);
            console.log("Complete error is");
            console.log(err);
        }
    }
});
