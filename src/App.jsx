import React from 'react';
import { ChakraProvider, Box, VStack, HStack, Text, Flex, Image, useColorModeValue } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Users from './components/Users';
import Accounts from './components/Accounts';
import Transactions from './components/Transactions';
import Loans from './components/Loans';
import './App.css';
import Overview from './components/Overview';

function App() {
  const bg = useColorModeValue("gray.100", "gray.900");
  const navBg = useColorModeValue("white", "gray.800");

  return (
    <ChakraProvider>
      <Router>
        <Flex height="100vh" direction="column" bg={bg}>
          <Box as="nav" bg={navBg} boxShadow="sm" p={4}>
            <HStack justify="space-between" align="center" maxW="1200px" mx="auto">
              <Text fontSize="lg" fontWeight="bold" color="teal.500">ASMAS Bank - Admin</Text>
              <HStack spacing={6}>
                <NavLink to="/" style={{ textDecoration: 'none' }} activeClassName="active">
                  <Text fontSize="md" fontWeight="medium">Overview</Text>
                </NavLink>
                <NavLink to="/users" style={{ textDecoration: 'none' }} activeClassName="active">
                  <Text fontSize="md" fontWeight="medium">Users</Text>
                </NavLink>
                <NavLink to="/accounts" style={{ textDecoration: 'none' }} activeClassName="active">
                  <Text fontSize="md" fontWeight="medium">Accounts</Text>
                </NavLink>
                <NavLink to="/transactions" style={{ textDecoration: 'none' }} activeClassName="active">
                  <Text fontSize="md" fontWeight="medium">Transactions</Text>
                </NavLink>
                <NavLink to="/loans" style={{ textDecoration: 'none' }} activeClassName="active">
                  <Text fontSize="md" fontWeight="medium">Loans</Text>
                </NavLink>
              </HStack>
            </HStack>
          </Box>

          <Box flex="1" overflowY="auto" p={4}>
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/users" element={<Users />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/loans" element={<Loans />} />
            </Routes>
          </Box>
        </Flex>
      </Router>
    </ChakraProvider>
  );
}

export default App;
