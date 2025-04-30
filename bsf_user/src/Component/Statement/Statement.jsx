import React, { useState, useEffect } from 'react';
import DatePicker from '../Cric247/DatePicker';
import './Statement.css';

const Statement = () => {
  const [statements, setStatements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filteredStatements, setFilteredStatements] = useState([]);

  useEffect(() => {
    // Simulate API call with a timeout
    const timeout = setTimeout(() => {
      // Generate dummy data
      const dummyData = generateDummyData(20);
      setStatements(dummyData);
      setFilteredStatements(dummyData);
      
      // Set initial date range based on data
      if (dummyData.length > 0) {
        const dates = dummyData.map(d => new Date(d.date));
        const minDate = new Date(Math.min(...dates));
        const maxDate = new Date(Math.max(...dates));
        
        setFromDate(formatDate(minDate));
        setToDate(formatDate(maxDate));
      }
      
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);
  
  // Format date to DD-MM-YYYY
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Function to generate dummy statement data
  const generateDummyData = (count) => {
    const data = [];
    const types = ['Deposit', 'Withdrawal', 'Bet', 'Win', 'Bonus'];
    const statuses = ['Completed', 'Pending', 'Rejected'];

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const amount = Math.floor(Math.random() * 10000);
      const isPositive = type === 'Deposit' || type === 'Win' || type === 'Bonus';
      const date = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000);
      
      data.push({
        id: 100000 + i,
        date: formatDate(date),
        type: type,
        description: `${type} transaction #${i + 1}`,
        amount: isPositive ? amount : -amount,
        balance: 50000 + (isPositive ? amount : -amount),
        status: statuses[Math.floor(Math.random() * statuses.length)]
      });
    }
    
    // Sort by date, newest first
    return data.sort((a, b) => {
      const dateA = a.date.split('-').reverse().join('-');
      const dateB = b.date.split('-').reverse().join('-');
      return new Date(dateB) - new Date(dateA);
    });
  };
  
  const handleFromDateChange = (date) => {
    setFromDate(date);
    filterStatements(date, toDate);
  };
  
  const handleToDateChange = (date) => {
    setToDate(date);
    filterStatements(fromDate, date);
  };
  
  const filterStatements = (from, to) => {
    if (!from || !to) return;
    
    // Convert date strings to comparable format (YYYY-MM-DD)
    const fromParts = from.split('-');
    const toParts = to.split('-');
    const fromFormatted = `${fromParts[2]}-${fromParts[1]}-${fromParts[0]}`;
    const toFormatted = `${toParts[2]}-${toParts[1]}-${toParts[0]}`;
    
    const filtered = statements.filter(item => {
      const itemParts = item.date.split('-');
      const itemFormatted = `${itemParts[2]}-${itemParts[1]}-${itemParts[0]}`;
      
      return itemFormatted >= fromFormatted && itemFormatted <= toFormatted;
    });
    
    setFilteredStatements(filtered);
  };
  
  const handleSearch = () => {
    filterStatements(fromDate, toDate);
  };

  return (
    <div className="statement-container">
      <h2 className="statement-title">Account Statement</h2>
      
      <div className="statement-filters">
        <div className="date-filter">
          <label>From:</label>
          <DatePicker 
            selectedDate={fromDate}
            onDateChange={handleFromDateChange}
            placeholder="From Date"
          />
        </div>
        <div className="date-filter">
          <label>To:</label>
          <DatePicker 
            selectedDate={toDate}
            onDateChange={handleToDateChange}
            placeholder="To Date"
          />
        </div>
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
      
      {loading ? (
        <div className="statement-loading">Loading statement data...</div>
      ) : (
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
              {filteredStatements.map((item) => (
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
      )}
    </div>
  );
};

export default Statement; 