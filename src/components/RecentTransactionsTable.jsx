import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
} from '@chakra-ui/react';

function RecentTransactionsTable({ transactions }) {
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
    <Table variant="simple" size="sm">
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Type</Th>
          <Th>Amount</Th>
          <Th>Date</Th>
        </Tr>
      </Thead>
      <Tbody>
        {transactions.map((transaction) => (
          <Tr key={transaction.id}>
            <Td>{transaction.id}</Td>
            <Td>
              <Badge colorScheme={getTransactionColor(transaction.typeOperation)}>
                {transaction.typeOperation}
              </Badge>
            </Td>
            <Td isNumeric>${Math.abs(transaction.amount).toFixed(2)}</Td>
            <Td>{new Date(transaction.date).toLocaleString()}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default RecentTransactionsTable;

