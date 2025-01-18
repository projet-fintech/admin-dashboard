import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getAllOperations } from '../api';

const TransactionTrend = () => {
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const operations = await getAllOperations();
      const groupedData = groupTransactionsByMonth(operations);
      setTransactionData(groupedData);
    };

    fetchTransactions();
  }, []);

  const groupTransactionsByMonth = (transactions) => {
    const grouped = transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!acc[monthYear]) {
        acc[monthYear] = { month: monthYear, count: 0 };
      }
      acc[monthYear].count++;
      return acc;
    }, {});

    return Object.values(grouped).sort((a, b) => a.month.localeCompare(b.month));
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={transactionData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TransactionTrend;

