'use strict';

const { Strapi } = require("@strapi/icons");

module.exports = ({ strapi }) => ({
    async getAuditLogs(ctx) {
        try {
            console.log("In GetAuditLogs Service");
            console.log("ctx");
            console.log(ctx.request.body);
            console.log(ctx.request.body.data.startdate);
            console.log(ctx.request.body.data.enddate);
            console.log("ctx.query");
            console.log(ctx.query);
            console.log("");
            const startdate = new Date(ctx.request.body.data.startdate);
            const enddate = new Date(ctx.request.body.data.enddate);

            const userAuditLogsData = await strapi.entityService.findMany("api::restaurant.restaurant", {
                filters: {
                    createdBy: {
                        firstname: "RIZWANULLAH"
                    }
                },
                populate: { createdBy: true },
            });

            // console.log("userAuditLogsData");
            // console.log(userAuditLogsData);

            let inrange = 0;
            console.log("userAuditLogsData.length")
            console.log(userAuditLogsData.length)
            for (let i = 0; i < userAuditLogsData.length; i++) {
                let createDate = new Date(userAuditLogsData[i].createdAt.slice(0, 10));
                // console.log("createDate");
                // console.log(createDate);

                // console.log("userAuditLogsData[i].createdAt");
                // console.log(userAuditLogsData[i].createdAt);

                // console.log(`${createDate} >= ${startdate} && ${createDate} <= ${enddate}`)
                // console.log(createDate >= startdate,createDate <= enddate)

                if (createDate >= startdate && createDate <= enddate) {
                    inrange += 1;
                }
            }

            console.log("inrange");
            console.log(inrange);

            ctx.response.status = 200;
            ctx.response.message = {
                id:1,
                message:"all ok",
                success:true,
                name:ctx.request.body.data.name[0],
                total:userAuditLogsData.length,
                inrange:inrange
            };


            console.log("ctx.response");
            console.log(ctx.response);

            // console.log("strapi");
            // console.log(strapi);
            // return userAuditLogsData;

            return ctx.response;
            // console.log(datafromcategories);
            // console.log(datafromcategories[0].sub_categories);
            // const responsedemo = {
            //     status: "ok"
            // }
            // return responsedemo;
        } catch (err) {
            console.log("some error occured which is ");
            console.log(err.message);
            console.log("Complete error is");
            console.log(err);
        }
    }
});

// const strapiresponse = await fetch('http://127.0.0.1:1337/api/restaurants', {
            // method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json',
            // },
            // body: JSON.stringify({
            //     data: {
            //         name: "res.name",
            //         description: "res.description",
            //         category: "res.category",
            //         subCategory: "res.subCategory",
            //     }
            // }),
            // })
            // .then(response => response.json())
            //     .then(data => console.log(data));

            // const datas = await strapiresponse.json();
            // console.log(strapiresponse.json());
            // console.log("datas");
            // console.log(datas);