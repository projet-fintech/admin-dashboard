import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AccountBalanceOverview = ({ accounts }) => {
  const data = accounts.map(account => ({
    accountNumber: account.accountNumber,
    balance: account.balance
  })).sort((a, b) => b.balance - a.balance).slice(0, 10);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="accountNumber" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="balance" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AccountBalanceOverview;

