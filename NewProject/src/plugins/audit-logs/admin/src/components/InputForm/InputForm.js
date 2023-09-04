import React from 'react'
import { useState } from 'react';
import { Box, Typography } from '@strapi/design-system';
import { Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system';
import {
    SingleSelect,
    SingleSelectOption
} from '@strapi/design-system';
import { DatePicker, Flex, Button, Alert, DateTimePicker } from '@strapi/design-system';
import Refresh from '@strapi/icons/Refresh';
import auditLogsRequests from '../../api/auditlogs';


const InputForm = () => {
    const [user, setUser] = useState();
    const [startdate, setStartDate] = useState();
    const [enddate, setEndDate] = useState();
    const [responseResult, SetResponseResult] = useState();
    const [usersList, setUsersList] = useState([]);

    // const pickStartDate = (selectedDate) => {
    //     const formattedDate = format(selectedDate, 'yyyy-LL-dd');
    //     setStartDate(formattedDate);
    // };

    // const pickEndDate = (selectedDate) => {
    //     const formattedDate = format(selectedDate, 'yyyy-LL-dd');
    //     setEndDate(formattedDate);
    // };
    console.log("users", usersList)
    const fetchUsers = async () => {
        const allUsers = await auditLogsRequests.getAllUsers();
        setUsersList([...new Set(allUsers.map(user => user.createdBy.email))]);
    };

    const handleRefreshUsers = async () => {
        await fetchUsers();
    };

    const handleInputFormSubmit = async (e) => {
        e.preventDefault();

        const data = {
            name: user,
            startdate: startdate ? startdate.toISOString() : null,
            enddate: enddate ? enddate.toISOString() : null
        };

        const responsedata = await auditLogsRequests.getAuditLogsData(data);
        console.log("responsedata", responsedata);
        SetResponseResult(responsedata.message.result);
    }

    const ROW_COUNT = 4;
    const COL_COUNT = 4;

    return (
        <>
            <div style={{ margin: "5px 20px", padding: "10px" }}>
                <br />
                <form onSubmit={handleInputFormSubmit}>
                    <Box padding={8} background="neutral0" shadow="filterShadow" borderColor="neutral200">
                        <Flex justifyContent="flex-end">
                            <Button variant='primary' startIcon={<Refresh />} onClick={handleRefreshUsers}>Fetch Users</Button>
                        </Flex>

                        <SingleSelect label="Choose Author" name="author" required placeholder="Select Author From Dropdown" onClear={() => {
                            setUser(undefined);
                        }} value={user} onChange={setUser} withTags>
                            {
                                usersList.map(category => {
                                    return <SingleSelectOption value={category}>{category}</SingleSelectOption>
                                })
                            }
                        </SingleSelect>
                        <br />
                        <Flex direction="column" alignItems="stretch" gap={11}>
                            {/* <DatePicker required name="startdate" label="Start Date" onChange={pickStartDate} value={startdate} onClear={() => setStartDate()} placeholder="DD/MM/YYYY" />
                            {console.log(startdate)} */}
                            <DateTimePicker label="Publish at" locale="en-GB" value={startdate} onChange={setStartDate} onClear={() => setStartDate(undefined)} placeholder='DD/MM/YYYY' />
                        </Flex>
                        <br />
                        <Flex direction="column" alignItems="stretch" gap={11}>
                            <DateTimePicker label="Publish at" locale="en-GB" value={enddate} onChange={setEndDate} onClear={() => setEndDate(undefined)} placeholder='DD/MM/YYYY' />
                            {/* <DatePicker required name="enddate" label="End Date" onChange={pickEndDate} value={enddate} onClear={() => setEndDate()} placeholder="DD/MM/YYYY" /> */}
                        </Flex>
                        <br />
                        <Button variant='secondary' type="submit">Show Data</Button>
                    </Box>
                </form>
                <br />

                {responseResult && <div className="result-data">
                    <h1>Result Data</h1>
                    <Box padding={8} background="neutral100">
                        <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
                            <Thead>
                                <Tr>
                                    <Th>
                                        <Typography variant="sigma">ID</Typography>
                                    </Th>
                                    <Th>
                                        <Typography variant="sigma">Name</Typography>
                                    </Th>
                                    <Th>
                                        <Typography variant="sigma">In Range</Typography>
                                    </Th>
                                    <Th>
                                        <Typography variant="sigma">Total</Typography>
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {responseResult && responseResult.map((entry, index) => (
                                    <Tr key={index}>
                                        <Td>
                                            <Typography textColor="neutral800">{index + 1}</Typography>
                                        </Td>
                                        <Td>
                                            <Typography textColor="neutral800">{entry.Author_Name}</Typography>
                                        </Td>
                                        <Td>
                                            <Typography textColor="neutral800">{entry.In_Range}</Typography>
                                        </Td>
                                        <Td>
                                            <Typography textColor="neutral800">{entry.Total}</Typography>
                                        </Td>
                                    </Tr>))}
                            </Tbody>
                        </Table>
                    </Box>
                </div>}
            </div >
        </>
    )
}

export default InputForm