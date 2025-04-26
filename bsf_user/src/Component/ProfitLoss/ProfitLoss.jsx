import React, { useState, useEffect } from 'react';
import './ProfitLoss.css';

const ProfitLoss = () => {
  const [profitLossData, setProfitLossData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalLoss, setTotalLoss] = useState(0);
  const [netAmount, setNetAmount] = useState(0);

  useEffect(() => {
    // Simulate API call with a timeout
    const timeout = setTimeout(() => {
      // Generate dummy data
      const dummyData = generateDummyData(15);
      setProfitLossData(dummyData);
      
      // Calculate totals
      const profit = dummyData.filter(item => item.amount > 0).reduce((acc, curr) => acc + curr.amount, 0);
      const loss = Math.abs(dummyData.filter(item => item.amount < 0).reduce((acc, curr) => acc + curr.amount, 0));
      const net = profit - loss;
      
      setTotalProfit(profit);
      setTotalLoss(loss);
      setNetAmount(net);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

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
      
      data.push({
        id: 100000 + i,
        date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        sport: sport,
        match: match,
        market: market,
        amount: amount,
        status: amount > 0 ? 'Win' : 'Loss'
      });
    }
    
    // Sort by date, newest first
    return data.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  return (
    <div className="profit-loss-container">
      <h2 className="profit-loss-title">Profit & Loss Statement</h2>
      
      {loading ? (
        <div className="profit-loss-loading">Loading profit/loss data...</div>
      ) : (
        <>
          <div className="profit-loss-summary">
            <div className="summary-item">
              <span className="summary-label">Total Profit:</span>
              <span className="summary-value positive">₹{totalProfit.toLocaleString()}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Total Loss:</span>
              <span className="summary-value negative">₹{totalLoss.toLocaleString()}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Net Profit/Loss:</span>
              <span className={`summary-value ${netAmount >= 0 ? 'positive' : 'negative'}`}>
                ₹{netAmount.toLocaleString()}
              </span>
            </div>
          </div>
          
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
                {profitLossData.map((item) => (
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
        </>
      )}
    </div>
  );
};

export default ProfitLoss; 