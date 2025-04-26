import React, { useState, useEffect } from 'react';
import './Statement.css';

const Statement = () => {
  const [statements, setStatements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with a timeout
    const timeout = setTimeout(() => {
      // Generate dummy data
      const dummyData = generateDummyData(20);
      setStatements(dummyData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  // Function to generate dummy statement data
  const generateDummyData = (count) => {
    const data = [];
    const types = ['Deposit', 'Withdrawal', 'Bet', 'Win', 'Bonus'];
    const statuses = ['Completed', 'Pending', 'Rejected'];

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const amount = Math.floor(Math.random() * 10000);
      const isPositive = type === 'Deposit' || type === 'Win' || type === 'Bonus';
      
      data.push({
        id: 100000 + i,
        date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        type: type,
        description: `${type} transaction #${i + 1}`,
        amount: isPositive ? amount : -amount,
        balance: 50000 + (isPositive ? amount : -amount),
        status: statuses[Math.floor(Math.random() * statuses.length)]
      });
    }
    
    // Sort by date, newest first
    return data.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  return (
    <div className="statement-container">
      <h2 className="statement-title">Account Statement</h2>
      
      {loading ? (
        <div className="statement-loading">Loading statement data...</div>
      ) : (
        <>
          <div className="statement-summary">
            <div className="summary-item">
              <span className="summary-label">Total Deposits:</span>
              <span className="summary-value positive">₹{statements.filter(s => s.type === 'Deposit').reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Total Withdrawals:</span>
              <span className="summary-value negative">₹{Math.abs(statements.filter(s => s.type === 'Withdrawal').reduce((acc, curr) => acc + curr.amount, 0)).toLocaleString()}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Net Profit/Loss:</span>
              <span className={`summary-value ${statements.reduce((acc, curr) => acc + curr.amount, 0) >= 0 ? 'positive' : 'negative'}`}>
                ₹{statements.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
              </span>
            </div>
          </div>
          
          <div className="statement-table-container">
            <table className="statement-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Balance</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {statements.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.date}</td>
                    <td>{item.type}</td>
                    <td>{item.description}</td>
                    <td className={item.amount >= 0 ? 'positive' : 'negative'}>
                      {item.amount >= 0 ? '+' : ''}{item.amount}
                    </td>
                    <td>{item.balance}</td>
                    <td>
                      <span className={`status-badge ${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Statement; 