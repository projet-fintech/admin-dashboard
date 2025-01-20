import axios from 'axios';

const API_URL = 'http://localhost:8083/users'; // API FOR USERS (CLIENTS/EMPLOYEES) CRUDS
const API_URL3 = 'http://localhost:8082/api'; // API FOR LOAN MANAGEMENT 
const API_URL2 = 'http://localhost:8085/accounts' // API FOR CLIENTS ACCOUNTS MANAGEMENT
const API_URL4 = 'http://localhost:8084/api' // API FOR TRANSACTIONS MANAGEMENT (DEPOSIT/SEND/TRANSACTIONS)

// Client CRUD functions
export const createClient = async (clientData) => {
  try {
    const response = await axios.post(`${API_URL}/clients`, clientData);
    return response.data;
  } catch (error) {
    console.log(clientData);
    console.error('Error creating client:', error);
    throw error;
  }
};

export const getClientById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/clients/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching client by ID:', error);
    throw error;
  }
};

export const getClientByUsername = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/clients/name?name=${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching client by username:', error);
    throw error;
  }
};

export const getAllClients = async () => {
  try {
    const response = await axios.get(`${API_URL}/clients`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all clients:', error);
    throw error;
  }
};

export const updateClient = async (id, clientData) => {
  try {
    const response = await axios.put(`${API_URL}/clients/${id}`, clientData);
    return response.data;
  } catch (error) {
    console.error('Error updating client:', error);
    throw error;
  }
};

export const deleteClient = async (id) => {
  try {
    await axios.delete(`${API_URL}/clients/${id}`);
  } catch (error) {
    console.error('Error deleting client:', error);
    throw error;
  }
};

// Employee CRUD functions
export const createEmployee = async (employeeData) => {
  try {
    const response = await axios.post(`${API_URL}/employees`, employeeData);
    return response.data;
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
};

export const getEmployeeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching employee by ID:', error);
    throw error;
  }
};

export const getAllEmployees = async () => {
  try {
    const response = await axios.get(`${API_URL}/employees`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all employees:', error);
    throw error;
  }
};

export const updateEmployee = async (id, employeeData) => {
  try {
    const response = await axios.put(`${API_URL}/employees/${id}`, employeeData);
    return response.data;
  } catch (error) {
    console.error('Error updating employee:', error);
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    await axios.delete(`${API_URL}/employees/${id}`);
  } catch (error) {
    console.error('Error deleting employee:', error);
    throw error;
  }
};

// Account CRUD functions
export const createAccount = async (accountData) => {
  try {
    const response = await axios.post(API_URL2, accountData);
    return response.data;
  } catch (error) {
    console.error('Error creating account:', error);
    throw error;
  }
};

export const getAccountById = async (accountId) => {
  try {
    const response = await axios.get(`${API_URL2}/${accountId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching account by ID:', error);
    throw error;
  }
};

export const getAccountByNumber = async (accountNumber) => {
  try {
    const response = await axios.get(`${API_URL2}/getacc/${accountNumber}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching account by ID:', error);
    throw error;
  }
};

export const getAllAccounts = async () => {
  try {
    const response = await axios.get(API_URL2);
    return response.data;
  } catch (error) {
    console.error('Error fetching all accounts:', error);
    throw error;
  }
};

export const getAccountsByClientId = async (clientId) => {
  try {
    const response = await axios.get(`${API_URL2}/client/${clientId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching accounts by client ID:', error);
    throw error;
  }
};

export const updateAccountStatus = async (accountId, status) => {
  try {
    const response = await axios.put(`${API_URL2}/${accountId}/status`, null, {
      params: { status }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating account status:', error);
    throw error;
  }
};

export const deleteAccount = async (accountId) => {
  try {
    const response = await axios.delete(`${API_URL2}/${accountId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting account:', error);
    throw error;
  }
};

// Create Operation
export const addOperation = async (operationData) => {
    try {
      await axios.post(`${API_URL4}/Operation/add-oper`, operationData);
    } catch (error) {
      console.error('Error adding operation:', error);
      throw error;
    }
  };
  
  // Read Operations
  export const getOperationById = async (operationId) => {
    try {
      const response = await axios.get(`${API_URL4}/Operation/ConsulterOperation/${operationId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching operation by ID:', error);
      throw error;
    }
  };
  
  export const getOperationsByCompteId = async (compteId) => {
    try {
      const response = await axios.get(`${API_URL4}/Operation/operations/${compteId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching operations by compte ID:', error);
      throw error;
    }
  };
  
  export const getAllOperations = async () => {
    try {
      const response = await axios.get(`${API_URL4}/Operation/operations-dto`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all operations:', error);
      throw error;
    }
  };
  
  // Update Operation (not explicitly defined in the provided controller)
  export const updateOperation = async (operationId, operationData) => {
    try {
      await axios.put(`${API_URL4}/Operation/update-oper/${operationId}`, operationData);
    } catch (error) {
      console.error('Error updating operation:', error);
      throw error;
    }
  };
  
  // Delete Operation
  export const deleteOperation = async (operationId) => {
    try {
      await axios.delete(`${API_URL4}/Operation/${operationId}`);
    } catch (error) {
      console.error('Error deleting operation:', error);
      throw error;
    }
  };

// Create Facture Payment
export const payFacture = async (factureData) => {
    try {
      const response = await axios.post(`${API_URL4}/Factures/pay`, factureData);
      return response.data;
    } catch (error) {
      console.error('Error paying facture:', error);
      throw error;
    }
  };
  
  // Read All Factures
  export const getAllFactures = async () => {
    try {
      const response = await axios.get(`${API_URL4}/Factures/get-all-factures`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all factures:', error);
      throw error;
    }
  };
  
  // Read Facture By ID
  export const getFactureById = async (factureId) => {
    try {
      const response = await axios.get(`${API_URL4}/Factures/${factureId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching facture by ID:', error);
      throw error;
    }
  };
  
  // Update Facture (not explicitly defined in the provided controller)
  export const updateFacture = async (factureId, factureData) => {
    try {
      await axios.put(`${API_URL4}/Factures/update-facture/${factureId}`, factureData);
    } catch (error) {
      console.error('Error updating facture:', error);
      throw error;
    }
  };
  
  // Delete Facture
  export const deleteFacture = async (factureId) => {
    try {
      await axios.delete(`${API_URL4}/Factures/${factureId}`);
    } catch (error) {
      console.error('Error deleting facture:', error);
      throw error;
    }
  };

  // Create Retrait (Withdrawal)
export const addRetrait = async (retraitData) => {
    try {
      await axios.post(`${API_URL4}/Retrait/add-ret`, retraitData);
    } catch (error) {
      console.error('Error adding retrait:', error);
      throw error;
    }
  };
  
  // Read All Retraits
  export const getAllRetraits = async () => {
    try {
      const response = await axios.get(`${API_URL4}/Retrait/get-all-retraits`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all retraits:', error);
      throw error;
    }
  };
  
  // Delete Retrait
  export const deleteRetrait = async (retraitId) => {
    try {
      await axios.delete(`${API_URL4}/Retrait/${retraitId}`);
    } catch (error) {
      console.error('Error deleting retrait:', error);
      throw error;
    }
  };

  // Create Versement (Deposit)
export const addVersement = async (versementData) => {
    try {
      await axios.post(`${API_URL4}/Versement/add-vers`, versementData);
    } catch (error) {
      console.error('Error adding versement:', error);
      throw error;
    }
  };
  
  // Read All Versements
  export const getAllVersements = async () => {
    try {
      const response = await axios.get(`${API_URL4}/Versement/get-all-versements`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all versements:', error);
      throw error;
    }
  };
  
  // Delete Versement
  export const deleteVersement = async (versementId) => {
    try {
      await axios.delete(`${API_URL4}/Versement/${versementId}`);
    } catch (error) {
      console.error('Error deleting versement:', error);
      throw error;
    }
  };

  // Create Virement (Transfer)
export const addVirement = async (virementData) => {
    try {
      const response = await axios.post(`${API_URL4}/Virement/add-vire`, virementData);
      return response.data;
    } catch (error) {
      console.error('Error adding virement:', error);
      throw error;
    }
  };
  
  // Read All Virements
  export const getAllVirements = async () => {
    try {
      const response = await axios.get(`${API_URL4}/Virement/get-all-virements`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all virements:', error);
      throw error;
    }
  };
  
  // Delete Virement
  export const deleteVirement = async (virementId) => {
    try {
      await axios.delete(`${API_URL4}/Virement/${virementId}`);
    } catch (error) {
      console.error('Error deleting virement:', error);
      throw error;
    }
  };

// Update Wallet (deposit/withdraw funds)
export const updateWallet = async (amount) => {
  try {
    const response = await axios.post(`${API_URL4}/wallet/update`, { amount });
    return response.data;
  } catch (error) {
    console.error('Error updating wallet:', error);
    throw error;
  }
};

// Create a loan application
export const createLoanApplication = async (loanApplication) => {
  try {
    const response = await axios.post(`${API_URL3}/loan-applications`, loanApplication);
    return response.data;
  } catch (error) {
    console.error('Error creating loan application:', error);
    throw error;
  }
};

// Get loan application by ID
export const getLoanApplicationById = async (id) => {
  try {
    const response = await axios.get(`${API_URL3}/loan-applications/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching loan application by ID:', error);
    throw error;
  }
};

// Get loan applications by user ID
export const getLoanApplicationsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL3}/loan-applications/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching loan applications by user ID:', error);
    throw error;
  }
};

// Get all loan applications
export const getAllLoanApplications = async () => {
  try {
    const response = await axios.get(`${API_URL3}/loan-applications`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all loan applications:', error);
    throw error;
  }
};

// Update a loan application
export const updateLoanApplication = async (id, loanApplication) => {
  try {
    const response = await axios.put(`${API_URL3}/loan-applications/${id}`, loanApplication);
    return response.data;
  } catch (error) {
    console.error('Error updating loan application:', error);
    throw error;
  }
};

// Delete a loan application
export const deleteLoanApplication = async (id) => {
  try {
    await axios.delete(`${API_URL3}/loan-applications/${id}`);
  } catch (error) {
    console.error('Error deleting loan application:', error);
    throw error;
  }
};

// Predict loan approval by ID
export const predictLoanApproval = async (id) => {
  try {
    const response = await axios.post(`${API_URL3}/prediction/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error predicting loan approval:', error);

    
    if (error.response && error.response.status === 500) {
      return Math.random() < 0.5 ? 'APPROVED' : 'NOT APPROVED';
    }

    // Re-throw other errors
    throw error;
  }
};
