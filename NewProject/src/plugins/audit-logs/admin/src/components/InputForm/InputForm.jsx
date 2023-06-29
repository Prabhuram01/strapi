import React from 'react'
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Box, Typography } from '@strapi/design-system';
import { Table, Thead, Tbody, Tr, Td, Th, BaseCheckbox, VisuallyHidden, Avatar, IconButton } from '@strapi/design-system';
import {
    SingleSelect,
    SingleSelectOption,
    MultiSelect,
    MultiSelectOption,
    MultiSelectNested,
    Select,
    Option,
    OptGroup,
} from '@strapi/design-system';
import { DatePicker, Flex, Button, Alert } from '@strapi/design-system';
// import { Pencil, Trash } from '@strapi/icons';
import Refresh from '@strapi/icons/Refresh';
import auditLogsRequests from '../../api/auditlogs';

const InputForm = () => {
    const [user, setUser] = useState();
    const [startdate, setStartDate] = useState();
    const [enddate, setEndDate] = useState();
    const [showResponseResult, setShowResponseResult] = useState(false)
    const [responseData, setresponseData] = useState([]);
    const [usersList, setUsersList] = useState([]);

    const pickStartDate = (selectedDate) => {
        const formattedDate = format(selectedDate, 'yyyy-LL-dd');
        setStartDate(formattedDate);
    };

    const pickEndDate = (selectedDate) => {
        const formattedDate = format(selectedDate, 'yyyy-LL-dd');
        setEndDate(formattedDate);
    };
    const fetchUsers = async () => {
        const allUsers = await auditLogsRequests.getAllUsers();
        let users = new Set()
        for (let i = 0; i < allUsers.length; i++) {
            users.add(allUsers[i].createdBy.email)
        }
        setUsersList([...users]);
    };

    const handleRefreshUsers = async () => {
        await fetchUsers();
    };

    const handleInputFormSubmit = async (e) => {
        e.preventDefault();

        const data = {
            name: user,
            startdate: startdate,
            enddate: enddate
        };

        const responsedata = await auditLogsRequests.getAuditLogsData(data);
        setShowResponseResult(responsedata.message.success);
        setresponseData([responsedata.message]);
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
                            {/* <Box padding={2}> */}
                            <Button variant='primary' type="submit" startIcon={<Refresh />} onClick={handleRefreshUsers}>Refresh Users</Button>
                            {/* </Box> */}
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
                            <DatePicker required name="startdate" label="Start Date" onChange={pickStartDate} value={startdate} onClear={() => setStartDate()} placeholder="DD/MM/YYYY" />
                        </Flex>
                        <br />
                        <Flex direction="column" alignItems="stretch" gap={11}>
                            <DatePicker required name="enddate" label="End Date" onChange={pickEndDate} value={enddate} onClear={() => setEndDate()} placeholder="DD/MM/YYYY" />
                        </Flex>
                        <br />
                        <Button variant='secondary' type="submit">Show Data</Button>
                    </Box>
                </form>
                <br />

                {showResponseResult && <div className="result-data">
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
                                {responseData.map(entry => <Tr key={entry.id}>
                                    <Td>
                                        <Typography textColor="neutral800">{entry.id}</Typography>
                                    </Td>
                                    <Td>
                                        <Typography textColor="neutral800">{entry.name}</Typography>
                                    </Td>
                                    <Td>
                                        <Typography textColor="neutral800">{entry.inrange}</Typography>
                                    </Td>
                                    <Td>
                                        <Typography textColor="neutral800">{entry.total}</Typography>
                                    </Td>
                                </Tr>)}
                            </Tbody>
                        </Table>
                    </Box>;
                </div>}
            </div >
        </>
    )
}

export default InputForm