import React, { useState, useEffect } from 'react';
import { Box, Button, Input, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Table, Thead, Tbody, Tr, Th, Td, useDisclosure } from '@chakra-ui/react';
import { addVersement, getAllVersements } from '../api'; // Assuming you have an API function to fetch the deposits

function Deposit() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deposit, setDeposit] = useState({
    description: '',
    amount: '',
    compteId: '',
    employe_id: '',
    date: new Date().toISOString(),
  });
  const [deposits, setDeposits] = useState([]); // Ensure it starts as an empty array

  useEffect(() => {
    // Fetch the list of deposits when the component is mounted
    const fetchDeposits = async () => {
      try {
        const response = await getAllVersements(); // Call the API to get the versements
        // Ensure the response data is an array
        if (Array.isArray(response.data)) {
          setDeposits(response.data); // Set the deposits if response is valid
        } else {
          console.error('API response data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch deposits:', error);
      }
    };
    fetchDeposits();
  }, []);

  const handleDeposit = async () => {
    const depositData = {
      ...deposit,
      amount: parseFloat(deposit.amount),
      date: new Date().toISOString(),
    };
    await addVersement(depositData); // Send deposit to the backend
    setDeposit({
      description: '',
      amount: '',
      compteId: '',
      employe_id: '',
      date: new Date().toISOString(),
    });
    onClose(); // Close the modal after submitting
    const response = await getAllVersements(); // Refresh the deposit list
    if (Array.isArray(response.data)) {
      setDeposits(response.data); // Update deposits after submitting
    }
  };

  return (
    <Box>
      {/* Button to open the modal */}
      <Button onClick={onOpen}>Add Deposit</Button>

      {/* Table to display deposits */}
      <Table variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>Description</Th>
            <Th>Amount</Th>
            <Th>Account ID</Th>
            <Th>Employee ID</Th>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {deposits.length > 0 ? (
            deposits.map((deposit) => (
              <Tr key={deposit.id}>
                <Td>{deposit.description}</Td>
                <Td>{deposit.amount}</Td>
                <Td>{deposit.compteId}</Td>
                <Td>{deposit.employe_id}</Td>
                <Td>{new Date(deposit.date).toLocaleString()}</Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan="5">No deposits available.</Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      {/* Modal to create a new deposit */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Deposit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Input
                placeholder="Description"
                value={deposit.description}
                onChange={(e) => setDeposit({ ...deposit, description: e.target.value })}
              />
              <Input
                placeholder="Amount"
                value={deposit.amount}
                onChange={(e) => setDeposit({ ...deposit, amount: e.target.value })}
              />
              <Input
                placeholder="Account ID (UUID)"
                value={deposit.compteId}
                onChange={(e) => setDeposit({ ...deposit, compteId: e.target.value })}
              />
              <Input
                placeholder="Employee ID"
                value={deposit.employe_id}
                onChange={(e) => setDeposit({ ...deposit, employe_id: e.target.value })}
              />
              <Button onClick={handleDeposit}>Deposit</Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Deposit;
