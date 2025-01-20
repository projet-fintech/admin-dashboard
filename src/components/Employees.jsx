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
  VStack,
  useDisclosure,
  Grid,
  Text,
  Flex,
  useColorModeValue,
  Select
} from "@chakra-ui/react"
import { getAllEmployees, createEmployee, updateEmployee, deleteEmployee } from '../api'
import EmployeeDepartmentDistribution from './employeedata/EmployeeDepartmentDistribution'
import EmployeeAgeDistribution from './employeedata/EmployeeAgeDistribution'
import EmployeeCityDistribution from './employeedata/EmployeeCityDistribution'
import EmployeeGrowthChart from './employeedata/EmployeeGrowthChart'

// Full array of nationalities (for demonstration purposes, here I'm using a limited set)
const nationalities = [
  'Afghan', 'Albanian', 'Algerian', 'American', 'Andorran', 'Angolan', 'Antiguan', 'Argentine',
  'Armenian', 'Australian', 'Austrian', 'Azerbaijani', 'Bahaman', 'Bahraini', 'Bangladeshi',
  'Barbadian', 'Belarusian', 'Belgian', 'Belizean', 'Beninese', 'Bhutanese', 'Bolivian', 'Bosnian',
  'Botswanan', 'Brazilian', 'British', 'Bruneian', 'Bulgarian', 'Burkinabe', 'Burundian', 'Cambodian',
  'Cameroonian', 'Canadian', 'Cape Verdean', 'Central African', 'Chadian', 'Chilean', 'Chinese', 'Colombian',
  'Comorian', 'Congolese', 'Costa Rican', 'Croatian', 'Cuban', 'Cypriot', 'Czech', 'Danish', 'Djiboutian',
  'Dominican', 'Ecuadorian', 'Egyptian', 'El Salvadoran', 'Equatorial Guinean', 'Eritrean', 'Estonian',
  'Eswatini', 'Ethiopian', 'Fijian', 'Filipino', 'Finnish', 'Gabonese', 'Gambian', 'Georgian', 'German',
  'Ghanian', 'Gibraltar', 'Greek', 'Grenadian', 'Guatemalan', 'Guinean', 'Guyanese', 'Haitian', 'Honduran',
  'Hungarian', 'Icelander', 'Indian', 'Indonesian', 'Iranian', 'Iraqi', 'Irish', 'Israeli', 'Italian', 'Jamaican',
  'Japanese', 'Jordanian', 'Kazakh', 'Kenyan', 'Kuwaiti', 'Kyrgyzstani', 'Laotian', 'Latvian', 'Lebanese', 'Liberian',
  'Libyan', 'Liechtenstein', 'Lithuanian', 'Luxembourgish', 'Macedonian', 'Malagasy', 'Malawian', 'Malaysian', 'Maldivian',
  'Malian', 'Malta', 'Marshallese', 'Mauritanian', 'Mauritian', 'Mexican', 'Moldovan', 'Monacan', 'Mongolian', 'Moroccan',
  'Mozambican', 'Namibian', 'Nepali', 'Nicaraguan', 'Nigerian', 'North Korean', 'Northern Irish', 'Norwegian', 'Omani', 'Pakistani',
  'Palauan', 'Panamanian', 'Papua New Guinean', 'Paraguayan', 'Peruvian', 'Philippine', 'Polish', 'Portuguese', 'Qatari',
  'Romanian', 'Russian', 'Rwandan', 'Saint Lucian', 'Saint Vincentian', 'Samoan', 'San Marinese', 'Sao Tomean', 'Saudi Arabian',
  'Senegalese', 'Serbian', 'Seychellois', 'Sierra Leonean', 'Singaporean', 'Slovak', 'Slovenian', 'Solomon Islands', 'Somali',
  'South African', 'South Korean', 'Spanish', 'Sri Lankan', 'Sudanese', 'Surinamese', 'Swazi', 'Swedish', 'Swiss', 'Syrian', 'Taiwanese',
  'Tajik', 'Tanzanian', 'Thai', 'Togolese', 'Tongan', 'Trinidadian', 'Tunisian', 'Turkish', 'Turkmen', 'Tuvaluan', 'Ugandan',
  'Ukrainian', 'Uruguayan', 'Uzbek', 'Venezuelan', 'Vietnamese', 'Welsh', 'Yemeni', 'Zambian', 'Zimbabwean'
];

const departments = ['IT', 'HR', 'Finance', 'Sales', 'Marketing', 'Operations', 'Legal', 'Customer Support'];

export function Employees() {
  const [employees, setEmployees] = useState([])
  const [filteredEmployees, setFilteredEmployees] = useState([])
  const [newEmployee, setNewEmployee] = useState({
    username: '',
    firstName: '',
    lastName: '',
    dateOfBirthday: '',
    age: '',
    password: '',
    nationality: '',
    telephoneNumber: '',
    department: '',
    city: '',
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('')
  const [nationalityFilter, setNationalityFilter] = useState('')
  const [cityFilter, setCityFilter] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bgColor = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")

  useEffect(() => {
    fetchEmployees()
  }, [])

  useEffect(() => {
    setFilteredEmployees(
      employees.filter(employee =>
        (employee.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.nationality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.telephoneNumber.includes(searchTerm)) &&
        (departmentFilter ? employee.department === departmentFilter : true) &&
        (nationalityFilter ? employee.nationality === nationalityFilter : true) &&
        (cityFilter ? employee.city === cityFilter : true)
      )
    )
  }, [searchTerm, employees, departmentFilter, nationalityFilter, cityFilter])

  const fetchEmployees = async () => {
    const data = await getAllEmployees()
    setEmployees(data)
  }

  const handleCreate = async () => {
    await createEmployee(newEmployee)
    setNewEmployee({
      username: '',
      firstName: '',
      lastName: '',
      dateOfBirthday: '',
      age: '',
      password: '',
      nationality: '',
      telephoneNumber: '',
      department: '',
      city: '',
    })
    onClose();
  }

  const handleUpdate = async (id, updatedData) => {
    await updateEmployee(id, updatedData)
    fetchEmployees()
  }

  const handleDelete = async (id) => {
    await deleteEmployee(id)
    fetchEmployees()
  }

  // Extract unique values for department, nationality, and city
  const uniqueDepartments = [...new Set(employees.map(e => e.department))];
  const uniqueNationalities = [...new Set(employees.map(e => e.nationality))];
  const uniqueCities = [...new Set(employees.map(e => e.city))];

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Text fontSize="3xl" fontWeight="bold">Employee Management</Text>
        <Button colorScheme="teal" onClick={onOpen}>Add Employee</Button>
      </Flex>

      <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={6}>
        <Box bg={bgColor} p={4} borderRadius="lg" boxShadow="md" borderWidth={1} borderColor={borderColor}>
          <Text fontSize="xl" fontWeight="semibold" mb={4}>Department Distribution</Text>
          <EmployeeDepartmentDistribution employees={employees} />
        </Box>
        <Box bg={bgColor} p={4} borderRadius="lg" boxShadow="md" borderWidth={1} borderColor={borderColor}>
          <Text fontSize="xl" fontWeight="semibold" mb={4}>Age Distribution</Text>
          <EmployeeAgeDistribution employees={employees} />
        </Box>
      </Grid>

      <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={6}>
        <Box bg={bgColor} p={4} borderRadius="lg" boxShadow="md" borderWidth={1} borderColor={borderColor}>
          <Text fontSize="xl" fontWeight="semibold" mb={4}>City Distribution</Text>
          <EmployeeCityDistribution employees={employees} />
        </Box>
        <Box bg={bgColor} p={4} borderRadius="lg" boxShadow="md" borderWidth={1} borderColor={borderColor}>
          <Text fontSize="xl" fontWeight="semibold" mb={4}>Employee Growth</Text>
          <EmployeeGrowthChart employees={employees} />
        </Box>
      </Grid>

      <Box bg={bgColor} p={4} borderRadius="lg" boxShadow="md" borderWidth={1} borderColor={borderColor} overflowX="auto">
        <FormControl mb={4} w="30%">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by username, name, nationality, or telephone"
          />
        </FormControl>

        <Flex mb={4}>
          <FormControl mr={4}>
            <FormLabel>Department</FormLabel>
            <Select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              placeholder="Select Department"
            >
              {uniqueDepartments.map(department => (
                <option key={department} value={department}>{department}</option>
              ))}
            </Select>
          </FormControl>

          <FormControl mr={4}>
            <FormLabel>Nationality</FormLabel>
            <Select
              value={nationalityFilter}
              onChange={(e) => setNationalityFilter(e.target.value)}
              placeholder="Select Nationality"
            >
              {nationalities.map(nationality => (
                <option key={nationality} value={nationality}>{nationality}</option>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>City</FormLabel>
            <Select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              placeholder="Select City"
            >
              {uniqueCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </Select>
          </FormControl>
        </Flex>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Age</Th>
              <Th>Department</Th>
              <Th>Nationality</Th>
              <Th>City</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredEmployees.map(employee => (
              <Tr key={employee.id}>
                <Td>{employee.username}</Td>
                <Td>{employee.firstName}</Td>
                <Td>{employee.lastName}</Td>
                <Td>{employee.age}</Td>
                <Td>{employee.department}</Td>
                <Td>{employee.nationality}</Td>
                <Td>{employee.city}</Td>
                <Td>
                  <Button colorScheme="teal" size="sm" onClick={() => handleUpdate(employee.id, { ...employee, department: 'Updated Dept' })}>Update</Button>
                  <Button colorScheme="red" size="sm" ml={2} onClick={() => handleDelete(employee.id)}>Delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Employee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  value={newEmployee.firstName}
                  onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  value={newEmployee.lastName}
                  onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={newEmployee.username}
                  onChange={(e) => setNewEmployee({ ...newEmployee, username: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={newEmployee.password}
                  onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                />
              </FormControl>
              <FormControl>                 
                <FormLabel>Date of Birth</FormLabel>
                  <Input type="date" value={newEmployee.dateOfBirthday} onChange={(e) => setNewEmployee({ ...newEmployee, dateOfBirthday: e.target.value })} /> 
              </FormControl>
              <FormControl>
                <FormLabel>Age</FormLabel>
                <Input
                  type="number"
                  value={newEmployee.age}
                  onChange={(e) => setNewEmployee({ ...newEmployee, age: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Nationality</FormLabel>
                <Select
                  value={newEmployee.nationality}
                  onChange={(e) => setNewEmployee({ ...newEmployee, nationality: e.target.value })}
                >
                  {nationalities.map(nationality => (
                    <option key={nationality} value={nationality}>{nationality}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Department</FormLabel>
                <Select
                  value={newEmployee.department}
                  onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                >
                  {departments.map(department => (
                    <option key={department} value={department}>{department}</option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>City</FormLabel>
                <Input
                  type="text"
                  value={newEmployee.city}
                  onChange={(e) => setNewEmployee({ ...newEmployee, city: e.target.value })}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleCreate}>Create</Button>
            <Button colorScheme="gray" onClick={onClose} ml={3}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
