import React from 'react';
import { Box, Stat, StatLabel, StatNumber, useColorModeValue } from '@chakra-ui/react';

const KPICard = ({ title, value }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Stat
      px={{ base: 4, md: 6 }}
      py="5"
      shadow="xl"
      border="1px solid"
      borderColor={borderColor}
      rounded="lg"
      bg={bgColor}
    >
      <StatLabel fontWeight="medium" isTruncated>
        {title}
      </StatLabel>
      <StatNumber fontSize="3xl" fontWeight="medium">
        {value.toLocaleString()}
      </StatNumber>
    </Stat>
  );
};

export default KPICard;

