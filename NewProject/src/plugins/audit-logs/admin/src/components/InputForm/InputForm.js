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
import { Loader } from '@strapi/design-system';
import { Combobox, ComboboxOption } from '@strapi/design-system';
import { format } from 'date-fns';


const InputForm = () => {
    const [user, setUser] = useState();
    const [startdate, setStartDate] = useState();
    const [enddate, setEndDate] = useState();
    const [responseResult, SetResponseResult] = useState();
    const [usersList, setUsersList] = useState([]);
    const [usersLoading, setUsersLoading] = useState(false);
    const [resultLoading, setResultLoading] = useState(false);
    const [startDateError, setStartDateError] = useState(undefined);
    const [endDateError, setEndDateError] = useState(undefined);

    const pickStartDate = (selectedDate) => {
        console.log('type', typeof (selectedDate))
        if (selectedDate) {
            const formattedDate = format(selectedDate, 'yyyy-LL-dd HH:mm:ss');
            console.log('type', typeof (formattedDate))
            setStartDate(formattedDate);
        }
    };

    // const pickEndDate = (selectedDate) => {
    //     const formattedDate = format(selectedDate, 'yyyy-LL-dd');
    //     setEndDate(formattedDate);
    // };
    // console.log("users", usersList)
    const fetchUsers = async () => {
        setUsersLoading(true);
        try {
            const allUsers = await auditLogsRequests.getAllUsers();
            setUsersList([...new Set(allUsers.map(user => user.createdBy.email))]);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setUsersLoading(false);
        }
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
        if (!startdate) {
            setStartDateError('Start Date is required');
        } else if (!enddate) {
            setEndDateError('End Date is required')
        }
        else {
            setStartDateError();
            setEndDateError();
            setResultLoading(true);
            try {
                const responsedata = await auditLogsRequests.getAuditLogsData(data);
                console.log("responsedata", responsedata);
                SetResponseResult(responsedata.message.result);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setResultLoading(false);
            }
        }
    }

    const ROW_COUNT = 4;
    const COL_COUNT = 4;

    return (
        <>
            <div style={{ margin: "5px 20px", padding: "10px" }}>
                <br />
                <form onSubmit={handleInputFormSubmit}>
                    <Box padding={6} background="neutral0" shadow="filterShadow" borderColor="neutral200">
                        <Flex justifyContent="flex-end">
                            {usersLoading && <Loader small ></Loader>}
                            <Button variant='primary' startIcon={<Refresh />} onClick={handleRefreshUsers}>Fetch Users</Button>
                        </Flex>

                        <Combobox label="Choose Author" name="author" placeholder="Select Author From Dropdown" onClear={() => {
                            setUser(undefined);
                        }} value={user} onChange={setUser} withTags>
                            {
                                usersList.map(category => {
                                    return <ComboboxOption value={category}>{category}</ComboboxOption>
                                })
                            }
                        </Combobox>
                        <br />
                        <Flex direction="column" alignItems="stretch" gap={11}>
                            {/* <DatePicker required name="startdate" label="Start Date" onChange={pickStartDate} value={startdate} onClear={() => setStartDate()} placeholder="DD/MM/YYYY" />
                            {console.log(startdate)} */}
                            <DateTimePicker label="Start Date" locale="en-GB" value={startdate} onChange={pickStartDate} onClear={() => setStartDate(undefined)} placeholder='DD/MM/YYYY' required error={startDateError} />
                            {console.log('start date', startdate)}
                        </Flex>
                        <br />
                        <Flex direction="column" alignItems="stretch" gap={11}>
                            <DateTimePicker label="End Date" locale="en-GB" value={enddate} onChange={setEndDate} onClear={() => setEndDate(undefined)} placeholder='DD/MM/YYYY' required error={endDateError} />
                            {/* <DatePicker required name="enddate" label="End Date" onChange={pickEndDate} value={enddate} onClear={() => setEndDate()} placeholder="DD/MM/YYYY" /> */}
                        </Flex>
                        <br />
                        <Button variant='secondary' type="submit">Show Data</Button>
                    </Box>
                </form>
                <br />
                {resultLoading ? <Flex justifyContent="center"><Loader /></Flex> : <>
                    {responseResult && <div className="result-data">
                        <Box padding={0} background="neutral100">
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
                                    {responseResult.length == 0 && <Tr><Td colSpan="4"><Flex justifyContent="center" padding={2}><Typography ellipsis>No Data</Typography></Flex></Td></Tr>}
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
                    </div>}</>}
            </div >
        </>
    )
}

export default InputForm