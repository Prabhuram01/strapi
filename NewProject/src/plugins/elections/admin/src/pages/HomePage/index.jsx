import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Select from 'react-select';
import { constituencies, constituenciesWithCandidates } from '../../components/consts';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Typography } from '@strapi/design-system';
import { Combobox, ComboboxOption, TextInput } from '@strapi/design-system';
import { Table, Thead, Tbody, Tr, Td, Th, Flex, Button, IconButton } from '@strapi/design-system';
import { CheckCircle, Pencil, Clock } from '@strapi/icons';


export default function Home() {
  const [selectedConstituency, setSelectedConstituency] = useState(null);
  const [selectedRound, setSelectedRound] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [originalData, setOriginalData] = useState({});

  const toastConfig = useMemo(() => ({
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
  }), []);

  const constituencyOptions = Object.entries(constituencies[0]).map(([value, label]) => ({ value, label }));
  const roundOptions = [...Array(10).keys()].map(num => ({ value: num + 1, label: `Round ${num + 1}` })).concat([{ value: 0, label: 'Postal Round' }]);

  const fetchConstituencyData = useCallback(async (constituencyId, roundNo) => {
    const apiUrl = `https://st3c6mb4v2.execute-api.ap-south-1.amazonaws.com/dev/results?year=2023&roundno=${roundNo}&constituencyid=${constituencyId}`;

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        toast.error('Network response was not ok', toastConfig);
        throw new Error('Network response was not ok');
      }
      const apiData = await response.json();

      const votesMap = new Map(apiData.data.map(item => [item.candidateid, item.totalvotes]));

      const updatedCandidates = constituenciesWithCandidates
        .filter(candidate => candidate.constituencyId === constituencyId)
        .map(candidate => ({
          ...candidate,
          totalvotes: votesMap.get(Number(candidate.candidateId)) || 0
        }));

      setCandidates(updatedCandidates);
      setOriginalData(updatedCandidates);

    } catch (error) {
      console.error("Error fetching constituency data:", error.message);
      toast.error("Error fetching constituency data", toastConfig);
    }
  }, [toastConfig])
  const fetchConstituencyStatus = useCallback(async (constituencyId) => {
    const apiUrl = `https://st3c6mb4v2.execute-api.ap-south-1.amazonaws.com/dev/countingStatus?constituencyId=${constituencyId}`;

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        toast.error('Network response was not ok', toastConfig);
        throw new Error('Network response was not ok');
      }
      const apiData = await response.json();
      setCompleted(apiData.countingComplete)

    } catch (error) {
      console.error("Error fetching constituency status:", error.message);
      toast.error("Error fetching constituency status", toastConfig);
    }
  }, [toastConfig])

  useEffect(() => {
    if (selectedConstituency) {
      fetchConstituencyStatus(selectedConstituency.value)
    }
  }, [selectedConstituency, fetchConstituencyStatus]);

  useEffect(() => {
    if (selectedConstituency && selectedRound) {
      fetchConstituencyData(selectedConstituency.value, selectedRound.value);
    }
  }, [selectedConstituency, selectedRound, fetchConstituencyData]);

  const handleConstituencyChange = (option) => {
    setSelectedConstituency(option);
    setSelectedRound(null);
    setCompleted(false);
    setEditMode(false);
  };

  const handleRoundChange = (option) => setSelectedRound(option);

  const handleVoteChange = (id, totalvotes) => {
    setCandidates(candidates.map(c => c.candidateId === id ? { ...c, totalvotes: totalvotes } : c));
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const saveVotes = async () => {
    setEditMode(false);
    const changedCandidates = candidates.filter((c, index) =>
      c.totalvotes !== originalData[index].totalvotes
    );

    if (changedCandidates.length === 0) {
      console.log("No changes to save");
      toast.success("No changes in data to save", toastConfig);
      return;
    }

    const saveDataPayload = {
      data: changedCandidates.map(c => ({
        year: 2023,
        roundno: selectedRound.value,
        candidateid: c.candidateId,
        constituencyid: selectedConstituency.value,
        partyid: c.partyId,
        totalvotes: c.totalvotes,
      })),
    };

    try {
      const response = await fetch('https://st3c6mb4v2.execute-api.ap-south-1.amazonaws.com/dev/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(saveDataPayload),
      });

      if (!response.ok) {
        toast.error('Failed to save votes', toastConfig);
        throw new Error('Failed to save votes');
      }

      const responseData = await response.json();

      if (responseData.success) {
        setOriginalData(candidates);
        toast.success(`${changedCandidates.length} rows have saved`, toastConfig);
      }

    } catch (error) {
      console.error("Error saving votes:", error);
      toast.error("Error saving votes", toastConfig);
    }
  };

  const handleCompletedChange = async () => {
    let title, expectedConsent;
    const userInfoFromSession = JSON.parse(window.sessionStorage.getItem('userInfo'));
    const authorName = userInfoFromSession?.firstname + ' ' + userInfoFromSession?.lastname

    if (completed) {
      title = `To confirm, type "ongoing":I ,<u>${authorName}</u>, confirm that elections counting in <u>${selectedConstituency.label}</u> is Ongoing.`;
      expectedConsent = 'ongoing';
    } else {
      title = `To confirm, type "completed":I <u>${authorName}</u>, confirm that the elections counting in </u>${selectedConstituency.label}</u> has been completed.`;
      expectedConsent = 'completed';
    }

    const result = await Swal.fire({
      // title: title,
      html: title,
      input: 'text',
      icon: "warning",
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
      inputPlaceholder: completed ? 'Ongoing' : 'completed',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write above consent to complete this action!!';
        }
        if (value.toLowerCase() !== expectedConsent) {
          return `Text does not match the required consent! Expected text: "${expectedConsent}"`;
        }
      }
    });

    if (result.value) {
      const statusUpdatePayload = {
        // year: 2023,
        constituencyId: selectedConstituency.value,
        countingComplete: !completed
      };
      try {
        const response = await fetch('https://st3c6mb4v2.execute-api.ap-south-1.amazonaws.com/dev/countingStatus', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(statusUpdatePayload),
        });

        if (!response.ok) {
          toast.error('Failed to update status', toastConfig);
          throw new Error('Failed to update status');
        }

        const responseData = await response.json();

        if (responseData.success) {
          toast.success('successfully status updated ', toastConfig);
          setCompleted(!completed);
        }

      } catch (error) {
        console.error("Error updating status:", error);
        toast.error("Error updating status", toastConfig);
      }
    };
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />
      <Box background="neutral100" paddingTop={6} paddingLeft={7}>
        <Typography variant="alpha">2023 Telangana Legislative Assembly election</Typography>
      </Box>
      <div style={{ margin: "5px 20px", padding: "10px" }}>
        <Box padding={6} background="neutral0" shadow="filterShadow" borderColor="neutral200">
          <Flex alignItems="center" gap={6}>
            <div style={{ width: "100%" }}><Combobox label="Choose Constituency" name="Constituency" fullWidth required placeholder={"Select Constituency From Dropdown"} onClear={() => {
              setSelectedConstituency(undefined);
            }} value={selectedConstituency} onChange={handleConstituencyChange} withTags>
              {
                constituencyOptions.map(constituency => {
                  return <ComboboxOption value={constituency}>{constituency.label}</ComboboxOption>
                })
              }
            </Combobox></div>
            {selectedConstituency && <>
              {!completed ? <Button onClick={handleCompletedChange} disabled={!selectedConstituency} variant="success-light" style={{ width: "12%", marginTop: '1.5%' }} endIcon={<Clock />}>Counting Ongoing</Button> :
                <Button onClick={handleCompletedChange} disabled={!selectedConstituency} variant="danger-light" style={{ width: "12%", marginTop: '1.5%' }} endIcon={<CheckCircle />}>Counting Completed</Button>}
            </>}

            {selectedConstituency && (
              <div style={{ width: "50%" }}>
                <Combobox label="Choose Round" name="Round" required placeholder={"Select Round From Dropdown"} onClear={() => {
                  setSelectedRound(undefined);
                }} value={selectedRound} onChange={handleRoundChange} withTags >
                  {
                    roundOptions.map(round => {
                      return <ComboboxOption value={round}>{round.label}</ComboboxOption>
                    })
                  }
                </Combobox>
              </div>
            )}
          </Flex>
        </Box >
        {selectedConstituency && selectedRound && (
          <>
            <div>
              <Box padding={6} background="neutral100">
                <Flex justifyContent="flex-end" paddingBottom={4}>
                  {editMode ? (
                    <Button onClick={saveVotes} endIcon={<CheckCircle />} variant="success">Save</Button>
                  ) : (
                    <Button onClick={toggleEditMode} endIcon={<Pencil />} disabled={completed}>Edit</Button>
                  )}
                </Flex>

                <Table colCount={3} rowCount={3}>
                  <Thead>
                    <Tr>
                      <Th><Typography variant="sigma">Party Name</Typography></Th>
                      <Th><Typography variant="sigma">Name of Candidate</Typography></Th>
                      <Th><Typography variant="sigma">{selectedRound.label}</Typography></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {candidates.map((candidate, index) => (
                      <Tr key={index}>
                        <Td><Typography textColor="neutral800">{candidate.partyName}</Typography></Td>
                        <Td><Typography textColor="neutral800">{candidate.candidateName}</Typography></Td>
                        <Td style={{ width: "25%" }}>
                          {editMode ? (
                            <TextInput
                              type="number"
                              aria-label="votes"
                              value={candidate.totalvotes}
                              onChange={(e) => handleVoteChange(candidate.candidateId, e.target.value)}
                              style={{ width: "100%" }}
                            />
                          ) : (
                            <Typography textColor="neutral800">{candidate.totalvotes}</Typography>
                          )}
                        </Td>
                        {/* </div> */}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </div>
          </>
        )}

      </div>
    </>
  );
}
