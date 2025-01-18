import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const OverviewChart = ({ data }) => {
  const chartData = [
    { name: 'Employees', value: data.employees },
    { name: 'Clients', value: data.clients },
    { name: 'Transactions', value: data.transactions },
    { name: 'Loans', value: data.loans },
    { name: 'Accounts', value: data.accounts },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default OverviewChart;

