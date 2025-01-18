import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const TransactionTypeDistribution = ({ transactions }) => {
  const typeCounts = transactions.reduce((acc, transaction) => {
    acc[transaction.typeOperation] = (acc[transaction.typeOperation] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(typeCounts).map(([type, count]) => ({ type, count }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="type"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TransactionTypeDistribution;

