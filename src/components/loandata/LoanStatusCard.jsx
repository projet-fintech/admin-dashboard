import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';

function LoanStatusCard({ title, count, colorScheme }) {
  return (
    <Box bg={`${colorScheme}.50`} p={4} borderRadius="lg" boxShadow="md">
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="lg" fontWeight="medium" color={`${colorScheme}.700`}>{title}</Text>
        <Text fontSize="3xl" fontWeight="bold" color={`${colorScheme}.500`}>{count}</Text>
      </Flex>
    </Box>
  );
}

export default LoanStatusCard;

