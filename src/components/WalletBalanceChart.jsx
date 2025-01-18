import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const WalletBalanceChart = ({ transactions, currentBalance }) => {
  const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

  let runningBalance = currentBalance;
  const data = sortedTransactions.map(transaction => {
    runningBalance -= transaction.amount;
    return {
      date: new Date(transaction.date).toLocaleDateString(),
      balance: runningBalance
    };
  }).reverse();

  data.unshift({ date: 'Current', balance: currentBalance });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="balance" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default WalletBalanceChart;

