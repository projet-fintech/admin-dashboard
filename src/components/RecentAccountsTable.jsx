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

function RecentAccountsTable({ accounts }) {
  return (
    <Table variant="simple" size="sm">
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Type</Th>
          <Th>Balance</Th>
          <Th>Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {accounts.map((account) => (
          <Tr key={account.id_account}>
            <Td>{account.id_account}</Td>
            <Td>{account.accountType}</Td>
            <Td isNumeric>${account.balance.toFixed(2)}</Td>
            <Td>
              <Badge colorScheme={account.status === 'ACTIVE' ? 'green' : 'red'}>
                {account.status}
              </Badge>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default RecentAccountsTable;

