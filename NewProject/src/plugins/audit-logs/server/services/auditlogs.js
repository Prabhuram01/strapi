'use strict';

module.exports = ({ strapi }) => ({
    async getAuditLogs(ctx) {
        try {
            console.log(ctx.request.body.data.name);
            console.log(ctx.request.body.data.startdate);
            console.log(ctx.request.body.data.enddate);

            if (ctx.request.body.data.name) {
                const articlesInRange = await strapi.entityService.count("api::restaurant.restaurant", {
                    publicationState: 'preview',
                    filters: {
                        $and: [
                            {
                                createdBy: {
                                    email: ctx.request.body.data.name,
                                }
                            },
                            {
                                createdAt: {
                                    $gte: ctx.request.body.data.startdate,
                                },
                            },
                            {
                                createdAt: {
                                    $lte: ctx.request.body.data.enddate,
                                },
                            },
                        ],
                    },
                });
                const totalArticles = await strapi.entityService.count("api::restaurant.restaurant", {
                    publicationState: 'preview',
                    // fields: ['createdAt'],
                    filters: {
                        createdBy: {
                            email: ctx.request.body.data.name,
                        }
                    },
                });

                const tableString = {
                    Author_Name: ctx.request.body.data.name,
                    In_Range: articlesInRange,
                    Total: totalArticles,
                };
                console.log('data if we have name', [tableString])
                ctx.response.status = 200;
                ctx.response.message = {
                    message: "all ok",
                    success: true,
                    result: [tableString],
                    hasName: true
                };
                return ctx.response;
            }
            else {
                const articlesInRange = await strapi.entityService.findMany("api::restaurant.restaurant", {
                    publicationState: 'preview',
                    filters: {
                        $and: [
                            {
                                createdAt: {
                                    $gte: ctx.request.body.data.startdate,
                                },
                            },
                            {
                                createdAt: {
                                    $lte: ctx.request.body.data.enddate,
                                },
                            },
                        ],
                    },
                    populate: { createdBy: true },
                    fields: ['id']
                });

                const articlesByAuthor = articlesInRange.reduce((acc, article) => {
                    const authorName = article.createdBy.email;
                    if (acc[authorName]) {
                        acc[authorName].in_range++;
                        acc[authorName].total = 0;
                    } else {
                        acc[authorName] = {
                            author_name: authorName,
                            in_range: 1,
                            total: 0,
                        };
                    }
                    return acc;
                }, {});


                for (const authorName of Object.keys(articlesByAuthor)) {
                    // Calculate the total count of articles for each author
                    const articlesTotal = await strapi.entityService.count("api::restaurant.restaurant", {
                        publicationState: 'preview',
                        filters: {
                            createdBy: {
                                email: authorName,
                            }
                        },
                    });

                    // Update the total count in the articlesByAuthor object
                    if (articlesByAuthor[authorName]) {
                        articlesByAuthor[authorName].total = articlesTotal;
                    }
                }

                const tableData = Object.values(articlesByAuthor);

                // Display the table
                console.table(tableData);
                console.log(articlesByAuthor);

                const tableString = tableData.map(({ author_name, in_range, total }) => ({
                    Author_Name: author_name,
                    In_Range: in_range,
                    Total: total,
                }));

                console.log("data if no name", tableString)
                ctx.response.status = 200;
                ctx.response.message = {
                    message: "all ok",
                    success: true,
                    result: tableString,
                    hasName: false
                };
                return ctx.response;

            }
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
            // console.log("userdata", userdata)
            return userdata
        } catch (err) {
            console.log("some error occured which is ");
            console.log(err.message);
            console.log("Complete error is");
            console.log(err);
        }
    }
});
