# Bank Admin Dashboard

This is an Admin Dashboard for managing a bank's operations. It provides various sections for easy navigation and management, including employees, clients, accounts, transactions, loans, and an overview. The dashboard is designed to provide an intuitive and data-rich user experience through interactive charts and graphs.

## Features

- **Employee & Client Management**: View, add, update, and delete employee and client information. 
  - Employees and clients are managed in separate sections for clarity.
  
- **Account Management**: Manage and view accounts tied to employees and clients.
  
- **Transaction Management**: Monitor and manage transactions with detailed views and filtering options.

- **Loan Management**: Overview and management of different loan types offered by the bank (e.g., personal loans, car loans, student loans).
  
- **Overview & Analytics**: View aggregated data through interactive charts and graphs, providing insights on employee distribution, account activities, transactions, and loan management.

## Technology Stack

- **Frontend**: React.js
  - Chakra UI for UI components
  - Axios for API calls
  - Recharts for visualizations and charts

- **Backend**: (Optional, depending on your setup)
  - Spring Boot / Node.js / Other backend technologies (if used)
  - RESTful API endpoints for managing data (employees, clients, accounts, etc.)

## Setup & Installation

### Prerequisites

- Node.js (>= 14.x.x)
- npm or yarn
- Access to the backend API (if applicable)

### Install Dependencies

1. Clone the repository:
   ```bash
   git clone https://github.com/projet-fintech/admin-dashboard.git

    Navigate to the project directory:

cd admin-dashboard

Install dependencies using npm or yarn:

npm install

or

    yarn install

Environment Variables

Set up your environment variables for backend API endpoints (if applicable). You can create a .env file in the root directory with the following:

REACT_APP_API_URL=http://localhost:8080/api

Run the Development Server

To run the application locally:

npm run dev

or

yarn start

Your app should now be running on http://localhost:5174.
Usage

Once you access the dashboard, you'll be able to navigate through the different sections:

    Employees & Clients: View and edit employee/client data, add new records, or delete existing ones.
    Accounts: View account details and perform actions such as adding or updating accounts.
    Transactions: Manage transactions and track account activity.
    Loans: Get an overview of loans and manage details.
    Overview: View high-level metrics and charts representing different aspects of the bank's operations.

Contributing

If you'd like to contribute to this project, please follow these steps:

    Fork the repository.
    Create a new branch (git checkout -b feature-name).
    Make your changes.
    Commit your changes (git commit -am 'Add new feature').
    Push to the branch (git push origin feature-name).
    Open a pull request.

Acknowledgements

    Chakra UI for providing beautiful and accessible components.
    Recharts for excellent charting capabilities.

