import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Grid,
  Text,
  Flex,
  useColorModeValue,
  Select,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { createAccount, getAllAccounts, updateAccountStatus, deleteAccount } from '../api';
import AccountTypeDistribution from './accountsdata/AccountTypeDistribution';
import AccountBalanceOverview from './accountsdata/AccountBalanceOverview';
import AccountStatusChart from './accountsdata/AccountStatusChart';
import AccountGrowthChart from './accountsdata/AccountGrowthChart';

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState({ id_client: '', accountType: '', initialBalance: '' });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, accountId: null });
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const data = await getAllAccounts();
    setAccounts(data);
  };

  const handleCreate = async () => {
    const createdAccount = await createAccount(newAccount);
    setAccounts(prevAccounts => [...prevAccounts, createdAccount]);
    setNewAccount({ id_client: '', accountType: '', initialBalance: '' });
    onClose();
  };

  const handleUpdateStatus = async (id, status) => {
    await updateAccountStatus(id, status);
    setAccounts(prevAccounts =>
      prevAccounts.map(account =>
        account.id_account === id ? { ...account, status } : account
      )
    );
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteConfirmation({ isOpen: true, accountId: id });
  };

  const confirmDelete = async () => {
    if (deleteConfirmation.accountId) {
      await deleteAccount(deleteConfirmation.accountId);
      setAccounts(prevAccounts =>
        prevAccounts.filter(account => account.id_account !== deleteConfirmation.accountId)
      );
      setDeleteConfirmation({ isOpen: false, accountId: null });
    }
  };

  return (
    <Box p={8}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Text fontSize="3xl" fontWeight="bold">Account Management Dashboard</Text>
        <Button onClick={onOpen} colorScheme="teal">
          Create New Account
        </Button>
      </Flex>

      <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={6}>
        <Box bg={bgColor} p={4} borderRadius="lg" boxShadow="md" borderWidth={1} borderColor={borderColor}>
          <Text fontSize="xl" fontWeight="semibold" mb={4}>Account Type Distribution</Text>
          <AccountTypeDistribution accounts={accounts} />
        </Box>
        <Box bg={bgColor} p={4} borderRadius="lg" boxShadow="md" borderWidth={1} borderColor={borderColor}>
          <Text fontSize="xl" fontWeight="semibold" mb={4}>Account Balance Overview</Text>
          <AccountBalanceOverview accounts={accounts} />
        </Box>
      </Grid>

      <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={6}>
        <Box bg={bgColor} p={4} borderRadius="lg" boxShadow="md" borderWidth={1} borderColor={borderColor}>
          <Text fontSize="xl" fontWeight="semibold" mb={4}>Account Status</Text>
          <AccountStatusChart accounts={accounts} />
        </Box>
        <Box bg={bgColor} p={4} borderRadius="lg" boxShadow="md" borderWidth={1} borderColor={borderColor}>
          <Text fontSize="xl" fontWeight="semibold" mb={4}>Account Growth</Text>
          <AccountGrowthChart accounts={accounts} />
        </Box>
      </Grid>

      <Box bg={bgColor} p={4} borderRadius="lg" boxShadow="md" borderWidth={1} borderColor={borderColor} overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Account ID</Th>
              <Th>Client ID</Th>
              <Th>Account Number</Th>
              <Th>Account Type</Th>
              <Th>Balance</Th>
              <Th>Status</Th>
              <Th>Created At</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {accounts.map((account) => (
              <Tr key={account.id_account}>
                <Td>{account.id_account}</Td>
                <Td>{account.id_client}</Td>
                <Td>{account.accountNumber}</Td>
                <Td>{account.accountType}</Td>
                <Td>${account.balance.toFixed(2)}</Td>
                <Td>{account.status}</Td>
                <Td>{new Date(account.createdAt).toLocaleString()}</Td>
                <Td>
                  <Button
                    onClick={() => handleUpdateStatus(account.id_account, account.status === 'active' ? 'inactive' : 'active')}
                    colorScheme={account.status === 'active' ? 'yellow' : 'green'}
                    size="sm"
                    mr={2}
                  >
                    {account.status === 'active' ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button
                    onClick={() => handleDeleteConfirmation(account.id_account)}
                    colorScheme="red"
                    size="sm"
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
            <Input
                placeholder="Client ID"
                value={newAccount.id_client}
                onChange={(e) => setNewAccount({ ...newAccount, id_client: e.target.value })}
              />
              <Input
                placeholder="Account Type"
                value={newAccount.accountType}
                onChange={(e) => setNewAccount({ ...newAccount, accountType: e.target.value })}
              />
              <Button onClick={handleCreate} colorScheme="blue">
                Create Account
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={deleteConfirmation.isOpen} onClose={() => setDeleteConfirmation({ isOpen: false, accountId: null })}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this account?
          </ModalBody>
          <Flex justifyContent="flex-end" mt={4}>
            <Button colorScheme="red" mr={3} onClick={confirmDelete}>
              Delete
            </Button>
            <Button onClick={() => setDeleteConfirmation({ isOpen: false, accountId: null })}>Cancel</Button>
          </Flex>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Accounts;

