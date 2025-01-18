import React, { useState, useEffect } from 'react';
import { Box, Button, Input, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Table, Thead, Tbody, Tr, Th, Td, useDisclosure } from '@chakra-ui/react';
import { addVirement, getAllVirements } from '../api'; // assuming you have an API function to fetch the transfers

function Transfer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [transfer, setTransfer] = useState({
    description: '',
    amount: '',
    compteId: '',
    employe_id: '',
    client_id: '',
    compteCreID: '',
    date: new Date().toISOString(),
  });
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const response = await getAllVirements(); // Fetch transfers from the backend
        console.log(response.data); // Log to check the response structure
        if (Array.isArray(response.data)) {
          setTransfers(response.data); // Set transfers state if data is an array
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching transfers:', error); // Log any errors
      }
    };
    fetchTransfers();
  }, []);

  const handleTransfer = async () => {
    const transferData = {
      ...transfer,
      amount: parseFloat(transfer.amount),
      date: new Date().toISOString(),
    };
    await addVirement(transferData); // Send transfer to the backend
    setTransfer({
      description: '',
      amount: '',
      compteId: '',
      employe_id: '',
      client_id: '',
      compteCreID: '',
      date: new Date().toISOString(),
    });
    onClose(); // Close the modal after submitting
    const response = await getAllVirements(); // Refresh the transfer list
    setTransfers(response.data);
  };

  return (
    <Box>
      <Button onClick={onOpen}>Add Transfer</Button>

      {/* Table to display transfers */}
      <Table variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>Description</Th>
            <Th>Amount</Th>
            <Th>From Account</Th>
            <Th>To Account</Th>
            <Th>Employee ID</Th>
            <Th>Client ID</Th>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Array.isArray(transfers) && transfers.length > 0 ? (
            transfers.map((transfer) => (
              <Tr key={transfer.id}>
                <Td>{transfer.description}</Td>
                <Td>{transfer.amount}</Td>
                <Td>{transfer.compteDeb}</Td>
                <Td>{transfer.comptecred}</Td>
                <Td>{transfer.employe_id}</Td>
                <Td>{transfer.client_id}</Td>
                <Td>{new Date(transfer.date).toLocaleString()}</Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan="7">No transfers available</Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      {/* Modal to create a new transfer */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Transfer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Input
                placeholder="Description"
                value={transfer.description}
                onChange={(e) => setTransfer({ ...transfer, description: e.target.value })}
              />
              <Input
                placeholder="Amount"
                value={transfer.amount}
                onChange={(e) => setTransfer({ ...transfer, amount: e.target.value })}
              />
              <Input
                placeholder="Compte ID (UUID)"
                value={transfer.compteId}
                onChange={(e) => setTransfer({ ...transfer, compteId: e.target.value })}
              />
              <Input
                placeholder="Employee ID"
                value={transfer.employe_id}
                onChange={(e) => setTransfer({ ...transfer, employe_id: e.target.value })}
              />
              <Input
                placeholder="Client ID"
                value={transfer.client_id}
                onChange={(e) => setTransfer({ ...transfer, client_id: e.target.value })}
              />
              <Input
                placeholder="Compte Cre ID (UUID)"
                value={transfer.compteCreID}
                onChange={(e) => setTransfer({ ...transfer, compteCreID: e.target.value })}
              />
              <Button onClick={handleTransfer}>Transfer</Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Transfer;
