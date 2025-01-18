import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const EmployeeAgeDistribution = ({ employees }) => {
  const ageGroups = {
    '18-25': 0,
    '26-35': 0,
    '36-45': 0,
    '46-55': 0,
    '56+': 0
  };

  employees.forEach(employee => {
    const age = parseInt(employee.age);
    if (age <= 25) ageGroups['18-25']++;
    else if (age <= 35) ageGroups['26-35']++;
    else if (age <= 45) ageGroups['36-45']++;
    else if (age <= 55) ageGroups['46-55']++;
    else ageGroups['56+']++;
  });

  const data = Object.entries(ageGroups).map(([range, count]) => ({ range, count }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EmployeeAgeDistribution;

