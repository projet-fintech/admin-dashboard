import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const ClientNationalityDistribution = ({ clients }) => {
  const nationalityCounts = clients.reduce((acc, client) => {
    acc[client.nationality] = (acc[client.nationality] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(nationalityCounts)
    .map(([nationality, count]) => ({ nationality, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="nationality"
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

export default ClientNationalityDistribution;

