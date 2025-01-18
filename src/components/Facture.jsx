import React, { useState, useEffect } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, Input, VStack } from '@chakra-ui/react';
import { payFacture, getAllFactures, deleteFacture } from '../api';

function Facture() {
  const [factures, setFactures] = useState([]);
  const [newFacture, setNewFacture] = useState({ accountId: '', amount: '', description: '' });

  useEffect(() => {
    fetchFactures();
  }, []);

  const fetchFactures = async () => {
    const data = await getAllFactures();
    setFactures(data);
  };

  const handlePayFacture = async () => {
    await payFacture(newFacture);
    setNewFacture({ accountId: '', amount: '', description: '' });
    fetchFactures();
  };

  const handleDeleteFacture = async (id) => {
    await deleteFacture(id);
    fetchFactures();
  };

  return (
    <Box>
      <VStack spacing={4} align="stretch">
        <Input
          placeholder="Account ID"
          value={newFacture.accountId}
          onChange={(e) => setNewFacture({ ...newFacture, accountId: e.target.value })}
        />
        <Input
          placeholder="Amount"
          value={newFacture.amount}
          onChange={(e) => setNewFacture({ ...newFacture, amount: e.target.value })}
        />
        <Input
          placeholder="Description"
          value={newFacture.description}
          onChange={(e) => setNewFacture({ ...newFacture, description: e.target.value })}
        />
        <Button onClick={handlePayFacture}>Pay Facture</Button>
      </VStack>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Facture ID</Th>
            <Th>Account ID</Th>
            <Th>Amount</Th>
            <Th>Description</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {factures.map((facture) => (
            <Tr key={facture.id}>
              <Td>{facture.id}</Td>
              <Td>{facture.accountId}</Td>
              <Td>{facture.amount}</Td>
              <Td>{facture.description}</Td>
              <Td>
                <Button onClick={() => handleDeleteFacture(facture.id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default Facture;

