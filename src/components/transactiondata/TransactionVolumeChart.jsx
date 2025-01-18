import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const TransactionVolumeChart = ({ transactions }) => {
  const volumeByType = transactions.reduce((acc, transaction) => {
    acc[transaction.typeOperation] = (acc[transaction.typeOperation] || 0) + Math.abs(transaction.amount);
    return acc;
  }, {});

  const data = Object.entries(volumeByType).map(([type, volume]) => ({ type, volume }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="type" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="volume" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TransactionVolumeChart;

