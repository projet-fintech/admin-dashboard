import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Badge,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';

function TransactionsTable({ transactions, walletBalance }) {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const getTransactionColor = (type) => {
    switch (type.toLowerCase()) {
      case 'deposit':
        return 'green';
      case 'withdrawal':
        return 'red';
      case 'transfer':
        return 'blue';
      case 'facture':
        return 'orange';
      default:
        return 'gray';
    }
  };

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">Transaction History</Text>
        <Badge colorScheme="green" fontSize="xl" p={2} borderRadius="md">
          Wallet Balance: ${walletBalance.toFixed(2)}
        </Badge>
      </Flex>
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Transaction ID</Th>
              <Th>Description</Th>
              <Th>Amount</Th>
              <Th>Date</Th>
              <Th>Type</Th>
              <Th>Account ID</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((transaction) => (
              <Tr key={transaction.id}>
                <Td>{transaction.id}</Td>
                <Td>{transaction.description}</Td>
                <Td>
                  <Text
                    color={transaction.amount >= 0 ? "green.500" : "red.500"}
                    fontWeight="bold"
                  >
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </Text>
                </Td>
                <Td>{new Date(transaction.date).toLocaleString()}</Td>
                <Td>
                  <Badge colorScheme={getTransactionColor(transaction.typeOperation)}>
                    {transaction.typeOperation}
                  </Badge>
                </Td>
                <Td>{transaction.compteId}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default TransactionsTable;

