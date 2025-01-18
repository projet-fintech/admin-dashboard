import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const EmployeeGrowthChart = ({ employees }) => {
  const sortedEmployees = [...employees].sort((a, b) => new Date(a.dateOfBirthday) - new Date(b.dateOfBirthday));
  
  const data = sortedEmployees.reduce((acc, employee, index) => {
    const date = new Date(employee.dateOfBirthday);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const key = `${month} ${year}`;
    
    if (!acc[key]) {
      acc[key] = { date: key, count: 0 };
    }
    acc[key].count = index + 1;
    return acc;
  }, {});

  const chartData = Object.values(data);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EmployeeGrowthChart;

