import { request } from "@strapi/helper-plugin";

const auditLogsRequests = {
    getAuditLogsData: async (data) => {
        console.log("/api/ausitlogsdata");
        console.log(data);

        return await request(`/audit-logs/getlogs`, {
            method: "POST",
            body: { data: data },
        });
    }
}

export default auditLogsRequests;