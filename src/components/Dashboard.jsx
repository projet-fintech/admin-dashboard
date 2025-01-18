import React from 'react';
import { Box, Flex, VStack, Heading, useColorModeValue, Icon } from '@chakra-ui/react';
import { NavLink, Routes, Route } from 'react-router-dom';
import { FiHome, FiUsers, FiUserCheck, FiCreditCard } from 'react-icons/fi';
import Overview from './Overview';
import Employees from './Employees';
import Clients from './Clients';
import ClientAccounts from './ClientAccounts';

function Dashboard() {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const navItems = [
    { name: 'Overview', icon: FiHome, path: '/' },
    { name: 'Employees', icon: FiUsers, path: '/employees' },
    { name: 'Clients', icon: FiUserCheck, path: '/clients' },
    { name: 'Client Accounts', icon: FiCreditCard, path: '/accounts' },
  ];

  return (
    <Flex h="100vh" w="full">
      <Box w="250px" bg={bgColor} borderRight="1px" borderColor={borderColor} p={4}>
        <Heading size="md" mb={8}>Bank Admin Dashboard</Heading>
        <VStack spacing={2} align="stretch">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: isActive ? '#3182ce' : 'transparent',
                color: isActive ? 'white' : '#4a5568',
                textDecoration: 'none',
              })}
            >
              <Icon as={item.icon} mr={3} />
              {item.name}
            </NavLink>
          ))}
        </VStack>
      </Box>
      <Box flex={1} p={8} bg="gray.50" overflowY="auto">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/accounts" element={<ClientAccounts />} />
        </Routes>
      </Box>
    </Flex>
  );
}

export default Dashboard;
