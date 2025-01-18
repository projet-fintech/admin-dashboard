import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ClientAgeDistribution = ({ clients }) => {
  const ageGroups = {
    '0-18': 0,
    '19-30': 0,
    '31-45': 0,
    '46-60': 0,
    '60+': 0
  };

  clients.forEach(client => {
    const age = parseInt(client.age);
    if (age <= 18) ageGroups['0-18']++;
    else if (age <= 30) ageGroups['19-30']++;
    else if (age <= 45) ageGroups['31-45']++;
    else if (age <= 60) ageGroups['46-60']++;
    else ageGroups['60+']++;
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

export default ClientAgeDistribution;

