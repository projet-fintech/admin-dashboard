import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Grid,
  Select,
  VStack,
  useDisclosure,
  Text,
  Flex,
  useColorModeValue,
  Checkbox
} from "@chakra-ui/react"
import { getAllClients, createClient, updateClient, deleteClient } from '../api'
import ClientAgeDistribution from './clientdata/ClientAgeDistribution'
import ClientNationalityDistribution from './clientdata/ClientNationalityDistribution'
import ClientStatusChart from './clientdata/ClientStatusChart'
import ClientGrowthChart from './clientdata/ClientGrowthChart'

export function Clients() {
  const [clients, setClients] = useState([])
  const [newClient, setNewClient] = useState({
    username: '',
    firstName: '',
    lastName: '',
    dateOfBirthday: '',
    age: '',
    password: '',
    nationality: '',
    telephoneNumber: '',
    status: 'ACTIVE',
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, clientId: null });
  const [sortConfig, setSortConfig] = useState({ key: 'username', direction: 'asc' });
  const [showInactiveClients, setShowInactiveClients] = useState(true); // New state for checkbox
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query
  const bgColor = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    const data = await getAllClients()
    setClients(data)
  }

  const handleCreate = async () => {
    const createdClient = await createClient(newClient);
    setClients(prevClients => [...prevClients, createdClient]);
    setNewClient({
      username: '',
      firstName: '',
      lastName: '',
      dateOfBirthday: '',
      age: '',
      password: '',
      nationality: '',
      telephoneNumber: '',
      status: 'ACTIVE',
    });
    onClose();
  };

  const toggleClientStatus = async (client) => {
    const newStatus = client.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    const updatedClient = { ...client, status: newStatus };
    
    await updateClient(client.id, updatedClient);
    setClients(prevClients => 
      prevClients.map(c => c.id === client.id ? updatedClient : c)
    );
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteConfirmation({ isOpen: true, clientId: id });
  };

  const confirmDelete = async () => {
    if (deleteConfirmation.clientId) {
      await deleteClient(deleteConfirmation.clientId);
      setDeleteConfirmation({ isOpen: false, clientId: null });
      setClients(prevClients => 
        prevClients.filter(client => client.id !== deleteConfirmation.clientId)
      );
    }
  };

  const handleDelete = async (id) => {
    await deleteClient(id)
    fetchClients()
  }

  const sortData = (clients) => {
    return [...clients].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  // Filter clients into active and inactive
  const activeClients = clients.filter(client => client.status === 'ACTIVE');
  const inactiveClients = clients.filter(client => client.status === 'INACTIVE');
  
  // Sorted clients based on the current sortConfig
  const sortedActiveClients = sortData(activeClients);
  const sortedInactiveClients = sortData(inactiveClients);

  // Filter clients based on the search query
  const filterClients = (clients) => {
    return clients.filter(client => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      return (
        client.username.toLowerCase().includes(lowerCaseQuery) ||
        client.firstName.toLowerCase().includes(lowerCaseQuery) ||
        client.lastName.toLowerCase().includes(lowerCaseQuery) ||
        client.nationality.toLowerCase().includes(lowerCaseQuery) ||
        client.telephoneNumber.toLowerCase().includes(lowerCaseQuery)
      );
    });
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Text fontSize="3xl" fontWeight="bold">Client Management</Text>
        <Button colorScheme="teal" onClick={onOpen}>Add Client</Button>
      </Flex>
      <Checkbox 
            isChecked={showInactiveClients} 
            onChange={(e) => setShowInactiveClients(e.target.checked)}
          >
            Show Inactive Clients
          </Checkbox>

      <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={6}>
        <Box bg={bgColor} p={4} borderRadius="lg" boxShadow="md" borderWidth={1} borderColor={borderColor}>
          <Text fontSize="xl" fontWeight="semibold" mb={4}>Age Distribution</Text>
          <ClientAgeDistribution clients={showInactiveClients ? clients : activeClients} />
        </Box>
        <Box bg={bgColor} p={4} borderRadius="lg" boxShadow="md" borderWidth={1} borderColor={borderColor}>
          <Text fontSize="xl" fontWeight="semibold" mb={4}>Nationality Distribution</Text>
          <ClientNationalityDistribution clients={showInactiveClients ? clients : activeClients} />
        </Box>
      </Grid>

      <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={6}>
        <Box bg={bgColor} p={4} borderRadius="lg" boxShadow="md" borderWidth={1} borderColor={borderColor}>
          <Text fontSize="xl" fontWeight="semibold" mb={4}>Client Status</Text>
          <ClientStatusChart clients={showInactiveClients ? clients : activeClients} />
        </Box>
        <Box bg={bgColor} p={4} borderRadius="lg" boxShadow="md" borderWidth={1} borderColor={borderColor}>
          <Text fontSize="xl" fontWeight="semibold" mb={4}>Client Growth</Text>
          <ClientGrowthChart clients={showInactiveClients ? clients : activeClients} />
        </Box>
      </Grid>

      {/* Active Clients Table */}
      <Box bg={bgColor} p={4} borderRadius="lg" boxShadow="md" borderWidth={1} borderColor={borderColor} overflowX="auto" mb={6}>
        <Text fontSize="xl" fontWeight="semibold" mb={4}>Active Clients</Text>
        
        {/* Table Header with Search and Filter */}
        <Flex justify="space-between" mb={4}>
          <Input
            placeholder="Search by Username, Name, Nationality, Telephone"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            width="300px"
          />
        </Flex>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th onClick={() => handleSort('username')}>Username</Th>
              <Th onClick={() => handleSort('firstName')}>First Name</Th>
              <Th onClick={() => handleSort('lastName')}>Last Name</Th>
              <Th onClick={() => handleSort('dateOfBirthday')}>Date of Birth</Th>
              <Th onClick={() => handleSort('age')}>Age</Th>
              <Th onClick={() => handleSort('nationality')}>Nationality</Th>
              <Th onClick={() => handleSort('telephoneNumber')}>Telephone</Th>
              <Th onClick={() => handleSort('status')}>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filterClients(sortedActiveClients).map((client) => (
              <Tr key={client.id}>
                <Td>{client.username}</Td>
                <Td>{client.firstName}</Td>
                <Td>{client.lastName}</Td>
                <Td>{new Date(client.dateOfBirthday).toLocaleDateString()}</Td>
                <Td>{client.age}</Td>
                <Td>{client.nationality}</Td>
                <Td>{client.telephoneNumber}</Td>
                <Td>{client.status}</Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => toggleClientStatus(client)}
                    mr={2}
                  >
                    Deactivate
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => handleDeleteConfirmation(client.id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Inactive Clients Table */}
      {showInactiveClients && (
        <Box bg={bgColor} p={4} borderRadius="lg" boxShadow="md" borderWidth={1} borderColor={borderColor} overflowX="auto">
          <Text fontSize="xl" fontWeight="semibold" mb={4}>Inactive Clients</Text>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th onClick={() => handleSort('username')}>Username</Th>
                <Th onClick={() => handleSort('firstName')}>First Name</Th>
                <Th onClick={() => handleSort('lastName')}>Last Name</Th>
                <Th onClick={() => handleSort('dateOfBirthday')}>Date of Birth</Th>
                <Th onClick={() => handleSort('age')}>Age</Th>
                <Th onClick={() => handleSort('nationality')}>Nationality</Th>
                <Th onClick={() => handleSort('telephoneNumber')}>Telephone</Th>
                <Th onClick={() => handleSort('status')}>Status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filterClients(sortedInactiveClients).map((client) => (
                <Tr key={client.id}>
                  <Td>{client.username}</Td>
                  <Td>{client.firstName}</Td>
                  <Td>{client.lastName}</Td>
                  <Td>{new Date(client.dateOfBirthday).toLocaleDateString()}</Td>
                  <Td>{client.age}</Td>
                  <Td>{client.nationality}</Td>
                  <Td>{client.telephoneNumber}</Td>
                  <Td>{client.status}</Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="green"
                      onClick={() => toggleClientStatus(client)}
                      mr={2}
                    >
                      Activate
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDelete(client.id)}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteConfirmation.isOpen} onClose={() => setDeleteConfirmation({ isOpen: false, clientId: null })}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Client</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this client?</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setDeleteConfirmation({ isOpen: false, clientId: null })}>Cancel</Button>
            <Button colorScheme="red" onClick={confirmDelete}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Client Creation Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Client</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  value={newClient.username}
                  onChange={(e) => setNewClient({ ...newClient, username: e.target.value })}
                  placeholder="Enter username"
                />
              </FormControl>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input
                  value={newClient.firstName}
                  onChange={(e) => setNewClient({ ...newClient, firstName: e.target.value })}
                  placeholder="Enter first name"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input
                  value={newClient.lastName}
                  onChange={(e) => setNewClient({ ...newClient, lastName: e.target.value })}
                  placeholder="Enter last name"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Date of Birth</FormLabel>
                <Input
                  type="date"
                  value={newClient.dateOfBirthday}
                  onChange={(e) => setNewClient({ ...newClient, dateOfBirthday: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Age</FormLabel>
                <Input
                  value={newClient.age}
                  onChange={(e) => setNewClient({ ...newClient, age: e.target.value })}
                  placeholder="Enter age"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={newClient.password}
                  onChange={(e) => setNewClient({ ...newClient, password: e.target.value })}
                  placeholder="Enter password"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Nationality</FormLabel>
                <Select
                  value={newClient.nationality}
                  onChange={(e) => setNewClient({ ...newClient, nationality: e.target.value })}
                >
                  <option value="Moroccan">Moroccan</option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Telephone</FormLabel>
                <Input
                  value={newClient.telephoneNumber}
                  onChange={(e) => setNewClient({ ...newClient, telephoneNumber: e.target.value })}
                  placeholder="Enter telephone number"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select
                  value={newClient.status}
                  onChange={(e) => setNewClient({ ...newClient, status: e.target.value })}
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </Select>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button colorScheme="teal" onClick={handleCreate}>Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
