'use client'

import { useState } from 'react'
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import { Employees } from './Employees'
import { Clients } from './Clients'

export default function Users() {
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <Box maxWidth="100%" margin="auto" padding={8}>
      <Box as="h1" fontSize="3xl" fontWeight="bold" marginBottom={6}>User Management</Box>
      <Tabs index={tabIndex} onChange={setTabIndex}>
        <TabList>
          <Tab>Employees</Tab>
          <Tab>Clients</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Employees />
          </TabPanel>
          <TabPanel>
            <Clients />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

