import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Text,
  Flex,
  Grid,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  VStack,
} from '@chakra-ui/react';
import TransactionsTable from './transactiondata/TransactionsTable';
import TransactionTypeDistribution from './transactiondata/TransactionTypeDistribution';
import TransactionVolumeChart from './transactiondata/TransactionVolumeChart';
import RecentTransactionsChart from './transactiondata/RecentTransactionsChart';
import WalletBalanceChart from './WalletBalanceChart';
import { addRetrait, addVersement, getAllOperations } from '../api';

function Transactions() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [transactions, setTransactions] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [isDepositOpen, setDepositOpen] = useState(false);
  const [isWithdrawOpen, setWithdrawOpen] = useState(false);
  const [depositData, setDepositData] = useState({ 
    description: '', 
    amount: '', 
    employe_id: '', 
    compteId: '' });
  const [withdrawData, setWithdrawData] = useState({ 
    description: '', 
    amount: '',
    employe_id: '',  
    compteId: '' });
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

  const handleDepositChange = (e) => {
    const { name, value } = e.target;
    setDepositData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleWithdrawChange = (e) => {
    const { name, value } = e.target;
    setWithdrawData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDeposit = async (e) => {
    e.preventDefault();
    try {
      const verifiedDeposit = {
        description: depositData.description,
        date: new Date().toISOString(),
        amount: parseFloat(depositData.amount),
        compteId: depositData.compteId,
        employe_id: 1, 
      };
      console.log(verifiedDeposit);
      await addVersement(verifiedDeposit);
      toast({
        title: 'Deposit successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Deposit failed',
        description: 'An error occurred while processing your deposit.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('Error adding deposit:', error);
    }
  };

  // const handleWithdraw = async () => {
  //   try {
  //     await addRetrait(withdrawData);
  //     setWithdrawData({ description: '', amount: '', compteId: '' });
  //     setWithdrawOpen(false);
  //     fetchTransactions();
  //   } catch (error) {
  //     console.error('Error adding withdrawal:', error);
  //   }
  // };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    try {
      const verifiedWithdraw = {
        description: withdrawData.description,
        date: new Date().toISOString(),
        amount: parseFloat(withdrawData.amount),
        compteId: withdrawData.compteId,
        employe_id: 1, 
      };
      console.log(verifiedWithdraw);
      await addRetrait(verifiedWithdraw);
      toast({
        title: 'Withdraw successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Withdraw failed',
        description: 'An error occurred while processing your withdraw.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.error('Error adding withdraw:', error);
    }
  };

  return (
    <Box p={8}>
      <Text fontSize="3xl" fontWeight="bold" mb={6}>Transaction Dashboard</Text>

      <Flex mb={4} justifyContent="flex-end" gap={4}>
        <Button colorScheme="blue" onClick={() => setDepositOpen(true)}>Add Deposit</Button>
        <Button colorScheme="red" onClick={() => setWithdrawOpen(true)}>Add Withdrawal</Button>
      </Flex>

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
        <TransactionsTable transactions={transactions} walletBalance={walletBalance} />
      </Box>

      {/* Deposit Modal */}
      <Modal isOpen={isDepositOpen} onClose={() => setDepositOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Deposit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                name="description"
                placeholder="Description"
                value={depositData.description}
                onChange={handleDepositChange}              />
              <Input
                name="amount"
                placeholder="Amount"
                type="number"
                value={depositData.amount}
                onChange={handleDepositChange}              />
              <Input
                name="compteId"
                placeholder="Compte ID"
                value={depositData.compteId}
                onChange={handleDepositChange}              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleDeposit}>Add</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Withdrawal Modal */}
      <Modal isOpen={isWithdrawOpen} onClose={() => setWithdrawOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Withdrawal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
            <Input
                name="description"
                placeholder="Description"
                value={withdrawData.description}
                onChange={handleWithdrawChange}              />
              <Input
                name="amount"
                placeholder="Amount"
                type="number"
                value={withdrawData.amount}
                onChange={handleWithdrawChange}              />
              <Input
                name="compteId"
                placeholder="Compte ID"
                value={withdrawData.compteId}
                onChange={handleWithdrawChange}              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleWithdraw}>Add</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Transactions;
