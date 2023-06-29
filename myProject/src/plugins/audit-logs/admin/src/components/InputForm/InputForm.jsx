import React from 'react'
import { useState } from 'react';
import { format } from 'date-fns';
import { Box, Typography } from '@strapi/design-system';
import { Table, Thead, Tbody, Tr, Td, Th, BaseCheckbox, VisuallyHidden, Avatar, IconButton } from '@strapi/design-system';
import {
    SingleSelect,
    SingleSelectOption,
    MultiSelect,
    MultiSelectOption,
    MultiSelectNested,
    /**
     * These imports are still valid, but will be removed in the
     * next major iteration
     */
    Select,
    Option,
    OptGroup,
} from '@strapi/design-system';
import { DatePicker, Flex, Button, Alert } from '@strapi/design-system';
import { Pencil, Trash } from '@strapi/icons';
import auditLogsRequests from '../../api/auditlogs';

const InputForm = () => {
    const [values, setValues] = useState([]);
    const [startdate, setStartDate] = useState(format(new Date(), 'yyyy-LL-dd'));
    const [enddate, setEndDate] = useState(format(new Date(), 'yyyy-LL-dd'));
    const [showResponseResult, setShowResponseResult] = useState(false)
    const [responseData, setresponseData] = useState([]);

    const pickStartDate = (selectedDate) => {
        const formattedDate = format(selectedDate, 'yyyy-LL-dd');
        setStartDate(formattedDate);
    };

    const pickEndDate = (selectedDate) => {
        const formattedDate = format(selectedDate, 'yyyy-LL-dd');
        setEndDate(formattedDate);
    };

    const handleInputFormSubmit = async (e) => {
        e.preventDefault();
        console.log(e);
        console.log(values);
        console.log(startdate, enddate);

        const data = {
            name: values,
            startdate: startdate,
            enddate: enddate
        }

        const responsedata = await auditLogsRequests.getAuditLogsData(data);

        console.log("response data");
        console.log(responsedata);
        // console.log(responsedata.body);
        setShowResponseResult(responsedata.message.success);
        console.log(responsedata.message.success);
        // setresponseData(data => [...data, responsedata.message])
        setresponseData([responsedata.message])
        // const datainjson = responsedata.json();
        // console.log("datainjson");
        // console.log(datainjson);

    }

    const ROW_COUNT = 4;
    const COL_COUNT = 4;
    // const entry = {
    //     cover: 'https://avatars.githubusercontent.com/u/3874873?v=4',
    //     description: 'Chez Léon is a human sized Parisian',
    //     category: 'French cuisine',
    //     contact: 'Leon Lafrite'
    // };
    // const entries = [];
    // for (let i = 0; i < 5; i++) {
    //     entries.push({
    //         ...entry,
    //         id: i
    //     });
    // }

    return (
        <>
            <div style={{ margin: "5px 20px", padding: "10px" }}>
                {/* <Alert closeLabel="Close alert" title="Title" variant="success">This is a message alert</Alert>
                <Alert closeLabel="Close alert" title="Title" variant="danger">This is a message alert</Alert> */}

                <br />
                <form onSubmit={handleInputFormSubmit}>

                    <Box padding={8} background="neutral0" shadow="filterShadow" borderColor="neutral200">
                        <MultiSelect label="Choose Author" name="author" required placeholder="Select Author From Dropdown" onClear={() => {
                            setValues(undefined);
                        }} value={values} onChange={setValues} withTags>
                            <MultiSelectOption value="RIZWANULLAH MOHAMMAD">RIZWANULLAH MOHAMMAD</MultiSelectOption>
                        </MultiSelect>
                        <br />
                        <Flex direction="column" alignItems="stretch" gap={11}>
                            <DatePicker required name="startdate" label="Start Date" onChange={pickStartDate} value={startdate} onClear={() => setStartDate()} />
                        </Flex>
                        <br />
                        <Flex direction="column" alignItems="stretch" gap={11}>
                            <DatePicker required name="enddate" label="End Date" onChange={pickEndDate} value={enddate} onClear={() => setEndDate()} />
                        </Flex>
                        <br />
                        <Button variant='secondary' type="submit">Show Data</Button>
                    </Box>
                </form>
                <br />
                {/* result : {showResponseResult} */}
                {console.log(responseData)}
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
            </div>
        </>
    )
}

export default InputForm