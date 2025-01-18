import React, { useState } from 'react';
import { Box, Button, Input, VStack } from '@chakra-ui/react';
import { addRetrait } from '../api';

function Withdrawal() {
  const [withdrawal, setWithdrawal] = useState({ accountId: '', amount: '' });

  const handleWithdrawal = async () => {
    await addRetrait(withdrawal);
    setWithdrawal({ accountId: '', amount: '' });
    // You might want to add some feedback to the user here
  };

  return (
    <Box>
      <VStack spacing={4} align="stretch">
        <Input
          placeholder="Account ID"
          value={withdrawal.accountId}
          onChange={(e) => setWithdrawal({ ...withdrawal, accountId: e.target.value })}
        />
        <Input
          placeholder="Amount"
          value={withdrawal.amount}
          onChange={(e) => setWithdrawal({ ...withdrawal, amount: e.target.value })}
        />
        <Button onClick={handleWithdrawal}>Withdraw</Button>
      </VStack>
    </Box>
  );
}

export default Withdrawal;

