import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { getAllAccounts } from '../api';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AccountDistribution = () => {
  const [accountData, setAccountData] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      const accounts = await getAllAccounts();
      const distribution = getAccountTypeDistribution(accounts);
      setAccountData(distribution);
    };

    fetchAccounts();
  }, []);

  const getAccountTypeDistribution = (accounts) => {
    const distribution = accounts.reduce((acc, account) => {
      acc[account.accountType] = (acc[account.accountType] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(distribution).map(([type, count]) => ({ name: type, value: count }));
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={accountData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {accountData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AccountDistribution;

