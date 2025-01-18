import React, { useState, useEffect } from 'react';
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Grid,
  Text,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import TransactionsTable from './transactiondata/TransactionsTable';
import Transfer from './Transfer';
import Deposit from './Deposit';
import Withdrawal from './Withdrawal';
import Facture from './Facture';
import TransactionTypeDistribution from './transactiondata/TransactionTypeDistribution';
import TransactionVolumeChart from './transactiondata/TransactionVolumeChart';
import RecentTransactionsChart from './transactiondata/RecentTransactionsChart';
import WalletBalanceChart from './WalletBalanceChart';
import { getAllOperations } from '../api';

function Transactions() {
  const [tabIndex, setTabIndex] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const data = await getAllOperations();
    setTransactions(data);
    setWalletBalance(data.walletBalance || 0);
  };

  return (
    <Box p={8}>
      <Text fontSize="3xl" fontWeight="bold" mb={6}>Transaction Dashboard</Text>
      <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={6}>
        <Box bg={bgColor} p={4} borderRadius="lg" boxShadow="md" borderWidth={1} borderColor={borderColor}>
          <Text fontSize="xl" fontWeight="semibold" mb={4}>Transaction Type Distribution</Text>
          <TransactionTypeDistribution transactions={transactions} />
        </Box>
        <Box bg={bgColor} p={4} borderRadius="lg" boxShadow="md" borderWidth={1} borderColor={borderColor}>
          <Text fontSize="xl" fontWeight="semibold" mb={4}>Transaction Volume</Text>
          <TransactionVolumeChart transactions={transactions} />
        </Box>
      </Grid>
      <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={6}>
        <Box bg={bgColor} p={4} borderRadius="lg" boxShadow="md" borderWidth={1} borderColor={borderColor}>
          <Text fontSize="xl" fontWeight="semibold" mb={4}>Recent Transactions</Text>
          <RecentTransactionsChart transactions={transactions} />
        </Box>
        <Box bg={bgColor} p={4} borderRadius="lg" boxShadow="md" borderWidth={1} borderColor={borderColor}>
          <Text fontSize="xl" fontWeight="semibold" mb={4}>Wallet Balance History</Text>
          <WalletBalanceChart transactions={transactions} currentBalance={walletBalance} />
        </Box>
      </Grid>
      <Box bg={bgColor} p={4} borderRadius="lg" boxShadow="md" borderWidth={1} borderColor={borderColor}>
        <Tabs index={tabIndex} onChange={setTabIndex}>
          <TabList>
            <Tab>All Transactions</Tab>
            <Tab>Transfer</Tab>
            <Tab>Deposit</Tab>
            <Tab>Withdrawal</Tab>
            <Tab>Facture</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TransactionsTable transactions={transactions} walletBalance={walletBalance} />
            </TabPanel>
            <TabPanel>
              <Transfer onTransactionComplete={fetchTransactions} />
            </TabPanel>
            <TabPanel>
              <Deposit onTransactionComplete={fetchTransactions} />
            </TabPanel>
            <TabPanel>
              <Withdrawal onTransactionComplete={fetchTransactions} />
            </TabPanel>
            <TabPanel>
              <Facture onTransactionComplete={fetchTransactions} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}

export default Transactions;

