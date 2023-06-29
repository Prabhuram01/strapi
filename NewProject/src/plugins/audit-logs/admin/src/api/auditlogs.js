import { request } from "@strapi/helper-plugin";

const auditLogsRequests = {
    getAuditLogsData: async (data) => {
        return await request(`/audit-logs/getlogs`, {
            method: "POST",
            body: { data: data },
        });
    },
    getAllUsers: async () => {
        // console.log("/api/usersdata");
        return await request(`/audit-logs/getusers`, {
            method: "GET",
        });
    }
}

export default auditLogsRequests;