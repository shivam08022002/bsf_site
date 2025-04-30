import React, { useState, useEffect } from 'react';
import DatePicker from '../Cric247/DatePicker';
import './ProfitLoss.css';

const ProfitLoss = () => {
  const [profitLossData, setProfitLossData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Simulate API call with a timeout
    const timeout = setTimeout(() => {
      // Generate dummy data
      const dummyData = generateDummyData(15);
      setProfitLossData(dummyData);
      setFilteredData(dummyData);
      
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

  // Function to generate dummy profit/loss data
  const generateDummyData = (count) => {
    const data = [];
    const markets = ['Match Odds', 'Toss Winner', 'Top Batsman', 'Fancy Market', 'Session Market'];
    const sports = ['Cricket', 'Football', 'Tennis'];
    const matches = [
      'India vs Australia', 'England vs South Africa', 
      'Mumbai vs Chennai', 'Barcelona vs Real Madrid',
      'Roger Federer vs Rafael Nadal'
    ];

    for (let i = 0; i < count; i++) {
      const sport = sports[Math.floor(Math.random() * sports.length)];
      const match = matches[Math.floor(Math.random() * matches.length)];
      const market = markets[Math.floor(Math.random() * markets.length)];
      const amount = Math.floor(Math.random() * 2000) * (Math.random() > 0.5 ? 1 : -1);
      const date = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000);
      
      data.push({
        id: 100000 + i,
        date: formatDate(date),
        sport: sport,
        match: match,
        market: market,
        amount: amount,
        status: amount > 0 ? 'Win' : 'Loss'
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
    filterData(date, toDate);
  };
  
  const handleToDateChange = (date) => {
    setToDate(date);
    filterData(fromDate, date);
  };
  
  const filterData = (from, to) => {
    if (!from || !to) return;
    
    // Convert date strings to comparable format (YYYY-MM-DD)
    const fromParts = from.split('-');
    const toParts = to.split('-');
    const fromFormatted = `${fromParts[2]}-${fromParts[1]}-${fromParts[0]}`;
    const toFormatted = `${toParts[2]}-${toParts[1]}-${toParts[0]}`;
    
    const filtered = profitLossData.filter(item => {
      const itemParts = item.date.split('-');
      const itemFormatted = `${itemParts[2]}-${itemParts[1]}-${itemParts[0]}`;
      
      return itemFormatted >= fromFormatted && itemFormatted <= toFormatted;
    });
    
    setFilteredData(filtered);
  };
  
  const handleSearch = () => {
    filterData(fromDate, toDate);
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="profit-loss-container">
      <h2 className="profit-loss-title">Profit & Loss Statement</h2>
      
      <div className="profit-loss-filters">
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
        <div className="profit-loss-loading">Loading profit/loss data...</div>
      ) : (
        <div className="profit-loss-table-container">
          <table className="profit-loss-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Sport</th>
                <th>Match</th>
                <th>Market</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.date}</td>
                  <td>{item.sport}</td>
                  <td>{item.match}</td>
                  <td>{item.market}</td>
                  <td className={item.amount >= 0 ? 'positive' : 'negative'}>
                    {item.amount >= 0 ? '+' : ''}{item.amount}
                  </td>
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

export default ProfitLoss; 