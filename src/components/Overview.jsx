import React, { useState, useEffect } from 'react';
import {
  Box,
  SimpleGrid,
  Text,
  Flex,
  Button,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react';
import { RefreshCw } from 'lucide-react';
import { getAllAccounts, getAllClients, getAllEmployees, getAllOperations, getAllLoanApplications } from '../api';
import KPICard from './KPICard';
import OverviewChart from './OverviewChart';
import TransactionTrend from './TransactionTrend';
import AccountDistribution from './AccountDistribution';

const Overview = () => {
  const [data, setData] = useState({
    employees: 0,
    clients: 0,
    transactions: 0,
    loans: 0,
    accounts: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const bgColor = useColorModeValue("white", "gray.800");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [accounts, clients, employees, operations, loans] = await Promise.all([
        getAllAccounts(),
        getAllClients(),
        getAllEmployees(),
        getAllOperations(),
        getAllLoanApplications(),
      ]);

      setData({
        employees: employees.length,
        clients: clients.length,
        transactions: operations.length,
        loans: loans.length,
        accounts: accounts.length,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box p={8}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Text fontSize="3xl" fontWeight="bold">Bank Dashboard Overview</Text>
        <Button
          leftIcon={<RefreshCw size={20} />}
          colorScheme="teal"
          onClick={fetchData}
          isLoading={isLoading}
        >
          Refresh Data
        </Button>
      </Flex>

      {isLoading ? (
        <Flex justifyContent="center" alignItems="center" height="50vh">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} spacing={6} mb={8}>
            <KPICard title="Employees" value={data.employees} />
            <KPICard title="Clients" value={data.clients} />
            <KPICard title="Transactions" value={data.transactions} />
            <KPICard title="Loans" value={data.loans} />
            <KPICard title="Accounts" value={data.accounts} />
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
            <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md">
              <Text fontSize="xl" fontWeight="semibold" mb={4}>Overview Trends</Text>
              <OverviewChart data={data} />
            </Box>
            <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md">
              <Text fontSize="xl" fontWeight="semibold" mb={4}>Transaction Trend</Text>
              <TransactionTrend />
            </Box>
          </SimpleGrid>
        </>
      )}
    </Box>
  );
};

export default Overview;

